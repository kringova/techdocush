import test from 'node:test';
import assert from 'node:assert/strict';
import {completionFromNotes,generateSudoku,emptyNotes} from '../dist/engine/sudoku.js';
test('finish stays unavailable while any remaining cell has zero or several notes',()=>{
 const p=generateSudoku(1),notes=p.puzzle.map((n,i)=>n?[]:[p.solution[i]]),cell=p.puzzle.findIndex(n=>!n);
 for(const value of [[],[p.solution[cell],p.solution[cell]%9+1]]){const changed=structuredClone(notes);changed[cell]=value;assert.equal(completionFromNotes(p.puzzle,changed).ready,false);}
 assert.equal(completionFromNotes(p.solution,emptyNotes()).ready,false);
});
test('all remaining notes form one literal completion without changing inputs or givens',()=>{
 const p=generateSudoku(1),notes=p.puzzle.map((n,i)=>n?[9,8]:[p.solution[i]]),before=structuredClone([p.puzzle,notes]),finish=completionFromNotes(p.puzzle,notes);
 assert.ok(finish.ready&&finish.valid);assert.deepEqual(finish.board,p.solution);assert.equal(finish.placements.length,p.puzzle.filter(n=>!n).length);
 for(const {cell,value} of finish.placements){assert.equal(p.puzzle[cell],0);assert.equal(value,notes[cell][0]);}
 assert.deepEqual([p.puzzle,notes],before);finish.board[0]=0;assert.deepEqual([p.puzzle,notes],before);
});
test('wrong or contradictory single notes never receive an automatic completion',()=>{
 const p=generateSudoku(21),notes=p.puzzle.map((n,i)=>n?[]:[p.solution[i]]),cell=p.puzzle.findIndex(n=>!n);
 notes[cell]=[p.solution[cell]%9+1];const wrong=completionFromNotes(p.puzzle,notes);assert.equal(wrong.ready,true);assert.equal(wrong.valid,false);assert.equal(wrong.board,null);
 notes[cell]=[0];assert.equal(completionFromNotes(p.puzzle,notes).valid,false);assert.equal(completionFromNotes([],[]).ready,false);
});
test('the entire shipped catalogue can finish from its supplied single notes',()=>{
 for(let n=1;n<=130;n++){const p=generateSudoku(n),notes=p.puzzle.map((value,i)=>value?[]:[p.solution[i]]),finish=completionFromNotes(p.puzzle,notes);assert.ok(finish.ready&&finish.valid,`level ${n}`);assert.deepEqual(finish.board,p.solution);}
});
