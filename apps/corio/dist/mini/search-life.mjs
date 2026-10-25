const asset=file=>new URL('../assets/'+file,import.meta.url).href;
export function createSearchLife({scene,isBlocked}){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let timer=null,nextAt=0,animations=[],focused=document.hasFocus(),voice=true,audio=null,voiceStarts=0,voiceError=false,idleReactions=0,lastReaction=null;
  let lampTimer=null,lampPending=null,lamp={x:400,y:260},lastLamp=0,lampUpdates=0,keyboardFocus=false;
  function markFocus(){for(const node of scene.querySelectorAll('.search-cat,.search-object'))node.toggleAttribute('data-keyboard-focus',keyboardFocus);}
  try{voice=localStorage.getItem('corio-cat-voice-v1')!=='off';}catch{}
  const blocked=()=>!focused||document.hidden||isBlocked();
  function stopVoice(){if(audio){audio.pause();audio.currentTime=0;}}
  function stopAnimation(){for(const a of animations)a.cancel();animations=[];}
  function unschedule(){clearTimeout(timer);timer=null;nextAt=0;}
  function schedule(){
    if(timer||animations.length||blocked()||reduced.matches)return;
    const delay=8000+Math.random()*4000;nextAt=performance.now()+delay;
    timer=setTimeout(()=>{timer=null;nextAt=0;if(!blocked()){idleReactions++;react(lastReaction==='eyes'?'ear':'eyes');}},delay);
  }
  function react(part){
    if(blocked())return;unschedule();stopAnimation();lastReaction=part;
    const layer=scene.querySelector(`[data-cat-layer="${part}"]`);
    if(!layer||reduced.matches){schedule();return;}
    const a=layer.animate([{opacity:0},{opacity:1,offset:.2},{opacity:1,offset:.65},{opacity:0}],{duration:part==='eyes'?260:620,easing:'ease-in-out'});
    animations=[a];a.onfinish=()=>{animations=[];schedule();};
  }
  function callCat(){
    if(blocked())return;
    // A second click never overlays or restarts an unfinished voice.
    if(audio&&!audio.paused)return;
    react('ear');
    if(!voice)return;
    audio??=new Audio(asset('meow-long-v1.mp3'));audio.preload='none';audio.loop=false;
    audio.volume=Math.max(0,Math.min(1,window.__corioMusic?.().volume??.38));
    audio.currentTime=0;voiceError=false;voiceStarts++;
    audio.play().catch(()=>{voiceError=true;});
  }
  function paintLamp(){
    lampTimer=null;if(blocked()||!lampPending)return;
    lamp=lampPending;lampPending=null;lastLamp=performance.now();
    const glow=scene.querySelector('[data-lamp-glow]');if(!glow)return;
    glow.setAttribute('cx',lamp.x);glow.setAttribute('cy',lamp.y);
    scene.querySelector('[data-lamp-cursor]')?.setAttribute('transform',`translate(${lamp.x} ${lamp.y})`);lampUpdates++;
  }
  function setLamp(x,y,immediate=false){
    if(blocked()||!scene.querySelector('.night-scene'))return;
    lampPending={x:Math.max(0,Math.min(800,x)),y:Math.max(0,Math.min(520,y))};
    if(immediate){clearTimeout(lampTimer);paintLamp();}
    else if(lampTimer===null)lampTimer=setTimeout(paintLamp,Math.max(0,34-(performance.now()-lastLamp)));
  }
  function pointer(event){
    const svg=event.target.closest('svg[data-search-scene]');if(!svg?.classList.contains('night-scene'))return;
    const r=svg.getBoundingClientRect();setLamp((event.clientX-r.x)*800/r.width,(event.clientY-r.y)*520/r.height,event.type==='pointerdown');
  }
  function reconcile(){
    if(blocked()){unschedule();stopAnimation();stopVoice();clearTimeout(lampTimer);lampTimer=null;lampPending=null;}
    else schedule();
  }
  scene.addEventListener('pointermove',pointer,{passive:true});scene.addEventListener('pointerdown',pointer,{passive:true});
  document.addEventListener('pointerdown',()=>{keyboardFocus=false;markFocus();},{passive:true});
  document.addEventListener('keydown',event=>{if(['Tab','Enter',' '].includes(event.key)){keyboardFocus=true;markFocus();}});
  scene.addEventListener('focusin',event=>{const target=event.target.closest('[data-find],[data-cat-react]');if(!target)return;const rect=target.querySelector('rect');setLamp(+rect.getAttribute('x')+Number(rect.getAttribute('width'))/2,+rect.getAttribute('y')+Number(rect.getAttribute('height'))/2,true);});
  document.addEventListener('visibilitychange',reconcile);
  window.addEventListener('blur',()=>{focused=false;reconcile();});window.addEventListener('focus',()=>{focused=true;reconcile();});
  for(const name of ['corio:pause','corio:resume','corio:platform-pause','corio:platform-resume'])window.addEventListener(name,reconcile);
  reduced.addEventListener('change',()=>{stopAnimation();unschedule();reconcile();});
  const observer=new MutationObserver(reconcile);for(const dialog of document.querySelectorAll('dialog'))observer.observe(dialog,{attributes:true,attributeFilter:['open']});
  const host=document.getElementById('sound-settings');
  const label=document.createElement('label');label.className='cat-voice-option';
  const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=voice;checkbox.dataset.catVoice='';label.append(checkbox,'Мяуканье по нажатию');host?.append(label);
  checkbox.addEventListener('change',()=>{voice=checkbox.checked;if(!voice)stopVoice();try{localStorage.setItem('corio-cat-voice-v1',voice?'on':'off');}catch{}});
  const credit=document.createElement('a');credit.href='https://bigsoundbank.com/meow-cat-2-s1890.html';credit.textContent='Мяуканье: Joseph SARDIN · CC0';credit.className='cat-voice-credit';credit.target='_blank';credit.rel='noopener noreferrer';host?.append(credit);
  Object.defineProperty(window,'__corioCat',{value:()=>({voice,voicePlaying:!!audio&&!audio.paused,voiceDuration:audio?.duration||0,voiceVolume:audio?.volume??0,voiceStarts,voiceError,idleReactions,lastReaction,animationRunning:animations.some(a=>a.playState==='running'),nextIdleIn:nextAt?Math.max(0,nextAt-performance.now()):null,reducedMotion:reduced.matches,blocked:blocked(),lamp:{...lamp},lampUpdates,lampPending:lampTimer!==null})});
  return{
    callCat,
    afterRender(){markFocus();stopAnimation();const glow=scene.querySelector('[data-lamp-glow]');if(glow){glow.setAttribute('cx',lamp.x);glow.setAttribute('cy',lamp.y);scene.querySelector('[data-lamp-cursor]')?.setAttribute('transform',`translate(${lamp.x} ${lamp.y})`);}schedule();},
    newLevel(){unschedule();stopAnimation();stopVoice();clearTimeout(lampTimer);lampTimer=null;lampPending=null;lamp={x:400,y:260};},
    reconcile
  };
}
