import {createCatIdle} from './cat-idle.mjs?v=0.26.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
export function createSearchLife({scene,isBlocked}){
  let focused=document.hasFocus(),voice=true,audio=null,voiceStarts=0,voiceError=false;
  const sceneHeight=800*1024/1536;
  let lampTimer=null,lampPending=null,lamp={x:400,y:sceneHeight/2},lastLamp=0,lampUpdates=0,keyboardFocus=false;
  function markFocus(){for(const node of scene.querySelectorAll('.search-cat,.search-object'))node.toggleAttribute('data-keyboard-focus',keyboardFocus);}
  try{voice=localStorage.getItem('corio-cat-voice-v1')!=='off';}catch{}
  const voiceSettings=()=>window.__corioActionVoice?.()||{enabled:voice,volume:.38};
  const blocked=()=>!focused||document.hidden||isBlocked();
  function stopVoice(){if(audio){audio.pause();audio.currentTime=0;}}
  const idle=createCatIdle({host:scene,isBlocked,parts:['eyes','ear','lick']});
  function callCat(){
    if(blocked())return;
    // A second click never overlays or restarts an unfinished voice.
    if(audio&&!audio.paused)return;
    idle.react('ear');
    const settings=voiceSettings();voice=settings.enabled;if(!voice||settings.volume===0)return;
    audio??=new Audio(asset('meow-long-v1.mp3'));audio.preload='none';audio.loop=false;
    audio.volume=Math.max(0,Math.min(1,settings.volume));
    audio.currentTime=0;voiceError=false;voiceStarts++;
    audio.play().catch(()=>{voiceError=true;});
  }
  function paintLamp(){
    lampTimer=null;if(blocked()||!lampPending)return;
    lamp=lampPending;lampPending=null;lastLamp=performance.now();
    const glow=scene.querySelector('[data-lamp-glow]');if(!glow)return;
    glow.style.setProperty('--lamp-x',lamp.x/8+'%');glow.style.setProperty('--lamp-y',lamp.y/sceneHeight*100+'%');lampUpdates++;
  }
  function setLamp(x,y,immediate=false){
    if(blocked()||!scene.querySelector('.night-scene'))return;
    lampPending={x:Math.max(0,Math.min(800,x)),y:Math.max(0,Math.min(sceneHeight,y))};
    if(immediate){clearTimeout(lampTimer);paintLamp();}
    else if(lampTimer===null)lampTimer=setTimeout(paintLamp,Math.max(0,34-(performance.now()-lastLamp)));
  }
  function pointer(event){
    const svg=event.target.closest('svg[data-search-scene]');if(!svg?.classList.contains('night-scene'))return;
    const r=svg.getBoundingClientRect();setLamp((event.clientX-r.x)*800/r.width,(event.clientY-r.y)*sceneHeight/r.height,event.type==='pointerdown');
  }
  function reconcile(){
    idle.reconcile();
    if(blocked()){stopVoice();clearTimeout(lampTimer);lampTimer=null;lampPending=null;}
  }
  scene.addEventListener('pointermove',pointer,{passive:true});scene.addEventListener('pointerdown',pointer,{passive:true});
  document.addEventListener('pointerdown',()=>{keyboardFocus=false;markFocus();},{passive:true});
  document.addEventListener('keydown',event=>{if(['Tab','Enter',' '].includes(event.key)){keyboardFocus=true;markFocus();}});
  scene.addEventListener('focusin',event=>{const target=event.target.closest('[data-find],[data-cat-react]');if(!target)return;const rect=target.querySelector('rect');setLamp(+rect.getAttribute('x')+Number(rect.getAttribute('width'))/2,+rect.getAttribute('y')+Number(rect.getAttribute('height'))/2,true);});
  document.addEventListener('visibilitychange',reconcile);
  window.addEventListener('blur',()=>{focused=false;reconcile();});window.addEventListener('focus',()=>{focused=true;reconcile();});
  for(const name of ['corio:pause','corio:resume','corio:platform-pause','corio:platform-resume'])window.addEventListener(name,reconcile);
  const observer=new MutationObserver(reconcile);for(const dialog of document.querySelectorAll('dialog'))observer.observe(dialog,{attributes:true,attributeFilter:['open']});
  const host=document.getElementById('sound-settings');
  voice=voiceSettings().enabled;
  window.addEventListener('corio:action-voice-change',()=>{const settings=voiceSettings();voice=settings.enabled;if(!voice||settings.volume===0)stopVoice();else if(audio)audio.volume=settings.volume;});
  window.addEventListener('corio:action-feedback-cancel',stopVoice);
  const credit=document.createElement('a');credit.href='https://bigsoundbank.com/meow-cat-2-s1890.html';credit.textContent='Мяуканье: Joseph SARDIN · CC0';credit.className='cat-voice-credit';credit.target='_blank';credit.rel='noopener noreferrer';host?.append(credit);
  Object.defineProperty(window,'__corioCat',{value:()=>({voice,voicePlaying:!!audio&&!audio.paused,voiceDuration:audio?.duration||0,voiceVolume:audio?.volume??0,voiceStarts,voiceError,...idle.snapshot(),lamp:{...lamp},lampUpdates,lampPending:lampTimer!==null})});
  return{
    callCat,
    afterRender(){markFocus();idle.afterRender();const glow=scene.querySelector('[data-lamp-glow]');if(glow){glow.style.setProperty('--lamp-x',lamp.x/8+'%');glow.style.setProperty('--lamp-y',lamp.y/sceneHeight*100+'%');}},
    newLevel(){idle.newLevel();stopVoice();clearTimeout(lampTimer);lampTimer=null;lampPending=null;lamp={x:400,y:sceneHeight/2};},
    reconcile
  };
}
