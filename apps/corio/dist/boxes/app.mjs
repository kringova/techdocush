import {createModeController} from '../modes.mjs?v=0.6.0';
import {SIZE,LEVELS,createGame,move,covered,unlocked,findPath} from './game-engine.mjs?v=0.6.0';

const $=selector=>document.querySelector(selector);
const canvas=$('#board'),ctx=canvas.getContext('2d'),overlay=$('#overlay');
const C=60,INK='#153c4d',PAPER='#f4ead4';
let WORLD=LEVELS[0].size*C;
canvas.width=WORLD;canvas.height=WORLD;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let game=createGame(),phase='loading',facing=1,visual={x:game.x,y:game.y},transition=null,held=null,holdAt=0,pressedButton=null,history=[];
let modes=null,platformPhase=null;
let soundEnabled=false,audio=null,blockedAt=-1000,noticeAt=0,lastTime=0,overlayAction=null;
const progressKey='corio-box-puzzle-50-v1';
let best=Array(LEVELS.length).fill(null);
try{const stored=JSON.parse(localStorage.getItem(progressKey));if(Array.isArray(stored))best=best.map((_,i)=>Number.isInteger(stored[i])&&stored[i]>0?stored[i]:null);}catch{}
const sprite=new Image();sprite.src='../assets/player-v1.png';
const background=document.createElement('canvas');background.width=WORLD;background.height=WORLD;const bg=background.getContext('2d');

function resizeRendering(force=false){
  const size=Math.max(1,Math.round(canvas.getBoundingClientRect().width*(window.devicePixelRatio||1)));
  if(!force&&canvas.width===size&&background.width===size)return;
  canvas.width=size;canvas.height=size;background.width=size;background.height=size;
  const scale=size/WORLD;ctx.setTransform(scale,0,0,scale,0,0);bg.setTransform(scale,0,0,scale,0,0);
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  drawBackground();
}
new ResizeObserver(()=>resizeRendering()).observe(canvas);
window.addEventListener('resize',()=>resizeRendering());

function round(context,x,y,w,h,r,fill,stroke=INK,line=2){
  context.beginPath();context.roundRect(x,y,w,h,Math.min(r,w/2,h/2));if(fill){context.fillStyle=fill;context.fill();}if(stroke){context.strokeStyle=stroke;context.lineWidth=line;context.stroke();}
}
function furniture(p){
  const x=p.x*C+3,y=p.y*C+3,w=p.w*C-6,h=p.h*C-6;
  round(bg,x+3,y+5,w,h,9,'#153c4d1c',null);
  if(p.kind==='sofa'){
    round(bg,x,y,w,h,10,'#9cafa0');
    const horizontal=w>=h,n=Math.max(1,Math.round((horizontal?w:h)/78));
    round(bg,x+7,y+7,w-14,h-14,6,'#a3b298',INK,1.5);
    for(let i=1;i<n;i++){
      bg.beginPath();if(horizontal){const z=x+10+(w-20)*i/n;bg.moveTo(z,y+9);bg.lineTo(z,y+h-10);}else{const z=y+10+(h-20)*i/n;bg.moveTo(x+9,z);bg.lineTo(x+w-10,z);}bg.strokeStyle='#153c4d80';bg.lineWidth=1.5;bg.stroke();
    }
    if(horizontal){round(bg,x+2,y+3,13,h-6,4,'#819b8c',INK,1.5);round(bg,x+w-15,y+3,13,h-6,4,'#819b8c',INK,1.5);}
    else{round(bg,x+3,y+2,w-6,13,4,'#819b8c',INK,1.5);round(bg,x+3,y+h-15,w-6,13,4,'#819b8c',INK,1.5);}
  }else if(p.kind==='shelf'){
    round(bg,x,y,w,h,4,'#bd8952');
    const horizontal=w>=h,length=horizontal?w:h,depth=horizontal?h:w;
    const colors=['#153c4d','#f4ead4','#789a91','#c6754c','#d7bc7d'];
    for(let i=0,pos=8;pos<length-12;i++){
      const thick=10+(i*7%14),tall=depth-18-(i%3)*4;
      if(horizontal){round(bg,x+pos,y+depth-8-tall,Math.min(thick,length-pos-6),tall,1,colors[i%5],INK,.8);}
      else{round(bg,x+depth-8-tall,y+pos,tall,Math.min(thick,length-pos-6),1,colors[i%5],INK,.8);}pos+=thick+3;
    }
    bg.strokeStyle=INK;bg.lineWidth=3;bg.strokeRect(x+2,y+2,w-4,h-4);
  }else if(p.kind==='table'){
    round(bg,x,y,w,h,12,'#c18f5b');round(bg,x+7,y+7,w-14,h-14,8,'#dca76b',INK,1);
    bg.strokeStyle='#b98047';bg.lineWidth=1;
    for(let i=0;i<3;i++){bg.beginPath();bg.moveTo(x+15,y+14+i*(h-28)/3);bg.lineTo(x+w-16,y+17+i*(h-28)/3);bg.stroke();}
    const bx=x+w*.58,by=y+h*.45;round(bg,bx-16,by-10,27,21,2,'#153c4d');round(bg,bx-20,by-17,29,21,2,'#f4ead4',INK,1.5);
    bg.strokeStyle='#d99852';bg.lineWidth=2;bg.beginPath();bg.moveTo(bx-14,by-10);bg.lineTo(bx+2,by-10);bg.stroke();
  }else{
    round(bg,x,y,w,h,Math.min(w,h)/2,'#b99569');round(bg,x+6,y+6,w-12,h-12,Math.min(w,h)/2,'#c9b188',INK,1);
    bg.beginPath();bg.moveTo(x+w*.3,y+h*.5);bg.lineTo(x+w*.7,y+h*.5);bg.strokeStyle='#153c4d66';bg.lineWidth=1.5;bg.stroke();
  }
}
function drawBackground(){
  bg.clearRect(0,0,WORLD,WORLD);bg.fillStyle='#dbc7a2';bg.fillRect(0,0,WORLD,WORLD);
  for(let row=0;row<WORLD/30;row++){
    bg.fillStyle=row%3===0?'#ceb68e':'#ddcaa5';bg.fillRect(0,row*30,WORLD,30);
    bg.strokeStyle='#c4a67855';bg.lineWidth=1;bg.beginPath();bg.moveTo(0,row*30);bg.lineTo(WORLD,row*30);bg.stroke();
    for(let col=0;col<Math.ceil(WORLD/150)+1;col++){const x=col*150+(row%2)*75;bg.beginPath();bg.moveTo(x,row*30);bg.lineTo(x,row*30+30);bg.stroke();}
  }
  // One consistent plan view. The furniture footprint is its collision shape.
  bg.fillStyle=INK;bg.fillRect(0,0,WORLD,55);bg.fillRect(0,0,55,WORLD);bg.fillRect((WORLD-55),0,55,WORLD);bg.fillRect(0,(WORLD-55),WORLD,55);
  bg.strokeStyle='#ffffff17';bg.lineWidth=1;bg.strokeRect(18,18,WORLD-36,WORLD-36);
  const level=LEVELS[game.levelIndex];
  const dx=level.exit.x*C+4,dy=level.exit.y===level.size-2?(WORLD-55):0;
  bg.fillStyle='#b58a53';bg.fillRect(dx,dy,52,55);
  round(bg,dx+6,dy+5,40,45,2,'#d8b379',INK,1.5);
  round(bg,level.exit.x*C+4,level.exit.y*C+3,52,53,4,'#d9985228','#d9985270',1);
  const light=bg.createRadialGradient(WORLD*.16,WORLD*.05,0,WORLD*.16,WORLD*.05,WORLD*.95);light.addColorStop(0,'#ffdf9d18');light.addColorStop(1,'#1737440b');bg.fillStyle=light;bg.fillRect(55,55,WORLD-110,WORLD-110);
  level.props.forEach(furniture);
  bg.fillStyle='#153c4d10';for(let i=0;i<600;i++){const x=(i*73+19)%(WORLD-110)+55,y=(i*137+47)%(WORLD-110)+55;bg.fillRect(x,y,1,1);}
}
function render(time){
  ctx.clearRect(0,0,WORLD,WORLD);ctx.drawImage(background,0,0,WORLD,WORLD);
  const level=LEVELS[game.levelIndex];
  const doorOpen=unlocked(game),doorY=level.exit.y===level.size-2?(WORLD-28):28;
  if(doorOpen){round(ctx,level.exit.x*C+10,doorY-23,40,46,2,'#f4d392','#d99852',2);}
  else{ctx.strokeStyle=INK;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc((level.exit.x+.5)*C,doorY-3,6,Math.PI,0);ctx.stroke();round(ctx,(level.exit.x+.5)*C-9,doorY-3,18,15,3,INK,null);ctx.fillStyle='#d99852';ctx.beginPath();ctx.arc((level.exit.x+.5)*C,doorY+3,2,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=doorOpen?.6+Math.sin(time/650)*.15:.22;ctx.fillStyle=doorOpen?'#d99852':INK;
  ctx.beginPath();const ax=(level.exit.x+.5)*C,ay=(level.exit.y+.52)*C;
  ctx.save();ctx.translate(ax,ay);if(level.exit.y===level.size-2)ctx.rotate(Math.PI);ctx.moveTo(-6,2);ctx.lineTo(0,-5);ctx.lineTo(6,2);ctx.lineTo(6,7);ctx.lineTo(0,0);ctx.lineTo(-6,7);ctx.closePath();ctx.fill();ctx.restore();ctx.globalAlpha=1;
  for(const target of level.targets){
    const filled=game.boxes.some(b=>b.x===target.x&&b.y===target.y),tx=(target.x+.5)*C,ty=(target.y+.5)*C;
    ctx.beginPath();ctx.arc(tx,ty,24,0,Math.PI*2);ctx.fillStyle=filled?'#84a789':'#b4c4b0';ctx.fill();ctx.strokeStyle=filled?'#4d795c':INK;ctx.lineWidth=2;ctx.stroke();
    ctx.setLineDash([3,3]);ctx.beginPath();ctx.arc(tx,ty,19,0,Math.PI*2);ctx.strokeStyle='#f4ead4';ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle=INK;ctx.beginPath();ctx.ellipse(tx,ty+4,6,5,0,0,Math.PI*2);ctx.fill();for(const[ox,oy]of [[-7,-4],[0,-7],[7,-4]]){ctx.beginPath();ctx.arc(tx+ox,ty+oy,2.7,0,Math.PI*2);ctx.fill();}
  }
  for(const box of game.boxes){
    const bx=box.x*C+7,by=box.y*C+7,onMat=level.targets.some(t=>t.x===box.x&&t.y===box.y);
    round(ctx,bx+2,by+3,46,46,4,'#153c4d2e',null);round(ctx,bx,by,46,46,4,onMat?'#c3ba88':'#d5a265',onMat?'#426e54':INK,2);
    ctx.strokeStyle=onMat?'#769773':'#b27f46';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(bx+3,by+3);ctx.lineTo(bx+23,by+14);ctx.lineTo(bx+43,by+3);ctx.moveTo(bx+3,by+43);ctx.lineTo(bx+23,by+32);ctx.lineTo(bx+43,by+43);ctx.stroke();
    ctx.fillStyle=onMat?'#8caa86':'#edcf94';ctx.fillRect(bx+18,by+2,10,42);ctx.strokeStyle='#153c4d66';ctx.lineWidth=1;ctx.strokeRect(bx+18,by+2,10,42);
  }
  let hop=0;
  if(transition){const amount=Math.min(1,(time-transition.start)/(reduced?1:105)),ease=1-(1-amount)**3;visual.x=transition.x+(game.x-transition.x)*ease;visual.y=transition.y+(game.y-transition.y)*ease;hop=reduced?0:Math.sin(amount*Math.PI)*3;if(amount>=1)transition=null;}
  const x=(visual.x+.5)*C,y=(visual.y+.52)*C;
  ctx.fillStyle='#153c4d2e';ctx.beginPath();ctx.ellipse(x,y+17,19,7,0,0,Math.PI*2);ctx.fill();
  const bump=time-blockedAt<180&&!reduced?Math.sin((time-blockedAt)/22)*2:0;
  if(sprite.complete&&sprite.naturalWidth){ctx.save();ctx.translate(x+bump,y-hop);ctx.scale(facing,1);ctx.drawImage(sprite,-34,-35,68,68);ctx.restore();}
  if(held&&phase==='playing'&&time>=holdAt&&!transition){step(held);holdAt=time+155;}
  if(noticeAt&&time-noticeAt>2400){$('#status').textContent=doorOpen?'Дверь открыта. Теперь к выходу.':'Поставь коробки на круглые коврики.';noticeAt=0;}
  lastTime=time;requestAnimationFrame(render);
}
function tone(kind){
  if(!soundEnabled)return;
  try{
    audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();
    const now=audio.currentTime,tones=kind==='win'?[523.25,659.25,783.99]:kind==='blocked'?[110]:[180];
    tones.forEach((frequency,i)=>{const oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,now+i*.1);gain.gain.setValueAtTime(0,now+i*.1);gain.gain.linearRampToValueAtTime(kind==='step'?.025:.045,now+i*.1+.012);gain.gain.exponentialRampToValueAtTime(.001,now+i*.1+(kind==='win'?.32:.085));oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(now+i*.1);oscillator.stop(now+i*.1+.4);});
  }catch{}
}
function clearHold(){held=null;if(pressedButton){pressedButton.classList.remove('held');pressedButton=null;}}
function refresh(){
  const level=LEVELS[game.levelIndex];$('#room-number').textContent=`${String(game.levelIndex+1).padStart(2,'0')} / ${LEVELS.length}`;$('#room-name').textContent=level.name;$('#moves').textContent=game.moves;
  $('#targets').textContent=`${covered(level,game.boxes)} / ${level.targets.length}`;$('#undo').disabled=history.length===0;
  $('#best').textContent=best[game.levelIndex]?`Лучший путь: ${best[game.levelIndex]} шагов.`:`Поле ${level.size-2}×${level.size-2} · коробок: ${level.boxes.length}`;
  for(const button of $('#levels').children){const index=+button.dataset.level;button.setAttribute('aria-current',String(index===game.levelIndex));button.classList.toggle('completed',best[index]!==null);}
  canvas.setAttribute('aria-label',`${level.name}. Кот: столбец ${game.x}, ряд ${game.y}. Дверь: столбец ${level.exit.x}, ряд ${level.exit.y}. Шагов: ${game.moves}.`);
}
function loadLevel(index){
  window.dispatchEvent(new Event('corio:resume'));clearHold();if(overlay.open)overlay.close();game=createGame(index);modes?.newAttempt(findPath(LEVELS[index]).length);WORLD=LEVELS[index].size*C;resizeRendering(true);history=[];phase='playing';visual={x:game.x,y:game.y};transition=null;facing=LEVELS[index].exit.x>game.x?-1:1;noticeAt=0;$('#status').textContent='Поставь коробки на круглые коврики.';drawBackground();refresh();
}
function undo(){if(!history.length||!['playing','won'].includes(phase))return;clearHold();game=history.pop();transition=null;visual={x:game.x,y:game.y};phase='playing';if(overlay.open)overlay.close();$('#status').textContent='Ход отменён.';noticeAt=performance.now();refresh();modes?.changed();}
function step(direction){
  if(phase!=='playing'||$('#level-picker').open||transition)return;
  if(modes&&!modes.guard())return;
  const next=move(game,direction);if(next===game){blockedAt=performance.now();$('#status').textContent='Тут не пройти. Попробуй другой проход.';noticeAt=performance.now();tone('blocked');return;}
  if(direction==='left')facing=1;if(direction==='right')facing=-1;
  history.push(game);transition={x:visual.x,y:visual.y,start:performance.now()};game=next;tone('step');refresh();modes?.changed();
  if(unlocked(game))$('#status').textContent='Все коврики заняты. Дверь открыта.';
  else if(game.x===LEVELS[game.levelIndex].exit.x&&game.y===LEVELS[game.levelIndex].exit.y)$('#status').textContent='Дверь закрыта: займи коробками все коврики.';
  if(game.won){
    phase='won';clearHold();best[game.levelIndex]=Math.min(best[game.levelIndex]??Infinity,game.moves);try{localStorage.setItem(progressKey,JSON.stringify(best));}catch{}refresh();
    const completedGame=game;
    setTimeout(()=>{if(phase!=='won'||game!==completedGame)return;tone('win');showOverlay('won');},reduced?0:140);
  }
}
function showOverlay(kind){
  clearHold();const won=kind==='won',last=game.levelIndex===LEVELS.length-1;
  $('#win-picture').hidden=!won;$('#overlay-label').textContent=won?(last?'Все уровни пройдены':'Дверь найдена'):'Пауза';
  $('#overlay-title').textContent=won?(last?'Можно отдыхать.':'Вот и выход.'):'Кот подождёт.';
  $('#overlay-copy').textContent=won?`${game.moves} шагов, ${game.pushes} толчков. ${last?'Все комнаты пройдены. Можно вернуться в любую.':'Следующая комната уже открыта.'}`:'Продолжим с того же места.';
  $('#primary').textContent=won?(last?'В первую комнату':'Следующая комната'):'Продолжить';$('#secondary').textContent=won?'Ещё раз':'Начать заново';
  overlayAction=won?()=>loadLevel(last?0:game.levelIndex+1):resume;
  if(!overlay.open)overlay.showModal();
}
function pause(){if(phase!=='playing'||$('#level-picker').open)return;window.dispatchEvent(new Event('corio:pause'));phase='paused';showOverlay('paused');if(audio)audio.suspend();}
function resume(){if(phase!=='paused')return;window.dispatchEvent(new Event('corio:resume'));phase='playing';overlay.close();canvas.focus({preventScroll:true});}
$('#primary').addEventListener('click',()=>{overlayAction?.();canvas.focus({preventScroll:true});});
$('#secondary').addEventListener('click',()=>{loadLevel(game.levelIndex);canvas.focus({preventScroll:true});});
overlay.addEventListener('cancel',event=>{event.preventDefault();if(phase==='paused')resume();});
$('#restart').addEventListener('click',()=>{loadLevel(game.levelIndex);canvas.focus({preventScroll:true});});
$('#undo').addEventListener('click',()=>{undo();canvas.focus({preventScroll:true});});
$('#pause').addEventListener('click',pause);
$('#choose-level').addEventListener('click',()=>{clearHold();$('#level-picker').showModal();});
$('#close-levels').addEventListener('click',()=>$('#level-picker').close());
$('#sound').addEventListener('click',()=>{soundEnabled=!soundEnabled;$('#sound').setAttribute('aria-pressed',String(soundEnabled));$('#sound').setAttribute('aria-label',soundEnabled?'Выключить звук':'Включить звук');if(soundEnabled)tone('step');else if(audio)audio.suspend();});
for(let index=0;index<LEVELS.length;index++){const button=document.createElement('button');button.textContent=index+1;button.dataset.level=index;button.setAttribute('aria-label',`Комната ${index+1}: ${LEVELS[index].name}`);button.addEventListener('click',()=>{if($('#level-picker').open)$('#level-picker').close();loadLevel(index);canvas.focus({preventScroll:true});});$('#levels').append(button);}
for(const button of document.querySelectorAll('[data-direction]')){
  button.addEventListener('pointerdown',event=>{if(event.button!==0||phase!=='playing')return;event.preventDefault();clearHold();pressedButton=button;button.classList.add('held');button.setPointerCapture(event.pointerId);held=button.dataset.direction;step(held);holdAt=performance.now()+240;});
  button.addEventListener('pointerup',clearHold);button.addEventListener('pointercancel',clearHold);button.addEventListener('lostpointercapture',clearHold);
}
const keyDirections={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right'};
document.addEventListener('keydown',event=>{
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
Object.defineProperty(window,'__corio',{value:()=>({...game,boxes:game.boxes.map(b=>({...b})),phase,soundEnabled,animating:!!transition,undoDepth:history.length,covered:covered(LEVELS[game.levelIndex],game.boxes),unlocked:unlocked(game),best:[...best],assetsReady:sprite.complete&&sprite.naturalWidth>0}),writable:false});
modes=createModeController({gameId:'boxes',host:document.querySelector('[data-modes]'),getMoves:()=>game.moves,isWon:()=>game.won,canUndo:()=>history.length>0,onUndo:undo,onRestart:()=>loadLevel(game.levelIndex),onBlock:clearHold,getSDK:async()=>window.__corioSDK||null});
Object.defineProperty(window,'__corioModes',{value:()=>modes.state()});
window.addEventListener('corio:platform-pause',()=>{if(platformPhase===null)platformPhase=phase;phase='platform';clearHold();window.dispatchEvent(new Event('corio:pause'));});
window.addEventListener('corio:platform-resume',()=>{if(platformPhase!==null){phase=platformPhase;platformPhase=null;if(phase!=='paused')window.dispatchEvent(new Event('corio:resume'));}});
try{await sprite.decode();$('#loading').hidden=true;loadLevel(0);requestAnimationFrame(render);}catch{phase='error';$('#loading').textContent='Не загрузился кот. Обнови страницу.';}
