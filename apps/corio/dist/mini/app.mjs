import {GAMES,FOODS,GROOM_STEPS,createMini,miniAction,solutionFor,connectedRoute} from './engine.mjs?v=0.5.0';
import {renderScene,toolsFor,goalText} from './views.mjs?v=0.5.0';
import {createModeController} from '../modes.mjs?v=0.5.0';
const $=query=>document.querySelector(query),id=$('[data-game]').dataset.game,game=GAMES[id],scene=$('#scene'),tools=$('#tools'),win=$('#win');
let attempt=0;
let state=createMini(id),history=[],selected=id==='grooming'?'wipe':id==='litter'?'scoop':id==='search'?1:null,drag=null,ignoreClickUntil=0,paused=false,platformPaused=false,sfx=true,audio=null,modes;
const key='corio-'+id+'-v1';let best=Array(5).fill(null);
try{sfx=localStorage.getItem('corio-litter-sfx-v1')!=='off';const value=JSON.parse(localStorage.getItem(key));if(Array.isArray(value))best=best.map((_,i)=>Number.isInteger(value[i])?value[i]:null);}catch{}
const blocked=()=>paused||platformPaused||win.open||modes?.isModalOpen();
function status(text){$('#status').textContent=text;}
function render(){
  const level=game.levels[state.index],focused=document.activeElement?.id,viewport=scene.querySelector('.search-viewport'),scroll=viewport?{x:viewport.scrollLeft,y:viewport.scrollTop}:null;
  $('#level-name').textContent=level.name;$('#level-number').textContent=`${state.index+1} / 5`;$('#moves').textContent=state.moves;$('#goal').textContent=goalText(id,state,level);$('#undo').disabled=!history.length;
  tools.innerHTML=toolsFor(id,selected,sfx);scene.innerHTML=renderScene(id,state,level,selected,drag?.type==='yarn'?drag.preview:null);
  for(const button of $('#levels').children){const index=+button.dataset.level;button.setAttribute('aria-current',String(index===state.index));button.classList.toggle('completed',best[index]!==null);button.title=best[index]!==null?'Пройдено: '+best[index]+' действий':game.levels[index].name;}
  if(scroll){const viewport=scene.querySelector('.search-viewport');viewport.scrollLeft=scroll.x;viewport.scrollTop=scroll.y;}
  if(focused)document.getElementById(focused)?.focus({preventScroll:true});
}
function endDrag(){drag=null;document.querySelector('.drag-food')?.remove();}
function load(index){
  attempt++;endDrag();history=[];state=createMini(id,index);selected=id==='grooming'?'wipe':id==='litter'?'scoop':id==='search'?1:null;paused=false;platformPaused=false;ignoreClickUntil=0;
  if(win.open)win.close();if($('#pause-dialog').open)$('#pause-dialog').close();modes?.newAttempt(id==='litter'?game.levels[index].w*game.levels[index].h*game.levels[index].depth+game.levels[index].clumps.length:solutionFor(id,index).length);render();status(game.rule);window.dispatchEvent(new Event('corio:resume'));
}
function commit(action){
  if(blocked()||!modes.guard())return false;
  const next=miniAction(state,action);if(next===state)return false;
  if(next.moves>state.moves)history.push(state);state=next;if(id==='food'&&state.sorted.some(i=>i.id===selected))selected=null;render();if(state.message)status(state.message);modes.changed();
  if(id==='litter')sandSound(action.type);
  if(state.won){endDrag();best[state.index]=Math.min(best[state.index]??Infinity,state.moves);try{localStorage.setItem(key,JSON.stringify(best));}catch{}$('#win-title').textContent={search:'Все вещи нашлись',tunnels:'Кот добрался!',food:'Миска разобрана',pet:'Хороший вечер',grooming:'Чисто и спокойно',litter:'Лоток в порядке',yarn:'Нитки распутаны'}[id];$('#win-copy').textContent=`${state.moves} действий. ${state.index===4?'Все пять пробных уровней пройдены.':'Можно попробовать следующий уровень.'}`;$('#next').textContent=state.index===4?'С первой':'Дальше';if(id==='tunnels')walkRoute();else win.showModal();}
  return true;
}
function walkRoute(){
  const level=game.levels[state.index],image=scene.querySelector('#route-cat'),route=connectedRoute(state,level),points=[{x:50,y:(level.start.y+.5)*100},...route.map(i=>({x:(state.pieces[i].x+1.5)*100,y:(state.pieces[i].y+.5)*100})),{x:(level.w+1.5)*100,y:(level.end.y+.5)*100}],turn=attempt,start=performance.now(),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:Math.min(2200,points.length*180);
  const frame=time=>{if(turn!==attempt||!image.isConnected)return;const progress=duration?Math.min(1,(time-start)/duration):1,at=progress*(points.length-1),a=Math.min(points.length-2,Math.floor(at)),part=at-a;image.setAttribute('x',points[a].x+(points[a+1].x-points[a].x)*part-34);image.setAttribute('y',points[a].y+(points[a+1].y-points[a].y)*part-65);if(progress<1)requestAnimationFrame(frame);else if(!win.open)win.showModal();};requestAnimationFrame(frame);
}
function undo(){if(paused||platformPaused||!history.length)return;if(win.open)win.close();endDrag();state=history.pop();render();status('Действие отменено.');modes.changed();}
function pause(){if(paused||platformPaused||win.open||state.won)return;paused=true;endDrag();$('#pause-dialog').showModal();window.dispatchEvent(new Event('corio:pause'));if(audio)audio.suspend();}
function resume(){paused=false;if($('#pause-dialog').open)$('#pause-dialog').close();window.dispatchEvent(new Event('corio:resume'));}
function sandSound(type){
  if(!sfx)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const duration=type==='rake'?.27:.17,buffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++){const t=i/data.length;data[i]=(Math.random()*2-1)*Math.sin(Math.PI*t)**1.5*(.7+.3*Math.sin(i*.018));}const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=buffer;filter.type='lowpass';filter.frequency.value=type==='rake'?1500:1050;gain.gain.value=.065;source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start();}catch{}
}
scene.addEventListener('click',event=>{
  if(blocked()||performance.now()<ignoreClickUntil)return;
  const food=event.target.closest('[data-food]'),bin=event.target.closest('[data-bin]'),piece=event.target.closest('[data-piece]'),spot=event.target.closest('[data-spot]'),cell=event.target.closest('[data-cell]');
  if(id==='search'){const find=event.target.closest('[data-find]');if(find||event.target.closest('.search-viewport svg'))commit({type:'find',item:find?.dataset.find||null});return;}
  if(food){selected=+food.dataset.food;render();status(`${FOODS[state.remaining.find(i=>i.id===selected).type].name}: выбери зону внизу.`);}
  if(bin){if(selected===null)status('Сначала выбери продукт на тарелке.');else commit({type:'sort',item:selected,bin:bin.dataset.bin});}
  if(piece)commit({type:'turn',piece:+piece.dataset.piece});
  if(spot)commit({type:'clean',spot:+spot.dataset.spot,tool:selected});
  if(cell)commit({type:selected,cell:+cell.dataset.cell});
});
scene.addEventListener('keydown',event=>{
  if(blocked())return;const node=event.target.closest('[data-node]'),piece=event.target.closest('[data-piece]');
  const find=event.target.closest('[data-find]');if(find&&['Enter',' '].includes(event.key)){event.preventDefault();commit({type:'find',item:find.dataset.find});}
  if(piece&&['Enter',' '].includes(event.key)){event.preventDefault();commit({type:'turn',piece:+piece.dataset.piece});}
  if(node&&event.key.startsWith('Arrow')){event.preventDefault();const index=+node.dataset.node,p=state.points[index],dx=event.key==='ArrowLeft'?-3:event.key==='ArrowRight'?3:0,dy=event.key==='ArrowUp'?-3:event.key==='ArrowDown'?3:0;commit({type:'move',node:index,x:p.x+dx,y:p.y+dy});}
});
tools.addEventListener('click',event=>{
  if(blocked())return;const tool=event.target.closest('[data-tool]'),care=event.target.closest('[data-care]');
  const zoom=event.target.closest('[data-zoom]');if(zoom){selected=Math.max(1,Math.min(2.5,selected+(zoom.dataset.zoom==='in'?.5:-.5)));render();}
  if(event.target.closest('[data-hint]')){commit({type:'hint'});if(state.hint)document.getElementById('find-'+state.hint)?.scrollIntoView({block:'nearest',inline:'center',behavior:'auto'});}
  if(tool){if(tool.dataset.tool==='pause'){commit({type:'pause'});return;}selected=tool.dataset.tool;render();}
  if(care)commit({type:care.dataset.care});
  if(event.target.closest('[data-sfx]')){sfx=!sfx;try{localStorage.setItem('corio-litter-sfx-v1',sfx?'on':'off');}catch{}render();}
});
function pointFor(event){const r=scene.querySelector('.yarn-board').getBoundingClientRect();return{x:(event.clientX-r.left)/r.width*100,y:(event.clientY-r.top)/r.height*100};}
function brushAt(event){
  const target=document.elementFromPoint(event.clientX,event.clientY),cell=target?.closest('[data-cell]'),spot=target?.closest('[data-spot]');
  const index=cell?+cell.dataset.cell:spot?+spot.dataset.spot:null;if(index===null||drag.visited.has(index))return;drag.visited.add(index);
  if(cell)commit({type:selected,cell:index});if(spot)commit({type:'clean',spot:index,tool:selected});
}
scene.addEventListener('pointerdown',event=>{
  if(event.button!==0||blocked()||state.won)return;const node=event.target.closest('[data-node]'),food=event.target.closest('[data-food]');
  if(node){event.preventDefault();const at=pointFor(event),index=+node.dataset.node;drag={type:'yarn',pointer:event.pointerId,node:index,start:at,original:{...state.points[index]},preview:structuredClone(state.points)};scene.setPointerCapture(event.pointerId);}
  else if(food){drag={type:'food',pointer:event.pointerId,item:+food.dataset.food,x:event.clientX,y:event.clientY,element:food,active:false};scene.setPointerCapture(event.pointerId);}
  else if(id==='litter'||id==='grooming'&&event.target.closest('[data-spot]')){event.preventDefault();drag={type:'brush',pointer:event.pointerId,visited:new Set()};scene.setPointerCapture(event.pointerId);brushAt(event);}
});
scene.addEventListener('pointermove',event=>{
  if(!drag||blocked())return;
  if(drag.type==='yarn'){event.preventDefault();const at=pointFor(event);drag.preview[drag.node]={x:Math.max(8,Math.min(92,drag.original.x+at.x-drag.start.x)),y:Math.max(8,Math.min(92,drag.original.y+at.y-drag.start.y))};render();}
  if(drag.type==='brush')brushAt(event);
  if(drag?.type==='food'){
    if(!drag.active&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>8){drag.active=true;const ghost=drag.element.cloneNode(true);ghost.removeAttribute('id');ghost.classList.add('drag-food');document.body.append(ghost);}
    const ghost=document.querySelector('.drag-food');if(ghost){event.preventDefault();ghost.style.left=event.clientX+'px';ghost.style.top=event.clientY+'px';}
  }
});
scene.addEventListener('pointerup',event=>{
  if(!drag)return;const current=drag;drag=null;
  if(current.type==='yarn'){ignoreClickUntil=performance.now()+200;const p=current.preview[current.node];commit({type:'move',node:current.node,...p});render();}
  if(current.type==='food'){ignoreClickUntil=performance.now()+200;if(current.active){const bin=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-bin]');if(bin)commit({type:'sort',item:current.item,bin:bin.dataset.bin});}else{selected=current.item;render();status('Теперь выбери подходящую зону внизу.');}}
  if(current.type==='brush')ignoreClickUntil=performance.now()+200;
  document.querySelector('.drag-food')?.remove();try{scene.releasePointerCapture(event.pointerId);}catch{}
});
scene.addEventListener('pointercancel',()=>{endDrag();render();});
$('#undo').addEventListener('click',undo);$('#restart').addEventListener('click',()=>load(state.index));$('#next').addEventListener('click',()=>load((state.index+1)%5));$('#again').addEventListener('click',()=>load(state.index));$('#pause').addEventListener('click',pause);$('#resume').addEventListener('click',resume);
win.addEventListener('cancel',e=>e.preventDefault());$('#pause-dialog').addEventListener('cancel',()=>{paused=false;window.dispatchEvent(new Event('corio:resume'));});
for(let index=0;index<5;index++){const b=document.createElement('button');b.dataset.level=index;b.textContent=index+1;b.setAttribute('aria-label',`Уровень ${index+1}: ${game.levels[index].name}`);b.addEventListener('click',()=>load(index));$('#levels').append(b);}
document.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey||modes.isModalOpen()||paused||platformPaused)return;if(event.code==='KeyZ'){event.preventDefault();undo();}if(event.code==='KeyR'&&!win.open){event.preventDefault();load(state.index);}});
window.addEventListener('blur',pause);document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
window.addEventListener('corio:platform-pause',()=>{platformPaused=true;endDrag();window.dispatchEvent(new Event('corio:pause'));if(audio)audio.suspend();});window.addEventListener('corio:platform-resume',()=>{platformPaused=false;if(!paused)window.dispatchEvent(new Event('corio:resume'));});
modes=createModeController({gameId:id,host:$('[data-modes]'),getMoves:()=>state.moves,isWon:()=>state.won,canUndo:()=>history.length>0,onUndo:undo,onRestart:()=>load(state.index),onBlock:endDrag});
Object.defineProperty(window,'__mini',{value:()=>({...structuredClone(state),selected,paused,platformPaused,best:[...best]})});Object.defineProperty(window,'__corioModes',{value:()=>modes.state()});
load(0);
