import test from 'node:test';
import assert from 'node:assert/strict';
import {DIGITS,UNITS,generateSudoku,generateLegacySudoku,solve,logicalSolve,logicalStep,candidates,emptyNotes,getHint} from '../dist/engine/sudoku.js';
import {NONOGRAMS,logicalNonogram,solveNonogram,cluesFor,patterns,runs,lineState,nonogramSolved,autoCrossLines} from '../dist/engine/nonogram.js';
import {SUDOKU_CHAPTERS,NONOGRAM_CHAPTERS,migrateProgressV1,STORAGE_KEY,LEGACY_STORAGE_KEY} from '../dist/engine/progress.js';

test('all 30 sudoku levels are unique, deterministic and completely explained',()=>{
 const seen=new Set();
 for(let level=1;level<=30;level++){
  const p=generateSudoku(level);assert.equal(solve(p.puzzle,2).count,1,`unique level ${level}`);
  assert.deepEqual(p,generateSudoku(level));seen.add(p.puzzle.join(''));
  const logical=logicalSolve(p.puzzle);assert.ok(logical.solved,`logical level ${level}`);assert.deepEqual(logical.board,p.solution);
  assert.ok(p.clues>=24&&p.clues<=46,`meaningful level ${level}: ${p.clues}`);
  for(const step of logical.trace){
   assert.ok(step.lead&&step.detail&&step.cells.length);
   if(step.placement)assert.equal(step.placement.value,p.solution[step.placement.cell]);
   for(const {cell,value} of step.eliminations||[])assert.notEqual(value,p.solution[cell],`sound ${step.technique} on level ${level}`);
  }
 }
 assert.equal(seen.size,30);
});
test('candidates respect every row, column and box, and do not mutate the input',()=>{
 const p=generateSudoku(15),before=structuredClone(p.puzzle),cs=candidates(p.puzzle);
 for(let i=0;i<81;i++)if(!p.puzzle[i]){
  assert.ok(cs[i].includes(p.solution[i]));
  for(const n of cs[i])assert.ok(UNITS.filter(u=>u.includes(i)).every(u=>!u.some(j=>p.puzzle[j]===n)));
 }
 assert.deepEqual(p.puzzle,before);
});
test('a hint only explains and never writes a number or removes notes by itself',()=>{
 const p=generateSudoku(1),notes=emptyNotes(),before=structuredClone([p.puzzle,notes]);
 const h=getHint(p.puzzle,notes);assert.ok(h.placement||h.eliminations);
 assert.deepEqual([p.puzzle,notes],before);assert.ok(h.detail.length>40);
});
test('duplicates and impossible cells get an explanation',()=>{
 const board=Array(81).fill(0);board[0]=1;board[1]=1;assert.equal(getHint(board).technique,'conflict');
 const other=Array(81).fill(0);for(let i=1;i<9;i++)other[i]=i;other[9]=9;
 assert.equal(getHint(other).technique,'contradiction');
});
const all=()=>Array.from({length:81},()=>[...DIGITS]);
test('open pair removes its digits only from the other cells of its unit',()=>{
 const board=Array(81).fill(0),cs=all();cs[0]=[1,2];cs[1]=[1,2];const h=logicalStep(board,cs);
 assert.equal(h.technique,'naked-pair');assert.deepEqual(h.cells,[0,1]);assert.ok(h.eliminations.every(e=>e.cell>=2&&e.cell<=8&&[1,2].includes(e.value)));
});
test('pointing candidates only eliminate outside the source block',()=>{
 const board=Array(81).fill(0),cs=all();for(const i of [9,10,11,18,19,20])cs[i]=cs[i].filter(n=>n!==1);
 const h=logicalStep(board,cs);assert.equal(h.technique,'pointing');assert.ok(h.eliminations.every(e=>e.cell>=3&&e.cell<9&&e.value===1));
});
test('claiming candidates only eliminate in the source block',()=>{
 const board=Array(81).fill(0),cs=all();for(let i=2;i<9;i++)cs[i]=cs[i].filter(n=>n!==1);
 const h=logicalStep(board,cs);assert.equal(h.technique,'claiming');assert.ok(h.eliminations.every(e=>[9,10,11,18,19,20].includes(e.cell)&&e.value===1));
});
test('hidden pair removes only other digits in its two cells',()=>{
 const board=Array(81).fill(0),cs=all();for(let i=0;i<9;i++)if(i!==0&&i!==4)cs[i]=cs[i].filter(n=>n!==1&&n!==2);
 const h=logicalStep(board,cs);assert.equal(h.technique,'hidden-pair');assert.ok(h.eliminations.every(e=>[0,4].includes(e.cell)&&e.value>2));
});
test('X-wing eliminates in the two crossing columns, preserving all four corners',()=>{
 const board=Array(81).fill(0),cs=all();for(const r of [0,3])for(let c=0;c<9;c++)if(c!==0&&c!==3)cs[r*9+c]=cs[r*9+c].filter(n=>n!==1);
 const h=logicalStep(board,cs);assert.equal(h.technique,'x-wing');assert.ok(h.eliminations.every(e=>[0,3].includes(e.cell%9)&&![0,3].includes(Math.floor(e.cell/9))&&e.value===1));
});
test('all 30 nonograms have consistent dimensions, unique solutions and a logical path',()=>{
 assert.equal(NONOGRAMS.length,30);
 for(const p of NONOGRAMS){
  assert.ok([5,10,15,20].includes(p.grid.length));assert.ok(p.grid.every(r=>r.length===p.grid.length));
  assert.deepEqual(cluesFor(p.grid),{rows:p.rows,cols:p.cols});
  assert.ok(logicalNonogram(p.grid).solved,`unique logical level ${p.level} ${p.name}`);
  assert.equal(solveNonogram(p.grid).count,1,`exact unique ${p.name}`);
 }
});
test('a nonogram completes with exact black cells, optional white crosses, never with extra black cells',()=>{
 const p=NONOGRAMS[0],flat=p.grid.flat();assert.ok(nonogramSolved(flat,p.grid));
 assert.ok(nonogramSolved(flat.map(v=>v===0?-1:v),p.grid));
 const wrong=[...flat];wrong[flat.indexOf(0)]=1;assert.ok(!nonogramSolved(wrong,p.grid));
});
test('line analysis catches impossible partial marks and enumerates edge cases',()=>{
 assert.deepEqual(runs([0,1,1,0,1]),[2,1]);assert.deepEqual(runs([0,0]),[0]);
 assert.deepEqual(patterns(3,[0]),[[0,0,0]]);assert.equal(patterns(5,[3]).length,3);
 assert.equal(patterns(5,[3,3]).length,0);assert.equal(patterns(5,[2,2]).length,1);
 assert.ok(!lineState([1,1,1,-1,-1],[2]).valid);assert.ok(lineState([-1,1,1,-1,-1],[2]).valid);
});

test('only five warm-up puzzles, then genuinely larger nonograms',()=>{
 assert.deepEqual(NONOGRAM_CHAPTERS.map(c=>c.end-c.start+1),[5,10,10,5]);
 assert.deepEqual([5,6,16,26].map(n=>NONOGRAMS[n-1].grid.length),[5,10,15,20]);
 assert.equal(NONOGRAMS.filter(p=>p.grid.length===5).length,5);
});
test('expert sudokus require advanced eliminations and keep an explanatory path',()=>{
 assert.equal(SUDOKU_CHAPTERS[0].end,5);
 for(let n=21;n<=30;n++){
  const p=generateSudoku(n),trace=logicalSolve(p.puzzle);assert.ok(trace.solved);
  assert.ok(trace.trace.filter(s=>s.eliminations).length>=3,`real expert ${n}`);
 }
 assert.deepEqual(generateSudoku(6).puzzle,generateLegacySudoku(11).puzzle);
 assert.deepEqual(generateSudoku(11).puzzle,generateLegacySudoku(21).puzzle);
});
function legacy(){return {version:1,activeGame:'nonogram',sudoku:{level:1,completed:{},saves:{}},nonogram:{level:11,completed:Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,{at:'before'}])),saves:{11:{cells:Array(49).fill(-1),won:false}}}};}
test('ten old tiny nonograms resume at the first 10x10; legacy input is untouched',()=>{
 const old=legacy(),before=structuredClone(old),next=migrateProgressV1(old);
 assert.notEqual(STORAGE_KEY,LEGACY_STORAGE_KEY);assert.equal(next.version,2);assert.equal(next.nonogram.level,6);
 assert.deepEqual(Object.keys(next.nonogram.completed),['1','2','3','4','5']);assert.equal(next.legacyCompleted.nonogram,10);assert.deepEqual(old,before);
});
test('migration preserves a partial retained puzzle and never gives its state to another grid',()=>{
 const old=legacy();old.nonogram.level=21;old.nonogram.saves[21]={cells:Array(100).fill(-1),won:false};old.nonogram.saves[21].cells[3]=1;
 const p=generateLegacySudoku(11);old.sudoku.level=11;old.sudoku.saves[11]={board:p.puzzle,notes:emptyNotes(),exclusions:emptyNotes(),auto:true,won:false,hints:0};
 const next=migrateProgressV1(old);assert.equal(next.nonogram.level,6);assert.equal(next.nonogram.saves[6].cells[3],1);assert.ok(!next.nonogram.saves[11]);
 assert.equal(next.sudoku.level,6);assert.deepEqual(next.sudoku.saves[6].board,generateSudoku(6).puzzle);
});
test('autocross completes correct rows and columns and does not mutate the undo snapshot',()=>{
 const grid=[[1,0,1],[0,1,0],[1,0,0]],before=[1,-1,1,-1,-1,-1,-1,-1,-1],copy=[...before];
 const next=autoCrossLines(before,grid);assert.equal(next[1],0);assert.equal(next[5],0);assert.equal(next[8],0);assert.equal(next[3],-1);assert.deepEqual(before,copy);
 const partial=Array(9).fill(-1);partial[0]=1;assert.equal(autoCrossLines(partial,grid)[1],-1);
});
test('matching clue lengths at wrong positions do not trigger autocross',()=>{
 const grid=[[0,1,1,0],[1,0,0,1],[0,1,0,0],[1,0,1,0]],state=Array(16).fill(-1);state[0]=1;state[1]=1;
 const next=autoCrossLines(state,grid);assert.equal(next[2],-1);assert.equal(next[3],-1);
});
