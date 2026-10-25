import {tunnelWalkPoints} from './tunnel-art.mjs?v=0.8.1';
import {setupFocusUI,fitFocusedScene} from './focus.mjs?v=0.8.1';
import {GAMES,FOODS,GROOM_STEPS,createMini,miniAction,solutionFor,connectedRoute} from './engine.mjs?v=0.8.1';
import {renderScene,toolsFor,goalText} from './views.mjs?v=0.8.1';
import {createModeController} from '../modes.mjs?v=0.8.1';
import {catFigure,setCatWalkFrame} from '../characters.mjs?v=0.8.1';
import {createSearchLife} from './search-life.mjs?v=0.8.1';
const $=query=>document.querySelector(query),id=$('[data-game]').dataset.game,game=GAMES[id],scene=$('#scene'),tools=$('#tools'),win=$('#win');
let attempt=0,settleTimer=null,settleEpoch=0,routeWalking=false,searchLife=null;
let state=createMini(id),history=[],selected=id==='grooming'?'wipe':id==='litter'?'scoop':id==='search'?1:null,drag=null,ignoreClickUntil=0,paused=false,platformPaused=false,sfx=true,audio=null,modes;
const key=id==='litter'?'corio-litter-pairs-v1':id==='search'?'corio-search-50-v1':'corio-'+id+'-v1';let best=Array(game.levels.length).fill(null);
try{sfx=localStorage.getItem('corio-litter-sfx-v1')!=='off';const value=JSON.parse(localStorage.getItem(key));if(Array.isArray(value))best=best.map((_,i)=>Number.isInteger(value[i])?value[i]:null);}catch{}
const settingsOpen=()=>!!document.querySelector('[data-game-panel][open]');
const blocked=()=>settingsOpen()||paused||platformPaused||win.open||modes?.isModalOpen();
function status(text){$('#status').textContent=text;}
function render(){
  const level=game.levels[state.index],focused=document.activeElement?.id,viewport=scene.querySelector('.search-viewport'),scroll=viewport?{x:viewport.scrollLeft,y:viewport.scrollTop}:null;
  $('#level-name').textContent=level.name;$('#level-number').textContent=`${state.index+1} / ${game.levels.length}`;$('#moves').textContent=state.moves;$('#goal').textContent=goalText(id,state,level);$('#undo').disabled=!history.length;
  if(id==='search'){
    $('#level-conditions').textContent=`${level.clues==='silhouettes'?'Силуэты':'Слова'} · ${level.lighting==='night'?'Ночной поиск':'Обычный свет'}`;
    const first=Math.max(0,Math.min(game.levels.length-5,state.index-2));$('#levels').innerHTML=Array.from({length:5},(_,i)=>levelButton(first+i)).join('');
  }
  tools.innerHTML=toolsFor(id,selected,sfx);scene.innerHTML=renderScene(id,state,level,selected,drag?.type==='yarn'?drag.preview:null);
  for(const button of document.querySelectorAll('[data-level]')){const index=+button.dataset.level;button.setAttribute('aria-current',String(index===state.index));button.classList.toggle('completed',best[index]!==null);button.title=best[index]!==null?'Пройдено: '+best[index]+' действий':game.levels[index].name;}
  fitFocusedScene(id==='search'?selected:1);
  if(scroll){const viewport=scene.querySelector('.search-viewport');viewport.scrollLeft=scroll.x;viewport.scrollTop=scroll.y;}
  if(focused)document.getElementById(focused)?.focus({preventScroll:true});
  searchLife?.afterRender();
}
function endDrag(){drag=null;document.querySelector('.drag-food')?.remove();}
function cancelSettle(){clearTimeout(settleTimer);settleTimer=null;settleEpoch++;}
function scheduleSettle(){
  cancelSettle();if(id!=='litter'||!state.pending||paused||platformPaused)return;
  const epoch=settleEpoch;
  const settle=()=>{
    if(epoch!==settleEpoch||!state.pending)return;
    if(blocked()){settleTimer=setTimeout(settle,150);return;}
    state=miniAction(state,{type:'settle'});render();status(state.message);settleTimer=null;
  };
  settleTimer=setTimeout(settle,950);
}
function load(index){
  searchLife?.newLevel();attempt++;routeWalking=false;cancelSettle();endDrag();history=[];state=createMini(id,index);selected=id==='grooming'?'wipe':id==='search'?1:null;paused=false;platformPaused=false;ignoreClickUntil=0;
  if(win.open)win.close();if($('#pause-dialog').open)$('#pause-dialog').close();modes?.newAttempt(id==='litter'?game.levels[index].w*game.levels[index].h*2:solutionFor(id,index).length);render();status(game.rule);window.dispatchEvent(new Event('corio:resume'));
  if(id==='search')try{localStorage.setItem('corio-search-current-v1',String(index));}catch{}
}
function commit(action){
  if(blocked()||!modes.guard())return false;
  const next=miniAction(state,action);if(next===state)return false;
  if(next.moves>state.moves)history.push(state);state=next;if(id==='food'&&state.sorted.some(i=>i.id===selected))selected=null;render();if(state.message)status(state.message);modes.changed();
  if(id==='litter')sandSound(action.type);
  if(id==='litter'&&state.pending)scheduleSettle();
  const portrait=win.querySelector('.win-cat');if(portrait)portrait.outerHTML=catFigure(id==='grooming'&&state.washed?'towel':id==='pet'?'sleep':'loaf',{className:'win-cat'});
  if(state.won){endDrag();best[state.index]=Math.min(best[state.index]??Infinity,state.moves);try{localStorage.setItem(key,JSON.stringify(best));}catch{}$('#win-title').textContent={search:'Все вещи нашлись',tunnels:'Кот добрался!',food:'Миска разобрана',pet:'Хороший вечер',grooming:'Чисто и спокойно',litter:'Лоток в порядке',yarn:'Нитки распутаны'}[id];$('#win-copy').textContent=`${state.moves} действий. ${state.index===game.levels.length-1?'Все уровни пройдены.':'Можно попробовать следующий уровень.'}`;$('#next').textContent=state.index===game.levels.length-1?'С первой':'Дальше';if(id==='tunnels')walkRoute();else win.showModal();}
  return true;
}
function walkRoute(){
  routeWalking=true;
  const level=game.levels[state.index],image=scene.querySelector('#route-cat'),points=tunnelWalkPoints(state,level),turn=attempt;
  const lengths=[0];for(let i=1;i<points.length;i++)lengths.push(lengths.at(-1)+Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y));
  const total=lengths.at(-1),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:Math.min(6500,total*5.5);
  // Start on the first animation timestamp. A callback's timestamp may precede
  // the performance.now() sampled while the current browser frame is running.
  let previous=null,elapsed=0;
  const frame=time=>{
    if(turn!==attempt||!image.isConnected)return;
    if(previous!==null&&!platformPaused&&!paused&&!settingsOpen()&&!document.hidden)elapsed+=Math.max(0,Math.min(80,time-previous));previous=time;
    const progress=duration?Math.min(1,elapsed/duration):1,distance=progress*total;let a=0;while(a<points.length-2&&lengths[a+1]<distance)a++;
    const span=lengths[a+1]-lengths[a],part=span?(distance-lengths[a])/span:1,x=points[a].x+(points[a+1].x-points[a].x)*part,y=points[a].y+(points[a+1].y-points[a].y)*part;
    image.setAttribute('x',x-43);image.setAttribute('y',y-63.17);setCatWalkFrame(image,Math.floor(elapsed/140),points[a+1].x<points[a].x?'left':'right');
    if(progress<1||paused||platformPaused||settingsOpen()||document.hidden)requestAnimationFrame(frame);else{routeWalking=false;if(!win.open)win.showModal();}
  };requestAnimationFrame(frame);
}

function undo(){if(paused||platformPaused||!history.length)return;routeWalking=false;cancelSettle();if(win.open)win.close();endDrag();state=history.pop();render();status('Действие отменено.');modes.changed();scheduleSettle();}
function pause(){if(paused||platformPaused||win.open||state.won&&!routeWalking)return;paused=true;cancelSettle();endDrag();$('#pause-dialog').showModal();window.dispatchEvent(new Event('corio:pause'));if(audio)audio.suspend();}
function resume(){paused=false;if($('#pause-dialog').open)$('#pause-dialog').close();scheduleSettle();window.dispatchEvent(new Event('corio:resume'));}
function sandSound(type){
  if(!sfx)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const duration=type==='rake'?.27:.17,buffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++){const t=i/data.length;data[i]=(Math.random()*2-1)*Math.sin(Math.PI*t)**1.5*(.7+.3*Math.sin(i*.018));}const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=buffer;filter.type='lowpass';filter.frequency.value=type==='rake'?1500:1050;gain.gain.value=.065;source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start();}catch{}
}
scene.addEventListener('click',event=>{
  if(blocked()||performance.now()<ignoreClickUntil)return;
  const food=event.target.closest('[data-food]'),bin=event.target.closest('[data-bin]'),piece=event.target.closest('[data-piece]'),spot=event.target.closest('[data-spot]'),cell=event.target.closest('[data-cell]');
  if(id==='search'){if(event.target.closest('[data-cat-react]')){searchLife.callCat();return;}const find=event.target.closest('[data-find]');if(find||event.target.closest('.search-viewport svg'))commit({type:'find',item:find?.dataset.find||null});return;}
  if(food){selected=+food.dataset.food;render();status(`${FOODS[state.remaining.find(i=>i.id===selected).type].name}: выбери зону внизу.`);}
  if(bin){if(selected===null)status('Сначала выбери продукт на тарелке.');else commit({type:'sort',item:selected,bin:bin.dataset.bin});}
  if(piece)commit({type:'turn',piece:+piece.dataset.piece});
  if(spot)commit({type:'clean',spot:+spot.dataset.spot,tool:selected});
  if(cell)commit({type:'reveal',cell:+cell.dataset.cell});
});
scene.addEventListener('keydown',event=>{
  if(blocked())return;const node=event.target.closest('[data-node]'),piece=event.target.closest('[data-piece]');
  if(event.target.closest('[data-cat-react]')&&['Enter',' '].includes(event.key)){event.preventDefault();searchLife.callCat();return;}
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
  else if(id==='grooming'&&event.target.closest('[data-spot]')){event.preventDefault();drag={type:'brush',pointer:event.pointerId,visited:new Set()};scene.setPointerCapture(event.pointerId);brushAt(event);}
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
scene.addEventListener('pointercancel',()=>{
  // A browser gesture may cancel a pointer even when this game has no drag.
  // Replacing the scene then would detach the cat from its running animation.
  if(!drag)return;
  const restorePreview=drag.type==='yarn';endDrag();if(restorePreview)render();
});
$('#undo').addEventListener('click',undo);$('#restart').addEventListener('click',()=>load(state.index));$('#next').addEventListener('click',()=>load((state.index+1)%game.levels.length));$('#again').addEventListener('click',()=>load(state.index));$('#pause').addEventListener('click',pause);$('#resume').addEventListener('click',resume);
win.addEventListener('cancel',e=>e.preventDefault());$('#pause-dialog').addEventListener('cancel',()=>{paused=false;scheduleSettle();window.dispatchEvent(new Event('corio:resume'));});
function levelButton(index){const level=game.levels[index];return`<button data-level="${index}" aria-label="Уровень ${index+1}: ${level.name}${id==='search'?', '+(level.clues==='words'?'слова':'силуэты')+', '+(level.lighting==='night'?'ночной':'обычный')+', предметов '+level.targets.length:''}">${index+1}</button>`;}
if(id==='search')$('#level-grid').innerHTML=game.levels.map((_,index)=>levelButton(index)).join('');
else $('#levels').innerHTML=game.levels.map((_,index)=>levelButton(index)).join('');
const levelClick=event=>{const b=event.target.closest('[data-level]');if(b){load(+b.dataset.level);b.closest('dialog')?.close();}};
$('#levels').addEventListener('click',levelClick);$('#level-grid')?.addEventListener('click',levelClick);
document.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey||settingsOpen()||modes.isModalOpen()||paused||platformPaused)return;if(event.code==='KeyZ'){event.preventDefault();undo();}if(event.code==='KeyR'&&!win.open){event.preventDefault();load(state.index);}});
window.addEventListener('blur',pause);document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
window.addEventListener('corio:platform-pause',()=>{platformPaused=true;cancelSettle();endDrag();window.dispatchEvent(new Event('corio:pause'));if(audio)audio.suspend();});window.addEventListener('corio:platform-resume',()=>{platformPaused=false;scheduleSettle();if(!paused)window.dispatchEvent(new Event('corio:resume'));});
modes=createModeController({gameId:id,host:$('[data-modes]'),getMoves:()=>state.moves,isWon:()=>state.won,canUndo:()=>history.length>0,onUndo:undo,onRestart:()=>load(state.index),onBlock:endDrag});
Object.defineProperty(window,'__mini',{value:()=>({...structuredClone(state),selected,paused,platformPaused,routeWalking,best:[...best]})});Object.defineProperty(window,'__corioModes',{value:()=>modes.state()});
const requestedLevel=Number(new URL(location.href).searchParams.get('level'));
let savedLevel=0;if(id==='search')try{const index=Number(localStorage.getItem('corio-search-current-v1'));if(Number.isInteger(index)&&index>=0&&index<game.levels.length)savedLevel=index;}catch{}
if(id==='search')searchLife=createSearchLife({scene,isBlocked:blocked});
load(Number.isInteger(requestedLevel)&&requestedLevel>=1&&requestedLevel<=game.levels.length?requestedLevel-1:savedLevel);
setupFocusUI();
