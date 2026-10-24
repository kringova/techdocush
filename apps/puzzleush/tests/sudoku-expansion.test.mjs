import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {generateSudoku,SUDOKU_LEVEL_COUNT,logicalSolve,emptyNotes} from '../dist/engine/sudoku.js';
import {SUDOKU_CHAPTERS,chapterFor,chapterLevels,levelCount,levelOrder,nextLevelFor,migrateProgressV3,STORAGE_KEY,V3_STORAGE_KEY} from '../dist/engine/progress.js';

test('the original 30 puzzles and their solutions keep their exact identities',async()=>{
 const expected=JSON.parse(await readFile(new URL('./fixtures/sudoku-1.3.1-hashes.json',import.meta.url)));
 for(let n=1;n<=30;n++){const p=generateSudoku(n);assert.equal(createHash('sha256').update(p.puzzle.join('')+':'+p.solution.join('')).digest('hex'),expected[n],`existing level ${n}`);}
});
test('difficulty groups cover every level once, preserving short warmup and old ids',()=>{
 assert.equal(SUDOKU_LEVEL_COUNT,130);assert.equal(levelCount('sudoku'),130);assert.equal(levelCount('nonogram'),30);assert.equal(levelCount('wordsearch'),30);
 assert.deepEqual(SUDOKU_CHAPTERS.map(c=>chapterLevels(c).length),[5,25,40,60]);
 assert.deepEqual(levelOrder('sudoku').toSorted((a,b)=>a-b),Array.from({length:130},(_,i)=>i+1));
 for(const [n,label] of [[1,'Базовый'],[10,'Средний'],[31,'Средний'],[50,'Средний'],[51,'Сложный'],[80,'Сложный'],[81,'Эксперт'],[130,'Эксперт']])assert.equal(chapterFor('sudoku',n).label,label);
 for(const n of [0,131,1.5,NaN])assert.throws(()=>generateSudoku(n));
});
test('next puzzle continues the same difficulty and skips already completed tasks',()=>{
 assert.equal(nextLevelFor('sudoku',10),31);assert.equal(nextLevelFor('sudoku',20),51);assert.equal(nextLevelFor('sudoku',30),81);
 assert.equal(nextLevelFor('sudoku',30,{81:{at:'before'}}),82);assert.equal(nextLevelFor('sudoku',130),null);
 assert.equal(nextLevelFor('nonogram',29),30);assert.equal(nextLevelFor('wordsearch',30),null);
});
test('new medium, hard and expert tasks are graded by their full logical paths',()=>{
 for(let n=31;n<=130;n++){
  const result=logicalSolve(generateSudoku(n).puzzle);assert.ok(result.solved,`level ${n}`);
  const advanced=result.trace.filter(s=>s.eliminations),techniques=new Set(advanced.map(s=>s.technique));
  if(n<=50){assert.ok(advanced.length<=1,`medium ${n}`);assert.ok(result.trace.filter(s=>s.technique==='hidden-single').length>=3);}
  else if(n<=80)assert.ok(advanced.length>=1&&advanced.length<=3,`hard ${n}`);
  else{assert.ok(advanced.length>=4,`expert ${n}`);assert.ok(techniques.size>=2);assert.ok(['naked-pair','hidden-pair','x-wing'].some(t=>techniques.has(t)));}
 }
});
test('v3 to v4 copies full progress without mutating the old snapshot or its word hints',()=>{
 const old={version:3,activeGame:'sudoku',sudoku:{level:30,completed:Object.fromEntries(Array.from({length:30},(_,i)=>[i+1,{at:'before',hints:1}])),saves:{30:{board:generateSudoku(30).solution,notes:emptyNotes(),exclusions:emptyNotes(),won:true,auto:true,hints:1}}},nonogram:{level:6,completed:{1:{at:'before'}},saves:{6:{cells:Array(100).fill(-1),won:false}}},wordsearch:{level:21,completed:{},saves:{21:{found:['ВРАЧ'],revealed:['УЧИТЕЛЬ'],initials:['У'],activeInitial:'У',won:false,hints:2}}},legacyCompleted:{sudoku:5,nonogram:10,wordsearch:0}},before=structuredClone(old),next=migrateProgressV3(old);
 assert.notEqual(STORAGE_KEY,V3_STORAGE_KEY);assert.equal(next.version,4);assert.deepEqual(old,before);
 for(const g of ['sudoku','nonogram','wordsearch','legacyCompleted'])assert.deepEqual(next[g],old[g]);
 next.sudoku.saves[30].board[0]=0;next.wordsearch.saves[21].initials.push('А');assert.deepEqual(old,before);
 assert.throws(()=>migrateProgressV3({version:2}));
});
