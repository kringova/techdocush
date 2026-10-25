import test from 'node:test';
import assert from 'node:assert/strict';
import {fitNonogram} from '../dist/engine/nonogram-view.js';
test('whole nonogram, clues and cells fit both portrait and landscape bounds',()=>{
 for(const size of [10,15,20])for(const [width,height] of [[168,250],[336,310],[472,263],[640,480]]){
  const view=fitNonogram({size,clueWidth:130,clueHeight:157,width,height});
  assert.ok(view.width<=width&&view.height<=height);assert.ok(view.cell>0&&view.scale<=1);
  assert.ok(view.width>view.clueWidth&&view.height>view.clueHeight);
  assert.ok(Math.abs((view.width-view.clueWidth)/size-view.cell)<1e-8);
  assert.ok(Math.abs((view.height-view.clueHeight)/size-view.cell)<1e-8);
 }
});
test('resizing does not mutate sizing inputs and zero-sized hidden frames stay finite',()=>{
 const input={size:20,clueWidth:130,clueHeight:157,width:336,height:310},before=structuredClone(input),small=fitNonogram(input),large=fitNonogram({...input,width:900,height:900});
 assert.deepEqual(input,before);assert.ok(large.cell>=small.cell);assert.equal(large.cell,32);
 const hidden=fitNonogram({...input,width:0,height:0});assert.equal(hidden.width,0);assert.equal(hidden.height,0);assert.ok(Number.isFinite(hidden.scale));
});
