import {ITEMS,SHELF_LEVELS,createShelfGame,transfer} from './engine.mjs';
const $=s=>document.querySelector(s),board=$('#shelves'),win=$('#win');
let state=createShelfGame(),selected=-1,history=[],drag=null,ghost=null,ignoreClickUntil=0;
let best=Array(SHELF_LEVELS.length).fill(null);
try{const saved=JSON.parse(localStorage.getItem('corio-shelves-v1'));if(Array.isArray(saved))best=best.map((_,i)=>Number.isInteger(saved[i])&&saved[i]>0?saved[i]:null);}catch{}
function render(){
  const level=SHELF_LEVELS[state.index];board.replaceChildren();board.style.setProperty('--capacity',level.capacity);
  state.shelves.forEach((items,index)=>{
    const shelf=document.createElement('section');shelf.className='shelf';shelf.dataset.shelf=index;shelf.dataset.label=`Полка ${index+1}`;shelf.tabIndex=0;shelf.setAttribute('role','button');shelf.setAttribute('aria-pressed',String(selected===index));shelf.setAttribute('aria-label',`Полка ${index+1}: ${items.length?items.map(i=>ITEMS[i].name).join(', '):'пусто'}. ${items.length?'Крайний справа: '+ITEMS[items.at(-1)].name:''}`);
    shelf.classList.toggle('selected',selected===index);shelf.classList.toggle('complete',items.length===level.capacity&&items.every(i=>i===items[0]));
    items.forEach((type,slot)=>{const cell=document.createElement('span');cell.className='slot'+(slot===items.length-1?' front':'');const image=document.createElement('img');image.src=`../assets/${ITEMS[type].file}`;image.alt=ITEMS[type].name;image.draggable=false;cell.append(image);shelf.append(cell);});
    if(!items.length){const empty=document.createElement('span');empty.className='empty-mark';empty.textContent='свободная полка';shelf.append(empty);}
    board.append(shelf);
  });
  $('#moves').textContent=state.moves;$('#level-label').textContent=`Раскладка ${state.index+1} / ${SHELF_LEVELS.length}`;$('#level-name').textContent=level.name;$('#undo').disabled=!history.length;
  for(const button of $('#levels').children)button.setAttribute('aria-current',String(+button.dataset.level===state.index));
}
function status(text){$('#status').textContent=text;}
function load(index){clearDrag();ignoreClickUntil=0;if(win.open)win.close();state=createShelfGame(index);selected=-1;history=[];render();status('Сначала выбери полку с предметом, затем полку для него.');}
function finish(){
  best[state.index]=Math.min(best[state.index]??Infinity,state.moves);try{localStorage.setItem('corio-shelves-v1',JSON.stringify(best));}catch{}
  $('#win-copy').textContent=`Всего перестановок: ${state.moves}. Все вещи собраны по видам.`;$('#next').textContent=state.index===SHELF_LEVELS.length-1?'Начать с первой':'Следующая раскладка';win.showModal();
}
function put(from,to){
  const next=transfer(state,from,to);
  if(next===state){status('Поставь рядом с таким же предметом или на свободную полку.');return false;}
  history.push(state);state=next;selected=-1;render();status('Предмет на новом месте.');if(state.won)finish();return true;
}
function choose(index){
  if(state.won)return;
  if(selected===index){selected=-1;render();status('Выбор снят.');return;}
  if(selected<0){if(!state.shelves[index].length){status('Здесь свободно. Сначала выбери предмет.');return;}selected=index;render();status(`Выбрано: ${ITEMS[state.shelves[index].at(-1)].name.toLowerCase()}. Теперь выбери полку для него.`);}
  else put(selected,index);
}
function undo(){if(!history.length)return;if(win.open)win.close();state=history.pop();selected=-1;render();status('Перестановка отменена.');}
board.addEventListener('click',event=>{
  if(performance.now()<ignoreClickUntil)return;
  const shelf=event.target.closest('[data-shelf]'),slot=event.target.closest('.slot');
  if(selected<0&&slot&&!slot.classList.contains('front')){shelf.classList.add('front-hint');status('Возьми крайний предмет справа — он крупнее и стоит на свету.');return;}
  if(shelf)choose(+shelf.dataset.shelf);
});
board.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){const shelf=event.target.closest('[data-shelf]');if(shelf){event.preventDefault();choose(+shelf.dataset.shelf);}}});
function clearDrag(){ghost?.remove();ghost=null;drag=null;}
board.addEventListener('pointerdown',event=>{
  const front=event.target.closest('.slot.front'),shelf=front?.closest('[data-shelf]');
  if(!shelf||state.won||event.button!==0)return;
  drag={from:+shelf.dataset.shelf,x:event.clientX,y:event.clientY,pointer:event.pointerId,active:false};
});
board.addEventListener('pointermove',event=>{
  if(!drag||event.pointerId!==drag.pointer)return;
  if(!drag.active&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>8){drag.active=true;board.setPointerCapture(event.pointerId);ghost=document.createElement('img');ghost.src=`../assets/${ITEMS[state.shelves[drag.from].at(-1)].file}`;ghost.alt='';ghost.className='drag-ghost';document.body.append(ghost);}
  if(drag.active){event.preventDefault();ghost.style.left=event.clientX+'px';ghost.style.top=event.clientY+'px';}
});
board.addEventListener('pointerup',event=>{
  if(!drag)return;const current=drag;
  if(current.active){ignoreClickUntil=performance.now()+250;const shelf=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-shelf]');if(shelf)put(current.from,+shelf.dataset.shelf);try{board.releasePointerCapture(event.pointerId);}catch{}}
  clearDrag();
});
board.addEventListener('pointercancel',clearDrag);window.addEventListener('blur',clearDrag);
$('#undo').addEventListener('click',undo);$('#restart').addEventListener('click',()=>load(state.index));$('#next').addEventListener('click',()=>load((state.index+1)%SHELF_LEVELS.length));
win.addEventListener('cancel',event=>{event.preventDefault();});
document.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey)return;if(event.code==='KeyZ'){event.preventDefault();undo();}if(event.code==='KeyR'&&!win.open){event.preventDefault();load(state.index);}});
for(let index=0;index<SHELF_LEVELS.length;index++){const button=document.createElement('button');button.textContent=index+1;button.dataset.level=index;button.setAttribute('aria-label',`Раскладка ${index+1}: ${SHELF_LEVELS[index].name}`);button.addEventListener('click',()=>load(index));$('#levels').append(button);}
Object.defineProperty(window,'__shelves',{value:()=>({...state,shelves:state.shelves.map(s=>[...s]),selected,undoDepth:history.length,best:[...best],capacity:SHELF_LEVELS[state.index].capacity})});
load(0);
