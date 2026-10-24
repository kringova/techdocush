import {DIGITS,PEERS,candidates,conflicts,contradictionHint,emptyNotes,generateSudoku,getHint,shortCell} from './engine/sudoku.js?v=4';
import {NONOGRAMS,lineState,nonogramSolved,autoCrossLines,correctBlackLine} from './engine/nonogram.js?v=2';
import {generateWordsearch,selectedWord,revealWord,wordsearchSolved,initialLetterCells} from './engine/wordsearch.js?v=2';
import {mountWordsearch} from './wordsearch-ui.js?v=2';
import {createDoubleTap} from './engine/double-tap.js';
import {createBenefits} from './engine/benefits.js';
import {createPlatform} from './platform/adapter.js';
import {createAnalytics,metricaSender} from './platform/analytics.js?v=3';
import {mountOnboarding} from './platform/onboarding.js?v=5';
import {STORAGE_KEY,V3_STORAGE_KEY,V2_STORAGE_KEY,LEGACY_STORAGE_KEY,chapterFor,chaptersFor,chapterLevels,levelCount,nextLevelFor,migrateProgressV1,migrateProgressV2,migrateProgressV3} from './engine/progress.js?v=4';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const icon=name=>`<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const isYandex=document.documentElement.dataset.platform==='yandex';
const fixedGame=isYandex?document.documentElement.dataset.game:null;
const STORAGE=isYandex?`kletochki-yandex-${fixedGame}-progress-v4`:STORAGE_KEY;
let benefits=null,benefitsError=false;
if(isYandex)try{benefits=createBenefits(localStorage,`kletochki-yandex-${fixedGame}-benefits-v1`);}catch{benefitsError=true;const memory=new Map();benefits=createBenefits({getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},'session');}
const analyticsCounter=Number(document.documentElement.dataset.metrica||0);
const analyticsEnabled=isYandex&&analyticsCounter>0;
const analytics=createAnalytics({enabled:analyticsEnabled,send:metricaSender({enabled:isYandex,counterId:analyticsCounter}),context:()=>({game,level:store[game].level,group:chapterFor(game,store[game].level).label,size:game==='nonogram'?NONOGRAMS[store.nonogram.level-1].grid.length:game==='wordsearch'?generateWordsearch(store.wordsearch.level).size:9,version:'1.4.0'})});
const platform=createPlatform({enabled:isYandex,onAdEvent:(name,params)=>analytics.event(name,params),onState(){document.body.dataset.platformPaused=String(platform.blocked());syncGameplay();},onError(){toast('Связь с Яндексом недоступна. Рекламу можно попробовать позже.');}});
const tapGesture=createDoubleTap();
const clone=x=>structuredClone(x),range=n=>Array.from({length:n},(_,i)=>i);
const fresh=()=>({version:4,activeGame:'sudoku',sudoku:{level:1,completed:{},saves:{}},nonogram:{level:1,completed:{},saves:{}},wordsearch:{level:1,completed:{},saves:{}},legacyCompleted:{sudoku:0,nonogram:0,wordsearch:0}});
let storageAvailable=true,loadError=false,migrationNotice=false;
function readStore(){
 try{
  const raw=localStorage.getItem(STORAGE),v3=raw?null:localStorage.getItem(isYandex?`kletochki-yandex-${fixedGame}-progress-v3`:V3_STORAGE_KEY),v2=raw||v3?null:localStorage.getItem(isYandex?`kletochki-yandex-${fixedGame}-progress-v2`:V2_STORAGE_KEY),legacy=raw||v3||v2||isYandex?null:localStorage.getItem(LEGACY_STORAGE_KEY);if(!raw&&!v3&&!v2&&!legacy)return fresh();
  let data=JSON.parse(raw||v3||v2||legacy);if(data.version===1){data=migrateProgressV1(data);migrationNotice=true;}if(data.version===2){data=migrateProgressV2(data);migrationNotice=true;}if(data.version===3){data=migrateProgressV3(data);migrationNotice=true;}if(data.version!==4)throw Error('version');
  const out=fresh();out.activeGame=['sudoku','nonogram','wordsearch'].includes(data.activeGame)?data.activeGame:'sudoku';
  for(const g of ['sudoku','nonogram'])if(Number.isInteger(data.legacyCompleted?.[g])&&data.legacyCompleted[g]>=0)out.legacyCompleted[g]=data.legacyCompleted[g];
  for(const game of ['sudoku','nonogram','wordsearch']){
   if(game==='wordsearch'&&!data.wordsearch)continue;
   const d=data[game];if(!d||!Number.isInteger(d.level)||d.level<1||d.level>levelCount(game))throw Error('level');
   out[game].level=d.level;
   for(const [k,v] of Object.entries(d.completed||{}))if(/^[1-9][0-9]*$/.test(k)&&Number(k)<=levelCount(game)&&v&&typeof v==='object')out[game].completed[k]=v;
   for(const [k,v] of Object.entries(d.saves||{})){
    const level=Number(k);if(!Number.isInteger(level)||level<1||level>levelCount(game)||!v)continue;
    if(game==='sudoku'){
     const p=generateSudoku(level);
     if(!Array.isArray(v.board)||v.board.length!==81||!v.board.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=9&&(!p.puzzle[i]||p.puzzle[i]===n)))continue;
     if(![v.notes,v.exclusions].every(a=>Array.isArray(a)&&a.length===81&&a.every(b=>Array.isArray(b)&&b.every(n=>Number.isInteger(n)&&n>=1&&n<=9))))continue;
     out[game].saves[k]={board:v.board,notes:v.notes,exclusions:v.exclusions,auto:!!v.auto,won:!!v.won,hints:Number.isInteger(v.hints)&&v.hints>=0?v.hints:0};
    }else if(game==='nonogram'){
     const grid=NONOGRAMS[level-1].grid;
     if(Array.isArray(v.cells)&&v.cells.length===grid.length*grid[0].length&&v.cells.every(n=>[-1,0,1].includes(n)))out[game].saves[k]={cells:v.cells,won:!!v.won};
    }else{const p=generateWordsearch(level);if(![v.found,v.revealed].every(a=>Array.isArray(a)&&a.every(w=>p.words.includes(w))))continue;const initials=Array.isArray(v.initials)?[...new Set(v.initials.filter(letter=>p.words.some(w=>w[0]===letter)))]:[];out[game].saves[k]={found:[...new Set(v.found)],revealed:[...new Set(v.revealed)],initials,activeInitial:initials.includes(v.activeInitial)?v.activeInitial:null,won:!!v.won,hints:Number.isInteger(v.hints)&&v.hints>=0?v.hints:0};}
   }
  }
  return out;
 }catch{loadError=true;storageAvailable=false;return fresh();}
}
let store=readStore(),game=fixedGame||store.activeGame,selected=-1,pencil=false,paint='fill',activeHint=null;
let histories={sudoku:[],nonogram:[],wordsearch:[]},stroke=null,toastTimer,zoomCell=32,fitNonogram=false;
let wordView=null,wordMode='drag';
const puzzleKey=()=>generateSudoku(store.sudoku.level).puzzle.join('');
const round=()=>isYandex&&game==='sudoku'?benefits.attempt(puzzleKey()):null;
function canMove(){if(platform.blocked())return false;if(round()&&round().status!=='playing'){openAttempt();return false;}return true;}
function syncGameplay(){const playing=!platform.blocked()&&!document.hidden&&!$('dialog[open]')&&!current()?.won&&(!round()||round().status==='playing');platform.play(playing);analytics.play(playing);}
function current(){return store[game].saves[store[game].level];}
function ensureState(){
 const d=store[game],level=d.level;
 if(!d.saves[level])d.saves[level]=game==='sudoku'?{board:generateSudoku(level).puzzle,notes:emptyNotes(),exclusions:emptyNotes(),auto:false,won:false,hints:0}:game==='wordsearch'?{found:[],revealed:[],initials:[],activeInitial:null,won:false,hints:0}:{cells:Array(NONOGRAMS[level-1].grid.length*NONOGRAMS[level-1].grid[0].length).fill(-1),won:false};
 if(game==='sudoku'&&(selected<0||selected>80))selected=current().board.findIndex(n=>!n);
 if(isYandex&&game==='sudoku'&&!round())benefits.startAttempt(puzzleKey(),crypto.randomUUID());
 if(game==='nonogram')current().cells=autoCrossLines(current().cells,NONOGRAMS[level-1].grid);
}
function save(){
 if(!storageAvailable)return;
 try{localStorage.setItem(STORAGE,JSON.stringify(store));$('#save-status').innerHTML='<i></i>сохранено';}
 catch{storageAvailable=false;$('#save-status').textContent='не сохранено';toast('Браузер не разрешил сохранить прогресс. Не закрывай эту вкладку.');}
}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3600);}
function pushHistory(){histories[game].push(clone(current()));if(histories[game].length>100)histories[game].shift();}
function showDialog(id){const d=$(id);if(!d.open)d.showModal();syncGameplay();}
function hideDialog(id){$(id).close();syncGameplay();}
function render(){ensureState();renderChrome();renderBoard();renderControls();syncGameplay();}
function renderChrome(){
 document.body.dataset.game=game;const level=store[game].level,chapter=chapterFor(game,level),total=['sudoku','nonogram','wordsearch'].reduce((sum,g)=>sum+Object.keys(store[g].completed).length,0);
 $$('.game-tab').forEach(b=>{const yes=b.dataset.game===game;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',yes);});
 $('#sudoku-count').textContent=`${Object.keys(store.sudoku.completed).length}/${levelCount('sudoku')}`;$('#nonogram-count').textContent=`${Object.keys(store.nonogram.completed).length}/30`;$('#wordsearch-count').textContent=`${Object.keys(store.wordsearch.completed).length}/30`;
 const shownTotal=isYandex?Object.keys(store[game].completed).length:total,maxTotal=isYandex?levelCount(game):['sudoku','nonogram','wordsearch'].reduce((sum,g)=>sum+levelCount(g),0);
 $('#total-progress').textContent=`${shownTotal} / ${maxTotal}`;$('.progress-mini').style.setProperty('--progress',`${shownTotal/maxTotal*100}%`);
 $('#game-title').textContent=game==='sudoku'?'Судоку':game==='wordsearch'?'Поиск слов':'Японские';
 $('#game-subtitle').textContent=game==='sudoku'?'Девять цифр. По одной на каждое место.':game==='wordsearch'?'Слова спрятаны. Отыщи их одно за другим.':'Собери рисунок, следуя числам.';
 $('#chapter-label').textContent=`${game==='sudoku'?'СЛОЖНОСТЬ':'ФОРМАТ'} · ${chapter.label.toUpperCase()}`;
 $('#current-level').textContent=String(level).padStart(2,'0');$('#level-limit').textContent=`/ ${levelCount(game)}`;
 const group=chapterLevels(chapter),dotStart=Math.max(0,Math.min(group.length-15,group.indexOf(level)-7)),dots=group.slice(dotStart,dotStart+15);
 $('#level-dots').setAttribute('aria-label',`${chapter.label}: уровень ${group.indexOf(level)+1} из ${group.length}`);$('#level-dots').innerHTML=dots.map(n=>`<i class="${store[game].completed[n]?'done ':''}${n===level?'current':''}" title="Уровень ${n}"></i>`).join('');
 const progress=group.filter(n=>store[game].completed[n]).length;
 $('#chapter-progress-fill').style.width=`${progress/group.length*100}%`;$('#chapter-progress-label').textContent=`${progress} из ${group.length} · ${chapter.label}`;
 $('#journey-copy').textContent=game==='sudoku'?'130 задач, включая 60 экспертных. Пять базовых — или сразу твоя сложность.':'От 5 × 5 до 20 × 20. Любой рисунок можно выбрать сразу.';
 const chapters=chaptersFor(game);
 $('#difficulty-controls').setAttribute('aria-label',game==='sudoku'?'Выбрать сложность':'Выбрать размер поля');
 $('#difficulty-controls').innerHTML=chapters.map((c,i)=>`<button data-chapter="${i}" class="${i===chapter.index?'active':''}" aria-pressed="${i===chapter.index}">${c.label}</button>`).join('');
 $$('[data-chapter]').forEach(b=>b.addEventListener('click',()=>{const c=chapters[Number(b.dataset.chapter)];setLevel(chapterLevels(c).find(n=>!store[game].completed[n])||chapterLevels(c)[0]);}));
 const sudoku=game==='sudoku';
 $('#sudoku-controls').hidden=!sudoku;$('#nonogram-controls').hidden=game!=='nonogram';$('#wordsearch-controls').hidden=game!=='wordsearch';
 $('#guide-kicker').textContent=sudoku?'ЕСЛИ ЗАСТРЯЛА':'ЗА ЦИФРАМИ — КАРТИНКА';
 $('#guide-title').innerHTML=sudoku?'Следующий ход<br>можно понять.':'Рисунок появится<br>клетка за клеткой.';
 $('#guide-copy').textContent=sudoku?'Подсказка найдёт закономерность в твоём поле и объяснит её шаг за шагом.':'Числа у края — длины закрашенных групп. Между двумя группами всегда есть хотя бы одна пустая клетка.';
 $('#guide-button').innerHTML=sudoku?`Разобрать ход${icon('arrow')}`:`Как читать числа${icon('arrow')}`;
 $('#guide-footnote').textContent=sudoku?'Цифру ты впишешь сама.':'Крестик помогает отмечать пустые места.';
 $('#rules-button').innerHTML=`${icon('info')}${sudoku?'Как играть и пользоваться пометками':'Как читать числа у края поля'}`;
 if(game==='wordsearch'){$('#journey-copy').textContent='30 тем, поля от 6 × 6 до 12 × 12. Любой уровень доступен сразу.';$('#guide-kicker').textContent='КОГДА СЛОВО НЕ НАХОДИТСЯ';$('#guide-title').innerHTML='Узнай,<br>что искать.';$('#guide-copy').textContent='Сначала видны тема и количество слов. Подсказка раскроет одно из оставшихся — и поиск продолжится.';$('#guide-button').innerHTML=`Раскрыть слово${icon('arrow')}`;$('#guide-footnote').textContent='Найденные слова остаются в твоём списке.';$('#rules-button').innerHTML=`${icon('info')}Как искать и выделять слова`;}
}
function renderBoard(){wordView?.destroy();wordView=null;game==='sudoku'?renderSudoku():game==='wordsearch'?renderWordsearch():renderNonogram();}
function renderWordsearch(){
 const p=generateWordsearch(store.wordsearch.level),s=current();
 $('#board-caption').textContent=`Уровень ${p.level} · ${p.theme}`;
 wordView=mountWordsearch({mount:$('#board-mount'),puzzle:p,state:s,mode:wordMode,blocked:()=>platform.blocked(),onStatus:text=>{$('#board-status').textContent=text;},onSelect:path=>{
  if(!canMove()||s.won)return;const word=selectedWord(p,path);analytics.activity('word_selection');
  if(!word){toast('Этого слова нет в задании. Попробуй другую прямую линию.');renderBoard();return;}
  if(s.found.includes(word)){toast('Это слово уже найдено.');renderBoard();return;}
  pushHistory();s.found.push(word);if(!p.words.some(w=>s.revealed.includes(w)&&!s.found.includes(w)&&w[0]===s.activeInitial))s.activeInitial=null;analytics.activity('word_found');analytics.event('gameWordFound',{length:word.length,found:s.found.length,total:p.words.length});afterMove();
 }});
 $('#word-progress').textContent=`Найдено ${s.found.length} из ${p.words.length}`;
 $('#word-list').innerHTML=p.words.filter(w=>s.found.includes(w)||s.revealed.includes(w)).map(w=>`<span class="word-chip ${s.found.includes(w)?'found':'revealed'}"><span>${w}<small>${s.found.includes(w)?'найдено':'искать'}</small></span>${s.found.includes(w)?'':`<button class="word-initial-button" data-initial-word="${w}" aria-label="Подсветить все буквы ${w[0]} для слова ${w}${isYandex&&!initialHintOwned(p,s,w[0])?', одна подсказка':''}">Буква «${w[0]}»${isYandex&&!initialHintOwned(p,s,w[0])?'<small>1 подсказка</small>':''}</button>`}</span>`).join('')||'<span class="word-list-empty">Слова пока скрыты. Подсказка раскроет, что искать.</span>';
 $$('[data-initial-word]').forEach(b=>b.addEventListener('click',()=>highlightWordInitial(b.dataset.initialWord)));
 $('#word-initial-status').hidden=!s.activeInitial;
 $('#word-initial-label').textContent=s.activeInitial?`Подсвечены все «${s.activeInitial}»: ${initialLetterCells(p,s.activeInitial).length}`:'';
 $('#board-status').classList.remove('error');$('#board-status').textContent=s.won?'Все слова найдены. Можно выбрать следующий уровень.':`${p.directions}. ${wordMode==='drag'?'Проведи по буквам слова.':'Выбери первую и последнюю букву.'}`;
}
function openWordHint(){
 if(game!=='wordsearch'||!canMove()||current().won)return;
 const p=generateWordsearch(store.wordsearch.level),s=current(),word=revealWord(p,s);if(!word)return toast('Все оставшиеся слова уже раскрыты. Найди их на поле.');
 if(isYandex){const fingerprint=`wordsearch:${p.level}:${p.grid.join('')}:${word}`;if(!benefits.canRead(fingerprint))return offerReward('hints');try{benefits.readHint(fingerprint);}catch{return toast('Не удалось сохранить подсказку. Попробуй ещё раз.');}}
 s.revealed.push(word);s.hints++;analytics.activity('hint_used');analytics.event('gameHintUsed',{technique:'word-reveal'});analytics.event('gameWordRevealed',{length:word.length});save();render();
 activeHint={technique:'word-reveal',cells:[]};$('#hint-title').textContent=word;$('#hint-lead').textContent=`Это одно из оставшихся слов в теме «${p.theme}».`;$('#hint-detail').textContent=`Найди слово «${word}» на поле. Оно останется в списке, пока ты ищешь.`;$('#hint-detail').hidden=false;$('#explain-button').hidden=true;$('#eliminate-button').hidden=true;const initialButton=$('#word-initial-dialog-button');initialButton.hidden=false;initialButton.dataset.word=word;initialButton.textContent=`Подсветить все «${word[0]}»${isYandex&&!initialHintOwned(p,s,word[0])?' · 1 подсказка':''}`;showDialog('#hint-dialog');
}
const initialHintKey=(p,letter)=>`wordsearch:initial:${p.level}:${p.grid.join('')}:${letter}`;
function initialHintOwned(p,s,letter){return s.initials.includes(letter)||!!(isYandex&&benefits.snapshot().readHints[initialHintKey(p,letter)]);}
function highlightWordInitial(word){
 if(game!=='wordsearch'||!canMove()||current().won)return;
 const p=generateWordsearch(store.wordsearch.level),s=current();if(!p.words.includes(word)||!s.revealed.includes(word)||s.found.includes(word))return;
 const letter=word[0],fresh=!s.initials.includes(letter);let spent=0;
 if(fresh&&isYandex){const fingerprint=initialHintKey(p,letter);if(!benefits.canRead(fingerprint))return offerReward('hints');try{const before=benefits.snapshot().hints;benefits.readHint(fingerprint);spent=before-benefits.snapshot().hints;}catch{return toast('Не удалось сохранить подсказку. Попробуй ещё раз.');}}
 if(fresh){s.initials.push(letter);s.hints++;analytics.event('gameHintUsed',{technique:'word-initial',letter,spent});analytics.activity('hint_used');}
 s.activeInitial=letter;analytics.activity('initial_highlight');save();render();toast(`Подсвечены все буквы «${letter}» на поле.`);
}
function renderSudoku(){
 const s=current(),p=generateSudoku(store.sudoku.level),bad=new Set(s.board.flatMap((n,i)=>n&&n!==p.solution[i]?[i]:[])),duplicate=conflicts(s.board),problem=contradictionHint(s.board,s.auto?candidates(s.board,s.exclusions):candidates(s.board)),value=s.board[selected],peers=new Set(PEERS[selected]||[]),hintCells=new Set(activeHint?.cells||[]);
 $('#board-caption').textContent=`Уровень ${store.sudoku.level} · ${p.clues} открытых клеток`;
 $('#board-mount').innerHTML=`<div class="sudoku-board" role="group" aria-label="Судоку, девять строк и девять столбцов">${s.board.map((v,i)=>{
  const classes=['sudoku-cell',p.puzzle[i]?'given':'',i===selected?'selected':'',peers.has(i)?'peer':'',v&&value&&v===value?'same':'',bad.has(i)?'conflict':'',hintCells.has(i)?'hint-cell':''].filter(Boolean).join(' ');
  const label=`Строка ${Math.floor(i/9)+1}, столбец ${i%9+1}: ${v?v+(p.puzzle[i]?', задано':bad.has(i)?', неверно':''):'пусто'+(s.notes[i].length?', пометки '+s.notes[i].join(', '):'')}`;
  return `<button class="${classes}" data-cell="${i}" aria-label="${label}" aria-pressed="${i===selected}" aria-invalid="${bad.has(i)}" tabindex="${i===selected?0:-1}">${v||`<span class="notes" aria-hidden="true">${DIGITS.map(n=>`<span>${s.notes[i].includes(n)?n:''}</span>`).join('')}</span>`}</button>`;
 }).join('')}</div>`;
 $$('.sudoku-cell').forEach(b=>b.addEventListener('click',e=>{
  if(!canMove())return;
  const cell=Number(b.dataset.cell),twice=tapGesture.tap(cell,performance.now(),e.detail);
  selected=cell;activeHint=null;
  if(twice&&!p.puzzle[cell]&&!s.board[cell]&&s.notes[cell].length===1){
   const value=s.notes[cell][0];if(candidates(s.board,s.exclusions)[cell].includes(value)){enterNumber(value,{asValue:true});return;}
   toast('Пометка противоречит полю. Пересчитай кандидатов.');
  }
  renderBoard();$(`.sudoku-cell[data-cell="${selected}"]`).focus({preventScroll:true});
 }));
 const status=$('#board-status');status.classList.toggle('error',!!bad.size);
 status.textContent=s.won?'Уровень пройден. Можно открыть следующий.':problem?.technique==='contradiction'?`${problem.lead} «Подсказка» объяснит причину.`:bad.size?`Неверных чисел: ${bad.size}. Они отмечены красным.${duplicate.length?' Есть повтор в строке, столбце или блоке.':''}`:selected>=0?`Строка ${Math.floor(selected/9)+1} · Столбец ${selected%9+1}${p.puzzle[selected]?' · Заданная цифра':pencil?' · Режим пометок':''}`:'Выбери пустую клетку.';
}
function renderControls(){
 if(game==='wordsearch'){const p=generateWordsearch(store.wordsearch.level),s=current();$('#wordsearch-undo').disabled=!histories.wordsearch.length;$('#wordsearch-hint').disabled=s.won||!revealWord(p,s);$('#wordsearch-hint').textContent=isYandex?`Подсказки: ${benefits.snapshot().hints}`:'Какое слово искать?';$$('[data-word-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.wordMode===wordMode));}
 $('#mistakes-status').hidden=!(isYandex&&game==='sudoku');
 if(isYandex&&game==='sudoku'){const a=round();$('#mistakes-status').textContent=a.status==='playing'?`Ошибки: ${a.errors} / 3`:'Партия остановлена';}
 if(game==='sudoku'){
  const s=current();$('.number-pad').classList.toggle('pencil',pencil);
  $('.number-pad').innerHTML=DIGITS.map(n=>{const left=9-s.board.filter(v=>v===n).length;return `<button class="number-button ${left<=0?'exhausted':''}" data-number="${n}" aria-label="${pencil?'Пометка':'Ввести'} ${n}">${n}<small>${left>0?left:'·'}</small></button>`;}).join('');
  $$('[data-number]').forEach(b=>b.addEventListener('click',()=>enterNumber(Number(b.dataset.number))));
  $('#notes-button').setAttribute('aria-pressed',pencil);$('#undo-button').disabled=!histories.sudoku.length;
  $('#candidates-button').classList.toggle('active',s.auto);
  $('#candidates-button strong').textContent=s.auto?'Кандидаты расставлены':'Все кандидаты';
  $('#candidates-button small').textContent=s.auto?'Обновляются после каждого числа · нажми, чтобы пересчитать':'Расставить возможные цифры в пустых клетках';
  if(isYandex){const unlocked=benefits.hasCandidates(puzzleKey());$('#candidates-button strong').textContent=unlocked?(s.auto?'Кандидаты расставлены':'Все кандидаты открыты'):'Все кандидаты · реклама';$('#candidates-button small').textContent=unlocked?'Доступны для этого уровня · пересчёт бесплатно':'Просмотр открывает автообновление для этого уровня';$('#hint-button span').textContent=`Подсказки: ${benefits.snapshot().hints}`;}
 }else{$$('[data-paint]').forEach(b=>{b.classList.toggle('active',b.dataset.paint===paint);b.setAttribute('aria-pressed',b.dataset.paint===paint);});$('#nonogram-undo').disabled=!histories.nonogram.length;}
}
function enterNumber(n,{asValue=false}={}){
 if(game!=='sudoku'||!canMove())return;const s=current(),p=generateSudoku(store.sudoku.level);
 if(s.won)return toast('Этот уровень пройден. Открой следующий или начни заново.');
 if(selected<0)return toast('Сначала выбери клетку.');
 if(p.puzzle[selected])return toast('Это заданная цифра. Выбери пустую клетку.');
 pushHistory();activeHint=null;tapGesture.reset();
 if(pencil&&!asValue){
  if(s.board[selected]){histories.sudoku.pop();return toast('Пометки ставятся в пустой клетке.');}
  s.auto=false;const notes=s.notes[selected];s.notes[selected]=notes.includes(n)?notes.filter(v=>v!==n):[...notes,n].sort();
 }else{
  const next=s.board[selected]===n?0:n;
  if(isYandex&&next&&next!==p.solution[selected])try{benefits.mistake(puzzleKey());}catch{histories.sudoku.pop();return toast('Не удалось сохранить счётчик ошибок. Попробуй ещё раз.');}
  if(s.board[selected])s.exclusions=emptyNotes();s.board[selected]=next;
  if(!s.board[selected])s.exclusions=emptyNotes();
  s.notes[selected]=[];
  if(s.auto)s.notes=candidates(s.board,s.exclusions);
  else for(const i of PEERS[selected])s.notes[i]=s.notes[i].filter(v=>!PEERS[i].some(j=>s.board[j]===v));
 }
 analytics.activity(pencil&&!asValue?'note_edit':'digit_input');if(isYandex&&!(pencil&&!asValue)&&s.board[selected]&&s.board[selected]!==p.solution[selected])analytics.activity('wrong_digit');
 afterMove();if(round()?.status==='paused'){analytics.event('gameRoundPaused',{mistakes:4});openAttempt();}
}
function erase(){
 if(game!=='sudoku'||!canMove())return;const s=current();if(s.won||selected<0||generateSudoku(store.sudoku.level).puzzle[selected])return;
 if(!s.board[selected]&&!s.notes[selected].length)return;
 pushHistory();s.board[selected]=0;s.notes[selected]=[];s.exclusions=emptyNotes();if(s.auto)s.notes=candidates(s.board);activeHint=null;afterMove();
}
function fillCandidates(){
 if(game!=='sudoku'||current().won||!canMove())return;
 if(isYandex&&!benefits.hasCandidates(puzzleKey()))return offerReward('candidates');
 analytics.event('gameCandidatesUsed');pushHistory();const s=current();s.exclusions=emptyNotes();s.notes=candidates(s.board);s.auto=true;activeHint=null;save();render();toast('Все допустимые кандидаты расставлены.');
}
function undo(){if(!canMove()||!histories[game].length)return;const previous=histories[game].pop();if(game==='wordsearch'){previous.revealed=[...current().revealed];previous.hints=current().hints;previous.initials=[...current().initials];previous.activeInitial=current().activeInitial;}store[game].saves[store[game].level]=previous;activeHint=null;save();render();}
function afterMove(){
 const s=current();if(game==='nonogram')analytics.activity('paint_stroke');
 const before=histories[game].at(-1);if(game==='nonogram'&&before)for(const [name,value] of [['fill',1],['cross',0],['clear',-1]])analytics.activity(name,s.cells.filter((v,i)=>v===value&&before.cells[i]!==v).length);if(game==='nonogram')s.cells=autoCrossLines(s.cells,NONOGRAMS[store.nonogram.level-1].grid);
 const won=game==='sudoku'?s.board.every(Boolean)&&!conflicts(s.board).length:game==='wordsearch'?wordsearchSolved(generateWordsearch(store.wordsearch.level),s):nonogramSolved(s.cells,NONOGRAMS[store.nonogram.level-1].grid);
 if(analyticsEnabled&&game==='wordsearch')analytics.updateProgress(s.found.length/generateWordsearch(store.wordsearch.level).words.length*100);
 if(analyticsEnabled&&game!=='wordsearch'){const solution=game==='sudoku'?generateSudoku(store.sudoku.level).solution:NONOGRAMS[store.nonogram.level-1].grid.flat();const correct=s.board?s.board.filter((n,i)=>n&&n===solution[i]).length:s.cells.filter((v,i)=>v===1&&solution[i]===1).length;analytics.updateProgress(correct/(game==='sudoku'?81:solution.filter(Boolean).length)*100);}
 if(won&&!s.won){analytics.complete();s.won=true;store[game].completed[store[game].level]={at:new Date().toISOString(),hints:s.hints||0};save();render();openComplete();}
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
 board.addEventListener('keydown',e=>{const b=e.target.closest('[data-pixel]');if(!b||current().won||platform.blocked()||(paint==='move'&&e.key.toLowerCase()!=='x'))return;const i=Number(b.dataset.pixel);if(e.key===' '||e.key==='Enter'||e.key==='x'||e.key==='X'){e.preventDefault();pushHistory();const v=e.key.toLowerCase()==='x'?0:paint==='cross'?0:1;current().cells[i]=current().cells[i]===v?-1:v;afterMove();$(`[data-pixel="${i}"]`)?.focus({preventScroll:true});}});
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
 const b=e.target.closest('[data-pixel]');if(!b||current().won||stroke||platform.blocked()||![0,2].includes(e.button)||(paint==='move'&&e.button!==2))return;
 e.preventDefault();const i=Number(b.dataset.pixel),target=e.button===2||paint==='cross'?0:1;
 pushHistory();stroke={value:current().cells[i]===target?-1:target,seen:new Set(),pointer:e.pointerId};paintCell(i);b.focus({preventScroll:true});
}
function paintCell(i){
 if(!stroke||stroke.seen.has(i))return;stroke.seen.add(i);current().cells[i]=stroke.value;
 const cell=$(`[data-pixel="${i}"]`);if(cell){cell.classList.toggle('filled',stroke.value===1);cell.classList.toggle('crossed',stroke.value===0);cell.setAttribute('aria-pressed',stroke.value===1);}
}
document.addEventListener('pointermove',e=>{if(!stroke||platform.blocked()||e.pointerId!==stroke.pointer)return;e.preventDefault();const b=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-pixel]');if(b)paintCell(Number(b.dataset.pixel));},{passive:false});
document.addEventListener('pointerup',()=>{if(!stroke)return;stroke=null;afterMove();});
document.addEventListener('pointercancel',()=>{if(stroke){stroke=null;afterMove();}});
function openHint(){
 if(game==='wordsearch')return openWordHint();
 if(game!=='sudoku')return openRules();
 if(!canMove())return;
 const s=current(),next=getHint(s.board,s.exclusions),hintsBefore=isYandex?benefits.snapshot().hints:0,fingerprint=JSON.stringify([s.board,s.exclusions]);
 if(isYandex&&(next.placement||next.eliminations?.length)){
  if(!benefits.canRead(fingerprint))return offerReward('hints');
  try{benefits.readHint(fingerprint);if(benefits.snapshot().hints<hintsBefore){analytics.event('gameHintUsed',{technique:next.technique});analytics.activity('hint_used');}}catch{return toast('Не удалось сохранить баланс подсказок. Попробуй ещё раз.');}
 }
 activeHint=next;s.hints++;if(activeHint.placement)selected=activeHint.placement.cell;save();renderBoard();renderControls();
 $('#hint-title').textContent=activeHint.title;$('#hint-lead').textContent=activeHint.lead;$('#hint-detail').textContent=activeHint.detail;$('#hint-detail').hidden=true;
 $('#explain-button').hidden=false;$('#eliminate-button').hidden=true;$('#word-initial-dialog-button').hidden=true;showDialog('#hint-dialog');
}
let rewardOffer=null;
function offerReward(kind){
 if(!isYandex)return;
 rewardOffer={kind,puzzle:game==='sudoku'?puzzleKey():null,level:store[game].level,attempt:round()?.id};
 let copy={candidates:['Все кандидаты для уровня','Автоматические пометки','Просмотр рекламы откроет расстановку и автообновление кандидатов для этого уровня. Повторный пересчёт бесплатный.'],hints:['Три объясняющие подсказки','+3 подсказки','Один просмотр рекламы добавит три подсказки. Баланс сохраняется между уровнями; подсказки объясняют ход и не вводят цифру.'],revive:['Продолжить эту партию','Ещё три ошибки','Просмотр рекламы сохранит текущее поле и обнулит счётчик ошибок. Неверные записи останутся красными: их можно исправить.']}[kind];
 if(game==='wordsearch'&&kind==='hints')copy=['Подсказки для поиска слов','+3 подсказки','Один просмотр добавит три подсказки. Одна подсказка раскрывает слово или подсвечивает все его начальные буквы на поле. Повторная подсветка той же буквы в этом уровне бесплатна. Баланс сохраняется между уровнями.'];
 $('#reward-title').textContent=copy[0];$('#reward-benefit').textContent=copy[1];$('#reward-copy').textContent=copy[2];$('#reward-status').textContent='Награда выдаётся только за подтверждённый просмотр.';$('#reward-watch').disabled=false;
 showDialog('#reward-dialog');
}
$('#reward-watch').addEventListener('click',async()=>{
 if(!rewardOffer||platform.blocked())return;const offer=rewardOffer,receipt=crypto.randomUUID();$('#reward-watch').disabled=true;$('#reward-status').textContent='Открываем рекламу…';
 const result=await platform.rewarded(()=>{
  const granted=offer.kind==='candidates'?benefits.grantCandidates(offer.puzzle,receipt):offer.kind==='hints'?benefits.grantHints(receipt):benefits.revive(offer.puzzle,offer.attempt,receipt);
  if(!granted)throw Error('Reward no longer applies');
 },offer.kind);
 $('#reward-watch').disabled=false;
 if(!result.rewarded){$('#reward-status').textContent=result.reason==='storage'?'Не удалось сохранить награду. Попробуй ещё раз.':'Просмотр не подтверждён. Награда не выдана; можно повторить или вернуться к игре.';return;}
 rewardOffer=null;hideDialog('#reward-dialog');render();
 if(offer.kind==='candidates'&&game==='sudoku'&&puzzleKey()===offer.puzzle)fillCandidates();
 else if(offer.kind==='hints')toast('Добавлены три подсказки. Нажми «Подсказки», когда понадобится разбор.');
 else{analytics.event('gameRoundRevived');hideDialog('#attempt-dialog');toast('Партия восстановлена. Поле сохранено, снова доступны три ошибки.');}
 syncGameplay();
});
function openAttempt(){
 if(!isYandex||game!=='sudoku'||!round()||round().status==='playing')return;
 const finished=round().status==='finished';$('#attempt-title').textContent=finished?'Партия завершена':'Четвёртая ошибка';$('#attempt-copy').textContent=finished?'Эта попытка закончена. Можно начать этот уровень заново или выбрать другой. Пройденные уровни сохранены.':'Поле сохранено. Посмотри рекламу, чтобы продолжить с новым лимитом трёх ошибок, или заверши эту партию.';
 $('#attempt-restore').textContent=finished?'Начать новую партию':'Продолжить за рекламу';$('#attempt-finish').hidden=finished;showDialog('#attempt-dialog');
}
$('#attempt-restore').addEventListener('click',()=>{if(round()?.status==='finished'){hideDialog('#attempt-dialog');showDialog('#confirm-dialog');}else offerReward('revive');});
$('#attempt-finish').addEventListener('click',()=>{analytics.event('gameRoundFinished',{mistakes:round()?.errors});analytics.leave('finish');benefits.finish(puzzleKey());hideDialog('#attempt-dialog');render();openLevels();});
$('#attempt-levels').addEventListener('click',()=>{hideDialog('#attempt-dialog');openLevels();});
$('#explain-button').addEventListener('click',()=>{$('#hint-detail').hidden=false;$('#explain-button').hidden=true;$('#eliminate-button').hidden=!activeHint?.eliminations?.length;});
$('#eliminate-button').addEventListener('click',()=>{
 if(!activeHint?.eliminations?.length)return;pushHistory();const s=current();
 for(const {cell,value} of activeHint.eliminations){if(!s.exclusions[cell].includes(value))s.exclusions[cell].push(value);s.notes[cell]=s.notes[cell].filter(n=>n!==value);}
 if(s.auto)s.notes=candidates(s.board,s.exclusions);
 hideDialog('#hint-dialog');activeHint=null;save();render();toast('Сняты только обоснованные кандидаты. Числа в поле не изменились.');
});
function openLevels(){
 const legacy=store.legacyCompleted[game];
 $('#levels-intro').textContent=`${game==='sudoku'?'Судоку':game==='wordsearch'?'Поиск слов':'Японские кроссворды'} · ${Object.keys(store[game].completed).length} из ${levelCount(game)} пройдено. Все уровни доступны сразу.${legacy?' Результаты прежней подборки сохранены: '+legacy+' уровней.':''}`;
 const chapters=chaptersFor(game);
 $('#levels-content').innerHTML=chapters.map(ch=>`<section class="level-chapter"><h3>${ch.label}</h3><div class="level-grid">${chapterLevels(ch).map(n=>{const done=store[game].completed[n];return `<button class="level-item ${done?'done':''} ${n===store[game].level?'current':''}" data-level="${n}" aria-label="Уровень ${n}${done?', пройден':''}">${n}</button>`;}).join('')}</div></section>`).join('');
 $$('[data-level]').forEach(b=>b.addEventListener('click',()=>{hideDialog('#levels-dialog');setLevel(Number(b.dataset.level));}));showDialog('#levels-dialog');
}
function setLevel(level){analytics.leave('level_change');store[game].level=level;analytics.levelStart();histories[game]=[];selected=-1;activeHint=null;pencil=false;tapGesture.reset();fitNonogram=false;ensureState();save();render();window.scrollTo({top:0,behavior:'instant'});if(round()&&round().status!=='playing')openAttempt();}
function openComplete(){
 const level=store[game].level;$('#complete-title').textContent=game==='sudoku'?'Всё сошлось!':game==='wordsearch'?'Все слова нашлись!':NONOGRAMS[level-1].name;
 const count=Object.keys(store[game].completed).length;
 $('#complete-copy').textContent=count===levelCount(game)?`Все ${levelCount(game)} уровней этой игры собраны. Можно вернуться к любимым или попробовать другую игру.`:`Уровень ${level} в твоей коллекции. Пройдено ${count} из ${levelCount(game)}. Можно перейти к следующему или выбрать любой другой.`;
 $('#next-level').innerHTML=nextLevelFor(game,level,store[game].completed)?`Следующий уровень${icon('arrow')}`:'К коллекции уровней';showDialog('#complete-dialog');
}
function openRules(){
 if(game==='wordsearch'){$('#rules-content').innerHTML='<p>На поле спрятаны слова одной темы. Изначально видно их количество. Выделяй слово от первой буквы до последней: в маленьких полях по горизонтали и вертикали, дальше появляются диагонали и обратное направление.</p><h3>На телефоне и компьютере</h3><p>Проведи пальцем или мышью по прямой линии. В режиме «Два касания» выбери начальную и конечную букву. Клавиатура: стрелки двигают выбор, Enter или пробел отмечает начало и конец, Escape снимает выделение.</p><h3>Если не находится</h3><p>Подсказка раскрывает одно из оставшихся слов. Оно появится рядом с найденными. Кнопка «Буква» у раскрытого слова подсвечивает все такие буквы на поле, включая отвлекающие. Подсветку можно убрать и включить снова. Раскрытое слово нужно отыскать на поле. Отмена находки сохраняет уже раскрытые подсказки.</p><h3>Прогресс</h3><p>Все 30 уровней и размеры доступны сразу. Найденные и раскрытые слова сохраняются в этом браузере.</p>';showDialog('#rules-dialog');return;}
 $('#rules-content').innerHTML=game==='sudoku'?`<p>Заполни поле цифрами от 1 до 9. В каждой строке, столбце и блоке 3×3 цифры встречаются по одному разу.</p><h3>Пометки и все кандидаты</h3><ul><li>Выбери клетку и нажми цифру. «Пометки» включают маленькие записи карандашом.</li><li>«Все кандидаты» расставят допустимые цифры во всех пустых клетках. Они обновляются после ввода чисел. Повторное нажатие пересчитает их с нуля.</li><li>Ручная правка пометок выключает автообновление, чтобы сохранить твою работу.</li><li>Если в клетке осталась одна допустимая пометка, двойной клик или двойной тап впишет её. Этот ход можно отменить.</li></ul><h3>Когда не видишь следующего хода</h3><p>«Подсказка» сначала покажет, куда посмотреть. Затем можно открыть объяснение. Числа она не вводит. Если ход снимает кандидатов, их можно убрать отдельной кнопкой после объяснения.</p><h3>Проверка записей</h3><p>Верные введённые числа тёмные, неверные красные. Проверяется соответствие единственному решению, включая случаи без повторов. Лимита ошибок на этом сайте нет. В тупике подсказка объяснит, какие клетки перекрывают нужное число.</p><h3>Сложность и уровни</h3><p>Все уровни доступны сразу. Выбери «Базовый», «Средний», «Сложный» или «Эксперт» над полем. В базовой группе пять задач; экспертные требуют пар и исключений кандидатов.</p><h3>На компьютере</h3><p>Стрелки выбирают клетку, 1–9 вводят цифру, N включает пометки, Backspace стирает, Ctrl/Cmd+Z отменяет ход.</p>`:`<p>Числа слева описывают закрашенные группы в строке, числа сверху — в столбце. Порядок групп совпадает с порядком чисел.</p><h3>Что значит «3 1»</h3><p>Сначала группа из трёх закрашенных клеток, потом хотя бы одна пустая, затем одна закрашенная. До и после групп тоже могут быть пустые клетки.</p><h3>Управление</h3><ul><li>Клик закрашивает клетку, правая кнопка мыши ставит крестик. Повторное действие снимает отметку.</li><li>На телефоне выбери «Закрасить» или «Крестик», затем касайся клеток или веди пальцем.</li><li>Пробел или Enter закрашивает выбранную клетку, X ставит крестик.</li><li>«Отмена» возвращает весь последний штрих вместе с автокрестиками.</li><li>На больших полях «Двигать» позволяет перетаскивать поле. Масштаб меняется кнопками +/−, а «Всё поле» показывает обзор.</li></ul><h3>Обратная связь</h3><p>Собранная группа приглушает числа. Красные числа означают, что текущие отметки уже не могут совпасть с этой линией. Когда строка или столбец закрашены верно, оставшиеся пустые клетки автоматически получают крестики. Все размеры и уровни можно выбрать сразу.</p>`;
 showDialog('#rules-dialog');
}
$$('.game-tab').forEach(b=>b.addEventListener('click',()=>{if(fixedGame||game===b.dataset.game)return;game=b.dataset.game;store.activeGame=game;selected=-1;activeHint=null;stroke=null;tapGesture.reset();fitNonogram=false;ensureState();save();render();}));
$('#notes-button').addEventListener('click',()=>{pencil=!pencil;renderControls();renderBoard();});
$('#erase-button').addEventListener('click',erase);$('#undo-button').addEventListener('click',undo);$('#nonogram-undo').addEventListener('click',undo);
$('#candidates-button').addEventListener('click',fillCandidates);$('#hint-button').addEventListener('click',openHint);$('#guide-button').addEventListener('click',openHint);
for(const id of ['#levels-button','#progress-button','#journey-levels'])$(id).addEventListener('click',openLevels);
$('#rules-button').addEventListener('click',openRules);
$('#word-initial-dialog-button').addEventListener('click',()=>{const word=$('#word-initial-dialog-button').dataset.word;hideDialog('#hint-dialog');highlightWordInitial(word);});$('#word-initial-clear').addEventListener('click',()=>{if(game!=='wordsearch'||!canMove())return;current().activeInitial=null;save();render();});
$('#wordsearch-hint').addEventListener('click',openWordHint);$('#wordsearch-undo').addEventListener('click',undo);$$('[data-word-mode]').forEach(b=>b.addEventListener('click',()=>{wordMode=b.dataset.wordMode;renderBoard();renderControls();}));
$$('[data-paint]').forEach(b=>b.addEventListener('click',()=>{paint=b.dataset.paint;renderControls();renderBoard();}));
$('#restart-button').addEventListener('click',()=>showDialog('#confirm-dialog'));
$('#confirm-restart').addEventListener('click',()=>{analytics.leave('restart');analytics.levelStart();if(isYandex&&game==='sudoku'){benefits.startAttempt(puzzleKey(),crypto.randomUUID());histories.sudoku=[];}else pushHistory();delete store[game].saves[store[game].level];activeHint=null;ensureState();save();render();hideDialog('#confirm-dialog');});
$('#next-level').addEventListener('click',async()=>{if(platform.blocked())return;if(isYandex&&game!=='sudoku'){await platform.interstitial();}hideDialog('#complete-dialog');const next=nextLevelFor(game,store[game].level,store[game].completed);if(next)setLevel(next);else openLevels();});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.sudoku-cell'))tapGesture.reset();});
document.addEventListener('keydown',e=>{
 tapGesture.reset();
 if($('dialog[open]'))return;
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo();return;}
 if(e.ctrlKey||e.metaKey||e.altKey||game!=='sudoku')return;
 if(/^[1-9]$/.test(e.key)){e.preventDefault();enterNumber(Number(e.key));return;}
 if(e.key==='Backspace'||e.key==='Delete'){e.preventDefault();erase();return;}
 if(e.key.toLowerCase()==='n'){pencil=!pencil;renderControls();renderBoard();return;}
 const offset={ArrowLeft:-1,ArrowRight:1,ArrowUp:-9,ArrowDown:9}[e.key];
 if(offset){e.preventDefault();selected=((selected<0?0:selected)+offset+81)%81;activeHint=null;renderBoard();$(`[data-cell="${selected}"]`).focus({preventScroll:true});}
});
ensureState();analytics.levelStart();render();
document.body.dataset.platform=isYandex?'yandex':'web';
if(isYandex){
 const tutorial=mountOnboarding({game,track:(name,params)=>analytics.event(name,params),onOpen:syncGameplay,onClose:()=>{syncGameplay();if(round()&&round().status!=='playing')openAttempt();}});
 $('#help-button').hidden=false;$('#help-button').addEventListener('click',tutorial.open);
 document.addEventListener('click',e=>{const b=e.target.closest('button[id]');if(b&&!b.closest('#onboarding-dialog'))analytics.activity('button_'+b.id);});
 setInterval(()=>analytics.flush(),10000);window.addEventListener('pagehide',()=>analytics.leave('pagehide'));
 new MutationObserver(syncGameplay).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
 document.addEventListener('visibilitychange',()=>{platform.pause('hidden',document.hidden);syncGameplay();});
 for(const name of ['click','pointerdown','keydown'])document.addEventListener(name,e=>{if(platform.blocked()){e.preventDefault();e.stopImmediatePropagation();}},{capture:true});
 const fit=()=>{const mount=$('#board-mount'),tools=$('.nonogram-view-tools'),size=Math.max(80,Math.floor(Math.min(mount.clientWidth,mount.clientHeight-(tools?tools.offsetHeight+5:0))));mount.style.setProperty('--board-fit',size+'px');};
 new ResizeObserver(fit).observe($('#board-mount'));fit();
 platform.init();tutorial.firstRun();
 if(!$('dialog[open]')&&round()&&round().status!=='playing')openAttempt();
 document.fonts.ready.then(()=>{requestAnimationFrame(()=>{fit();platform.ready();syncGameplay();});});
 if(benefitsError)toast('Баланс и ошибки сейчас хранятся только до закрытия вкладки. Исходное сохранение не изменено.');
}
if(loadError){$('#save-status').textContent='сохранение недоступно';toast('Сохранение не удалось прочитать. Исходная запись сохранена; новое поле работает без записи поверх неё.');}
else{save();if(migrationNotice)toast('Прогресс перенесён. Прежнее сохранение осталось отдельной резервной копией.');}
