import {EXPERT_SUDOKU} from './expert-sudoku.js';
export const DIGITS = [1,2,3,4,5,6,7,8,9];
export const ROWS = Array.from({length:9},(_,r)=>DIGITS.map((_,c)=>r*9+c));
export const COLS = Array.from({length:9},(_,c)=>DIGITS.map((_,r)=>r*9+c));
export const BOXES = Array.from({length:9},(_,b)=>DIGITS.map((_,k)=>(Math.floor(b/3)*3+Math.floor(k/3))*9+(b%3)*3+k%3));
export const UNITS = [...ROWS,...COLS,...BOXES];
export const PEERS = Array.from({length:81},(_,i)=>[...new Set(UNITS.filter(u=>u.includes(i)).flat())].filter(j=>j!==i));
export const cellName = i => `строка ${Math.floor(i/9)+1}, столбец ${i%9+1}`;
export const shortCell = i => `р${Math.floor(i/9)+1}с${i%9+1}`;
const unitName = u => u<9?`строке ${u+1}`:u<18?`столбце ${u-8}`:`блоке ${u-17}`;
export const emptyNotes = () => Array.from({length:81},()=>[]);

export function conflicts(board) {
 const result=new Set();
 for(const unit of UNITS) for(const n of DIGITS){const same=unit.filter(i=>board[i]===n);if(same.length>1)same.forEach(i=>result.add(i));}
 return [...result];
}
export function candidates(board, exclusions=emptyNotes()) {
 return board.map((v,i)=>v?[]:DIGITS.filter(n=>!PEERS[i].some(j=>board[j]===n)&&!exclusions[i]?.includes(n)));
}
export function solve(board, limit=2) {
 if(board.length!==81||board.some(n=>!Number.isInteger(n)||n<0||n>9)||conflicts(board).length)return {count:0,solution:null};
 const work=[...board];let count=0,solution=null;
 function visit(){
  let cell=-1,opts=null;
  for(let i=0;i<81;i++)if(!work[i]){const a=DIGITS.filter(n=>!PEERS[i].some(j=>work[j]===n));if(!a.length)return;if(!opts||a.length<opts.length){cell=i;opts=a;if(a.length===1)break;}}
  if(cell<0){count++;solution??=[...work];return;}
  for(const n of opts){work[cell]=n;visit();if(count>=limit)break;}work[cell]=0;
 }
 visit();return {count,solution};
}
const hint = (technique,title,lead,detail,cells,extra={}) => ({technique,title,lead,detail,cells,...extra});

// Every explanation carries an explicit placement or elimination, so tests can
// verify its conclusion against all solutions of the current position.
export function logicalStep(board, cs=candidates(board)) {
 const dup=conflicts(board);
 if(dup.length)return hint('conflict','Две одинаковые цифры','В выделенных клетках есть повтор.',`В одной строке, столбце или блоке каждая цифра встречается один раз. Проверь ${dup.map(shortCell).join(', ')} и отмени один из последних ходов.`,dup);
 const empty=board.findIndex((n,i)=>!n&&!cs[i].length);
 if(empty>=0)return hint('contradiction','Клетке не осталось числа',`Посмотри на ${cellName(empty)}.`,`В этой клетке исключены все цифры от 1 до 9. Проверь последние записи в её строке, столбце и блоке. Если ты снимала кандидатов, верни их кнопкой «Все кандидаты».`,[empty,...PEERS[empty]]);
 for(let u=0;u<27;u++)for(const n of DIGITS){
  if(UNITS[u].some(i=>board[i]===n))continue;
  const places=UNITS[u].filter(i=>cs[i].includes(n));
  if(!places.length)return hint('contradiction','Цифре не осталось места',`В ${unitName(u)} негде поставить ${n}.`,`Ни одна пустая клетка ${unitName(u)} не допускает ${n}. Проверь последние числа и снятые пометки.`,UNITS[u]);
 }
 for(let i=0;i<81;i++)if(!board[i]&&cs[i].length===1){
  const n=cs[i][0];
  const used=[...new Set(PEERS[i].map(j=>board[j]).filter(Boolean))].sort();
  return hint('single','Один оставшийся кандидат',`Посмотри на ${cellName(i)}.`,`В строке, столбце и блоке этой клетки уже встречаются ${used.join(', ')}.${used.length===8?'':' Остальные кандидаты сняты предыдущими логическими шагами.'} Из девяти цифр остаётся только ${n}. Введи её сама.`,[i],{placement:{cell:i,value:n},unit:PEERS[i]});
 }
 for(let u=0;u<27;u++)for(const n of DIGITS){
  if(UNITS[u].some(i=>board[i]===n))continue;
  const places=UNITS[u].filter(i=>cs[i].includes(n));
  if(places.length===1)return hint('hidden-single','Единственное место для цифры',`Поищи место для ${n} в ${unitName(u)}.`,`В ${unitName(u)} цифра ${n} ещё не записана. Среди всех пустых клеток только ${shortCell(places[0])} допускает её: остальные исключают ${n} своей строкой, столбцом, блоком или уже обоснованными пометками. Введи ${n} в выделенную клетку.`,places,{placement:{cell:places[0],value:n},unit:UNITS[u]});
 }
 for(let u=0;u<27;u++){
  const pairs=UNITS[u].filter(i=>cs[i].length===2);
  for(let a=0;a<pairs.length;a++)for(let b=a+1;b<pairs.length;b++){
   const x=pairs[a],y=pairs[b];if(cs[x].join()!==cs[y].join())continue;
   const eliminations=UNITS[u].filter(i=>i!==x&&i!==y).flatMap(i=>cs[i].filter(n=>cs[x].includes(n)).map(value=>({cell:i,value})));
   if(eliminations.length)return hint('naked-pair','Открытая пара',`Сравни кандидатов в ${shortCell(x)} и ${shortCell(y)}.`,`У этих двух клеток в ${unitName(u)} одна пара: ${cs[x].join(' и ')}. Эти цифры займут две клетки в каком-то порядке, поэтому их можно убрать из остальных клеток этой же области.`,[x,y],{eliminations,unit:UNITS[u]});
  }
 }
 for(let b=0;b<9;b++)for(const n of DIGITS){
  const places=BOXES[b].filter(i=>cs[i].includes(n));if(places.length<2)continue;
  for(const kind of ['row','col']){
   const index=i=>kind==='row'?Math.floor(i/9):i%9;
   if(!places.every(i=>index(i)===index(places[0])))continue;
   const line=(kind==='row'?ROWS:COLS)[index(places[0])];
   const eliminations=line.filter(i=>!BOXES[b].includes(i)&&cs[i].includes(n)).map(cell=>({cell,value:n}));
   if(eliminations.length)return hint('pointing','Кандидаты указывают на линию',`Посмотри, где в блоке ${b+1} может стоять ${n}.`,`Все места для ${n} в этом блоке находятся в одной ${kind==='row'?'строке':'колонке'}. Значит, за границей блока в этой же линии ${n} уже быть не может.`,places,{eliminations,unit:line});
  }
 }
 for(let u=0;u<18;u++)for(const n of DIGITS){
  const places=UNITS[u].filter(i=>cs[i].includes(n));if(places.length<2)continue;
  const b=i=>Math.floor(i/27)*3+Math.floor(i%9/3);
  if(!places.every(i=>b(i)===b(places[0])))continue;
  const eliminations=BOXES[b(places[0])].filter(i=>!UNITS[u].includes(i)&&cs[i].includes(n)).map(cell=>({cell,value:n}));
  if(eliminations.length)return hint('claiming','Линия занимает блок',`Поищи все места для ${n} в ${unitName(u)}.`,`Все кандидаты ${n} в ${unitName(u)} попали в один блок. Одна из этих клеток обязательно займёт ${n}, поэтому в остальных клетках блока эту цифру можно снять.`,places,{eliminations,unit:BOXES[b(places[0])]});
 }
 for(let u=0;u<27;u++)for(let a=1;a<9;a++)for(let b=a+1;b<=9;b++){
  const pa=UNITS[u].filter(i=>cs[i].includes(a)),pb=UNITS[u].filter(i=>cs[i].includes(b));
  if(pa.length!==2||pa.join()!==pb.join())continue;
  const eliminations=pa.flatMap(i=>cs[i].filter(n=>n!==a&&n!==b).map(value=>({cell:i,value})));
  if(eliminations.length)return hint('hidden-pair','Скрытая пара',`Найди места для ${a} и ${b} в ${unitName(u)}.`,`Обе цифры встречаются кандидатами только в ${pa.map(shortCell).join(' и ')}. Эти две клетки заняты парой ${a}/${b}; прочие кандидаты в них лишние.`,pa,{eliminations,unit:UNITS[u]});
 }
 for(const axis of [ROWS,COLS])for(const n of DIGITS)for(let a=0;a<8;a++)for(let b=a+1;b<9;b++){
  const pa=axis[a].filter(i=>cs[i].includes(n)),pb=axis[b].filter(i=>cs[i].includes(n));
  const cross=i=>axis===ROWS?i%9:Math.floor(i/9);
  if(pa.length!==2||pb.length!==2||pa.map(cross).join()!==pb.map(cross).join())continue;
  const corners=[...pa,...pb];
  const eliminations=[...new Set(pa.flatMap(i=>(axis===ROWS?COLS:ROWS)[cross(i)]))].filter(i=>!corners.includes(i)&&cs[i].includes(n)).map(cell=>({cell,value:n}));
  if(eliminations.length)return hint('x-wing','Прямоугольник кандидатов',`Проследи за ${n} в четырёх выделенных клетках.`,`В каждой из двух ${axis===ROWS?'строк':'колонок'} у ${n} ровно два места, и они образуют прямоугольник. Какая бы диагональ ни оказалась верной, обе пересекающие линии получат ${n}. В других клетках этих линий ${n} исключается.`,corners,{eliminations,unit:corners});
 }
 return null;
}
export function logicalSolve(input, maxSteps=500) {
 const board=[...input],eliminations=emptyNotes(),trace=[];
 for(let k=0;k<maxSteps;k++){
  if(board.every(Boolean))return {solved:!conflicts(board).length,board,trace};
  const step=logicalStep(board,candidates(board,eliminations));
  if(!step||step.technique==='conflict'||step.technique==='contradiction')return {solved:false,board,trace,reason:step};
  trace.push(step);
  if(step.placement)board[step.placement.cell]=step.placement.value;
  if(step.eliminations)for(const {cell,value} of step.eliminations)if(!eliminations[cell].includes(value))eliminations[cell].push(value);
 }
 return {solved:false,board,trace};
}
export function getHint(board, exclusions=emptyNotes()) {
 if(board.every(Boolean)&&!conflicts(board).length)return hint('complete','Поле заполнено','Все строки, столбцы и блоки собраны.','Проверь завершение уровня.',[]);
 const step=logicalStep(board,candidates(board,exclusions));if(step)return step;
 // A rare user-created position may need proof by contradiction. Never call a
 // search result a logical rule or silently insert the solution.
 const cs=candidates(board,exclusions);
 const order=cs.map((a,i)=>({a,i})).filter(x=>x.a.length>1).sort((a,b)=>a.a.length-b.a.length);
 for(const {a,i} of order)for(const n of a){
  const test=[...board];test[i]=n;
  if(solve(test,1).count===0){
   const trace=logicalSolve(test);
   if(!trace.reason)continue;
   const chain=trace.trace.filter(s=>s.placement).slice(0,12).map(s=>`${shortCell(s.placement.cell)} = ${s.placement.value}`);
   if(trace.trace.filter(s=>s.placement).length>12)continue;
   return hint('contradiction-proof','Проверка предположения',`Проверь предположение ${shortCell(i)} = ${n}.`,`Если временно принять ${n} в этой клетке, следующие вынужденные шаги${chain.length?': '+chain.join(' → '):' не нужны'}. Получается противоречие: ${trace.reason.detail} Значит, исходное предположение неверно и кандидат ${n} в ${shortCell(i)} можно снять.`,[i,...trace.reason.cells],{eliminations:[{cell:i,value:n}]});
  }
 }
 return hint('pause','Нужен более сложный разбор','Знакомые приёмы здесь не дают следующего шага.','Проверь последние ходы и ручные пометки. Полный поиск не выдаётся за объяснение: автоматической подстановки ответа здесь нет.',[]);
}
function random(seed){let x=seed>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(a,rng){a=[...a];for(let i=a.length-1;i;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const cache=new Map();
export function generateLegacySudoku(level=1) {
 if(cache.has(level))return structuredClone(cache.get(level));
 const rng=random(10242026+level*731);
 const groups=()=>shuffle([0,1,2],rng).flatMap(g=>shuffle([0,1,2],rng).map(n=>g*3+n));
 const rows=groups(),cols=groups(),nums=shuffle(DIGITS,rng);
 const solution=rows.flatMap(r=>cols.map(c=>nums[(r*3+Math.floor(r/3)+c)%9]));
 const board=[...solution];const removed=[];
 const target=level<=10?45-Math.floor((level-1)*.7):level<=20?37-Math.floor((level-11)*.55):31-Math.floor((level-21)*.4);
 let clues=81;
 for(const i of shuffle(Array.from({length:81},(_,i)=>i),rng)){
  if(clues<=target)break;
  const v=board[i];board[i]=0;
  if(solve(board,2).count===1){clues--;removed.push(i);}else board[i]=v;
 }
 // Restore clues until every shipped level has a complete explanatory path.
 while(!logicalSolve(board).solved&&removed.length){const i=removed.pop();board[i]=solution[i];}
 const result={level,puzzle:board,solution,clues:board.filter(Boolean).length};cache.set(level,result);return structuredClone(result);
}

export function generateSudoku(level=1){
 if(!Number.isInteger(level)||level<1||level>30)throw Error('Unknown sudoku level');
 if(level>=21){const p=EXPERT_SUDOKU[level-21];return {level,puzzle:[...p.puzzle].map(Number),solution:[...p.solution].map(Number),clues:p.clues,advanced:p.advanced};}
 const seed=level<=5?level:level<=10?level+5:level+10;
 return {...generateLegacySudoku(seed),level};
}
