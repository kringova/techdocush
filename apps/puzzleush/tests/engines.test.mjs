import test from 'node:test';
import assert from 'node:assert/strict';
import {DIGITS,UNITS,generateSudoku,solve,logicalSolve,logicalStep,candidates,emptyNotes,getHint} from '../dist/engine/sudoku.js';
import {NONOGRAMS,logicalNonogram,cluesFor,patterns,runs,lineState,nonogramSolved} from '../dist/engine/nonogram.js';

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
  assert.ok([5,7,10].includes(p.grid.length));assert.ok(p.grid.every(r=>r.length===p.grid.length));
  assert.deepEqual(cluesFor(p.grid),{rows:p.rows,cols:p.cols});
  assert.ok(logicalNonogram(p.grid).solved,`unique logical level ${p.level} ${p.name}`);
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
