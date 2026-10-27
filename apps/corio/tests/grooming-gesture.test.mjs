import test from 'node:test';
import assert from 'node:assert/strict';
import {beginGroomRub,advanceGroomRub,GROOM_RUB_DISTANCE,GROOM_RUB_TIME} from '../dist/mini/grooming-gesture.mjs';
const start=()=>beginGroomRub({x:10,y:10,time:0,zone:2});
test('tap, stationary holding and sub-pixel jitter do not clean a care zone',()=>{
 let rub=start();for(let time=0;time<10000;time+=100){const a=advanceGroomRub(rub,{x:10.5,y:10.5,time,zone:2});assert.equal(a.ready,false);rub=a.rub;}assert.equal(rub.distance,0);
});
test('travel plus time earns one stroke and starts a fresh accumulation',()=>{
 let rub=start();const points=[{x:30,y:10,time:60,zone:2},{x:10,y:10,time:GROOM_RUB_TIME,zone:2}];const first=advanceGroomRub(rub,points[0]);assert.equal(first.ready,false);const done=advanceGroomRub(first.rub,points[1]);assert.ok(done.ready);assert.equal(done.rub.distance,0);assert.equal(done.rub.time,GROOM_RUB_TIME);assert.equal(GROOM_RUB_DISTANCE,40);
});
test('leaving a zone or switching zones discards unfinished travel',()=>{
 const a=advanceGroomRub(start(),{x:35,y:10,time:100,zone:2});assert.equal(a.rub.distance,25);
 for(const zone of[null,3]){const b=advanceGroomRub(a.rub,{x:10,y:10,time:200,zone});assert.equal(b.ready,false);assert.equal(b.rub.distance,0);const c=advanceGroomRub(b.rub,{x:35,y:10,time:400,zone:2});assert.equal(c.ready,false);assert.equal(c.rub.distance,0);}
});
test('instant long jumps and malformed samples do not bypass the movement gate',()=>{
 const rub=start();const quick=advanceGroomRub(rub,{x:90,y:10,time:20,zone:2});assert.equal(quick.ready,false);assert.equal(advanceGroomRub(rub,{x:NaN,y:10,time:200,zone:2}).rub,rub);assert.deepEqual(rub,start());
});
