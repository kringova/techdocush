import {PET_LEVELS,PET_SAVE_KEY,PET_BEST_KEY,createPet,petAction,petGoals} from '../mini/pet-care.mjs?v=0.22.0';
import {newPetBook,readPetBook,petPrevious} from './save.mjs?v=0.22.0';
import {petRoom,petNeeds,petChecklist} from './view.mjs?v=0.22.0';
import {createPetLife} from './life.mjs?v=0.22.0';
import {createModeController} from '../modes.mjs?v=0.22.0';
import {setupFocusUI} from '../mini/focus.mjs?v=0.22.0';
import {catFigure} from '../characters.mjs?v=0.22.0';
const $=s=>document.querySelector(s),scene=$('#scene'),win=$('#win');
let book=newPetBook(),best=Array(PET_LEVELS.length).fill(null),paused=false,platformPaused=false,modes,life,drag=null,storageOK=true;
try{const raw=localStorage.getItem(PET_SAVE_KEY);if(raw){const restored=readPetBook(raw);if(restored)book=restored;else $('#save-note').textContent='Предыдущее сохранение не удалось прочитать. Открыт новый вечер.';}const saved=JSON.parse(localStorage.getItem(PET_BEST_KEY));if(Array.isArray(saved))best=best.map((_,i)=>Number.isSafeInteger(saved[i])&&saved[i]>0?saved[i]:null);}catch{storageOK=false;}
const requested=new URLSearchParams(location.search).get('level');
if(requested!==null){const i=Number(requested)-1;if(Number.isInteger(i)&&i>=0&&i<PET_LEVELS.length)book.active=i;}
const state=()=>book.scenes[book.active];
const blocked=()=>paused||platformPaused||document.hidden||win.open||!!document.querySelector('[data-game-panel][open]')||!!modes?.isModalOpen();
function save(){try{localStorage.setItem(PET_SAVE_KEY,JSON.stringify(book));localStorage.setItem(PET_BEST_KEY,JSON.stringify(best));storageOK=true;}catch{storageOK=false;}$('#save-note').textContent=storageOK?'Вечер сохраняется в этом браузере. Пока тебя нет, ничего не меняется.':'Браузер не разрешил сохранить вечер. Сейчас можно продолжить играть.';}
function say(text){$('#status').textContent=text;}
function fitTargets(){
 const svg=scene.querySelector('.pet-painting'),box=svg.getBoundingClientRect(),v=svg.viewBox.baseVal,scale=Math.min(box.width/v.width,box.height/v.height);
 if(!scale)return;
 for(const hit of svg.querySelectorAll('.pet-object-hit')){const x=+hit.getAttribute('x'),y=+hit.getAttribute('y'),w=+hit.getAttribute('width'),h=+hit.getAttribute('height'),width=Math.max(w,38/scale),height=Math.max(h,38/scale);hit.setAttribute('x',x+(w-width)/2);hit.setAttribute('y',y+(h-height)/2);hit.setAttribute('width',width);hit.setAttribute('height',height);}
}
function render(){
 const s=state(),level=PET_LEVELS[s.index],focus=document.activeElement?.closest('[data-care]')?.dataset.care;
 $('#level-number').textContent=`${s.index+1} / ${PET_LEVELS.length}`;$('#level-name').textContent=level.name;$('#moves').textContent=s.moves;$('#goal').textContent=s.won?'Хороший вечер':petGoals(s).find(goal=>!goal.done)?.text||level.name;$('#intro').textContent=level.intro;$('#pet-checklist').innerHTML=petChecklist(s);$('#pet-needs').innerHTML=petNeeds(s);$('#undo').disabled=!s.trace.length;
 scene.innerHTML=petRoom(s,innerWidth<=650&&innerHeight>innerWidth);$('#levels').innerHTML=PET_LEVELS.map((l,i)=>`<button data-level="${i}" aria-current="${i===s.index}" class="${best[i]!==null?'completed':''}" aria-label="Вечер ${i+1}: ${l.name}">${i+1}</button>`).join('');
 $('#level-grid').innerHTML=PET_LEVELS.map((l,i)=>`<button data-level="${i}" aria-current="${i===s.index}">${i+1}. ${l.name}${best[i]!==null?' · ✓':''}</button>`).join('');
 fitTargets();say(s.message);if(focus)scene.querySelector(`[data-care="${focus}"]`)?.focus({preventScroll:true});life?.sync();
}
function cancelDrag(){const current=drag;drag=null;if(current){current.toy?.removeAttribute('transform');if(scene.hasPointerCapture(current.pointer))try{scene.releasePointerCapture(current.pointer);}catch{}}}
function sync(){cancelDrag();life?.sync();window.dispatchEvent(new Event(blocked()?'corio:pause':'corio:resume'));}
function showWin(){if(!state().won)return;$('#win-title').textContent='Хороший вечер';$('#win-copy').textContent=state().index===PET_LEVELS.length-1?'Кориолан устроился спать. Все пять вечеров пройдены; можно вернуться к любому из них.':'Кориолану хорошо. Этот вечер сохранён — можно перейти к следующему или ещё побыть рядом.';$('#next').textContent=state().index===PET_LEVELS.length-1?'К первому вечеру':'Следующий вечер';$('#win-portrait').innerHTML=catFigure('sleep',{className:'win-cat'});win.showModal();sync();}
function act(type){
 if(blocked()||!modes.guard())return;
 const before=state(),next=petAction(before,{type});if(before===next)return;
 book.scenes[book.active]=next;render();save();modes.changed();
 if(next.won){best[next.index]=Math.min(best[next.index]??Infinity,next.moves);save();showWin();}
}
function load(index){
 cancelDrag();life?.stop();if(win.open)win.close();if($('#pause-dialog').open)$('#pause-dialog').close();paused=false;book.active=index;modes.newAttempt(PET_LEVELS[index].metrics.referenceMoves);render();save();sync();if(state().won)showWin();
}
function undo(){cancelDrag();if(!state().trace.length)return;if(win.open)win.close();book.scenes[book.active]=petPrevious(state());render();save();modes.changed();sync();}
function restart(){if(blocked()&&!win.open&&!modes.isModalOpen())return;book.scenes[book.active]=createPet(book.active);load(book.active);}
modes=createModeController({gameId:'pet',host:$('[data-modes]'),getMoves:()=>state().moves,isWon:()=>state().won,canUndo:()=>!!state().trace.length,onUndo:undo,onRestart:restart,onBlock:()=>{cancelDrag();life?.sync();}});
window.__corioModes=()=>modes.state();window.__mini=()=>structuredClone(state());window.__petUI=()=>({paused,platformPaused,blocked:blocked(),storageOK,drag:!!drag});
life=createPetLife({scene,blocked});setupFocusUI();new ResizeObserver(fitTargets).observe(scene);
scene.addEventListener('click',e=>{if(blocked())return;const object=e.target.closest('[data-care]');if(object){if(object.dataset.care!=='play'||e.detail===0)act(object.dataset.care);return;}if(e.target.closest('.pet-character')){life.greet();say(state().pose==='sleep'?'Кориолан дремлет рядом.':'Кориолан подставляет щёку под ладонь.');}});
scene.addEventListener('keydown',e=>{const target=e.target.closest('[data-care],.pet-character');if(target&&['Enter',' '].includes(e.key)){e.preventDefault();if(!e.repeat)target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
scene.addEventListener('pointerdown',e=>{if(e.button!==0||e.isPrimary===false||blocked()||drag||!e.target.closest('[data-care="play"]'))return;const toy=scene.querySelector('[data-pet-toy]');drag={pointer:e.pointerId,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,distance:0,toy};scene.setPointerCapture(e.pointerId);});
scene.addEventListener('pointermove',e=>{if(!drag||drag.pointer!==e.pointerId)return;if(blocked()){cancelDrag();return;}const d=Math.hypot(e.clientX-drag.x,e.clientY-drag.y);drag.distance+=d;drag.x=e.clientX;drag.y=e.clientY;const bounds=scene.querySelector('svg').getBoundingClientRect(),scale=Math.min(bounds.width/1200,bounds.height/800);drag.toy.setAttribute('transform',`translate(${Math.max(-110,Math.min(70,(e.clientX-drag.startX)/scale))} ${Math.max(-65,Math.min(65,(e.clientY-drag.startY)/scale))})`);});
scene.addEventListener('pointerup',e=>{if(!drag||drag.pointer!==e.pointerId)return;cancelDrag();act('play');});
scene.addEventListener('pointercancel',cancelDrag);scene.addEventListener('lostpointercapture',cancelDrag);
document.addEventListener('click',e=>{const level=e.target.closest('[data-level]');if(level){const dialog=level.closest('dialog');if(dialog?.open)dialog.close();load(+level.dataset.level);}});
$('#undo').addEventListener('click',()=>{if(!blocked())undo();});$('#restart').addEventListener('click',restart);$('#again').addEventListener('click',restart);$('#next').addEventListener('click',()=>load((book.active+1)%PET_LEVELS.length));$('#stay').addEventListener('click',()=>{win.close();sync();say('Можно ещё немного побыть рядом. Вечер сохранён.');});
$('#pause').addEventListener('click',()=>{if(win.open)return;paused=true;$('#pause-dialog').showModal();sync();});$('#resume').addEventListener('click',()=>{paused=false;$('#pause-dialog').close();sync();});$('#pause-dialog').addEventListener('close',()=>{paused=false;sync();});
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('close',sync);
new MutationObserver(sync).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
window.addEventListener('corio:platform-pause',()=>{platformPaused=true;sync();});window.addEventListener('corio:platform-resume',()=>{platformPaused=false;sync();});document.addEventListener('visibilitychange',sync);window.addEventListener('blur',()=>{cancelDrag();life.stop();});window.addEventListener('focus',()=>life.sync());window.addEventListener('resize',()=>{cancelDrag();render();});
document.addEventListener('keydown',e=>{if(e.repeat&&(e.key==='Enter'||e.key===' ')){e.preventDefault();return;}if(e.key==='Escape'&&drag){cancelDrag();return;}if(e.target.closest('input')||blocked())return;if(e.key.toLowerCase()==='z'){e.preventDefault();undo();}if(e.key.toLowerCase()==='r'){e.preventDefault();restart();}},{capture:true});
modes.newAttempt(PET_LEVELS[book.active].metrics.referenceMoves);render();life.sync();if(state().won)showWin();
