import {PET_LIFE_KEY,PET_LIFE_MEMORIES,advancePetLife,petLifeAction} from '../mini/pet-continuous.mjs?v=0.23.2';
import {readPetHome,readPetBudget,PET_BUDGET_KEY} from './save.mjs?v=0.23.2';
import {petRoom,petNeeds,petSceneKey,petWish} from './view.mjs?v=0.23.2';
import {createPetLife} from './life.mjs?v=0.23.2';
import {createPetApproach} from './motion.mjs?v=0.23.2';
import {createModeController} from '../modes.mjs?v=0.23.2';
import {setupFocusUI} from '../mini/focus.mjs?v=0.23.2';

const $=selector=>document.querySelector(selector),scene=$('#scene');
// Preserve the previously requested optional limited mode; it never resets the cat.
const WITH_LIMITS=true;
const OWNER_KEY='corio-pet-active-tab-v1',ownerId=crypto.randomUUID();
let storageOK=true,canCoordinate=true,loaded,budget;
let lastStoredRaw=null;
try{
 lastStoredRaw=localStorage.getItem(PET_LIFE_KEY);
 loaded=readPetHome(lastStoredRaw,localStorage.getItem('corio-pet-care-v2'));
 budget=loaded.budget||readPetBudget(localStorage.getItem(PET_BUDGET_KEY));
}catch{storageOK=false;loaded=readPetHome(null);budget=readPetBudget(null);}
let state=loaded.state,paused=false,platformPaused=false,focused=document.hasFocus(),ownsCat=false;
let modes=null,life=null,drag=null,sceneKey='',timer=null,lastClock=null,lastSave=0,budgetReady=false,assetsReady=false;
let approach=null;
const portrait=()=>innerWidth<=650&&innerHeight>innerWidth;
const blocked=()=>!assetsReady||!ownsCat||paused||platformPaused||!focused||document.hidden||!!document.querySelector('[data-game-panel][open]')||!!modes?.isModalOpen();
function setText(selector,value){const node=$(selector);if(node&&node.textContent!==value)node.textContent=value;}
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
 try{const raw=JSON.stringify({version:3,cat:state,budget});if(raw!==lastStoredRaw)localStorage.setItem(PET_LIFE_KEY,raw);lastStoredRaw=raw;storageOK=true;lastSave=now;}catch{storageOK=false;}
 setText('#save-note',storageOK?'Кориолан останется здесь. Пока игра закрыта, потребности не ухудшаются.':'Браузер не разрешил сохранение. Сейчас можно продолжить играть.');
}
function fitTargets(){
 const svg=scene.querySelector('.pet-painting');if(!svg)return;
 const box=svg.getBoundingClientRect(),v=svg.viewBox.baseVal,scale=Math.min(box.width/v.width,box.height/v.height);
 if(!scale)return;
 for(const hit of svg.querySelectorAll('.pet-object-hit')){
  const original=hit.dataset.original?JSON.parse(hit.dataset.original):['x','y','width','height'].map(a=>+hit.getAttribute(a));
  hit.dataset.original=JSON.stringify(original);
  const [x,y,w,h]=original,width=Math.max(w,38/scale),height=Math.max(h,38/scale);
  for(const [key,value]of Object.entries({x:x+(w-width)/2,y:y+(h-height)/2,width,height})){const text=String(value);if(hit.getAttribute(key)!==text)hit.setAttribute(key,text);}
 }
}
function render(force=false){
 const nextKey=petSceneKey(state,portrait());
 if(!drag&&(force||nextKey!==sceneKey)){
  const from=approach?.anchor();approach?.stop();
  const target=document.activeElement?.closest('[data-care],.pet-character');
  const focus=target?.dataset.care,catFocused=target?.classList.contains('pet-character');
  scene.innerHTML=petRoom(state,portrait());sceneKey=nextKey;fitTargets();
  if(!force)approach?.move(from);
  if(focus)scene.querySelector(`[data-care="${focus}"]`)?.focus({preventScroll:true});else if(catFocused)scene.querySelector('.pet-character')?.focus({preventScroll:true});
 }
 setText('.pet-wish',petWish(state));setText('#status',state.message);
 setText('#pet-mood',state.asleep?'Дремлет':state.needs[2]<35?'Хочет внимания':state.needs[2]>75?'Доволен':'Спокоен');
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
function startClock(){if(timer!==null||blocked())return;lastClock=performance.now();timer=setTimeout(tick,1000);}
function tick(){
 timer=null;if(!isOwner()||blocked()){lastClock=null;life?.sync();return;}
 const now=performance.now(),elapsed=lastClock===null?0:Math.max(0,Math.min(2,(now-lastClock)/1000));lastClock=now;
 const before=petSceneKey(state,portrait());state=advancePetLife(state,elapsed);render();save(before!==petSceneKey(state,portrait()));
 timer=setTimeout(tick,1000);
}
function sync(){
 cancelDrag();life?.sync();if(blocked()){approach?.stop();stopClock();save(true);}else startClock();
 window.dispatchEvent(new Event(blocked()?'corio:pause':'corio:resume'));
}
function act(type){
 if(!ownsCat&&assetsReady&&!document.hidden&&!paused&&!platformPaused){focused=true;takeCat();sync();}
 if(blocked())return;
 if(type!=='light'&&WITH_LIMITS&&!modes.guard())return;
 const before=state,next=petLifeAction(before,{type});
 if(next===before){setText('#status',type==='food'?'Миска уже полная.':type==='water'?'В поилке уже есть вода.':state.message);return;}
 const accepted=Object.keys(next.care).some(key=>next.care[key]>before.care[key]);
 state=next;if(accepted&&WITH_LIMITS)budget.used++;render();save(true);
 if(type==='pet'&&accepted)life.greet();if(accepted)modes?.changed();
}
$('#pet-needs').innerHTML=petNeeds(state);
if(WITH_LIMITS){
 modes=createModeController({gameId:'pet',host:$('[data-modes]'),getMoves:()=>budget.used,isWon:()=>false,onBlock:()=>{cancelDrag();life?.stop();},onStateChange:({bonus})=>{if(budgetReady){budget.bonus=bonus;save(true);}}});
 modes.newAttempt(12,{initialBonus:budget.bonus});budgetReady=true;
}else{$('[data-mode-button]').hidden=true;$('#mode-settings').remove();}
window.__corioModes=()=>modes?.state()||{mode:'calm',remaining:null};
window.__pet=()=>structuredClone(state);window.__mini=window.__pet;
window.__petUI=()=>({paused,platformPaused,focused,ownsCat,ready:assetsReady,blocked:blocked(),storageOK,drag:!!drag,clockRunning:timer!==null,budget:structuredClone(budget),migrated:loaded.migrated});
life=createPetLife({scene,blocked});approach=createPetApproach({scene,blocked});setupFocusUI({unit:'действий'});new ResizeObserver(fitTargets).observe(scene);
scene.addEventListener('click',event=>{
 const object=event.target.closest('[data-care]');
 if(object){if(object.dataset.care!=='play'||event.detail===0)act(object.dataset.care);return;}
 if(event.target.closest('.pet-character'))act('pet');
});
scene.addEventListener('keydown',event=>{
 const target=event.target.closest('[data-care],.pet-character');
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
window.addEventListener('pagehide',()=>{approach.stop();stopClock();save(true);try{if(localStorage.getItem(OWNER_KEY)===ownerId)localStorage.removeItem(OWNER_KEY);}catch{}ownsCat=false;life.stop();});
window.addEventListener('pageshow',()=>{focused=document.hasFocus();if(assetsReady&&focused&&!document.hidden){takeCat();sync();}});
window.addEventListener('resize',()=>{cancelDrag();render(true);});
document.addEventListener('keydown',event=>{if(event.repeat&&['Enter',' '].includes(event.key)){event.preventDefault();return;}if(event.key==='Escape'&&drag){cancelDrag();render();}},{capture:true});
render(true);save(true);
const initialImages=[...new Set([...scene.querySelectorAll('image')].map(node=>node.href.baseVal)),new URL('../assets/cat-walk-right-v1.png',import.meta.url).href];
Promise.all(initialImages.map(src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(new Error(src));image.src=src;}))).then(()=>{assetsReady=true;takeCat();save(true);sync();}).catch(()=>{setText('#status','Не удалось загрузить комнату. Попробуй обновить страницу.');});
