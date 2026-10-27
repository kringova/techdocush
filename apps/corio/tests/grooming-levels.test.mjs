import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {GROOMING_LEVELS} from '../dist/mini/grooming-data.mjs';

const allowedZones=new Set(['shoulder','chest','flank','belly','frontpaws','hindpaw']);
const phaseCount={dust:1,tangle:1,mud:4};
const composition=level=>level.spots.map(s=>[s.kind,s.strength].join(':')).sort().join('|');

// The content contract excludes eyes, whiskers and accidental duplicate regions.
test('grooming has fifty static scenarios using distinct body zones and bounded stroke strengths',()=>{
 assert.equal(GROOMING_LEVELS.length,50);
 const names=new Set(),usedZones=new Set();
 for(const level of GROOMING_LEVELS){
  assert.ok(level.name.trim().length>3);names.add(level.name);
  assert.ok(level.spots.length>=1&&level.spots.length<=6);
  assert.equal(new Set(level.spots.map(s=>s.zone)).size,level.spots.length);
  assert.deepEqual(level.spots.map(s=>s.id),Array.from({length:level.spots.length},(_,i)=>i));
  for(const spot of level.spots){
   assert.ok(allowedZones.has(spot.zone));usedZones.add(spot.zone);
   assert.ok(Object.hasOwn(phaseCount,spot.kind));
   assert.ok(Number.isInteger(spot.strength)&&spot.strength>=1&&spot.strength<=3);
   assert.deepEqual(Object.keys(spot).sort(),['id','kind','strength','zone']);
  }
 }
 assert.equal(names.size,50);assert.equal(usedZones.size,6);
});

test('all fifty scenarios differ in actual care composition before spatial placement or names',()=>{
 assert.equal(new Set(GROOMING_LEVELS.map(composition)).size,50);
 const last=GROOMING_LEVELS.at(-1);
 assert.equal(last.spots.filter(s=>s.kind==='mud').length,3);
 assert.deepEqual(last.spots.filter(s=>s.kind==='mud').map(s=>s.strength).sort(),[1,2,3]);
});

test('cleaning work, rest requirements and body-area count grow without backwards jumps',()=>{
 let previousWork=0,previousRegions=0,previousTotal=0,totalWork=0,totalMoves=0;
 for(const[index,level]of GROOMING_LEVELS.entries()){
  const work=level.spots.reduce((n,spot)=>n+spot.strength*(spot.kind==='mud'?4:1),0);
  // A rest is needed before the fourth, seventh, tenth... successful stroke.
  const rests=Array.from({length:work},(_,i)=>i).filter(i=>i>0&&i%3===0).length;
  assert.equal(level.metrics.cleaningStrokes,work);assert.equal(level.metrics.rests,rests);
  assert.equal(level.metrics.referenceMoves,work+rests);assert.equal(level.metrics.zoneCount,level.spots.length);
  assert.ok(work>=previousWork&&work<=previousWork+2);assert.ok(work<=32);
  assert.ok(level.spots.length>=previousRegions&&level.spots.length<=previousRegions+1);
  assert.ok(work+rests>=previousTotal);assert.equal(level.spec.band,Math.floor(index/5)+1);
  previousWork=work;previousRegions=level.spots.length;previousTotal=work+rests;totalWork+=work;totalMoves+=work+rests;
 }
 assert.equal(totalWork,749);assert.equal(totalMoves,964);
 assert.equal(previousWork,32);assert.equal(previousTotal,42);
});

test('the tutorial visibly clears one patch in two strokes; washing starts only after dry-care practice',()=>{
 assert.deepEqual(GROOMING_LEVELS[0].spots,[{id:0,zone:'flank',kind:'dust',strength:2}]);
 assert.deepEqual(GROOMING_LEVELS[0].metrics,{zoneCount:1,cleaningStrokes:2,rests:0,referenceMoves:2,mudAreas:0,toolCount:1});
 assert.ok(GROOMING_LEVELS.slice(0,10).every(l=>l.spots.every(s=>s.kind!=='mud')));
 assert.ok(GROOMING_LEVELS[10].spots.some(s=>s.kind==='mud'));
 assert.ok(GROOMING_LEVELS.slice(0,5).every(l=>l.spots.length<=2&&l.metrics.cleaningStrokes<=3));
 assert.ok(GROOMING_LEVELS.slice(10,20).every(l=>l.spots.filter(s=>s.kind==='mud').length===1));
 assert.ok(GROOMING_LEVELS.slice(35).every(l=>l.spots.length===6));
});

test('grooming runtime data is immutable literal content without a browser generator or timer',async()=>{
 assert.ok(Object.isFrozen(GROOMING_LEVELS));
 for(const level of GROOMING_LEVELS){
  assert.ok(Object.isFrozen(level));assert.ok(Object.isFrozen(level.spots));assert.ok(Object.isFrozen(level.metrics));assert.ok(Object.isFrozen(level.spec));
  for(const spot of level.spots)assert.ok(Object.isFrozen(spot));
 }
 assert.throws(()=>{GROOMING_LEVELS[0].spots[0].strength=3;},TypeError);
 const source=await readFile(new URL('../dist/mini/grooming-data.mjs',import.meta.url),'utf8');
 assert.match(source,/export const GROOMING_LEVELS=freeze\(\[/);
 assert.doesNotMatch(source,/\bimport\b|Math\.random|requestAnimationFrame|setInterval|setTimeout|document\.|window\./);
});
