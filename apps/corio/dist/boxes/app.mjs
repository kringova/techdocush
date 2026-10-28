import {createModeController} from '../modes.mjs?v=0.26.0';
import {SIZE,LEVELS,createGame,move,covered,unlocked,findPath} from './game-engine.mjs?v=0.26.0';
import {paintRoom,roomArtReady,decodeRoomArt} from './room-art.mjs?v=0.26.0';
import {createActionFeedback} from '../action-feedback.mjs?v=0.26.0';

const $=selector=>document.querySelector(selector);
const canvas=$('#board'),ctx=canvas.getContext('2d'),overlay=$('#overlay');
const C=60,INK='#153c4d',PAPER='#f4ead4';
let WORLD=LEVELS[0].size*C;
canvas.width=WORLD;canvas.height=WORLD;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let game=createGame(),phase='loading',visual={x:game.x,y:game.y},transition=null,held=null,holdAt=0,pressedButton=null,history=[];
let modes=null,platformPhase=null;
let blockedAt=-1000,noticeAt=0,lastTime=0,overlayAction=null;
let frameId=null,renderedFrames=0,noticeTimer=null,freezeAt=null,heading='right';
const feedback=createActionFeedback({gameId:'boxes',scene:canvas,isBlocked:()=>document.hidden||!['playing','won'].includes(phase)||!!document.querySelector('dialog[open]:not([data-action-result="true"])')});
function cellPoint(x,y){const rect=canvas.getBoundingClientRect(),size=LEVELS[game.levelIndex].size;return{x:rect.left+(x+.5)/size*rect.width,y:rect.top+(y+.5)/size*rect.height};}
function requestDraw(){if(frameId===null&&!document.hidden&&!['loading','error'].includes(phase))frameId=requestAnimationFrame(render);}
function freezeDrawing(){feedback.cancel();if(freezeAt===null)freezeAt=performance.now();if(frameId!==null)cancelAnimationFrame(frameId);frameId=null;}
function resumeDrawing(){if(freezeAt!==null&&transition)transition.start+=performance.now()-freezeAt;freezeAt=null;requestDraw();}
function resetNotice(){clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>{if(phase==='playing')$('#status').textContent=unlocked(game)?'Дверь открыта. Теперь к выходу.':'Поставь коробки на круглые коврики.';noticeAt=0;},2400);}
const progressKey='corio-box-puzzle-50-v1';
let best=Array(LEVELS.length).fill(null);
try{const stored=JSON.parse(localStorage.getItem(progressKey));if(Array.isArray(stored))best=best.map((_,i)=>Number.isInteger(stored[i])&&stored[i]>0?stored[i]:null);}catch{}
const background=document.createElement('canvas');background.width=WORLD;background.height=WORLD;const bg=background.getContext('2d');

function resizeRendering(force=false){
  const size=Math.max(1,Math.round(canvas.getBoundingClientRect().width*(window.devicePixelRatio||1)));
  if(!force&&canvas.width===size&&background.width===size)return;
  canvas.width=size;canvas.height=size;background.width=size;background.height=size;
  const scale=size/WORLD;ctx.setTransform(scale,0,0,scale,0,0);bg.setTransform(scale,0,0,scale,0,0);
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  drawBackground();
  requestDraw();
}
new ResizeObserver(()=>resizeRendering()).observe(canvas);
window.addEventListener('resize',()=>resizeRendering());

function round(context,x,y,w,h,r,fill,stroke=INK,line=2){
  context.beginPath();context.roundRect(x,y,w,h,Math.min(r,w/2,h/2));if(fill){context.fillStyle=fill;context.fill();}if(stroke){context.strokeStyle=stroke;context.lineWidth=line;context.stroke();}
}
function furniture(p){
  const kind=p.w===1&&p.h===1&&['shelf','table'].includes(p.kind)?'planter':({shelf:'bookcase',pouf:'sofa'}[p.kind]||p.kind);
  paintRoom(bg,kind,p.x*C+3,p.y*C+3,p.w*C-6,p.h*C-6,{rotation:p.w>p.h?Math.PI/2:0});
}
function drawBackground(){
  bg.clearRect(0,0,WORLD,WORLD);bg.fillStyle='#dbc7a2';bg.fillRect(0,0,WORLD,WORLD);
  for(let row=1;row<LEVELS[game.levelIndex].size-1;row++)for(let col=1;col<LEVELS[game.levelIndex].size-1;col++)paintRoom(bg,'floor',col*C,row*C,C,C);
  // One consistent plan view. The furniture footprint is its collision shape.
  bg.fillStyle=INK;bg.fillRect(0,0,WORLD,55);bg.fillRect(0,0,55,WORLD);bg.fillRect((WORLD-55),0,55,WORLD);bg.fillRect(0,(WORLD-55),WORLD,55);
  bg.strokeStyle='#ffffff17';bg.lineWidth=1;bg.strokeRect(18,18,WORLD-36,WORLD-36);
  const level=LEVELS[game.levelIndex];
  const dx=level.exit.x*C+4,dy=level.exit.y===level.size-2?(WORLD-55):0;
  bg.fillStyle='#b58a53';bg.fillRect(dx,dy,52,55);
  paintRoom(bg,'door',dx,dy,52,55);
  round(bg,level.exit.x*C+4,level.exit.y*C+3,52,53,4,'#d9985228','#d9985270',1);
  const light=bg.createRadialGradient(WORLD*.16,WORLD*.05,0,WORLD*.16,WORLD*.05,WORLD*.95);light.addColorStop(0,'#ffdf9d18');light.addColorStop(1,'#1737440b');bg.fillStyle=light;bg.fillRect(55,55,WORLD-110,WORLD-110);
  // Logical cells are visible on the static floor: exactly one cell per step.
  for(let row=1;row<level.size-1;row++)for(let col=1;col<level.size-1;col++){
    if((row+col)%2===0){bg.fillStyle='#17374416';bg.fillRect(col*C,row*C,C,C);}
  }
  bg.strokeStyle='#183a4d9c';bg.lineWidth=1.8;bg.beginPath();
  for(let cell=1;cell<level.size;cell++){bg.moveTo(cell*C,C);bg.lineTo(cell*C,WORLD-C);bg.moveTo(C,cell*C);bg.lineTo(WORLD-C,cell*C);}bg.stroke();
  level.props.forEach(furniture);
  bg.fillStyle='#153c4d10';for(let i=0;i<600;i++){const x=(i*73+19)%(WORLD-110)+55,y=(i*137+47)%(WORLD-110)+55;bg.fillRect(x,y,1,1);}
}
function render(time){
  frameId=null;renderedFrames++;if(document.hidden)return;
  ctx.clearRect(0,0,WORLD,WORLD);ctx.drawImage(background,0,0,WORLD,WORLD);
  const level=LEVELS[game.levelIndex];
  const doorOpen=unlocked(game),doorY=level.exit.y===level.size-2?(WORLD-28):28;
  if(doorOpen){round(ctx,level.exit.x*C+10,doorY-23,40,46,2,'#f4d392','#d99852',2);}
  else{ctx.strokeStyle=INK;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc((level.exit.x+.5)*C,doorY-3,6,Math.PI,0);ctx.stroke();round(ctx,(level.exit.x+.5)*C-9,doorY-3,18,15,3,INK,null);ctx.fillStyle='#d99852';ctx.beginPath();ctx.arc((level.exit.x+.5)*C,doorY+3,2,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=doorOpen?.65:.22;ctx.fillStyle=doorOpen?'#d99852':INK;
  ctx.beginPath();const ax=(level.exit.x+.5)*C,ay=(level.exit.y+.52)*C;
  ctx.save();ctx.translate(ax,ay);if(level.exit.y===level.size-2)ctx.rotate(Math.PI);ctx.moveTo(-6,2);ctx.lineTo(0,-5);ctx.lineTo(6,2);ctx.lineTo(6,7);ctx.lineTo(0,0);ctx.lineTo(-6,7);ctx.closePath();ctx.fill();ctx.restore();ctx.globalAlpha=1;
  for(const target of level.targets){
    const filled=game.boxes.some(b=>b.x===target.x&&b.y===target.y),tx=(target.x+.5)*C,ty=(target.y+.5)*C;
    paintRoom(ctx,'rug',tx-25,ty-25,50,50,{preserve:true});
    if(filled){ctx.strokeStyle='#b8d199';ctx.lineWidth=3;ctx.strokeRect(target.x*C+4,target.y*C+4,52,52);}
  }
  for(const box of game.boxes){
    const bx=box.x*C+7,by=box.y*C+7,onMat=level.targets.some(t=>t.x===box.x&&t.y===box.y);
    paintRoom(ctx,'box',bx,by,46,46);
    if(onMat){ctx.strokeStyle='#b8d199';ctx.lineWidth=2;ctx.strokeRect(bx-2,by-2,50,50);}
  }
  let hop=0;
  if(transition&&(phase==='playing'||phase==='won')){const amount=Math.max(0,Math.min(1,(time-transition.start)/(reduced?1:105))),ease=1-(1-amount)**3;visual.x=transition.x+(game.x-transition.x)*ease;visual.y=transition.y+(game.y-transition.y)*ease;hop=reduced?0:Math.sin(amount*Math.PI)*3;if(amount>=1)transition=null;}
  const x=(visual.x+.5)*C,y=(visual.y+.52)*C;
  ctx.fillStyle='#153c4d2e';ctx.beginPath();ctx.ellipse(x,y+17,19,7,0,0,Math.PI*2);ctx.fill();
  const bump=time-blockedAt<180&&!reduced?Math.sin((time-blockedAt)/22)*2:0;
  paintRoom(ctx,'cat',x+bump-27,y-hop-27,54,54,{rotation:{right:0,down:Math.PI/2,left:Math.PI,up:-Math.PI/2}[heading],preserve:true});
  if(held&&phase==='playing'&&time>=holdAt&&!transition){step(held);holdAt=time+155;}
  lastTime=time;if((phase==='playing'||phase==='won')&&(transition||held||!reduced&&time-blockedAt<180))requestDraw();
}
function clearHold(){held=null;if(pressedButton){pressedButton.classList.remove('held');pressedButton=null;}}
function refresh(){
  const level=LEVELS[game.levelIndex];$('#room-number').textContent=`${String(game.levelIndex+1).padStart(2,'0')} / ${LEVELS.length}`;$('#room-name').textContent=level.name;$('#moves').textContent=game.moves;
  $('#targets').textContent=`${covered(level,game.boxes)} / ${level.targets.length}`;$('#undo').disabled=history.length===0;
  $('#best').textContent=best[game.levelIndex]?`Лучший путь: ${best[game.levelIndex]} шагов.`:`Поле ${level.size-2}×${level.size-2} · коробок: ${level.boxes.length}`;
  for(const button of $('#levels').children){const index=+button.dataset.level;button.setAttribute('aria-current',String(index===game.levelIndex));button.classList.toggle('completed',best[index]!==null);}
  canvas.setAttribute('aria-label',`${level.name}. Кот: столбец ${game.x}, ряд ${game.y}. Дверь: столбец ${level.exit.x}, ряд ${level.exit.y}. Шагов: ${game.moves}.`);
  requestDraw();
}
function loadLevel(index){
  feedback.cancel();window.dispatchEvent(new Event('corio:resume'));clearHold();clearTimeout(noticeTimer);freezeAt=null;if(overlay.open)overlay.close();game=createGame(index);modes?.newAttempt(findPath(LEVELS[index]).length);WORLD=LEVELS[index].size*C;resizeRendering(true);history=[];phase='playing';visual={x:game.x,y:game.y};transition=null;heading=LEVELS[index].exit.x>game.x?'right':'left';noticeAt=0;$('#status').textContent='Поставь коробки на круглые коврики.';drawBackground();refresh();
}
function undo(){if(!history.length||!['playing','won'].includes(phase))return;feedback.cancel();clearHold();game=history.pop();transition=null;visual={x:game.x,y:game.y};phase='playing';if(overlay.open)overlay.close();$('#status').textContent='Ход отменён.';noticeAt=performance.now();resetNotice();refresh();modes?.changed();}
function step(direction){
  if(phase!=='playing'||$('#level-picker').open||transition)return;
  if(modes&&!modes.guard())return;
  const previous=game,next=move(previous,direction);if(next===previous){blockedAt=performance.now();$('#status').textContent='Тут не пройти. Попробуй другой проход.';noticeAt=performance.now();resetNotice();feedback.emit('boxes.blocked',{point:cellPoint(game.x,game.y)});requestDraw();return;}
  heading=direction;
  history.push(previous);transition={x:visual.x,y:visual.y,start:performance.now()};game=next;
  const pushed=game.pushes>previous.pushes,movedBox=pushed?game.boxes.find((box,index)=>box.x!==previous.boxes[index].x||box.y!==previous.boxes[index].y):null;
  feedback.emit(pushed?'boxes.push':'boxes.step',{point:cellPoint(movedBox?.x??game.x,movedBox?.y??game.y),material:pushed?'cardboard':'wood'});
  if(movedBox&&LEVELS[game.levelIndex].targets.some(target=>target.x===movedBox.x&&target.y===movedBox.y))feedback.emit('boxes.mat',{point:cellPoint(movedBox.x,movedBox.y)});
  if(!unlocked(previous)&&unlocked(game)){const exit=LEVELS[game.levelIndex].exit;feedback.emit('boxes.unlock',{point:cellPoint(exit.x,exit.y)});}
  refresh();modes?.changed();
  if(unlocked(game))$('#status').textContent='Все коврики заняты. Дверь открыта.';
  else if(game.x===LEVELS[game.levelIndex].exit.x&&game.y===LEVELS[game.levelIndex].exit.y)$('#status').textContent='Дверь закрыта: займи коробками все коврики.';
  if(game.won){
    phase='won';clearHold();best[game.levelIndex]=Math.min(best[game.levelIndex]??Infinity,game.moves);try{localStorage.setItem(progressKey,JSON.stringify(best));}catch{}refresh();
    const completedGame=game;
    setTimeout(()=>{if(phase!=='won'||game!==completedGame)return;feedback.emit('boxes.win',{point:cellPoint(game.x,game.y)});showOverlay('won');},reduced?0:140);
  }
}
function showOverlay(kind){
  clearHold();const won=kind==='won',last=game.levelIndex===LEVELS.length-1;
  overlay.dataset.actionResult=String(won);
  $('#win-picture').hidden=!won;$('#overlay-label').textContent=won?(last?'Все уровни пройдены':'Дверь найдена'):'Пауза';
  $('#overlay-title').textContent=won?(last?'Можно отдыхать.':'Вот и выход.'):'Кот подождёт.';
  $('#overlay-copy').textContent=won?`${game.moves} шагов, ${game.pushes} толчков. ${last?'Все комнаты пройдены. Можно вернуться в любую.':'Следующая комната уже открыта.'}`:'Продолжим с того же места.';
  $('#primary').textContent=won?(last?'В первую комнату':'Следующая комната'):'Продолжить';$('#secondary').textContent=won?'Ещё раз':'Начать заново';
  overlayAction=won?()=>loadLevel(last?0:game.levelIndex+1):resume;
  if(!overlay.open)overlay.showModal();
}
function pause(){if(phase!=='playing'||$('#level-picker').open)return;window.dispatchEvent(new Event('corio:pause'));phase='paused';freezeDrawing();showOverlay('paused');}
function resume(){if(phase!=='paused')return;window.dispatchEvent(new Event('corio:resume'));phase='playing';overlay.close();resumeDrawing();canvas.focus({preventScroll:true});}
$('#primary').addEventListener('click',()=>{overlayAction?.();canvas.focus({preventScroll:true});});
$('#secondary').addEventListener('click',()=>{loadLevel(game.levelIndex);canvas.focus({preventScroll:true});});
overlay.addEventListener('cancel',event=>{event.preventDefault();if(phase==='paused')resume();});
$('#restart').addEventListener('click',()=>{loadLevel(game.levelIndex);canvas.focus({preventScroll:true});});
$('#undo').addEventListener('click',()=>{undo();canvas.focus({preventScroll:true});});
$('#pause').addEventListener('click',pause);
$('#choose-level').addEventListener('click',()=>{clearHold();freezeDrawing();$('#level-picker').showModal();});
$('#close-levels').addEventListener('click',()=>$('#level-picker').close());
$('#level-picker').addEventListener('close',()=>{if(phase==='playing')resumeDrawing();});
for(let index=0;index<LEVELS.length;index++){const button=document.createElement('button');button.textContent=index+1;button.dataset.level=index;button.setAttribute('aria-label',`Комната ${index+1}: ${LEVELS[index].name}`);button.addEventListener('click',()=>{if($('#level-picker').open)$('#level-picker').close();loadLevel(index);canvas.focus({preventScroll:true});});$('#levels').append(button);}
for(const button of document.querySelectorAll('[data-direction]')){
  button.addEventListener('pointerdown',event=>{if(event.button!==0||phase!=='playing')return;event.preventDefault();clearHold();pressedButton=button;button.classList.add('held');button.setPointerCapture(event.pointerId);held=button.dataset.direction;step(held);holdAt=performance.now()+240;});
  button.addEventListener('pointerup',clearHold);button.addEventListener('pointercancel',clearHold);button.addEventListener('lostpointercapture',clearHold);
}
const keyDirections={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right'};
document.addEventListener('keydown',event=>{
  if(event.target.closest?.('input,textarea,select,[contenteditable=true],[data-music]'))return;
  if(event.ctrlKey||event.metaKey||event.altKey)return;
  if($('#level-picker').open||modes?.isModalOpen())return;
  if(event.code==='Escape'){if(phase==='playing'){event.preventDefault();pause();}return;}
  if(overlay.open||$('#level-picker').open)return;
  const direction=keyDirections[event.code];
  if(direction){event.preventDefault();if(!event.repeat){clearHold();held=direction;step(direction);holdAt=performance.now()+240;}}
  if(event.code==='KeyR'&&!event.repeat){event.preventDefault();loadLevel(game.levelIndex);}
  if(event.code==='KeyZ'&&!event.repeat){event.preventDefault();undo();}
});
document.addEventListener('keyup',event=>{if(keyDirections[event.code]===held)clearHold();});
window.addEventListener('blur',()=>{clearHold();pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearHold();pause();}});
let touch=null;
canvas.addEventListener('pointerdown',event=>{if(phase!=='playing'||event.button!==0)return;event.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);touch={x:event.clientX,y:event.clientY};});
canvas.addEventListener('pointerup',event=>{
  if(!touch)return;const dx=event.clientX-touch.x,dy=event.clientY-touch.y;touch=null;
  if(Math.max(Math.abs(dx),Math.abs(dy))>18){step(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));return;}
  const rect=canvas.getBoundingClientRect(),x=Math.floor((event.clientX-rect.left)/rect.width*LEVELS[game.levelIndex].size),y=Math.floor((event.clientY-rect.top)/rect.height*LEVELS[game.levelIndex].size);
  const ox=x-game.x,oy=y-game.y;if(Math.abs(ox)+Math.abs(oy)===1)step(ox?(ox>0?'right':'left'):(oy>0?'down':'up'));
});
canvas.addEventListener('pointercancel',()=>{touch=null;clearHold();});
// Read-only state is available for prototype verification, never for moving the cat.
Object.defineProperty(window,'__corio',{value:()=>({...game,boxes:game.boxes.map(b=>({...b})),phase,actionFeedback:feedback.state(),animating:!!transition,renderedFrames,framePending:frameId!==null,undoDepth:history.length,covered:covered(LEVELS[game.levelIndex],game.boxes),unlocked:unlocked(game),best:[...best],artVersion:'boxes-kit-v2-cat-v2-planter-v1',heading,assetsReady:roomArtReady()}),writable:false});
modes=createModeController({gameId:'boxes',host:document.querySelector('[data-modes]'),getMoves:()=>game.moves,isWon:()=>game.won,canUndo:()=>history.length>0,onUndo:undo,onRestart:()=>loadLevel(game.levelIndex),onBlock:clearHold,getSDK:async()=>window.__corioSDK||null});
new MutationObserver(()=>{if($('#mode-dialog').open){clearHold();freezeDrawing();}else if(phase==='playing')resumeDrawing();}).observe($('#mode-dialog'),{attributes:true,attributeFilter:['open']});
Object.defineProperty(window,'__corioModes',{value:()=>modes.state()});
window.addEventListener('corio:platform-pause',()=>{if(platformPhase===null)platformPhase=phase;phase='platform';clearHold();freezeDrawing();window.dispatchEvent(new Event('corio:pause'));});
window.addEventListener('corio:platform-resume',()=>{if(platformPhase!==null){phase=platformPhase;platformPhase=null;if(phase!=='paused'){resumeDrawing();window.dispatchEvent(new Event('corio:resume'));}}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();freezeDrawing();}else if(phase==='playing')resumeDrawing();});
try{await decodeRoomArt();$('#loading').hidden=true;loadLevel(0);requestDraw();}catch{phase='error';$('#loading').textContent='Не загрузился кот. Обнови страницу.';}
