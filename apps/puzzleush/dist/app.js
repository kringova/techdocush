import {DIGITS,PEERS,candidates,conflicts,emptyNotes,generateSudoku,getHint,shortCell} from './engine/sudoku.js?v=2';
import {NONOGRAMS,lineState,nonogramSolved,autoCrossLines,correctBlackLine} from './engine/nonogram.js?v=2';
import {STORAGE_KEY,LEGACY_STORAGE_KEY,SUDOKU_CHAPTERS,NONOGRAM_CHAPTERS,chapterFor,migrateProgressV1} from './engine/progress.js';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const icon=name=>`<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const STORAGE=STORAGE_KEY;
const clone=x=>structuredClone(x),range=n=>Array.from({length:n},(_,i)=>i);
const fresh=()=>({version:2,activeGame:'sudoku',sudoku:{level:1,completed:{},saves:{}},nonogram:{level:1,completed:{},saves:{}},legacyCompleted:{sudoku:0,nonogram:0}});
let storageAvailable=true,loadError=false,migrationNotice=false;
function readStore(){
 try{
  const raw=localStorage.getItem(STORAGE),legacy=raw?null:localStorage.getItem(LEGACY_STORAGE_KEY);if(!raw&&!legacy)return fresh();
  let data=JSON.parse(raw||legacy);if(legacy){data=migrateProgressV1(data);migrationNotice=true;}if(data.version!==2)throw Error('version');
  const out=fresh();out.activeGame=data.activeGame==='nonogram'?'nonogram':'sudoku';
  for(const g of ['sudoku','nonogram'])if(Number.isInteger(data.legacyCompleted?.[g])&&data.legacyCompleted[g]>=0)out.legacyCompleted[g]=data.legacyCompleted[g];
  for(const game of ['sudoku','nonogram']){
   const d=data[game];if(!d||!Number.isInteger(d.level)||d.level<1||d.level>30)throw Error('level');
   out[game].level=d.level;
   for(const [k,v] of Object.entries(d.completed||{}))if(/^([1-9]|[12][0-9]|30)$/.test(k)&&v&&typeof v==='object')out[game].completed[k]=v;
   for(const [k,v] of Object.entries(d.saves||{})){
    const level=Number(k);if(!Number.isInteger(level)||level<1||level>30||!v)continue;
    if(game==='sudoku'){
     const p=generateSudoku(level);
     if(!Array.isArray(v.board)||v.board.length!==81||!v.board.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=9&&(!p.puzzle[i]||p.puzzle[i]===n)))continue;
     if(![v.notes,v.exclusions].every(a=>Array.isArray(a)&&a.length===81&&a.every(b=>Array.isArray(b)&&b.every(n=>Number.isInteger(n)&&n>=1&&n<=9))))continue;
     out[game].saves[k]={board:v.board,notes:v.notes,exclusions:v.exclusions,auto:!!v.auto,won:!!v.won,hints:Number.isInteger(v.hints)&&v.hints>=0?v.hints:0};
    }else{
     const grid=NONOGRAMS[level-1].grid;
     if(Array.isArray(v.cells)&&v.cells.length===grid.length*grid[0].length&&v.cells.every(n=>[-1,0,1].includes(n)))out[game].saves[k]={cells:v.cells,won:!!v.won};
    }
   }
  }
  return out;
 }catch{loadError=true;storageAvailable=false;return fresh();}
}
let store=readStore(),game=store.activeGame,selected=-1,pencil=false,paint='fill',activeHint=null;
let histories={sudoku:[],nonogram:[]},stroke=null,toastTimer,lastSudokuTap=null,zoomCell=32,fitNonogram=false;
function current(){return store[game].saves[store[game].level];}
function ensureState(){
 const d=store[game],level=d.level;
 if(!d.saves[level])d.saves[level]=game==='sudoku'?{board:generateSudoku(level).puzzle,notes:emptyNotes(),exclusions:emptyNotes(),auto:false,won:false,hints:0}:{cells:Array(NONOGRAMS[level-1].grid.length*NONOGRAMS[level-1].grid[0].length).fill(-1),won:false};
 if(game==='sudoku'&&(selected<0||selected>80))selected=current().board.findIndex(n=>!n);
 if(game==='nonogram')current().cells=autoCrossLines(current().cells,NONOGRAMS[level-1].grid);
}
function save(){
 if(!storageAvailable)return;
 try{localStorage.setItem(STORAGE,JSON.stringify(store));$('#save-status').innerHTML='<i></i>сохранено';}
 catch{storageAvailable=false;$('#save-status').textContent='не сохранено';toast('Браузер не разрешил сохранить прогресс. Не закрывай эту вкладку.');}
}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3600);}
function pushHistory(){histories[game].push(clone(current()));if(histories[game].length>100)histories[game].shift();}
function showDialog(id){const d=$(id);if(!d.open)d.showModal();}
function hideDialog(id){$(id).close();}
function render(){ensureState();renderChrome();renderBoard();renderControls();}
function renderChrome(){
 document.body.dataset.game=game;const level=store[game].level,chapter=chapterFor(game,level),total=Object.keys(store.sudoku.completed).length+Object.keys(store.nonogram.completed).length;
 $$('.game-tab').forEach(b=>{const yes=b.dataset.game===game;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',yes);});
 $('#sudoku-count').textContent=`${Object.keys(store.sudoku.completed).length}/30`;$('#nonogram-count').textContent=`${Object.keys(store.nonogram.completed).length}/30`;
 $('#total-progress').textContent=`${total} / 60`;$('.progress-mini').style.setProperty('--progress',`${total/60*100}%`);
 $('#game-title').textContent=game==='sudoku'?'Судоку':'Японские';
 $('#game-subtitle').textContent=game==='sudoku'?'Девять цифр. По одной на каждое место.':'Собери рисунок, следуя числам.';
 $('#chapter-label').textContent=`${game==='sudoku'?'СЛОЖНОСТЬ':'ФОРМАТ'} · ${chapter.label.toUpperCase()}`;
 $('#current-level').textContent=String(level).padStart(2,'0');
 const group=range(chapter.end-chapter.start+1).map(i=>chapter.start+i);
 $('#level-dots').innerHTML=group.map(n=>`<i class="${store[game].completed[n]?'done ':''}${n===level?'current':''}" title="Уровень ${n}"></i>`).join('');
 const progress=group.filter(n=>store[game].completed[n]).length;
 $('#chapter-progress-fill').style.width=`${progress/group.length*100}%`;$('#chapter-progress-label').textContent=`${progress} из ${group.length} · ${chapter.label}`;
 $('#journey-copy').textContent=game==='sudoku'?'Пять базовых задач. Или сразу «Эксперт» — выбирать тебе.':'От 5 × 5 до 20 × 20. Любой рисунок можно выбрать сразу.';
 const chapters=game==='sudoku'?SUDOKU_CHAPTERS:NONOGRAM_CHAPTERS;
 $('#difficulty-controls').setAttribute('aria-label',game==='sudoku'?'Выбрать сложность':'Выбрать размер поля');
 $('#difficulty-controls').innerHTML=chapters.map((c,i)=>`<button data-chapter="${i}" class="${i===chapter.index?'active':''}" aria-pressed="${i===chapter.index}">${c.label}</button>`).join('');
 $$('[data-chapter]').forEach(b=>b.addEventListener('click',()=>{const c=chapters[Number(b.dataset.chapter)];setLevel(range(c.end-c.start+1).map(i=>c.start+i).find(n=>!store[game].completed[n])||c.start);}));
 const sudoku=game==='sudoku';
 $('#sudoku-controls').hidden=!sudoku;$('#nonogram-controls').hidden=sudoku;
 $('#guide-kicker').textContent=sudoku?'ЕСЛИ ЗАСТРЯЛА':'ЗА ЦИФРАМИ — КАРТИНКА';
 $('#guide-title').innerHTML=sudoku?'Следующий ход<br>можно понять.':'Рисунок появится<br>клетка за клеткой.';
 $('#guide-copy').textContent=sudoku?'Подсказка найдёт закономерность в твоём поле и объяснит её шаг за шагом.':'Числа у края — длины закрашенных групп. Между двумя группами всегда есть хотя бы одна пустая клетка.';
 $('#guide-button').innerHTML=sudoku?`Разобрать ход${icon('arrow')}`:`Как читать числа${icon('arrow')}`;
 $('#guide-footnote').textContent=sudoku?'Цифру ты впишешь сама.':'Крестик помогает отмечать пустые места.';
 $('#rules-button').innerHTML=`${icon('info')}${sudoku?'Как играть и пользоваться пометками':'Как читать числа у края поля'}`;
}
function renderBoard(){game==='sudoku'?renderSudoku():renderNonogram();}
function renderSudoku(){
 const s=current(),p=generateSudoku(store.sudoku.level),bad=new Set(conflicts(s.board)),value=s.board[selected],peers=new Set(PEERS[selected]||[]),hintCells=new Set(activeHint?.cells||[]);
 $('#board-caption').textContent=`Уровень ${store.sudoku.level} · ${p.clues} открытых клеток`;
 $('#board-mount').innerHTML=`<div class="sudoku-board" role="group" aria-label="Судоку, девять строк и девять столбцов">${s.board.map((v,i)=>{
  const classes=['sudoku-cell',p.puzzle[i]?'given':'',i===selected?'selected':'',peers.has(i)?'peer':'',v&&value&&v===value?'same':'',bad.has(i)?'conflict':'',hintCells.has(i)?'hint-cell':''].filter(Boolean).join(' ');
  const label=`Строка ${Math.floor(i/9)+1}, столбец ${i%9+1}: ${v?v+(p.puzzle[i]?', задано':''):'пусто'+(s.notes[i].length?', пометки '+s.notes[i].join(', '):'')}`;
  return `<button class="${classes}" data-cell="${i}" aria-label="${label}" aria-pressed="${i===selected}" tabindex="${i===selected?0:-1}">${v||`<span class="notes" aria-hidden="true">${DIGITS.map(n=>`<span>${s.notes[i].includes(n)?n:''}</span>`).join('')}</span>`}</button>`;
 }).join('')}</div>`;
 $$('.sudoku-cell').forEach(b=>b.addEventListener('click',e=>{
  const cell=Number(b.dataset.cell),now=performance.now(),twice=e.detail!==0&&lastSudokuTap?.cell===cell&&now-lastSudokuTap.time<=450;
  lastSudokuTap=twice?null:{cell,time:now};selected=cell;activeHint=null;
  if(twice&&!p.puzzle[cell]&&!s.board[cell]&&s.notes[cell].length===1){
   const value=s.notes[cell][0];if(candidates(s.board,s.exclusions)[cell].includes(value)){enterNumber(value,{asValue:true});return;}
   toast('Пометка противоречит полю. Пересчитай кандидатов.');
  }
  renderBoard();$(`.sudoku-cell[data-cell="${selected}"]`).focus({preventScroll:true});
 }));
 const status=$('#board-status');status.classList.toggle('error',!!bad.size);
 status.textContent=s.won?'Уровень пройден. Можно открыть следующий.':bad.size?'Есть повтор цифры: проверь выделенные клетки.':selected>=0?`Строка ${Math.floor(selected/9)+1} · Столбец ${selected%9+1}${p.puzzle[selected]?' · Заданная цифра':pencil?' · Режим пометок':''}`:'Выбери пустую клетку.';
}
function renderControls(){
 if(game==='sudoku'){
  const s=current();$('.number-pad').classList.toggle('pencil',pencil);
  $('.number-pad').innerHTML=DIGITS.map(n=>{const left=9-s.board.filter(v=>v===n).length;return `<button class="number-button ${left<=0?'exhausted':''}" data-number="${n}" aria-label="${pencil?'Пометка':'Ввести'} ${n}">${n}<small>${left>0?left:'·'}</small></button>`;}).join('');
  $$('[data-number]').forEach(b=>b.addEventListener('click',()=>enterNumber(Number(b.dataset.number))));
  $('#notes-button').setAttribute('aria-pressed',pencil);$('#undo-button').disabled=!histories.sudoku.length;
  $('#candidates-button').classList.toggle('active',s.auto);
  $('#candidates-button strong').textContent=s.auto?'Кандидаты расставлены':'Все кандидаты';
  $('#candidates-button small').textContent=s.auto?'Обновляются после каждого числа · нажми, чтобы пересчитать':'Расставить возможные цифры в пустых клетках';
 }else{$$('[data-paint]').forEach(b=>{b.classList.toggle('active',b.dataset.paint===paint);b.setAttribute('aria-pressed',b.dataset.paint===paint);});$('#nonogram-undo').disabled=!histories.nonogram.length;}
}
function enterNumber(n,{asValue=false}={}){
 if(game!=='sudoku')return;const s=current(),p=generateSudoku(store.sudoku.level);
 if(s.won)return toast('Этот уровень пройден. Открой следующий или начни заново.');
 if(selected<0)return toast('Сначала выбери клетку.');
 if(p.puzzle[selected])return toast('Это заданная цифра. Выбери пустую клетку.');
 pushHistory();activeHint=null;lastSudokuTap=null;
 if(pencil&&!asValue){
  if(s.board[selected]){histories.sudoku.pop();return toast('Пометки ставятся в пустой клетке.');}
  s.auto=false;const notes=s.notes[selected];s.notes[selected]=notes.includes(n)?notes.filter(v=>v!==n):[...notes,n].sort();
 }else{
  if(s.board[selected])s.exclusions=emptyNotes();s.board[selected]=s.board[selected]===n?0:n;
  if(!s.board[selected])s.exclusions=emptyNotes();
  s.notes[selected]=[];
  if(s.auto)s.notes=candidates(s.board,s.exclusions);
  else for(const i of PEERS[selected])s.notes[i]=s.notes[i].filter(v=>!PEERS[i].some(j=>s.board[j]===v));
 }
 afterMove();
}
function erase(){
 if(game!=='sudoku')return;const s=current();if(s.won||selected<0||generateSudoku(store.sudoku.level).puzzle[selected])return;
 if(!s.board[selected]&&!s.notes[selected].length)return;
 pushHistory();s.board[selected]=0;s.notes[selected]=[];s.exclusions=emptyNotes();if(s.auto)s.notes=candidates(s.board);activeHint=null;afterMove();
}
function fillCandidates(){
 if(game!=='sudoku'||current().won)return;
 pushHistory();const s=current();s.exclusions=emptyNotes();s.notes=candidates(s.board);s.auto=true;activeHint=null;save();render();toast('Все допустимые кандидаты расставлены.');
}
function undo(){if(!histories[game].length)return;store[game].saves[store[game].level]=histories[game].pop();activeHint=null;save();render();}
function afterMove(){
 const s=current();if(game==='nonogram')s.cells=autoCrossLines(s.cells,NONOGRAMS[store.nonogram.level-1].grid);
 const won=game==='sudoku'?s.board.every(Boolean)&&!conflicts(s.board).length:nonogramSolved(s.cells,NONOGRAMS[store.nonogram.level-1].grid);
 if(won&&!s.won){s.won=true;store[game].completed[store[game].level]={at:new Date().toISOString(),hints:s.hints||0};save();render();openComplete();}
 else{save();renderBoard();renderControls();}
}
function renderNonogram(){
 const p=NONOGRAMS[store.nonogram.level-1],s=current(),n=p.grid.length;
 const previous=$('.nonogram-viewport'),position=previous?.dataset.level===String(p.level)?{left:previous.scrollLeft,top:previous.scrollTop}:{left:0,top:0};
 const large=n>10;if(!large&&paint==='move')paint='fill';$('#pan-button').hidden=!large;
 $('.touch-note').textContent=large?'Для прокрутки выбери «Двигать». Закраска и крестик доступны касанием и штрихом. На ПК крестик — ПКМ.':'Касайся клеток или веди пальцем. На компьютере ПКМ ставит крестик.';
 $('#board-caption').textContent=`Уровень ${p.level} · ${n} × ${n}`;
 const maxRow=Math.max(...p.rows.map(r=>r.length)),maxCol=Math.max(...p.cols.map(r=>r.length));
 const cw=n===5?46:Math.max(48,maxRow*11+10),ch=n===5?50:Math.max(48,maxCol*12+10);
 const dimensions=large&&!fitNonogram?`width:${cw+n*zoomCell}px;height:${ch+n*zoomCell}px;aspect-ratio:auto;`:'';
 let html=large?`<div class="nonogram-view-tools"><span>Масштаб</span><button data-zoom="out" aria-label="Уменьшить поле" ${fitNonogram||zoomCell<=24?'disabled':''}>−</button><span class="zoom-value">${fitNonogram?'Обзор':Math.round(zoomCell/32*100)+'%'}</span><button data-zoom="in" aria-label="Увеличить поле" ${!fitNonogram&&zoomCell>=48?'disabled':''}>+</button><button data-zoom="fit" class="${fitNonogram?'active':''}">${fitNonogram?'Крупно':'Всё поле'}</button></div>`:'';
 html+=`<div class="nonogram-viewport ${large?'large':''}" data-level="${p.level}" tabindex="${large?0:-1}" aria-label="Поле ${n} на ${n}${large?', можно перемещать':''}"><div class="nonogram-board ${s.won?'nonogram-completed':''} ${paint==='move'?'pan-mode':''}" role="group" aria-label="Японский кроссворд, поле ${n} на ${n}" style="--size:${n};--clue-width:${cw}px;--clue-height:${ch}px;${dimensions}"><div class="nonogram-corner" aria-hidden="true">${n}×${n}</div>`;
 for(let c=0;c<n;c++){
  const line=range(n).map(r=>s.cells[r*n+c]),status=lineState(line,p.cols[c]);
  html+=`<div class="n-clue col ${correctBlackLine(line,p.grid.map(row=>row[c]))?'complete':''} ${!status.valid?'invalid':''}" data-clue-col="${c}" aria-label="Столбец ${c+1}, группы ${p.cols[c].join(', ')}">${p.cols[c].map(v=>`<span>${v}</span>`).join('')}</div>`;
 }
 for(let r=0;r<n;r++){
  const status=lineState(s.cells.slice(r*n,r*n+n),p.rows[r]);
  html+=`<div class="n-clue ${correctBlackLine(s.cells.slice(r*n,r*n+n),p.grid[r])?'complete':''} ${!status.valid?'invalid':''}" data-clue-row="${r}" aria-label="Строка ${r+1}, группы ${p.rows[r].join(', ')}">${p.rows[r].map(v=>`<span>${v}</span>`).join('')}</div>`;
  for(let c=0;c<n;c++){const i=r*n+c,v=s.cells[i];html+=`<button class="nonogram-cell ${v===1?'filled':v===0?'crossed':''} ${(c+1)%5===0?'heavy-right':''} ${(r+1)%5===0?'heavy-bottom':''}" data-pixel="${i}" aria-label="Строка ${r+1}, столбец ${c+1}: ${v===1?'закрашено':v===0?'крестик':'пусто'}" aria-pressed="${v===1}"></button>`;}
 }
 $('#board-mount').innerHTML=html+'</div></div>';
 $('.nonogram-viewport').scrollLeft=position.left;$('.nonogram-viewport').scrollTop=position.top;
 $$('[data-zoom]').forEach(b=>b.addEventListener('click',()=>changeNonogramZoom(b.dataset.zoom)));
 const board=$('.nonogram-board');board.addEventListener('contextmenu',e=>e.preventDefault());board.addEventListener('pointerdown',startStroke);
 board.addEventListener('keydown',e=>{const b=e.target.closest('[data-pixel]');if(!b||current().won||(paint==='move'&&e.key.toLowerCase()!=='x'))return;const i=Number(b.dataset.pixel);if(e.key===' '||e.key==='Enter'||e.key==='x'||e.key==='X'){e.preventDefault();pushHistory();const v=e.key.toLowerCase()==='x'?0:paint==='cross'?0:1;current().cells[i]=current().cells[i]===v?-1:v;afterMove();$(`[data-pixel="${i}"]`)?.focus({preventScroll:true});}});
 const invalidRows=p.rows.filter((clue,r)=>!lineState(s.cells.slice(r*n,r*n+n),clue).valid).length;
 const invalidCols=p.cols.filter((clue,c)=>!lineState(range(n).map(r=>s.cells[r*n+c]),clue).valid).length;
 $('#board-status').classList.toggle('error',!!(invalidRows+invalidCols));
 $('#board-status').textContent=s.won?`Рисунок собран: ${p.name}.`:invalidRows+invalidCols?'Красные числа: эти отметки не сходятся с группами.':paint==='move'?'Перетаскивай поле. Числа у края остаются на виду.':paint==='cross'?'Касание ставит крестик на пустое место.':'Закрашивай клетки, сверяясь с числами у края.';
}
function changeNonogramZoom(action){
 const old=$('.nonogram-viewport'),x=(old.scrollLeft+old.clientWidth/2)/old.scrollWidth,y=(old.scrollTop+old.clientHeight/2)/old.scrollHeight;
 if(action==='fit')fitNonogram=!fitNonogram;else{zoomCell=fitNonogram?32:Math.max(24,Math.min(48,zoomCell+(action==='in'?8:-8)));fitNonogram=false;}
 renderBoard();const next=$('.nonogram-viewport');next.scrollLeft=x*next.scrollWidth-next.clientWidth/2;next.scrollTop=y*next.scrollHeight-next.clientHeight/2;
}
function startStroke(e){
 const b=e.target.closest('[data-pixel]');if(!b||current().won||stroke||![0,2].includes(e.button)||(paint==='move'&&e.button!==2))return;
 e.preventDefault();const i=Number(b.dataset.pixel),target=e.button===2||paint==='cross'?0:1;
 pushHistory();stroke={value:current().cells[i]===target?-1:target,seen:new Set(),pointer:e.pointerId};paintCell(i);b.focus({preventScroll:true});
}
function paintCell(i){
 if(!stroke||stroke.seen.has(i))return;stroke.seen.add(i);current().cells[i]=stroke.value;
 const cell=$(`[data-pixel="${i}"]`);if(cell){cell.classList.toggle('filled',stroke.value===1);cell.classList.toggle('crossed',stroke.value===0);cell.setAttribute('aria-pressed',stroke.value===1);}
}
document.addEventListener('pointermove',e=>{if(!stroke||e.pointerId!==stroke.pointer)return;e.preventDefault();const b=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-pixel]');if(b)paintCell(Number(b.dataset.pixel));},{passive:false});
document.addEventListener('pointerup',()=>{if(!stroke)return;stroke=null;afterMove();});
document.addEventListener('pointercancel',()=>{if(stroke){stroke=null;afterMove();}});
function openHint(){
 if(game!=='sudoku')return openRules();
 const s=current();activeHint=getHint(s.board,s.exclusions);s.hints++;if(activeHint.placement)selected=activeHint.placement.cell;save();renderBoard();
 $('#hint-title').textContent=activeHint.title;$('#hint-lead').textContent=activeHint.lead;$('#hint-detail').textContent=activeHint.detail;$('#hint-detail').hidden=true;
 $('#explain-button').hidden=false;$('#eliminate-button').hidden=true;showDialog('#hint-dialog');
}
$('#explain-button').addEventListener('click',()=>{$('#hint-detail').hidden=false;$('#explain-button').hidden=true;$('#eliminate-button').hidden=!activeHint?.eliminations?.length;});
$('#eliminate-button').addEventListener('click',()=>{
 if(!activeHint?.eliminations?.length)return;pushHistory();const s=current();
 for(const {cell,value} of activeHint.eliminations){if(!s.exclusions[cell].includes(value))s.exclusions[cell].push(value);s.notes[cell]=s.notes[cell].filter(n=>n!==value);}
 if(s.auto)s.notes=candidates(s.board,s.exclusions);
 hideDialog('#hint-dialog');activeHint=null;save();render();toast('Сняты только обоснованные кандидаты. Числа в поле не изменились.');
});
function openLevels(){
 const legacy=store.legacyCompleted[game];
 $('#levels-intro').textContent=`${game==='sudoku'?'Судоку':'Японские кроссворды'} · ${Object.keys(store[game].completed).length} из 30 пройдено. Все уровни доступны сразу.${legacy?' Результаты прежней подборки сохранены: '+legacy+' уровней.':''}`;
 const chapters=game==='sudoku'?SUDOKU_CHAPTERS:NONOGRAM_CHAPTERS;
 $('#levels-content').innerHTML=chapters.map(ch=>`<section class="level-chapter"><h3>${ch.label}</h3><div class="level-grid">${range(ch.end-ch.start+1).map(k=>{const n=ch.start+k,done=store[game].completed[n];return `<button class="level-item ${done?'done':''} ${n===store[game].level?'current':''}" data-level="${n}" aria-label="Уровень ${n}${done?', пройден':''}">${n}</button>`;}).join('')}</div></section>`).join('');
 $$('[data-level]').forEach(b=>b.addEventListener('click',()=>{hideDialog('#levels-dialog');setLevel(Number(b.dataset.level));}));showDialog('#levels-dialog');
}
function setLevel(level){store[game].level=level;histories[game]=[];selected=-1;activeHint=null;pencil=false;lastSudokuTap=null;fitNonogram=false;ensureState();save();render();window.scrollTo({top:0,behavior:'instant'});}
function openComplete(){
 const level=store[game].level;$('#complete-title').textContent=game==='sudoku'?'Всё сошлось!':NONOGRAMS[level-1].name;
 const count=Object.keys(store[game].completed).length;
 $('#complete-copy').textContent=count===30?'Все 30 уровней этой игры собраны. Можно вернуться к любимым или попробовать другую игру.':`Уровень ${level} в твоей коллекции. Пройдено ${count} из 30. Можно перейти к следующему или выбрать любой другой.`;
 $('#next-level').innerHTML=level<30?`Следующий уровень${icon('arrow')}`:'К коллекции уровней';showDialog('#complete-dialog');
}
function openRules(){
 $('#rules-content').innerHTML=game==='sudoku'?`<p>Заполни поле цифрами от 1 до 9. В каждой строке, столбце и блоке 3×3 цифры встречаются по одному разу.</p><h3>Пометки и все кандидаты</h3><ul><li>Выбери клетку и нажми цифру. «Пометки» включают маленькие записи карандашом.</li><li>«Все кандидаты» расставят допустимые цифры во всех пустых клетках. Они обновляются после ввода чисел. Повторное нажатие пересчитает их с нуля.</li><li>Ручная правка пометок выключает автообновление, чтобы сохранить твою работу.</li><li>Если в клетке осталась одна допустимая пометка, двойной клик или двойной тап впишет её. Этот ход можно отменить.</li></ul><h3>Когда не видишь следующего хода</h3><p>«Подсказка» сначала покажет, куда посмотреть. Затем можно открыть объяснение. Числа она не вводит. Если ход снимает кандидатов, их можно убрать отдельной кнопкой после объяснения.</p><h3>Сложность и уровни</h3><p>Все уровни доступны сразу. Выбери «Базовый», «Средний», «Сложный» или «Эксперт» над полем. В базовой группе пять задач; экспертные требуют пар и исключений кандидатов.</p><h3>На компьютере</h3><p>Стрелки выбирают клетку, 1–9 вводят цифру, N включает пометки, Backspace стирает, Ctrl/Cmd+Z отменяет ход.</p>`:`<p>Числа слева описывают закрашенные группы в строке, числа сверху — в столбце. Порядок групп совпадает с порядком чисел.</p><h3>Что значит «3 1»</h3><p>Сначала группа из трёх закрашенных клеток, потом хотя бы одна пустая, затем одна закрашенная. До и после групп тоже могут быть пустые клетки.</p><h3>Управление</h3><ul><li>Клик закрашивает клетку, правая кнопка мыши ставит крестик. Повторное действие снимает отметку.</li><li>На телефоне выбери «Закрасить» или «Крестик», затем касайся клеток или веди пальцем.</li><li>Пробел или Enter закрашивает выбранную клетку, X ставит крестик.</li><li>«Отмена» возвращает весь последний штрих вместе с автокрестиками.</li><li>На больших полях «Двигать» позволяет перетаскивать поле. Масштаб меняется кнопками +/−, а «Всё поле» показывает обзор.</li></ul><h3>Обратная связь</h3><p>Собранная группа приглушает числа. Красные числа означают, что текущие отметки уже не могут совпасть с этой линией. Когда строка или столбец закрашены верно, оставшиеся пустые клетки автоматически получают крестики. Все размеры и уровни можно выбрать сразу.</p>`;
 showDialog('#rules-dialog');
}
$$('.game-tab').forEach(b=>b.addEventListener('click',()=>{if(game===b.dataset.game)return;game=b.dataset.game;store.activeGame=game;selected=-1;activeHint=null;stroke=null;lastSudokuTap=null;fitNonogram=false;ensureState();save();render();}));
$('#notes-button').addEventListener('click',()=>{pencil=!pencil;renderControls();renderBoard();});
$('#erase-button').addEventListener('click',erase);$('#undo-button').addEventListener('click',undo);$('#nonogram-undo').addEventListener('click',undo);
$('#candidates-button').addEventListener('click',fillCandidates);$('#hint-button').addEventListener('click',openHint);$('#guide-button').addEventListener('click',openHint);
for(const id of ['#levels-button','#progress-button','#journey-levels'])$(id).addEventListener('click',openLevels);
$('#rules-button').addEventListener('click',openRules);
$$('[data-paint]').forEach(b=>b.addEventListener('click',()=>{paint=b.dataset.paint;renderControls();renderBoard();}));
$('#restart-button').addEventListener('click',()=>showDialog('#confirm-dialog'));
$('#confirm-restart').addEventListener('click',()=>{pushHistory();delete store[game].saves[store[game].level];activeHint=null;ensureState();save();render();hideDialog('#confirm-dialog');});
$('#next-level').addEventListener('click',()=>{hideDialog('#complete-dialog');if(store[game].level<30)setLevel(store[game].level+1);else openLevels();});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.sudoku-cell'))lastSudokuTap=null;});
document.addEventListener('keydown',e=>{
 lastSudokuTap=null;
 if($('dialog[open]'))return;
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo();return;}
 if(e.ctrlKey||e.metaKey||e.altKey||game!=='sudoku')return;
 if(/^[1-9]$/.test(e.key)){e.preventDefault();enterNumber(Number(e.key));return;}
 if(e.key==='Backspace'||e.key==='Delete'){e.preventDefault();erase();return;}
 if(e.key.toLowerCase()==='n'){pencil=!pencil;renderControls();renderBoard();return;}
 const offset={ArrowLeft:-1,ArrowRight:1,ArrowUp:-9,ArrowDown:9}[e.key];
 if(offset){e.preventDefault();selected=((selected<0?0:selected)+offset+81)%81;activeHint=null;renderBoard();$(`[data-cell="${selected}"]`).focus({preventScroll:true});}
});
ensureState();render();
if(loadError){$('#save-status').textContent='сохранение недоступно';toast('Сохранение не удалось прочитать. Исходная запись сохранена; новое поле работает без записи поверх неё.');}
else{save();if(migrationNotice)toast('Прогресс перенесён. Любую сложность теперь можно выбрать сразу.');}
