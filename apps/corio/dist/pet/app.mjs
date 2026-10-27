import {PET_HOME_KEY as PET_LIFE_KEY,PET_HOME_MEMORIES as PET_LIFE_MEMORIES,advancePetHome as advancePetLife,petHomeAction as petLifeAction,petHomeAvailable} from '../mini/pet-home.mjs?v=0.25.0';
import {readPetHome,readPetBudget,PET_BUDGET_KEY} from './save-v4.mjs?v=0.25.0';
import {petRoom,petNeeds,petSceneKey,petWish,petTeaseTarget} from './view.mjs?v=0.25.0';
import {createPetLife} from './life.mjs?v=0.25.0';
import {createPetApproach} from './motion.mjs?v=0.25.0';
import {createPetPlay} from './play.mjs?v=0.25.0';
import {createPetInteractions} from './interactions.mjs?v=0.25.0';
import {createModeController} from '../modes.mjs?v=0.25.0';
import {setupFocusUI} from '../mini/focus.mjs?v=0.25.0';

const $=selector=>document.querySelector(selector),scene=$('#scene');
// Preserve the previously requested optional limited mode; it never resets the cat.
const WITH_LIMITS=true;
const OWNER_KEY='corio-pet-active-tab-v1',ownerId=crypto.randomUUID();
let storageOK=true,canCoordinate=true,loaded,budget;
let lastStoredRaw=null;
try{
 lastStoredRaw=localStorage.getItem(PET_LIFE_KEY);
 loaded=readPetHome(lastStoredRaw,localStorage.getItem('corio-pet-life-v3'),localStorage.getItem('corio-pet-care-v2'));
 budget=loaded.budget||readPetBudget(localStorage.getItem(PET_BUDGET_KEY));
}catch{storageOK=false;loaded=readPetHome(null);budget=readPetBudget(null);}
let state=loaded.state,paused=false,platformPaused=false,focused=document.hasFocus(),ownsCat=false;
let modes=null,life=null,drag=null,sceneKey='',timer=null,lastClock=null,lastSave=0,budgetReady=false,assetsReady=false;
let approach=null,play=null,interactions=null,currentTool=null,roomView='room',teaseTarget=null;
const portrait=()=>innerWidth<=650&&innerHeight>innerWidth;
const blocked=()=>!assetsReady||!ownsCat||paused||platformPaused||!focused||document.hidden||!!document.querySelector('[data-game-panel][open]')||!!modes?.isModalOpen();
function setText(selector,value){const node=$(selector);if(node&&node.textContent!==value)node.textContent=value;}
function setHidden(selector,value){const node=$(selector);if(node.hidden!==value)node.hidden=value;}
function isOwner(){if(!canCoordinate){ownsCat=true;return true;}try{ownsCat=localStorage.getItem(OWNER_KEY)===ownerId;}catch{ownsCat=true;}return ownsCat;}
function readLatest(){
 if(!canCoordinate)return;
 try{
  const raw=localStorage.getItem(PET_LIFE_KEY);
  if(!raw||raw===lastStoredRaw)return;
  const incoming=readPetHome(raw);if(incoming.recovered)return;
  state=incoming.state;lastStoredRaw=raw;lastClock=null;sceneKey='';
  if(incoming.budget){budget=incoming.budget;if(modes){budgetReady=false;modes.newAttempt(12,{initialBonus:budget.bonus});budgetReady=true;}}
  if(assetsReady&&!document.hidden)render();
 }catch{storageOK=false;}
}
function takeCat(){
 if(!assetsReady||document.hidden||!focused)return false;
 readLatest();try{localStorage.setItem(OWNER_KEY,ownerId);ownsCat=true;}catch{storageOK=false;canCoordinate=false;ownsCat=true;}
 lastClock=null;render();return true;
}
function save(force=false){
 if(!isOwner())return;
 if(!canCoordinate){storageOK=false;setText('#save-note','Браузер не разрешил сохранение. Сейчас можно продолжить играть.');return;}
 const now=performance.now();if(!force&&now-lastSave<5000)return;
 try{const raw=JSON.stringify({version:4,cat:state,budget});if(raw!==lastStoredRaw)localStorage.setItem(PET_LIFE_KEY,raw);lastStoredRaw=raw;storageOK=true;lastSave=now;}catch{storageOK=false;}
 setText('#save-note',storageOK?'Кориолан останется здесь. Пока игра закрыта, потребности не ухудшаются.':'Браузер не разрешил сохранение. Сейчас можно продолжить играть.');
}
function fitTargets(){
 const svg=scene.querySelector('.pet-painting');if(!svg)return;
 const box=svg.getBoundingClientRect(),v=svg.viewBox.baseVal,scale=Math.min(box.width/v.width,box.height/v.height);
 if(!scale)return;
 for(const hit of svg.querySelectorAll('.pet-object-hit,.pet-gesture-zone,.pet-clump-hit')){
  const original=hit.dataset.original?JSON.parse(hit.dataset.original):['x','y','width','height'].map(a=>+hit.getAttribute(a));
  hit.dataset.original=JSON.stringify(original);
  const [x,y,w,h]=original,min=hit.dataset.petZone==='body'?64:hit.dataset.petZone==='ear'?44:38,width=Math.max(w,min/scale),height=Math.max(h,(hit.dataset.petZone==='body'?48:min)/scale);
  for(const [key,value]of Object.entries({x:x+(w-width)/2,y:y+(h-height)/2,width,height})){const text=String(value);if(hit.getAttribute(key)!==text)hit.setAttribute(key,text);}
 }
}
function render(force=false){
 if(scene.dataset.petTool!==(currentTool||''))scene.dataset.petTool=currentTool||'';
 const nextKey=petSceneKey(state,portrait())+'|'+JSON.stringify([currentTool,roomView,teaseTarget]);
 if(!drag&&(force||nextKey!==sceneKey)){
  interactions?.cancel();
  play?.stop();
  const from=approach?.anchor();approach?.stop();
  const clumpFocus=document.activeElement?.closest('[data-pet-clump]')?.dataset.petClump;
  const target=document.activeElement?.closest('[data-care],.pet-character');
  const focus=target?.dataset.care,catFocused=target?.classList.contains('pet-character');
  scene.innerHTML=petRoom(state,portrait(),{tool:currentTool,roomView,teaseTarget});sceneKey=nextKey;fitTargets();
  if(!force)approach?.move(from);
  if(clumpFocus!==undefined)(scene.querySelector(`[data-pet-clump="${clumpFocus}"]`)||scene.querySelector('[data-pet-clump]')||$('#room-back')).focus({preventScroll:true});
  else if(focus)scene.querySelector(`[data-care="${focus}"]`)?.focus({preventScroll:true});else if(catFocused)scene.querySelector('.pet-character')?.focus({preventScroll:true});
 }
 play?.sync(state);
 interactions?.sync();
 const roomWish=roomView==='litter'?(state.activity==='litter'?'Кориолан пользуется лотком. Подождём.':state.litter.slots.some(Boolean)?'Подцепи комочки лопаткой.':'Чистый песок. Всё готово.'):petWish(state);
 setText('.pet-wish',roomWish);setText('#status',state.message);
 setText('#pet-mood',state.queasyLeft>0?'Нужна передышка':state.asleep?'Дремлет':state.handsCooldown>0?'Хочет побыть один':state.activity==='scratch'?'Точит когти':state.activity==='brush'?'Подставляет спинку':state.activity==='tease'||state.activity==='play'?'Играет':state.needs[2]<35?'Хочет внимания':state.needs[2]>75?'Доволен':'Спокоен');
 for(const button of document.querySelectorAll('[data-activity]')){
  const kind=button.dataset.activity,type=kind==='scritch'?'pet':kind;
  const disabled=kind==='litter'?false:!petHomeAvailable(state,type);if(button.disabled!==disabled)button.disabled=disabled;
  const pressed=String(currentTool===kind);if(button.getAttribute('aria-pressed')!==pressed)button.setAttribute('aria-pressed',pressed);
  const title=button.disabled?(state.asleep?'Кориолан спит':state.handsCooldown>0&&['pet','brush'].includes(type)?'Дадим коту немного пространства':state.queasyLeft>0?'Пусть кот спокойно отдохнёт':'Кориолан сейчас занят'):'';if(button.title!==title)button.title=title;
 }
 const dirty=state.litter.slots.filter(Boolean).length;
 setText('#litter-status',dirty?`В лотке: ${dirty} ${dirty===1?'комочек':'комочка'}`:'Лоток чистый');
 setHidden('#workbar',!currentTool&&roomView==='room');setHidden('#room-back',roomView==='room');setHidden('#put-tool',!currentTool||roomView==='litter');
 const notes={brush:'Проведи щёточкой по спинке',scritch:'Немного почеши за ушком',tease:'Поводи бантиком перед котом',scoop:'Подцепи комочки лопаткой'};
 const activeNotes={brush:'Кориолан довольно подставляет спинку',pet:'Прищурился от удовольствия',tease:'Следит за бантиком и тянется лапой'};
 const toolNote=!currentTool?'':roomView==='litter'&&!dirty?'Чистый песок. Всё готово.':toolAvailable(currentTool)?notes[currentTool]:state.activity==='litter'?'Кориолан пользуется лотком. Подождём.':state.asleep?'Кот спит. Можно вернуться к нему позже.':state.handsCooldown>0?'Сейчас коту хочется пространства.':activeNotes[state.activity]||'Кориолан сейчас занят. Немного подождём.';
 setText('#tool-note',toolNote);
 setText('#activity-note',state.activity==='idle'?'Выбери, чем займёмся.':state.activity==='sleep'?'Кориолан спит. Пока можно убрать лоток.':'Сейчас Кориолан занят. Вернись к нему — он скоро закончит.');
 const minutes=Math.floor(state.activeSeconds/60);
 setText('#together',minutes<1?'Только устроились':`Вместе ${minutes} мин`);
 setText('#pet-bond',state.affection<15?'Осваивается рядом с тобой':state.affection<50?'Всё чаще ищет твоего внимания':'Доверяет и чувствует себя дома');
 const light=$('#light');setText('#light',state.lamp==='dim'?'☼ Сделать светлее':'☾ Приглушить свет');const dim=String(state.lamp==='dim');if(light.getAttribute('aria-pressed')!==dim)light.setAttribute('aria-pressed',dim);
 for(const [i,value]of state.needs.entries()){
  const track=$(`[data-need="${i}"]`),label=['Сытость','Вода','Игра','Силы'][i];
  const transform=`scaleX(${Math.round(value)/100})`;if(track.firstElementChild.style.transform!==transform)track.firstElementChild.style.transform=transform;
  const aria=`${label}: ${Math.round(value)} из 100`;if(track.getAttribute('aria-label')!==aria)track.setAttribute('aria-label',aria);
 }
 const signature=state.memories.join(',');
 if($('#memory-list').dataset.memories!==signature){
  $('#memory-list').dataset.memories=signature;
  $('#memory-list').innerHTML=state.memories.length?state.memories.map(id=>`<li>${PET_LIFE_MEMORIES[id]}</li>`).join(''):'<li class="memory-empty">Здесь останутся заметки о ваших вечерах с котом.</li>';
 }
}
function cancelDrag(){
 const current=drag;drag=null;
 if(current){current.toy?.removeAttribute('transform');if(scene.hasPointerCapture(current.pointer))try{scene.releasePointerCapture(current.pointer);}catch{}}
}
function stopClock(){clearTimeout(timer);timer=null;lastClock=null;}
function startClock(){if(timer!==null||blocked()||interactions?.isHolding())return;lastClock=performance.now();timer=setTimeout(tick,1000);}
function tick(){
 timer=null;if(!isOwner()||blocked()||interactions?.isHolding()){lastClock=null;life?.sync();return;}
 const now=performance.now(),elapsed=lastClock===null?0:Math.max(0,Math.min(2,(now-lastClock)/1000));lastClock=now;
 const before=petSceneKey(state,portrait());state=advancePetLife(state,elapsed);render();save(before!==petSceneKey(state,portrait()));
 timer=setTimeout(tick,1000);
}
function sync(){
 life?.sync();if(blocked()){cancelDrag();interactions?.cancel();play?.stop();approach?.stop();stopClock();save(true);}else{startClock();play?.sync(state);}
 window.dispatchEvent(new Event(blocked()?'corio:pause':'corio:resume'));
}
function act(type,extra={}){
 if(!ownsCat&&assetsReady&&!document.hidden&&!paused&&!platformPaused){focused=true;takeCat();sync();}
 if(blocked())return;
 if(type!=='light'&&WITH_LIMITS&&!modes.guard())return;
 const before=state,next=petLifeAction(before,{...extra,type});
 if(next===before){setText('#status',type==='food'?'Миска уже полная.':type==='water'?'В поилке уже есть вода.':state.message);return;}
 const accepted=Object.keys(next.care).some(key=>next.care[key]>before.care[key]);
 state=next;if(accepted&&WITH_LIMITS)budget.used++;render();save(true);
 if(type==='pet'&&accepted)life.greet();if(accepted)modes?.changed();
}
function toolAvailable(tool){return petHomeAvailable(state,tool==='scritch'?'pet':tool);}
function chooseActivity(kind){
 const dialog=$('#activity-settings');if(dialog.open)dialog.close();
 interactions?.cancel();cancelDrag();
 if(kind==='litter'){currentTool='scoop';roomView='litter';}
 else if(['brush','scritch','tease'].includes(kind)){if(!toolAvailable(kind))return;currentTool=kind;roomView='room';}
 else{currentTool=null;roomView='room';render(true);act(kind);return;}
 render(true);scene.focus({preventScroll:true});
}
$('#pet-needs').innerHTML=petNeeds(state);
if(WITH_LIMITS){
 modes=createModeController({gameId:'pet',host:$('[data-modes]'),getMoves:()=>budget.used,isWon:()=>false,onBlock:()=>{cancelDrag();life?.stop();},onStateChange:({bonus})=>{if(budgetReady){budget.bonus=bonus;save(true);}}});
 modes.newAttempt(12,{initialBonus:budget.bonus});budgetReady=true;
}else{$('[data-mode-button]').hidden=true;$('#mode-settings').remove();}
window.__corioModes=()=>modes?.state()||{mode:'calm',remaining:null};
window.__pet=()=>structuredClone(state);window.__mini=window.__pet;
window.__petUI=()=>({paused,platformPaused,focused,ownsCat,ready:assetsReady,blocked:blocked(),storageOK,drag:!!drag,clockRunning:timer!==null,budget:structuredClone(budget),migrated:loaded.migrated,tool:currentTool,roomView,interaction:interactions?.state()});
life=createPetLife({scene,blocked});approach=createPetApproach({scene,blocked,onArrive:()=>play?.sync(state)});play=createPetPlay({scene,blocked:()=>blocked()||!!interactions?.isHolding(),isApproaching:()=>approach.isMoving()});setupFocusUI({unit:'действий'});new ResizeObserver(fitTargets).observe(scene);
interactions=createPetInteractions({scene,getTool:()=>currentTool,blocked,available:toolAvailable,onHoldChange:holding=>{scene.dataset.petHolding=String(holding);if(holding){stopClock();play.stop();}else if(!blocked())startClock();},onCommit:(tool,data)=>{if(tool==='tease')teaseTarget=petTeaseTarget(portrait(),data);act(tool==='scritch'?'pet':tool,data);}});
scene.addEventListener('focusout',event=>{if(!scene.contains(event.relatedTarget))interactions.cancel();});
for(const button of document.querySelectorAll('[data-activity]'))button.addEventListener('click',()=>chooseActivity(button.dataset.activity));
$('#room-back').addEventListener('click',()=>{interactions.cancel();currentTool=null;roomView='room';render(true);});
$('#put-tool').addEventListener('click',()=>{interactions.cancel();currentTool=null;render(true);});
scene.addEventListener('click',event=>{
 if(interactions.consumeClick())return;
 const object=event.target.closest('[data-care]');
 if(object){if(object.dataset.care==='litter'){chooseActivity('litter');return;}if(object.dataset.care!=='play'||event.detail===0)act(object.dataset.care);return;}
 if(!currentTool&&event.target.closest('.pet-character'))act('pet');
});
scene.addEventListener('keydown',event=>{
 if(currentTool)return;const target=event.target.closest('[data-care],.pet-character');
 if(target&&['Enter',' '].includes(event.key)){event.preventDefault();if(!event.repeat)target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
});
scene.addEventListener('pointerdown',event=>{
 if(!ownsCat&&assetsReady&&!document.hidden&&!paused&&!platformPaused&&event.target.closest('[data-care="play"]')){focused=true;takeCat();sync();}
 if(event.button!==0||event.isPrimary===false||blocked()||drag||!event.target.closest('[data-care="play"]'))return;
 drag={pointer:event.pointerId,startX:event.clientX,startY:event.clientY,toy:scene.querySelector('[data-pet-toy]')};scene.setPointerCapture(event.pointerId);
});
scene.addEventListener('pointermove',event=>{
 if(!drag||drag.pointer!==event.pointerId)return;if(blocked()){cancelDrag();return;}
 const svg=scene.querySelector('.pet-painting'),box=svg.getBoundingClientRect(),v=svg.viewBox.baseVal,scale=Math.min(box.width/v.width,box.height/v.height);
 drag.toy.setAttribute('transform',`translate(${Math.max(-110,Math.min(70,(event.clientX-drag.startX)/scale))} ${Math.max(-65,Math.min(65,(event.clientY-drag.startY)/scale))})`);
});
scene.addEventListener('pointerup',event=>{if(!drag||drag.pointer!==event.pointerId)return;cancelDrag();act('play');render();});
scene.addEventListener('pointercancel',()=>{cancelDrag();render();});scene.addEventListener('lostpointercapture',cancelDrag);
$('#light').addEventListener('click',()=>act('light'));
$('#pause').addEventListener('click',()=>{paused=true;$('#pause-dialog').showModal();sync();});
$('#resume').addEventListener('click',()=>{paused=false;$('#pause-dialog').close();sync();});
$('#pause-dialog').addEventListener('close',()=>{paused=false;sync();});
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('close',sync);
new MutationObserver(sync).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
window.addEventListener('corio:platform-pause',()=>{platformPaused=true;sync();});window.addEventListener('corio:platform-resume',()=>{platformPaused=false;sync();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&focused)takeCat();sync();});window.addEventListener('blur',()=>{focused=false;sync();});window.addEventListener('focus',()=>{focused=true;takeCat();sync();});
window.addEventListener('storage',event=>{if(event.key===OWNER_KEY){isOwner();if(!ownsCat)readLatest();sync();}else if(event.key===PET_LIFE_KEY&&!isOwner()){readLatest();life?.sync();}});
window.addEventListener('pagehide',()=>{interactions.cancel();play.stop();approach.stop();stopClock();save(true);try{if(localStorage.getItem(OWNER_KEY)===ownerId)localStorage.removeItem(OWNER_KEY);}catch{}ownsCat=false;life.stop();});
window.addEventListener('pageshow',()=>{focused=document.hasFocus();if(assetsReady&&focused&&!document.hidden){takeCat();sync();}});
window.addEventListener('resize',()=>{cancelDrag();render(true);});
document.addEventListener('keydown',event=>{if(event.repeat&&['Enter',' '].includes(event.key)){event.preventDefault();return;}if(event.key==='Escape'&&drag){cancelDrag();render();}},{capture:true});
render(true);save(true);
const initialImages=[...new Set([...scene.querySelectorAll('image')].map(node=>node.href.baseVal)),new URL('../assets/cat-walk-right-v1.png',import.meta.url).href];
Promise.all(initialImages.map(src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(new Error(src));image.src=src;}))).then(()=>{assetsReady=true;takeCat();save(true);sync();}).catch(()=>{setText('#status','Не удалось загрузить комнату. Попробуй обновить страницу.');});
