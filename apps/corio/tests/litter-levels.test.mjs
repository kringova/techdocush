import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {LITTER_LEVELS} from '../dist/mini/litter-data.mjs';

const bands=[[3,2,2],[3,3,3],[4,3,4],[4,4,5],[4,4,6],[5,4,7],[5,4,8],[5,5,9],[5,5,10],[6,5,12]];
const baseline=JSON.parse(await readFile(new URL('./fixtures/litter-first-018.json',import.meta.url),'utf8'));
function relabel(cells){const ids=new Map();return cells.map(v=>{if(v===null)return '_';if(!ids.has(v))ids.set(v,ids.size);return ids.get(v).toString(36);}).join('.');}
function signature(level){
 const forms=[];
 // Independent coordinate maps, including quarter turns of rectangular boards.
 for(let rotation=0;rotation<4;rotation++)for(const reflected of[false,true]){
  const width=rotation%2?level.h:level.w,height=rotation%2?level.w:level.h,cells=Array(width*height);
  for(let y=0;y<level.h;y++)for(let x=0;x<level.w;x++){
   let px=x,py=y;
   if(rotation===1){px=level.h-1-y;py=x;}
   if(rotation===2){px=level.w-1-x;py=level.h-1-y;}
   if(rotation===3){px=y;py=level.w-1-x;}
   if(reflected)px=width-1-px;
   cells[py*width+px]=level.cells[y*level.w+x];
  }
  forms.push(width+'x'+height+':'+relabel(cells));
 }
 return forms.sort()[0];
}

test('litter has fifty static pair layouts, with exact pairs and real empty spaces',()=>{
 assert.equal(LITTER_LEVELS.length,50);
 for(const level of LITTER_LEVELS){
  assert.equal(level.cells.length,level.w*level.h);
  assert.ok(level.w<=6&&level.h<=5);
  assert.ok(level.cells.filter(v=>v===null).length>=2);
  assert.ok(level.cells.filter(v=>v===null).length/level.cells.length<=.4);
  for(let shape=0;shape<level.pairs;shape++)assert.equal(level.cells.filter(v=>v===shape).length,2);
  assert.ok(level.cells.every(v=>v===null||Number.isInteger(v)&&v>=0&&v<level.pairs&&v<=11));
 }
});

test('pair count and field grow gradually through ten bands, preserving the exact tutorial',()=>{
 assert.equal(baseline.sourceTag,'corio-source-018-20261026');
 for(const key of['name','w','h','pairs','cells'])assert.deepEqual(LITTER_LEVELS[0][key],baseline.level[key]);
 let previousPairs=0,previousArea=0;
 for(const[index,level]of LITTER_LEVELS.entries()){
  assert.deepEqual([level.w,level.h,level.pairs],bands[Math.floor(index/5)]);
  assert.ok(level.pairs>=previousPairs&&level.pairs<=previousPairs+2);
  assert.ok(level.cells.length>=previousArea);
  previousPairs=level.pairs;previousArea=level.cells.length;
 }
 assert.equal(previousPairs,12);
});

test('every layout is different even after rotating, mirroring or renaming the forms',()=>{
 assert.equal(new Set(LITTER_LEVELS.map(signature)).size,50);
 const level=LITTER_LEVELS[42],mirrored={...level,cells:level.cells.flatMap((_,i)=>i%level.w===0?level.cells.slice(i,i+level.w).reverse():[])};
 assert.equal(signature(mirrored),signature(level));
 assert.equal(signature({...level,cells:level.cells.map(v=>v===null?null:level.pairs-1-v)}),signature(level));
});

test('spatial families actually have different pair relations, with metrics independently checked',()=>{
 for(const[index,level]of LITTER_LEVELS.entries()){
  let distance=0,near=0,columns=0,rows=0,diagonal=0,opposite=0;
  for(let shape=0;shape<level.pairs;shape++){
   const a=level.cells.indexOf(shape),b=level.cells.lastIndexOf(shape),ax=a%level.w,bx=b%level.w,ay=Math.floor(a/level.w),by=Math.floor(b/level.w),dx=Math.abs(ax-bx),dy=Math.abs(ay-by);
   distance+=dx+dy;near+=dx+dy===1;columns+=dx===0;rows+=dy>0;diagonal+=dx>0&&dy>0;opposite+=(ax<(level.w-1)/2&&bx>=(level.w-1)/2)||(bx<(level.w-1)/2&&ax>=(level.w-1)/2);
  }
  assert.equal(level.metrics.meanPairDistance,Math.round(distance/level.pairs*1000)/1000);
  assert.equal(level.metrics.adjacentPairs,near);assert.equal(level.metrics.columnPairs,columns);assert.equal(level.metrics.rowSeparatedPairs,rows);assert.equal(level.metrics.diagonalPairs,diagonal);assert.equal(level.metrics.oppositeSidePairs,opposite);
  if(index){
   assert.ok(level.idea.length>30);
   if(level.spec.family==='nearby')assert.ok(near>=Math.floor(level.pairs*.75));
   if(level.spec.family==='rows')assert.ok(rows>=Math.floor(level.pairs*.75));
   if(level.spec.family==='diagonal')assert.ok(diagonal>=Math.floor(level.pairs*.75));
   if(level.spec.family==='opposite-sides')assert.ok(opposite>=Math.floor(level.pairs*.75));
  }
 }
});

test('published data and their nested arrays are immutable, with no runtime authoring or animation',async()=>{
 assert.ok(Object.isFrozen(LITTER_LEVELS));
 for(const level of LITTER_LEVELS){assert.ok(Object.isFrozen(level));assert.ok(Object.isFrozen(level.cells));assert.ok(Object.isFrozen(level.spec));assert.ok(Object.isFrozen(level.metrics));}
 const old=LITTER_LEVELS[0].cells[0];assert.throws(()=>{LITTER_LEVELS[0].cells[0]=9;},TypeError);assert.equal(LITTER_LEVELS[0].cells[0],old);
 const source=await readFile(new URL('../dist/mini/litter-data.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(source,/Math\.random|requestAnimationFrame|setInterval|setTimeout/);
});
