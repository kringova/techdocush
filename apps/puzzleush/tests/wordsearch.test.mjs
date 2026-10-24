import test from 'node:test';
import assert from 'node:assert/strict';
import {generateWordsearch,occurrences,wordPath,selectedWord,revealWord,wordsearchSolved,WORDSEARCH_CHAPTERS} from '../dist/engine/wordsearch.js';
import {chapterFor,migrateProgressV2,STORAGE_KEY,V2_STORAGE_KEY} from '../dist/engine/progress.js';

test('30 deterministic themed word fields have a unique straight placement for every target',()=>{
 const signatures=new Set();
 for(let level=1;level<=30;level++){
  const p=generateWordsearch(level);assert.deepEqual(p,generateWordsearch(level));assert.equal(p.grid.length,p.size*p.size);assert.ok(p.grid.every(c=>/^[А-Я]$/.test(c)));assert.equal(new Set(p.words).size,p.words.length);
  assert.equal(p.words.length,level<=5?4:level<=10?6:level<=20?8:10);assert.ok(p.theme.length>2);
  for(const word of p.words){assert.ok(word.length>=3&&word.length<=p.size);assert.equal(occurrences(p.grid,p.size,word).length,1,`${level}: ${word}`);assert.equal(selectedWord(p,p.placements[word]),word);assert.equal(selectedWord(p,[...p.placements[word]].reverse()),word);}
  signatures.add(p.grid.join(''));
 }
 assert.equal(signatures.size,30);assert.deepEqual(WORDSEARCH_CHAPTERS.map(g=>g.end-g.start+1),[5,5,10,10]);assert.equal(chapterFor('wordsearch',21).label,'12 × 12');
});
test('word paths reject bending, wrapping and invalid coordinates',()=>{
 assert.deepEqual(wordPath(6,0,14),[0,7,14]);assert.deepEqual(wordPath(6,14,0),[14,7,0]);assert.deepEqual(wordPath(6,5,6),[]);assert.deepEqual(wordPath(6,0,13),[]);assert.deepEqual(wordPath(6,-1,3),[]);assert.deepEqual(wordPath(6,0,36),[]);
 const p=generateWordsearch(1);assert.equal(selectedWord(p,[]),null);assert.equal(selectedWord(p,[0,1]),null);assert.equal(selectedWord(p,[0,2,4]),null);
});
test('a reveal only tells what to search for; it never counts as a found word',()=>{
 const p=generateWordsearch(21),s={found:[],revealed:[]},before=structuredClone(s),word=revealWord(p,s);assert.ok(p.words.includes(word));assert.deepEqual(s,before);assert.ok(!wordsearchSolved(p,s));s.revealed.push(word);assert.notEqual(revealWord(p,s),word);s.found.push(revealWord(p,s));assert.ok(!s.found.includes(revealWord(p,s)));
 s.revealed=[...p.words];assert.equal(revealWord(p,s),null);assert.ok(!wordsearchSolved(p,s));s.found=[...p.words];assert.ok(wordsearchSolved(p,s));
});
test('a caller cannot mutate the cached field or shipped target data',()=>{
 const p=generateWordsearch(10),before=structuredClone(p);p.words.pop();p.grid.fill('А');p.placements[before.words[0]][0]=-1;assert.deepEqual(generateWordsearch(10),before);assert.throws(()=>generateWordsearch(0));assert.throws(()=>generateWordsearch(31));
});
test('v3 adds wordsearch while preserving v2 and every existing game snapshot',()=>{
 const old={version:2,activeGame:'nonogram',sudoku:{level:21,completed:{1:{at:'old'}},saves:{21:{board:[1,2,3]}}},nonogram:{level:6,completed:{},saves:{6:{cells:[-1,1,0]}}},legacyCompleted:{sudoku:4,nonogram:10}},before=structuredClone(old),next=migrateProgressV2(old);
 assert.notEqual(STORAGE_KEY,V2_STORAGE_KEY);assert.equal(next.version,3);assert.deepEqual(next.sudoku,old.sudoku);assert.deepEqual(next.nonogram,old.nonogram);assert.deepEqual(next.wordsearch,{level:1,completed:{},saves:{}});next.sudoku.saves[21].board[0]=9;assert.deepEqual(old,before);
});
