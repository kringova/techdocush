import {catFigure} from '../characters.mjs?v=0.8.0';
import {createModeController} from '../modes.mjs?v=0.8.0';
import {ITEMS,SHELF_LEVELS,createShelfGame,transfer,solveShelf} from './engine.mjs?v=0.8.0';
import {shelfArt} from './art.mjs?v=0.8.0';
import {setupFocusUI} from '../mini/focus.mjs?v=0.8.0';
const $=s=>document.querySelector(s),board=$('#shelves'),win=$('#win');
let modes=null,platformPaused=false,paused=false;
let state=createShelfGame(),selected=-1,history=[],drag=null,ghost=null,ignoreClickUntil=0;
let best=Array(SHELF_LEVELS.length).fill(null);
try{const saved=JSON.parse(localStorage.getItem('corio-shelves-v1'));if(Array.isArray(saved))best=best.map((_,i)=>Number.isInteger(saved[i])&&saved[i]>0?saved[i]:null);}catch{}
const settingsOpen=()=>!!document.querySelector('[data-game-panel][open]');
const blocked=()=>paused||platformPaused||settingsOpen()||win.open||modes?.isModalOpen();
function fit(){const scene=$('#scene'),width=Math.min(scene.clientWidth,scene.clientHeight*1.5);board.style.width=width+'px';board.style.height=width/1.5+'px';board.style.setProperty('--shelf-width',width*.33+'px');}
function render(){
  const level=SHELF_LEVELS[state.index];board.replaceChildren();board.style.setProperty('--capacity',level.capacity);
  state.shelves.forEach((items,index)=>{
    const shelf=document.createElement('section');shelf.className='shelf';shelf.dataset.shelf=index;shelf.dataset.label=`Полка ${index+1}`;shelf.tabIndex=0;shelf.setAttribute('role','button');shelf.setAttribute('aria-pressed',String(selected===index));shelf.setAttribute('aria-label',`Полка ${index+1}: ${items.length?items.map(i=>ITEMS[i].name).join(', '):'пусто'}. ${items.length?'Крайний справа: '+ITEMS[items.at(-1)].name:''}`);
    shelf.classList.toggle('selected',selected===index);shelf.classList.toggle('complete',items.length===level.capacity&&items.every(i=>i===items[0]));
    shelf.classList.toggle('can-place',selected>=0&&transfer(state,selected,index)!==state);
    shelf.innerHTML=shelfArt('shelf','shelf-wood')+`<span class="shelf-label">Полка ${index+1}</span>`;
    const slots=document.createElement('div');slots.className='slots';
    items.forEach((type,slot)=>{const cell=document.createElement('span');cell.className='slot'+(slot===items.length-1?' front':'');cell.setAttribute('aria-label',ITEMS[type].name);cell.innerHTML=shelfArt(type,'shelf-item');slots.append(cell);});shelf.append(slots);
    if(!items.length){const empty=document.createElement('span');empty.className='empty-mark';empty.textContent=selected>=0?'Можно сюда':'Свободная полка';shelf.append(empty);}
    board.append(shelf);
  });
  $('#moves').textContent=state.moves;$('#level-number').textContent=`${state.index+1} / ${SHELF_LEVELS.length}`;$('#level-name').textContent=level.name;$('#undo').disabled=!history.length;
  $('#goal').textContent='Собери на каждой полке один вид вещей';
  for(const button of $('#levels').children){button.setAttribute('aria-current',String(+button.dataset.level===state.index));button.classList.toggle('completed',best[+button.dataset.level]!==null);}fit();
}
function status(text){$('#status').textContent=text;}
function load(index){clearDrag();paused=false;platformPaused=false;if($('#pause-dialog').open)$('#pause-dialog').close();ignoreClickUntil=0;if(win.open)win.close();state=createShelfGame(index);modes?.newAttempt(solveShelf(index).length);selected=-1;history=[];render();status('Возьми крайний справа предмет, затем выбери полку для него.');window.dispatchEvent(new Event('corio:resume'));}
function finish(){
  best[state.index]=Math.min(best[state.index]??Infinity,state.moves);try{localStorage.setItem('corio-shelves-v1',JSON.stringify(best));}catch{}
  $('#win-title').textContent='Всё по полочкам';$('#win-copy').textContent=`Всего перестановок: ${state.moves}. Все вещи собраны по видам.`;$('#next').textContent=state.index===SHELF_LEVELS.length-1?'Начать с первой':'Следующая раскладка';win.showModal();
}
function put(from,to){
  if(blocked()||modes&&!modes.guard())return false;
  const next=transfer(state,from,to);
  if(next===state){status('Поставь рядом с таким же предметом или на свободную полку.');return false;}
  history.push(state);state=next;selected=-1;render();status('Предмет на новом месте.');modes?.changed();if(state.won)finish();return true;
}
function choose(index){
  if(state.won||blocked())return;
  if(selected===index){selected=-1;render();status('Выбор снят.');return;}
  if(selected<0){if(!state.shelves[index].length){status('Здесь свободно. Сначала выбери предмет.');return;}selected=index;render();status(`Выбрано: ${ITEMS[state.shelves[index].at(-1)].name.toLowerCase()}. Теперь выбери полку для него.`);}
  else put(selected,index);
}
function undo(){if(paused||platformPaused||settingsOpen()||!history.length)return;if(win.open)win.close();clearDrag();state=history.pop();selected=-1;render();status('Перестановка отменена.');modes?.changed();}
board.addEventListener('click',event=>{
  if(blocked()||performance.now()<ignoreClickUntil)return;
  const shelf=event.target.closest('[data-shelf]'),slot=event.target.closest('.slot');
  if(selected<0&&slot&&!slot.classList.contains('front')){shelf.classList.add('front-hint');status('Возьми крайний предмет справа — он крупнее и стоит на свету.');return;}
  if(shelf)choose(+shelf.dataset.shelf);
});
board.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){const shelf=event.target.closest('[data-shelf]');if(shelf){event.preventDefault();choose(+shelf.dataset.shelf);}}});
function clearDrag(){ghost?.remove();ghost=null;drag=null;}
board.addEventListener('pointerdown',event=>{
  const front=event.target.closest('.slot.front'),shelf=front?.closest('[data-shelf]');
  if(!shelf||blocked()||state.won||event.button!==0)return;
  drag={from:+shelf.dataset.shelf,x:event.clientX,y:event.clientY,pointer:event.pointerId,active:false};
});
board.addEventListener('pointermove',event=>{
  if(!drag||blocked()||event.pointerId!==drag.pointer)return;
  if(!drag.active&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>8){drag.active=true;board.setPointerCapture(event.pointerId);ghost=document.createElement('div');ghost.innerHTML=shelfArt(state.shelves[drag.from].at(-1),'shelf-item');ghost.className='drag-ghost';document.body.append(ghost);}
  if(drag.active){event.preventDefault();ghost.style.left=event.clientX+'px';ghost.style.top=event.clientY+'px';}
});
board.addEventListener('pointerup',event=>{
  if(!drag)return;const current=drag;
  if(current.active){ignoreClickUntil=performance.now()+250;const shelf=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-shelf]');if(shelf)put(current.from,+shelf.dataset.shelf);try{board.releasePointerCapture(event.pointerId);}catch{}}
  clearDrag();
});
board.addEventListener('pointercancel',clearDrag);window.addEventListener('blur',clearDrag);
function pause(){if(paused||platformPaused||win.open)return;clearDrag();paused=true;$('#pause-dialog').showModal();window.dispatchEvent(new Event('corio:pause'));}
function resume(){paused=false;if($('#pause-dialog').open)$('#pause-dialog').close();window.dispatchEvent(new Event('corio:resume'));}
$('#undo').addEventListener('click',undo);$('#restart').addEventListener('click',()=>load(state.index));$('#next').addEventListener('click',()=>load((state.index+1)%SHELF_LEVELS.length));$('#again').addEventListener('click',()=>load(state.index));$('#pause').addEventListener('click',pause);$('#resume').addEventListener('click',resume);$('#pause-dialog').addEventListener('cancel',resume);
win.addEventListener('cancel',event=>{event.preventDefault();});
document.addEventListener('keydown',event=>{if(paused||platformPaused||settingsOpen()||modes?.isModalOpen()||event.ctrlKey||event.metaKey||event.altKey)return;if(event.code==='KeyZ'){event.preventDefault();undo();}if(event.code==='KeyR'&&!win.open){event.preventDefault();load(state.index);}});
for(let index=0;index<SHELF_LEVELS.length;index++){const button=document.createElement('button');button.textContent=index+1;button.dataset.level=index;button.setAttribute('aria-label',`Раскладка ${index+1}: ${SHELF_LEVELS[index].name}`);button.addEventListener('click',()=>load(index));$('#levels').append(button);}
Object.defineProperty(window,'__shelves',{value:()=>({...state,shelves:state.shelves.map(s=>[...s]),selected,paused,platformPaused,undoDepth:history.length,best:[...best],capacity:SHELF_LEVELS[state.index].capacity})});
modes=createModeController({gameId:'shelves',host:document.querySelector('[data-modes]'),getMoves:()=>state.moves,isWon:()=>state.won,canUndo:()=>history.length>0,onUndo:undo,onRestart:()=>load(state.index),onBlock:clearDrag,getSDK:async()=>window.__corioSDK||null});
Object.defineProperty(window,'__corioModes',{value:()=>modes.state()});
window.addEventListener('corio:platform-pause',()=>{platformPaused=true;clearDrag();window.dispatchEvent(new Event('corio:pause'));});
window.addEventListener('corio:platform-resume',()=>{platformPaused=false;window.dispatchEvent(new Event('corio:resume'));});
load(0);
window.addEventListener('blur',pause);document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
new ResizeObserver(fit).observe($('#scene'));setupFocusUI();
win.querySelector('.win-cat').outerHTML=catFigure('loaf',{className:'win-cat'});
