// Shared finite action feedback. Ambient tracks and the real cat recordings
// belong to their existing owners; this module synthesizes only quiet materials.
const item=(sound,visual='pulse',cooldown=120,level=1)=>Object.freeze({sound,visual,cooldown,level});
export const ACTION_EVENTS=Object.freeze({
 'boxes.step':item('wood','pulse',95,.7),'boxes.push':item('cardboard','pulse',140),'boxes.mat':item('cloth','ring',160),'boxes.unlock':item('success','success',400),'boxes.blocked':item(null,'negative',140),'boxes.win':item('success','success',700),
 'shelves.pick':item('cloth','pulse',120),'shelves.place':item('wood','ring',130),'shelves.invalid':item(null,'negative',180),'shelves.group':item('success','success',300,.8),'shelves.win':item('success','success',700),
 'tunnels.turn':item('cloth','pulse',100),'tunnels.joint':item('wood','ring',130,.65),'tunnels.checkpoint':item('success','success',250,.75),'tunnels.connected':item('success','success',400),'tunnels.hammock':item('cloth','pulse',250),'tunnels.arrive':item('ceramic','success',400),
 'food.select':item(null,'pulse',100),'food.pick':item('cloth','pulse',120,.7),'food.cat':item('ceramic','ring',120,.75),'food.trash':item('cloth','ring',120,.8),'food.wrong':item(null,'negative',180),'food.hearts':item('success','success',400,.75),'food.retch':item(null,null,500),
 'grooming.tool':item(null,'pulse',100),'grooming.wipe':item('cloth','pulse',110),'grooming.brush':item('scratch','pulse',140,.75),'grooming.water':item('water','ring',160),'grooming.soap':item('cloth','pulse',130),'grooming.rinse':item('water','ring',180),'grooming.towel':item('cloth','pulse',140),'grooming.break':item(null,'ring',200),'grooming.finish':item('success','success',600),
 'litter.reveal':item('sand','pulse',110),'litter.empty':item('sand','ring',110,.7),'litter.pair':item('success','success',300,.8),'litter.mismatch':item(null,'negative',180),'litter.win':item('success','success',700),
 'yarn.pick':item('wool','pulse',120),'yarn.pull':item('wool',null,180,.7),'yarn.release':item('wool','ring',130),'yarn.undo':item('cloth','pulse',140,.7),'yarn.win':item('success','success',700),
 'search.found':item('cloth','success',130,.8),'search.miss':item(null,'negative',180),'search.hint':item(null,'ring',250),'search.win':item('success','success',700),
 'pet.food':item('ceramic','ring',160,.8),'pet.water':item('water','ring',180),'pet.eat':item('ceramic','pulse',550,.55),'pet.drink':item('water','pulse',650,.65),'pet.play':item('wool','pulse',200),'pet.tease':item('cloth','pulse',200,.8),'pet.brush':item('scratch','pulse',160,.75),'pet.scritch':item('cloth','pulse',160,.7),'pet.treat':item('cloth','ring',180,.7),'pet.scratch':item('scratch','pulse',190),'pet.scoop':item('sand','ring',170),'pet.rest':item('cloth','ring',250,.65),'pet.wake':item('cloth','pulse',250,.6),'pet.grumble':item(null,'negative',400),'pet.queasy':item(null,null,500)
});
const GAMES=new Set(['boxes','shelves','tunnels','food','grooming','litter','yarn','search','pet']);
const MATERIAL_ALIASES=Object.freeze({yarn:'wool',bowl:'ceramic',brush:'scratch',ribbon:'cloth',paper:'cardboard'});
const RECIPES=Object.freeze({
 wood:{kind:'tone',wave:'triangle',frequency:185,end:95,duration:.075,peak:.15,attack:.004},
 cardboard:{kind:'noise',filter:'lowpass',frequency:1000,q:.6,duration:.125,peak:.42,attack:.009},
 cloth:{kind:'noise',filter:'lowpass',frequency:680,q:.5,duration:.125,peak:.48,attack:.012},
 wool:{kind:'noise',filter:'lowpass',frequency:460,q:.5,duration:.105,peak:.6,attack:.014},
 ceramic:{kind:'tone',wave:'sine',frequency:720,end:435,duration:.105,peak:.09,attack:.004},
 water:{kind:'noise',filter:'bandpass',frequency:850,q:.65,duration:.18,peak:.34,attack:.014},
 sand:{kind:'noise',filter:'bandpass',frequency:1450,q:.55,duration:.145,peak:.32,attack:.012},
 scratch:{kind:'noise',filter:'bandpass',frequency:1150,q:.5,duration:.17,peak:.33,attack:.01},
 success:{kind:'tone',wave:'sine',frequency:440,end:554.37,duration:.28,peak:.075,attack:.02}
});
const finite=(value,min=0,max=1)=>typeof value==='number'&&Number.isFinite(value)&&value>=min&&value<=max;
const snapshot=value=>Object.freeze({...value});

export function createActionFeedback({gameId,scene,isBlocked=()=>false}){
 if(!GAMES.has(gameId)||!scene?.ownerDocument)throw new TypeError('A known Corio game and scene are required');
 const doc=scene.ownerDocument,win=doc.defaultView,key='corio-action-audio-v1:'+gameId;
 const voiceKey='corio-cat-voice-v1',voiceVolumeKey='corio-cat-voice-volume-v1';
 let enabled=true,volume=.3,voiceEnabled=true,voiceVolume=.38,unlocked=false,disposed=false;
 let context=null,master=null,noise=null,resuming=null,focused=doc.hasFocus?.()??true,gamePaused=false,platformPaused=false;
 let serial=0,epoch=0,lastEvent=null,lastMaterial=null;
 const counters={emits:0,starts:0,stops:0,ended:0,visualStarts:0,visualStops:0,blocked:0,muted:0,cooldown:0,polyphonyDrops:0,beforeGesture:0,notReady:0,unknown:0,errors:0};
 const voices=new Map(),visuals=new Set(),lastAudio=new Map(),lastVisual=new Map(),listeners=[];
 const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');
 try{const raw=win.localStorage.getItem(key),stored=JSON.parse(raw);if(stored&&typeof stored==='object'){if(typeof stored.enabled==='boolean')enabled=stored.enabled;if(finite(stored.volume))volume=stored.volume;}else if(raw===null&&gameId==='litter')enabled=win.localStorage.getItem('corio-litter-sfx-v1')!=='off';}catch{}
 try{voiceEnabled=win.localStorage.getItem(voiceKey)!=='off';const stored=win.localStorage.getItem(voiceVolumeKey);if(stored!==null&&finite(Number(stored)))voiceVolume=Number(stored);}catch{}
 const on=(target,type,listener,options)=>{target.addEventListener(type,listener,options);listeners.push(()=>target.removeEventListener(type,listener,options));};
 const now=()=>win.performance.now();
 const guard=()=>{try{return !!isBlocked();}catch{return true;}};
 const blocked=()=>disposed||!focused||doc.hidden||gamePaused||platformPaused||guard();
 const dialogBlocked=()=>[...doc.querySelectorAll('dialog[open]')].some(dialog=>dialog.id!=='win'&&dialog.dataset?.actionResult!=='true');
 const voiceState=()=>snapshot({enabled:voiceEnabled,volume:voiceVolume});
 function state(){return Object.freeze({gameId,settings:snapshot({enabled,volume,voiceEnabled,voiceVolume}),voice:voiceState(),enabled,volume,unlocked,disposed,contextState:context?.state||'not-started',active:voices.size,activeVisuals:visuals.size,pending:0,lastEvent,lastMaterial,...counters});}
 const debug=()=>state();
 Object.defineProperty(win,'__corioFeedback',{value:debug,writable:false,configurable:true});
 Object.defineProperty(win,'__corioActionVoice',{value:voiceState,writable:false,configurable:true});
 function dispatch(type,detail){win.dispatchEvent(new win.CustomEvent(type,{detail}));}
 function save(){try{win.localStorage.setItem(key,JSON.stringify({enabled,volume}));}catch{}}
 function saveVoice(){try{win.localStorage.setItem(voiceKey,voiceEnabled?'on':'off');win.localStorage.setItem(voiceVolumeKey,String(voiceVolume));}catch{}dispatch('corio:action-voice-change',voiceState());}
 function resumeContext(){
  if(!context||context.state==='running'||resuming||disposed)return;
  const token=epoch;let work;
  try{work=Promise.resolve(context.resume());}catch{counters.errors++;return;}
  resuming=work;work.catch(()=>{if(!disposed&&token===epoch)counters.errors++;}).finally(()=>{if(resuming===work)resuming=null;});
 }
 function unlock(event){
  if(!event.isTrusted||disposed||event.type==='pointerdown'&&(event.isPrimary===false||event.button!==0)||event.type==='keydown'&&(event.ctrlKey||event.metaKey||event.altKey||event.repeat))return;
  unlocked=true;focused=true;
  if(!enabled||volume===0)return;
  try{
   if(!context){
    const AudioContext=win.AudioContext||win.webkitAudioContext;if(!AudioContext)return;
    context=new AudioContext();master=context.createGain();master.gain.value=volume;master.connect(context.destination);
    noise=context.createBuffer(1,context.sampleRate,context.sampleRate);const data=noise.getChannelData(0);let seed=776;
    for(let i=0;i<data.length;i++){seed=(1664525*seed+1013904223)>>>0;data[i]=seed/2147483648-1;}
   }
   if(!gamePaused&&!platformPaused&&!doc.hidden)resumeContext();
  }catch{counters.errors++;}
 }
 function finishVoice(record,stopped=false){
  if(!voices.has(record.id))return;voices.delete(record.id);
  if(stopped){counters.stops++;try{record.source.stop();}catch{}}
  else counters.ended++;
  for(const node of record.nodes)try{node.disconnect();}catch{}
 }
 function removeVisual(record){
  if(!visuals.has(record))return;visuals.delete(record);counters.visualStops++;
  if(record.timer!==null)win.clearTimeout(record.timer);
  try{record.animation?.cancel();}catch{}record.element.remove();
 }
 function clearEffects(){
  epoch++;for(const voice of [...voices.values()])finishVoice(voice,true);for(const visual of [...visuals])removeVisual(visual);
 }
 function cancel(){
  clearEffects();dispatch('corio:action-feedback-cancel',snapshot({gameId}));
 }
 function suspend(){cancel();if(context&&context.state!=='closed')try{Promise.resolve(context.suspend()).catch(()=>{});}catch{}}
 function prepareContext(){if(unlocked&&enabled&&volume>0&&focused&&!doc.hidden&&!gamePaused&&!platformPaused&&!dialogBlocked()&&!guard())resumeContext();}
 function reconcile(){
  // #win is a result presentation: an already-started finite completion tail
  // may finish. Real pause/settings/mode dialogs cancel without a sound queue.
  if(disposed)return;if(!focused||doc.hidden||gamePaused||platformPaused||dialogBlocked())suspend();else prepareContext();
 }
 function play(material,definition,name,time){
  if(!enabled||volume===0){counters.muted++;return 'muted';}
  if(!unlocked){counters.beforeGesture++;return 'gesture';}
  if(!context||context.state!=='running'){resumeContext();counters.notReady++;return 'not-ready';}
  if(time-(lastAudio.get(name)??-Infinity)<definition.cooldown){counters.cooldown++;return 'cooldown';}
  if(voices.size>=4){counters.polyphonyDrops++;return 'polyphony';}
  const recipe=RECIPES[material],start=context.currentTime,duration=recipe.duration;let source,gain,filter,record;
  try{
   gain=context.createGain();gain.gain.setValueAtTime(.0001,start);gain.gain.linearRampToValueAtTime(recipe.peak*definition.level,start+recipe.attack);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);gain.connect(master);
   if(recipe.kind==='tone'){
    source=context.createOscillator();source.type=recipe.wave;source.frequency.setValueAtTime(recipe.frequency,start);source.frequency.exponentialRampToValueAtTime(recipe.end,start+duration*.85);source.connect(gain);
   }else{
    source=context.createBufferSource();source.buffer=noise;filter=context.createBiquadFilter();filter.type=recipe.filter;filter.frequency.setValueAtTime(recipe.frequency,start);filter.Q.value=recipe.q;source.connect(filter);filter.connect(gain);
   }
   record={id:++serial,source,nodes:[source,gain,...(filter?[filter]:[])]};voices.set(record.id,record);source.onended=()=>finishVoice(record);
   if(recipe.kind==='noise')source.start(start,(counters.starts*.173)%.65,duration);else source.start(start);
   source.stop(start+duration);counters.starts++;lastAudio.set(name,time);lastMaterial=material;return 'played';
  }catch{if(record)finishVoice(record,true);else for(const node of [source,gain,filter])try{node?.disconnect();}catch{}counters.errors++;return 'error';}
 }
 function mark(kind,target,point,name,time){
  if(!kind)return false;
  if(time-(lastVisual.get(name)??-Infinity)<75)return false;
  let x,y,size=28;
  if(point){x=point.x??point.clientX;y=point.y??point.clientY;}
  else if(target?.isConnected&&typeof target.getBoundingClientRect==='function'){
   const rect=target.getBoundingClientRect();if(!rect.width||!rect.height)return false;x=rect.left+rect.width/2;y=rect.top+rect.height/2;size=Math.max(20,Math.min(52,Math.min(rect.width,rect.height)*.7));
  }else return false;
  if(!finite(x,0,win.innerWidth)||!finite(y,0,win.innerHeight))return false;
  while(visuals.size>=6)removeVisual(visuals.values().next().value);
  const element=doc.createElement('span');element.className='corio-action-mark corio-action-'+kind;element.setAttribute('aria-hidden','true');element.dataset.actionEvent=name;
  element.style.left=x+'px';element.style.top=y+'px';element.style.width=size+'px';element.style.height=size+'px';doc.body.append(element);
  const record={element,animation:null,timer:null};visuals.add(record);counters.visualStarts++;lastVisual.set(name,time);
  const frames=reduced.matches?[{opacity:.55},{opacity:.55,offset:.65},{opacity:0}]:[{opacity:.7,transform:'translate(-50%,-50%) scale(.82)'},{opacity:.28,offset:.65,transform:'translate(-50%,-50%) scale(1.1)'},{opacity:0,transform:'translate(-50%,-50%) scale(1.16)'}];
  if(typeof element.animate==='function')try{record.animation=element.animate(frames,{duration:reduced.matches?160:280,iterations:1,easing:'ease-out',fill:'forwards'});record.animation.finished.then(()=>removeVisual(record)).catch(()=>removeVisual(record));}catch{}
  if(!record.animation)record.timer=win.setTimeout(()=>removeVisual(record),reduced.matches?160:230);
  return true;
 }
 function emit(event,{target=null,material=null,visual=null,point=null}={}){
  if(disposed)return snapshot({sound:false,visual:false,reason:'disposed'});
  counters.emits++;lastEvent=typeof event==='string'?event.slice(0,80):null;
  if(typeof event!=='string'||!Object.hasOwn(ACTION_EVENTS,event)||!event.startsWith(gameId+'.')){counters.unknown++;return snapshot({sound:false,visual:false,reason:'unknown'});}
  if(blocked()||dialogBlocked()){counters.blocked++;return snapshot({sound:false,visual:false,reason:'blocked'});}
  const definition=ACTION_EVENTS[event],time=now(),override=MATERIAL_ALIASES[material]||material;
  const sound=definition.sound?(Object.hasOwn(RECIPES,override)?override:definition.sound):null;
  const kind=visual===false||visual==='none'?null:visual===null?definition.visual:['ring','pulse','negative','success'].includes(visual)?visual:definition.visual;
  const shown=mark(kind,target,point,event,time),reason=sound?play(sound,definition,event,time):'silent';
  return snapshot({sound:reason==='played',visual:shown,reason});
 }
 const panel=doc.createElement('section');panel.className='corio-action-audio';panel.dataset.actionAudio=gameId;
 const heading=doc.createElement('p');heading.className='corio-action-audio-title';heading.textContent='Звуки игры';panel.append(heading);
 function toggle(text,name,checked,change){
  const label=doc.createElement('label'),input=doc.createElement('input');label.className='corio-action-audio-toggle';input.type='checkbox';input.checked=checked;input.dataset[name]='';on(input,'change',event=>change(input.checked,event));label.append(input,text);panel.append(label);return input;
 }
 function range(text,name,value,change){
  const label=doc.createElement('label'),span=doc.createElement('span'),input=doc.createElement('input');label.className='corio-action-audio-range';span.textContent=text;input.type='range';input.min='0';input.max='100';input.step='1';input.value=String(Math.round(value*100));input.dataset[name]='';input.setAttribute('aria-label',text);on(input,'input',event=>change(Math.max(0,Math.min(1,Number(input.value)/100)),event));label.append(span,input);panel.append(label);return input;
 }
 const effectsToggle=toggle('Звуки действий','actionEffectsEnabled',enabled,(value,event)=>{enabled=value;save();if(!enabled)clearEffects();else unlock(event);});
 const effectsRange=range('Громкость действий','actionEffectsVolume',volume,(value,event)=>{volume=value;save();if(master)master.gain.value=volume;if(volume===0)clearEffects();else unlock(event);});
 const voiceToggle=toggle('Голос кота','actionVoiceEnabled',voiceEnabled,value=>{voiceEnabled=value;saveVoice();});voiceToggle.dataset.catVoice='';
 const voiceRange=range('Громкость голоса','actionVoiceVolume',voiceVolume,value=>{voiceVolume=value;saveVoice();});
 const note=doc.createElement('small');note.textContent='Мурчание настраивается отдельно в атмосфере.';panel.append(note);let panelHost=panel;if(gameId==='boxes'){panelHost=doc.createElement('details');panelHost.className='corio-action-fold';const summary=doc.createElement('summary');summary.textContent='Звуки действий и голос кота';panelHost.append(summary,panel);}doc.querySelector('[data-music]')?.append(panelHost);
 on(doc,'pointerdown',unlock,{capture:true,passive:true});on(doc,'keydown',unlock,{capture:true});
 on(doc,'visibilitychange',reconcile);on(win,'blur',()=>{focused=false;suspend();});on(win,'focus',()=>{focused=true;prepareContext();});
 on(win,'pagehide',suspend);on(win,'corio:pause',()=>{gamePaused=true;suspend();});on(win,'corio:resume',()=>{gamePaused=false;prepareContext();});
 on(win,'corio:platform-pause',()=>{platformPaused=true;suspend();});on(win,'corio:platform-resume',()=>{platformPaused=false;prepareContext();});
 on(reduced,'change',()=>{for(const visual of [...visuals])removeVisual(visual);});
 on(win,'storage',event=>{
  if(event.key===voiceKey||event.key===voiceVolumeKey){
   try{voiceEnabled=win.localStorage.getItem(voiceKey)!=='off';const raw=win.localStorage.getItem(voiceVolumeKey);voiceVolume=raw!==null&&finite(Number(raw))?Number(raw):.38;}catch{}
   voiceToggle.checked=voiceEnabled;voiceRange.value=String(Math.round(voiceVolume*100));dispatch('corio:action-voice-change',voiceState());
  }
  if(event.key===key)try{const stored=JSON.parse(win.localStorage.getItem(key));if(typeof stored?.enabled==='boolean')enabled=stored.enabled;if(finite(stored?.volume))volume=stored.volume;effectsToggle.checked=enabled;effectsRange.value=String(Math.round(volume*100));if(master)master.gain.value=volume;if(!enabled||volume===0)clearEffects();}catch{}
 });
 const observer=new win.MutationObserver(reconcile);observer.observe(doc.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['open']});
 function dispose(){
  if(disposed)return;cancel();disposed=true;observer.disconnect();for(const remove of listeners)remove();panelHost.remove();
  if(context)try{Promise.resolve(context.close()).catch(()=>{});}catch{}
  if(win.__corioFeedback===debug)delete win.__corioFeedback;if(win.__corioActionVoice===voiceState)delete win.__corioActionVoice;
 }
 return{emit,cancel,dispose,state};
}
