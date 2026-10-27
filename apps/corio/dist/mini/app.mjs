import {beginGroomRub,advanceGroomRub} from './grooming-gesture.mjs?v=0.23.2';
import {groomToolIcon} from './grooming-tools.mjs?v=0.23.2';
import {fitFoodScene,renderFoodInfo} from './food-view.mjs?v=0.23.2';
import {createFoodFeedback,foodCatPortrait} from './food-feedback.mjs?v=0.23.2';
import {tunnelWalkPoints} from './tunnel-art.mjs?v=0.23.2';
import {setupFocusUI,fitFocusedScene} from './focus.mjs?v=0.23.2';
import {GAMES,FOODS,GROOM_STEPS,createMini,miniAction,solutionFor,connectedRoute} from './engine.mjs?v=0.23.2';
import {renderScene,toolsFor,goalText} from './views.mjs?v=0.23.2';
import {createModeController} from '../modes.mjs?v=0.23.2';
import {catFigure,setCatWalkFrame} from '../characters.mjs?v=0.23.2';
import {createSearchLife} from './search-life.mjs?v=0.23.2';
import {updateYarnPreview} from './yarn-view.mjs?v=0.23.2';
const $=query=>document.querySelector(query),id=$('[data-game]').dataset.game,game=GAMES[id],scene=$('#scene'),tools=$('#tools'),win=$('#win');
// Keep the live note/status nodes across scene renders; feedback owns this host.
const foodNote=id==='food'?$('#food-note'):null;
let foodCaptionHistory=[];
let careGesture=null,careKeyboard=null;
function clearCareGesture(){careGesture?.remove();careGesture=null;}
function moveCareGesture(event){if(!careGesture)return;careGesture.style.left=(event.clientX+12)+'px';careGesture.style.top=(event.clientY+8)+'px';}
function startCareGesture(event){clearCareGesture();careGesture=document.createElement('div');careGesture.className='care-tool-gesture';careGesture.setAttribute('aria-hidden','true');careGesture.innerHTML=groomToolIcon(selected)+'<span class="care-rub-progress"><i></i></span>';careGesture.dataset.careProgress='0';document.body.append(careGesture);moveCareGesture(event);}
let attempt=0,settleTimer=null,settleEpoch=0,routeWalking=false,routeAnimation=null,routeFrame=null,searchLife=null,foodFeedback=null;
let state=createMini(id),history=[],selected=id==='grooming'?'wipe':id==='litter'?'scoop':id==='search'?1:null,drag=null,ignoreClickUntil=0,paused=false,platformPaused=false,sfx=true,audio=null,sandSource=null,sandBuffer=null,modes;
const manyLevels=id==='search'||id==='tunnels'||id==='food'||id==='yarn'||id==='litter'||id==='grooming';
const key=id==='grooming'?'corio-grooming-50-v1':id==='litter'?'corio-litter-50-v1':id==='search'?'corio-search-50-v3':id==='food'?'corio-food-50-v2':id==='tunnels'?'corio-tunnels-50-v2':id==='yarn'?'corio-yarn-50-v1':'corio-'+id+'-v1';let best=Array(game.levels.length).fill(null);
const currentLevelKey=id==='grooming'?'corio-grooming-50-current-v1':id==='litter'?'corio-litter-50-current-v1':id==='tunnels'?'corio-tunnels-v2-current-v1':id==='food'?'corio-food-50-v2-current-v1':id==='yarn'?'corio-yarn-50-current-v1':'corio-'+id+'-current-v1';
try{sfx=localStorage.getItem('corio-litter-sfx-v1')!=='off';const value=JSON.parse(localStorage.getItem(key));if(Array.isArray(value))best=best.map((_,i)=>Number.isInteger(value[i])?value[i]:null);}catch{}
const settingsOpen=()=>!!document.querySelector('[data-game-panel][open]');
const blocked=()=>settingsOpen()||paused||platformPaused||win.open||modes?.isModalOpen();
function status(text){
  const message=String(text??''),host=$('#status');host.textContent=message;
  if(id==='food'){host.hidden=!message;foodNote.dataset.hasError=String(Boolean(message));foodFeedback?.message(message);fitFoodScene(scene);}
}
function selectFood(item){
  if(selected!==item)status('');selected=item;render();
}
function render(){
  const level=game.levels[state.index],focused=document.activeElement?.id,viewport=scene.querySelector('.search-viewport'),scroll=viewport?{x:viewport.scrollLeft,y:viewport.scrollTop}:null;
  $('#level-name').textContent=level.name;$('#level-number').textContent=`${state.index+1} / ${game.levels.length}`;$('#moves').textContent=state.moves;$('#goal').textContent=goalText(id,state,level);$('#undo').disabled=!history.length;
  if(id==='search')$('#level-conditions').textContent=`${level.clues==='silhouettes'?'Силуэты':'Слова'} · ${level.lighting==='night'?'Ночной поиск':'Обычный свет'}`;
  if(manyLevels){
    const first=Math.max(0,Math.min(game.levels.length-5,state.index-2));$('#levels').innerHTML=Array.from({length:5},(_,i)=>levelButton(first+i)).join('');
  }
  tools.innerHTML=toolsFor(id,selected,sfx);scene.innerHTML=renderScene(id,state,level,selected,drag?.type==='yarn'?drag.preview:null);
  for(const button of document.querySelectorAll('[data-level]')){const index=+button.dataset.level;button.setAttribute('aria-current',String(index===state.index));button.classList.toggle('completed',best[index]!==null);button.title=best[index]!==null?'Пройдено: '+best[index]+' действий':game.levels[index].name;}
  fitFocusedScene(id==='search'?selected:1);if(id==='food'){scene.querySelector('[data-food-note-slot]').append(foodNote);foodNote.hidden=false;$('#food-info').innerHTML=renderFoodInfo(state,selected);fitFoodScene(scene);foodFeedback?.afterRender();}
  if(scroll){const viewport=scene.querySelector('.search-viewport');viewport.scrollLeft=scroll.x;viewport.scrollTop=scroll.y;}
  if(focused){const target=document.getElementById(focused);if(id==='litter'&&target?.disabled){const candidates=[...scene.querySelectorAll('[data-cell]:not(:disabled)')];(candidates.find(el=>+el.dataset.cell>+target.dataset.cell)||candidates[0])?.focus({preventScroll:true});}else target?.focus({preventScroll:true});}
  searchLife?.afterRender();
}
function restoreFoodDrag(current){
  if(current?.type!=='food'||!current.active)return;
  const item=current.element;
  item.setAttribute('class',current.originalClass);
  if(current.originalStyle===null)item.removeAttribute('style');else item.setAttribute('style',current.originalStyle);
  if(current.parent?.isConnected)current.parent.insertBefore(item,current.nextSibling?.parentNode===current.parent?current.nextSibling:null);
  else item.remove();
}
function endDrag(){
  const current=drag,restorePreview=current?.type==='yarn';drag=null;if(id==='grooming'){careKeyboard=null;clearCareGesture();}if(current?.type==='brush'){clearCareGesture();ignoreClickUntil=performance.now()+200;}
  restoreFoodDrag(current);
  if(current&&scene.hasPointerCapture(current.pointer))try{scene.releasePointerCapture(current.pointer);}catch{}
  document.querySelector('.drag-food')?.remove();if(current?.type==='food'){$('#food-info').innerHTML=renderFoodInfo(state,selected);if(current.active)status(current.noteMessage);}if(restorePreview)render();
}
function cancelSettle(){clearTimeout(settleTimer);settleTimer=null;settleEpoch++;}
function scheduleSettle(){
  cancelSettle();if(id!=='litter'||!state.pending||paused||platformPaused)return;
  const epoch=settleEpoch;
  const settle=()=>{
    if(epoch!==settleEpoch||!state.pending)return;
    if(blocked()){settleTimer=null;return;}
    state=miniAction(state,{type:'settle'});render();status(state.message);settleTimer=null;
  };
  settleTimer=setTimeout(settle,950);
}
function load(index){
  stopSandSound();searchLife?.newLevel();foodFeedback?.newLevel();attempt++;cancelRouteWalk();cancelSettle();endDrag();history=[];foodCaptionHistory=[];state=createMini(id,index);selected=id==='grooming'?'wipe':id==='search'?1:null;paused=false;platformPaused=false;ignoreClickUntil=0;
  if(win.open)win.close();if($('#pause-dialog').open)$('#pause-dialog').close();modes?.newAttempt(id==='litter'?game.levels[index].w*game.levels[index].h*2:solutionFor(id,index).length);render();status(id==='food'?'':id==='yarn'?'Тяни кольца и свободный конец. Убери все пересечения.':id==='tunnels'?tunnelInstruction(game.levels[index]):id==='litter'?'Найди одинаковые формы. Пустые места можно оставить.':id==='grooming'?'Зажми и поводи инструментом по участку шерсти.':game.rule);window.dispatchEvent(new Event('corio:resume'));
  if(manyLevels)try{localStorage.setItem(currentLevelKey,String(index));}catch{}
}
function commit(action){
  if(blocked()||!modes.guard())return false;
  const previous=state,next=miniAction(state,action);if(next===state)return false;
  const foodSort=id==='food'&&action.type==='sort'&&next.moves>previous.moves;
  const foodError=foodSort&&next.mistakes>previous.mistakes?FOODS[previous.remaining.find(item=>item.id===action.item).type].why:'';
  if(next.moves>state.moves){history.push(state);if(id==='food')foodCaptionHistory.push({selected,message:$('#status').textContent});}
  state=next;if(id==='food'&&state.sorted.some(item=>item.id===selected))selected=null;render();
  if(id==='food')status(foodError);else if(id==='yarn')status(state.message);else if(state.message)status(state.message);modes.changed();
  if(foodSort)foodFeedback?.sorted({correct:next.mistakes===previous.mistakes,mistakes:next.mistakes,message:foodError,bin:action.bin});
  if(id==='litter')sandSound(action.type);
  if(id==='litter'&&state.pending)scheduleSettle();
  const portrait=win.querySelector('.win-cat');if(portrait)portrait.outerHTML=id==='grooming'?'<div class="win-cat care-finish-portrait">'+foodCatPortrait('celebrate').replace('Кориолан очень доволен угощением','Кориолан чистый, сухой и довольный')+'<span class="care-win-hearts" aria-hidden="true">♥ ♥ ♥</span></div>':catFigure(id==='pet'?'sleep':'loaf',{className:'win-cat'});
  if(state.won){endDrag();best[state.index]=Math.min(best[state.index]??Infinity,state.moves);try{localStorage.setItem(key,JSON.stringify(best));}catch{}$('#win-title').textContent={search:'Все вещи нашлись',tunnels:'Кот добрался!',food:'Миска разобрана',pet:'Хороший вечер',grooming:'Чистый, сухой и довольный',litter:'Лоток в порядке',yarn:'Нить распутана'}[id];$('#win-copy').textContent=`${state.moves} действий. ${state.index===game.levels.length-1?'Все уровни пройдены.':'Можно попробовать следующий уровень.'}`;$('#next').textContent=state.index===game.levels.length-1?'С первой':'Дальше';if(id==='tunnels')walkRoute();else win.showModal();}
  return true;
}
function cancelRouteWalk(){
  if(routeFrame!==null)cancelAnimationFrame(routeFrame);
  for(const module of scene.querySelectorAll('.is-current')){module.classList.remove('is-current');delete module.dataset.motionChannel;}
  routeFrame=null;routeAnimation=null;routeWalking=false;
}
function tunnelInstruction(level){
  if(level.pieces.some(p=>p.kind==='crossing'))return'Проведи путь через все колокольчики. В пересечении два отдельных прямых прохода.';
  return level.checkpoints?.length?'Путь к миске должен пройти через все места с колокольчиком.':'Поворачивай тоннели и соедини площадку кота с миской.';
}
function syncRouteMotion(){
  if(!routeAnimation||!routeWalking)return;
  if(blocked()||document.hidden){
    if(routeFrame!==null)cancelAnimationFrame(routeFrame);
    routeFrame=null;routeAnimation.previous=null;
  }else if(routeFrame===null)routeFrame=requestAnimationFrame(advanceRoute);
}
function walkRoute(){
  cancelRouteWalk();routeWalking=true;
  const level=game.levels[state.index],image=scene.querySelector('#route-cat'),points=tunnelWalkPoints(state,level);
  const lengths=[0];for(let i=1;i<points.length;i++)lengths.push(lengths.at(-1)+Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y));
  const total=lengths.at(-1),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:Math.min(6500,total*5.5);
  routeAnimation={image,points,lengths,total,duration,attempt,previous:null,elapsed:0};syncRouteMotion();
}
function advanceRoute(time){
    routeFrame=null;
    const motion=routeAnimation;
    if(!motion||motion.attempt!==attempt||!motion.image.isConnected){cancelRouteWalk();return;}
    if(blocked()||document.hidden){motion.previous=null;return;}
    const {image,points,lengths,total,duration}=motion;
    // Start from the first animation timestamp and discard blocked intervals.
    if(motion.previous!==null)motion.elapsed+=Math.max(0,Math.min(80,time-motion.previous));motion.previous=time;
    const elapsed=motion.elapsed;
    const progress=duration?Math.min(1,elapsed/duration):1,distance=progress*total;let a=0;while(a<points.length-2&&lengths[a+1]<distance)a++;
    const span=lengths[a+1]-lengths[a],part=span?(distance-lengths[a])/span:1,x=points[a].x+(points[a+1].x-points[a].x)*part,y=points[a].y+(points[a+1].y-points[a].y)*part;
    image.setAttribute('x',x-43);image.setAttribute('y',y-63.17);
    const at=part<.5?points[a]:points[a+1],piece=at.piece,channel=at.channel;
    if(piece!==motion.piece||channel!==motion.channel){
      motion.module?.classList.remove('is-current');if(motion.module)delete motion.module.dataset.motionChannel;
      motion.module=piece===undefined?null:(scene.querySelector('#route-module-'+piece)||scene.querySelector('#piece-'+piece));
      if(motion.module){motion.module.classList.add('is-current');motion.module.dataset.motionChannel=channel;}
      motion.piece=piece;motion.channel=channel;
    }
    const facing=points[a+1].x<points[a].x?'left':'right',walkFrame=Math.floor(elapsed/140)%4;
    if(+image.dataset.walkFrame!==walkFrame||image.dataset.facing!==facing)setCatWalkFrame(image,walkFrame,facing);
    if(progress<1)syncRouteMotion();else{cancelRouteWalk();if(!win.open)win.showModal();}
}

function undo(){
  if(paused||platformPaused||!history.length)return;cancelRouteWalk();cancelSettle();if(win.open)win.close();endDrag();state=history.pop();
  const caption=id==='food'?foodCaptionHistory.pop():null;if(caption)selected=caption.selected;render();
  if(id==='food'){foodFeedback?.undo(state.mistakes);status(caption?.message||'');}else status('Действие отменено.');modes.changed();scheduleSettle();
}
function pause(){if(paused||platformPaused||win.open||state.won&&!routeWalking)return;paused=true;syncRouteMotion();cancelSettle();endDrag();$('#pause-dialog').showModal();window.dispatchEvent(new Event('corio:pause'));stopSandSound();if(audio)audio.suspend();}
function resume(){paused=false;if($('#pause-dialog').open)$('#pause-dialog').close();syncRouteMotion();scheduleSettle();window.dispatchEvent(new Event('corio:resume'));}
function stopSandSound(){if(sandSource){try{sandSource.stop();}catch{}sandSource.disconnect();sandSource=null;}}
function sandSound(){
  if(!sfx)return;
  try{
    audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();stopSandSound();
    if(!sandBuffer){const duration=.17;sandBuffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate);const data=sandBuffer.getChannelData(0);for(let i=0;i<data.length;i++){const t=i/data.length;data[i]=(Math.random()*2-1)*Math.sin(Math.PI*t)**1.5*(.7+.3*Math.sin(i*.018));}}
    const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();sandSource=source;source.buffer=sandBuffer;filter.type='lowpass';filter.frequency.value=1050;gain.gain.value=.065;source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();if(sandSource===source)sandSource=null;};source.start();
  }catch{}
}
scene.addEventListener('click',event=>{
  if(drag||blocked()||performance.now()<ignoreClickUntil&&!(id==='food'&&event.target.closest('[data-bin]')))return;
  if(event.target.closest('[data-crossing]')){status('Здесь два отдельных тоннеля: слева направо и сверху вниз. Повернуть между ними нельзя.');return;}
  const food=event.target.closest('[data-food]'),bin=event.target.closest('[data-bin]'),piece=event.target.closest('[data-piece]'),spot=event.target.closest('[data-spot]'),cell=event.target.closest('[data-cell]');
  if(id==='search'){if(event.target.closest('[data-cat-react]')){searchLife.callCat();return;}const find=event.target.closest('[data-find]');if(find||event.target.closest('.search-viewport svg'))commit({type:'find',item:find?.dataset.find||null});return;}
  if(food&&food.dataset.exposed!=='true')return;
  if(food)selectFood(+food.dataset.food);
  if(bin){if(selected!==null)commit({type:'sort',item:selected,bin:bin.dataset.bin});}
  if(piece)commit({type:'turn',piece:+piece.dataset.piece});
  if(spot&&id==='grooming'){if(event.detail===0)status('Двигай инструмент стрелками по участку шерсти.');return;}
  if(cell)commit({type:'reveal',cell:+cell.dataset.cell});
});
scene.addEventListener('keydown',event=>{
  if(drag||blocked())return;
  const careZone=event.target.closest('[data-spot]');
  if(id==='grooming'&&careZone&&['Enter',' ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
    event.preventDefault();const rect=careZone.getBoundingClientRect();
    if(!event.key.startsWith('Arrow')){status('Двигай инструмент стрелками по участку шерсти.');return;}
    if(!careKeyboard||careKeyboard.spot!==careZone.id){const x=rect.x+rect.width/2,y=rect.y+rect.height/2;careKeyboard={spot:careZone.id,tool:selected,x,y,stroke:beginGroomRub({x,y,time:performance.now(),zone:Number(careZone.dataset.spot)})};startCareGesture({clientX:x,clientY:y});}
    const dx=event.key==='ArrowLeft'?-12:event.key==='ArrowRight'?12:0,dy=event.key==='ArrowUp'?-12:event.key==='ArrowDown'?12:0;
    careKeyboard.x=Math.max(rect.x+rect.width*.2,Math.min(rect.right-rect.width*.2,careKeyboard.x+dx));careKeyboard.y=Math.max(rect.y+rect.height*.2,Math.min(rect.bottom-rect.height*.2,careKeyboard.y+dy));moveCareGesture({clientX:careKeyboard.x,clientY:careKeyboard.y});rubCare(careKeyboard,{x:careKeyboard.x,y:careKeyboard.y,time:performance.now()});return;
  }
  const node=event.target.closest('[data-node]'),piece=event.target.closest('[data-piece]');
  if(event.target.closest('[data-crossing]')&&['Enter',' '].includes(event.key)){event.preventDefault();status('Здесь два отдельных тоннеля: слева направо и сверху вниз. Повернуть между ними нельзя.');return;}
  if(event.target.closest('[data-cat-react]')&&['Enter',' '].includes(event.key)){event.preventDefault();searchLife.callCat();return;}
  const find=event.target.closest('[data-find]');if(find&&['Enter',' '].includes(event.key)){event.preventDefault();commit({type:'find',item:find.dataset.find});}
  if(piece&&['Enter',' '].includes(event.key)){event.preventDefault();commit({type:'turn',piece:+piece.dataset.piece});}
  if(node&&event.key.startsWith('Arrow')){event.preventDefault();const index=+node.dataset.node,p=state.points[index],dx=event.key==='ArrowLeft'?-3:event.key==='ArrowRight'?3:0,dy=event.key==='ArrowUp'?-3:event.key==='ArrowDown'?3:0;commit({type:'move',node:index,x:p.x+dx,y:p.y+dy});}
});
tools.addEventListener('click',event=>{
  if(event.target.closest('[data-sfx]')){sfx=!sfx;if(!sfx)stopSandSound();try{localStorage.setItem('corio-litter-sfx-v1',sfx?'on':'off');}catch{}render();return;}
  if(blocked())return;const tool=event.target.closest('[data-tool]'),care=event.target.closest('[data-care]');
  const zoom=event.target.closest('[data-zoom]');if(zoom){selected=Math.max(1,Math.min(2.5,selected+(zoom.dataset.zoom==='in'?.5:-.5)));render();}
  if(event.target.closest('[data-hint]')){commit({type:'hint'});if(state.hint)document.getElementById('find-'+state.hint)?.scrollIntoView({block:'nearest',inline:'center',behavior:'auto'});}
  if(tool){if(id==='grooming')endDrag();if(tool.dataset.tool==='pause'){commit({type:'pause'});return;}selected=tool.dataset.tool;render();}
  if(care)commit({type:care.dataset.care});
});
function pointFor(event){const r=scene.querySelector('.yarn-board').getBoundingClientRect();return{x:(event.clientX-r.left)/r.width*100,y:(event.clientY-r.top)/r.height*100};}
function careProgress(value){if(careGesture){careGesture.dataset.careProgress=String(value);careGesture.style.setProperty('--care-progress',String(value));}}
function rubCare(holder,point){
  const at=document.elementFromPoint(point.x,point.y)?.closest('[data-spot]');
  const zone=at?Number(at.dataset.spot):null;
  const sample={...point,zone:state.patience>0?zone:null};
  const next=advanceGroomRub(holder.stroke,sample);holder.stroke=next.rub;careProgress(next.progress);
  if(next.ready&&zone!==null){const before=state.workDone;commit({type:'clean',spot:zone,tool:holder.tool});careProgress(0);const mark=state.spots.find(s=>s.id===zone);if(state.workDone===before||state.patience===0||!mark||GROOM_STEPS[mark.kind][0]!==holder.tool)endDrag();}
}
scene.addEventListener('pointerdown',event=>{
  if(drag||event.isPrimary===false||event.button!==0||blocked()||state.won)return;
  // Chrome may adjust a touch target toward a neighbouring button. Resolve
  // food from the real pointer pixel rather than that adjusted event target.
  const pixelTarget=id==='food'||id==='yarn'||id==='grooming'?(document.elementFromPoint(event.clientX,event.clientY)||event.target):event.target;
  const node=pixelTarget.closest('[data-node]'),food=pixelTarget.closest('[data-food]');
  if(id==='food'&&food&&food.dataset.exposed!=='true'){ignoreClickUntil=performance.now()+350;return;}
  if(node){event.preventDefault();const at=pointFor(event),index=+node.dataset.node;drag={type:'yarn',pointer:event.pointerId,node:index,start:at,original:{...state.points[index]},preview:structuredClone(state.points)};scene.setPointerCapture(event.pointerId);}
  else if(food&&food.dataset.exposed==='true'){drag={type:'food',pointer:event.pointerId,item:+food.dataset.food,x:event.clientX,y:event.clientY,element:food,active:false,noteMessage:$('#status').textContent};scene.setPointerCapture(event.pointerId);}
  else if(id==='grooming'&&pixelTarget.closest('.care-cat-wrap')){event.preventDefault();careKeyboard=null;drag={type:'brush',pointer:event.pointerId,tool:selected,stroke:beginGroomRub({x:event.clientX,y:event.clientY,time:event.timeStamp,zone:pixelTarget.closest('[data-spot]')?Number(pixelTarget.closest('[data-spot]').dataset.spot):null})};scene.setPointerCapture(event.pointerId);startCareGesture(event);}
});
scene.addEventListener('pointermove',event=>{
  if(!drag||event.pointerId!==drag.pointer||blocked())return;
  if((drag.type==='food'||drag.type==='yarn'||drag.type==='brush')&&event.pointerType==='mouse'&&event.buttons===0){endDrag();return;}
  if(drag.type==='yarn'){event.preventDefault();const at=pointFor(event);drag.preview[drag.node]={x:Math.max(8,Math.min(92,drag.original.x+at.x-drag.start.x)),y:Math.max(8,Math.min(92,drag.original.y+at.y-drag.start.y))};const level=game.levels[state.index];updateYarnPreview(scene,drag.preview,level,drag.node);$('#goal').textContent=goalText(id,{...state,points:drag.preview},level);}
  if(drag.type==='brush'){event.preventDefault();moveCareGesture(event);rubCare(drag,{x:event.clientX,y:event.clientY,time:event.timeStamp});}
  if(drag?.type==='food'){
    if(!drag.active&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>8){
      const item=drag.element,r=item.getBoundingClientRect(),css=getComputedStyle(item),width=parseFloat(css.width),height=parseFloat(css.height),rotation=item.style.transform;
      Object.assign(drag,{active:true,parent:item.parentNode,nextSibling:item.nextSibling,originalStyle:item.getAttribute('style'),originalClass:item.getAttribute('class'),offsetX:drag.x-r.x-r.width/2,offsetY:drag.y-r.y-r.height/2});
      item.removeAttribute('style');item.classList.add('drag-food');
      Object.assign(item.style,{position:'fixed',pointerEvents:'none',width:width+'px',height:height+'px',transform:'translate(-50%,-50%) '+rotation});
      document.body.append(item);
      $('#food-info').innerHTML=renderFoodInfo(state,drag.item);
      status('');
    }
    if(drag.active){event.preventDefault();drag.element.style.left=(event.clientX-drag.offsetX)+'px';drag.element.style.top=(event.clientY-drag.offsetY)+'px';}
  }
});
scene.addEventListener('pointerup',event=>{
  if(!drag||event.pointerId!==drag.pointer)return;const current=drag;restoreFoodDrag(current);drag=null;
  if(current.type==='yarn'){ignoreClickUntil=performance.now()+200;const p=current.preview[current.node];commit({type:'move',node:current.node,...p});render();}
  if(current.type==='food'){ignoreClickUntil=performance.now()+200;if(current.active){status(selected===current.item?current.noteMessage:'');selected=current.item;const bin=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-bin]');if(bin)commit({type:'sort',item:current.item,bin:bin.dataset.bin});else{status('');render();}}else selectFood(current.item);}
  if(current.type==='brush'){clearCareGesture();ignoreClickUntil=performance.now()+200;}
  document.querySelector('.drag-food')?.remove();try{scene.releasePointerCapture(event.pointerId);}catch{}
});
scene.addEventListener('lostpointercapture',event=>{if((drag?.type==='food'||drag?.type==='yarn'||drag?.type==='brush')&&drag.pointer===event.pointerId)endDrag();});
scene.addEventListener('pointercancel',()=>{
  // A browser gesture may cancel a pointer even when this game has no drag.
  // Replacing the scene then would detach the cat from its running animation.
  if(!drag)return;
  endDrag();
});
$('#undo').addEventListener('click',undo);$('#restart').addEventListener('click',()=>load(state.index));$('#next').addEventListener('click',()=>load((state.index+1)%game.levels.length));$('#again').addEventListener('click',()=>load(state.index));$('#pause').addEventListener('click',pause);$('#resume').addEventListener('click',resume);
win.addEventListener('cancel',e=>e.preventDefault());$('#pause-dialog').addEventListener('cancel',()=>{paused=false;syncRouteMotion();scheduleSettle();window.dispatchEvent(new Event('corio:resume'));});
function levelButton(index){const level=game.levels[index];return`<button data-level="${index}" aria-label="Уровень ${index+1}: ${level.name}${id==='search'?', '+(level.clues==='words'?'слова':'силуэты')+', '+(level.lighting==='night'?'ночной':'обычный')+', предметов '+level.targets.length:''}">${index+1}</button>`;}
if(manyLevels)$('#level-grid').innerHTML=game.levels.map((_,index)=>levelButton(index)).join('');
else $('#levels').innerHTML=game.levels.map((_,index)=>levelButton(index)).join('');
const levelClick=event=>{const b=event.target.closest('[data-level]');if(b){load(+b.dataset.level);b.closest('dialog')?.close();}};
$('#levels').addEventListener('click',levelClick);$('#level-grid')?.addEventListener('click',levelClick);
document.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey||settingsOpen()||modes.isModalOpen()||paused||platformPaused)return;if(event.code==='KeyZ'){event.preventDefault();undo();}if(event.code==='KeyR'&&!win.open){event.preventDefault();load(state.index);}});
window.addEventListener('blur',pause);document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
window.addEventListener('corio:platform-pause',()=>{platformPaused=true;syncRouteMotion();cancelSettle();endDrag();window.dispatchEvent(new Event('corio:pause'));stopSandSound();if(audio)audio.suspend();});window.addEventListener('corio:platform-resume',()=>{platformPaused=false;syncRouteMotion();scheduleSettle();if(!paused)window.dispatchEvent(new Event('corio:resume'));});
modes=createModeController({gameId:id,host:$('[data-modes]'),getMoves:()=>state.moves,isWon:()=>state.won,canUndo:()=>history.length>0,onUndo:undo,onRestart:()=>load(state.index),onBlock:endDrag});
Object.defineProperty(window,'__mini',{value:()=>({...structuredClone(state),selected,paused,platformPaused,routeWalking,best:[...best]})});Object.defineProperty(window,'__corioModes',{value:()=>modes.state()});
const requestedLevel=Number(new URL(location.href).searchParams.get('level'));
let savedLevel=0;if(manyLevels)try{const index=Number(localStorage.getItem(currentLevelKey));if(Number.isInteger(index)&&index>=0&&index<game.levels.length)savedLevel=index;}catch{}
if(id==='search')searchLife=createSearchLife({scene,isBlocked:blocked});
if(id==='food'){foodFeedback=createFoodFeedback({scene,isBlocked:blocked});Object.defineProperty(window,'__corioFoodFeedback',{value:()=>foodFeedback.state()});}
load(Number.isInteger(requestedLevel)&&requestedLevel>=1&&requestedLevel<=game.levels.length?requestedLevel-1:savedLevel);
setupFocusUI();if(id==='food')new ResizeObserver(()=>fitFoodScene(scene)).observe(scene);
if(id==='tunnels'){
  const routePanels=new MutationObserver(syncRouteMotion);
  for(const dialog of document.querySelectorAll('dialog'))routePanels.observe(dialog,{attributes:true,attributeFilter:['open']});
}
if(id==='food'||id==='yarn'||id==='grooming'){
  const cancelSceneDrag=new MutationObserver(()=>{if(settingsOpen()){
    if(drag&&scene.hasPointerCapture(drag.pointer))scene.releasePointerCapture(drag.pointer);
    endDrag();
  }});
  for(const dialog of document.querySelectorAll('[data-game-panel]'))cancelSceneDrag.observe(dialog,{attributes:true,attributeFilter:['open']});
}

if(id==='litter'){
  const pendingPanels=new MutationObserver(()=>{cancelSettle();if(!blocked())scheduleSettle();});
  for(const dialog of document.querySelectorAll('dialog'))pendingPanels.observe(dialog,{attributes:true,attributeFilter:['open']});
  scene.addEventListener('keydown',event=>{
    const cell=event.target.closest('[data-cell]');if(!cell||blocked())return;
    const width=game.levels[state.index].w,delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-width,ArrowDown:width}[event.key];
    if(!delta)return;event.preventDefault();const cells=[...scene.querySelectorAll('[data-cell]')];let i=+cell.dataset.cell+delta;
    while(i>=0&&i<cells.length){if(!cells[i].disabled){cells[i].focus();break;}i+=delta;}
  });
}

// A held key is one care gesture, including when focus moves into the win dialog.
if(id==='grooming')document.addEventListener('keydown',event=>{
  if(event.code==='Escape'&&(drag?.type==='brush'||careKeyboard)){event.preventDefault();endDrag();return;}
  if(event.repeat&&(event.code==='Enter'||event.code==='Space')){event.preventDefault();event.stopPropagation();}
},{capture:true});

if(id==='grooming')document.addEventListener('focusin',event=>{if(careKeyboard&&event.target.id!==careKeyboard.spot){careKeyboard=null;clearCareGesture();}});

if(id==='grooming')window.addEventListener('resize',()=>endDrag());
