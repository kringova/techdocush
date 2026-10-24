const host=document.querySelector('[data-music]');
if(host){
  const TRACKS=[{id:'kalimba',name:'Калимба',file:'kalimba-v1.mp3',gain:1},{id:'bells',name:'Колокольчики',file:'bells-v2.mp3',gain:.55},{id:'keys',name:'Клавиши',file:'cozy-room-v1.mp3',gain:.4},{id:'rain',name:'Дождь',file:'rain-v1.mp3',gain:.28},{id:'wind',name:'Ветер',file:'wind-v1.mp3',gain:.25},{id:'purr',name:'Мурчание',file:'purr-v3.mp3',gain:.8}];
  const key='corio-ambient-mix-v1';let volume=.38,wanted=false,started=false,context=null,master=null,origin=null,token=0,gamePaused=false,focused=true,loading=false,error=false;
  const enabled=Object.fromEntries(TRACKS.map(t=>[t.id,false])),gains=Object.fromEntries(TRACKS.map(t=>[t.id,t.gain])),nodes=new Map(),buffers=new Map(),pending=new Map();
  try{const stored=JSON.parse(localStorage.getItem(key));if(stored){if(Number.isFinite(stored.volume)&&stored.volume>=0&&stored.volume<=.6)volume=stored.volume;wanted=stored.enabled===true;for(const t of TRACKS){enabled[t.id]=stored.layers?.[t.id]===true;if(Number.isFinite(stored.gains?.[t.id]))gains[t.id]=Math.max(0,Math.min(1,stored.gains[t.id]));}}}catch{}
  host.className='ambient-controls';const header=document.createElement('div');header.className='ambient-header';const button=document.createElement('button');button.className='ambient-play';button.type='button';const title=document.createElement('span');title.textContent='♫ Атмосфера';const status=document.createElement('small');button.append(title,status);
  const label=document.createElement('label');label.textContent='Громкость';const slider=document.createElement('input');slider.type='range';slider.min='0';slider.max='60';slider.value=Math.round(volume*100);slider.className='ambient-master-volume';slider.setAttribute('aria-label','Общая громкость');label.append(slider);header.append(button,label);host.append(header);
  const layers=document.createElement('div');layers.className='ambient-layers';host.append(layers);const controls=new Map();
  const details=document.createElement('details');details.className='ambient-settings';const summary=document.createElement('summary');summary.textContent='Громкость слоёв';details.append(summary);const levels=document.createElement('div');levels.className='ambient-layer-levels';details.append(levels);const credit=document.createElement('a');credit.href='https://bigsoundbank.com/ronronnement-de-chat-3-s1010.html';credit.textContent='Мурчание: Joseph SARDIN · CC0';credit.target='_blank';credit.rel='noopener noreferrer';credit.className='ambient-credit';details.append(credit);host.append(details);
  function save(){try{localStorage.setItem(key,JSON.stringify({volume,enabled:wanted,layers:enabled,gains}));}catch{}}
  const anyEnabled=()=>TRACKS.some(t=>enabled[t.id]);
  const playing=()=>!!context&&context.state==='running'&&wanted&&!gamePaused&&focused&&!document.hidden&&TRACKS.some(t=>enabled[t.id]&&nodes.has(t.id));
  function update(){button.setAttribute('aria-pressed',String(playing()));button.setAttribute('aria-label',playing()?'Остановить звуковую атмосферу':'Включить звуковую атмосферу');status.textContent=error?'ошибка':loading?'готовим…':playing()?'играет':wanted&&started?'пауза':'выкл';for(const t of TRACKS)controls.get(t.id)?.setAttribute('aria-pressed',String(enabled[t.id]));}
  function initContext(){if(context)return;context=new(window.AudioContext||window.webkitAudioContext)();master=context.createGain();master.gain.value=0;master.connect(context.destination);context.addEventListener('statechange',update);}
  function ramp(parameter,target,seconds=.2){const now=context.currentTime;parameter.cancelScheduledValues(now);parameter.setValueAtTime(Math.max(0,parameter.value),now);parameter.linearRampToValueAtTime(Math.max(0,Math.min(1,target)),now+seconds);}
  async function ensureLayer(track){
    if(nodes.has(track.id))return;if(pending.has(track.id))return pending.get(track.id);
    const work=(async()=>{
      let buffer=buffers.get(track.id);
      if(!buffer){const response=await fetch(new URL('./assets/'+track.file,import.meta.url));if(!response.ok)throw Error('Audio unavailable');buffer=await context.decodeAudioData(await response.arrayBuffer());buffers.set(track.id,buffer);}
      const gain=context.createGain();gain.gain.value=0;gain.connect(master);const source=context.createBufferSource();source.buffer=buffer;source.loop=true;source.loopStart=0;source.loopEnd=Math.min(60,buffer.duration);source.connect(gain);
      const when=context.currentTime+.025;if(origin===null)origin=when;const offset=((when-origin)%60+60)%60;source.start(when,offset);nodes.set(track.id,{gain,source,when,offset,duration:buffer.duration});
      ramp(gain.gain,enabled[track.id]?gains[track.id]:0,.4);
    })();pending.set(track.id,work);try{await work;}finally{pending.delete(track.id);}
  }
  async function play(){
    if(!wanted||document.hidden||gamePaused||!focused)return;
    const turn=++token;started=true;error=false;loading=true;update();
    try{initContext();await context.resume();await Promise.all(TRACKS.filter(t=>enabled[t.id]).map(ensureLayer));if(turn!==token)return;loading=false;for(const track of TRACKS)if(nodes.has(track.id))ramp(nodes.get(track.id).gain.gain,enabled[track.id]?gains[track.id]:0,.3);if(!wanted||document.hidden||gamePaused||!focused){await context.suspend();update();return;}ramp(master.gain,volume,.8);update();}
    catch{loading=false;error=true;update();}
  }
  function suspend(){token++;loading=false;if(context){master.gain.cancelScheduledValues(context.currentTime);master.gain.setValueAtTime(0,context.currentTime);context.suspend().then(update).catch(()=>{});}update();}
  function stop(){wanted=false;save();const turn=++token;if(!context){update();return;}ramp(master.gain,0,.35);setTimeout(()=>{if(turn===token&&!wanted)context.suspend().then(update).catch(()=>{});},380);update();}
  async function toggleLayer(track){
    enabled[track.id]=!enabled[track.id];save();update();
    if(!anyEnabled()){stop();return;}
    if(enabled[track.id]){wanted=true;save();play();}
    else if(nodes.has(track.id))ramp(nodes.get(track.id).gain.gain,0,.25);
  }
  for(const track of TRACKS){
    const layer=document.createElement('button');layer.type='button';layer.className='ambient-layer';layer.dataset.layer=track.id;layer.textContent=track.name;layer.setAttribute('aria-label',`Включить или выключить: ${track.name}`);layer.addEventListener('click',()=>toggleLayer(track));layers.append(layer);controls.set(track.id,layer);
    const row=document.createElement('label');row.textContent=track.name;const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.value=Math.round(gains[track.id]*100);range.dataset.layerVolume=track.id;range.setAttribute('aria-label',`Громкость: ${track.name}`);range.addEventListener('input',()=>{gains[track.id]=+range.value/100;if(nodes.has(track.id))ramp(nodes.get(track.id).gain.gain,enabled[track.id]?gains[track.id]:0,.12);save();});row.append(range);levels.append(row);
  }
  button.addEventListener('click',()=>{if(playing()){stop();return;}if(!anyEnabled())enabled.kalimba=true;wanted=true;save();update();play();});
  slider.addEventListener('input',()=>{volume=+slider.value/100;if(master&&playing())ramp(master.gain,volume,.12);save();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();else if(started&&wanted)play();});
  window.addEventListener('blur',()=>{focused=false;suspend();});window.addEventListener('focus',()=>{focused=true;if(started&&wanted)play();});
  window.addEventListener('corio:pause',()=>{gamePaused=true;suspend();});window.addEventListener('corio:resume',()=>{gamePaused=false;if(started&&wanted)play();});
  const restore=event=>{if(wanted&&!started&&!event.target.closest('.ambient-controls'))play();};document.addEventListener('pointerdown',restore);document.addEventListener('keydown',restore);
  Object.defineProperty(window,'__corioMusic',{value:()=>({wanted,started,playing:playing(),volume,mediaVolume:master?.gain.value||0,duration:60,loop:true,gamePaused,position:context&&origin!==null?Math.max(0,(context.currentTime-origin)%60):0,contextState:context?.state||'not-started',origin,layers:Object.fromEntries(TRACKS.map(t=>[t.id,{enabled:enabled[t.id],gain:gains[t.id],loaded:nodes.has(t.id),when:nodes.get(t.id)?.when??null,offset:nodes.get(t.id)?.offset??null,duration:nodes.get(t.id)?.duration??null,file:t.file,nodeGain:nodes.get(t.id)?.gain.gain.value??0}]))})});update();
}
