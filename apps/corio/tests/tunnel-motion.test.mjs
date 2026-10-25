import test from 'node:test';
import assert from 'node:assert/strict';
import {GAMES,createMini,miniAction,solutionFor,connectedRoute} from '../dist/mini/engine.mjs';
import {tunnelWalkPoints} from '../dist/mini/tunnel-art.mjs';

test('cat crosses each hammock from the incoming side to the outgoing side, including return routes',()=>{
  let reversed=0,forward=0;
  for(const [index,level]of GAMES.tunnels.levels.entries()){
    let state=createMini('tunnels',index);
    for(const action of solutionFor('tunnels',index))state=miniAction(state,action);
    const route=connectedRoute(state,level),points=tunnelWalkPoints(state,level);let offset=1;
    for(const [at,piece]of route.entries()){
      const p=state.pieces[piece];
      if(p.kind!=='hammock'){offset++;continue;}
      const before=at?state.pieces[route[at-1]]:level.start,after=at<route.length-1?state.pieces[route[at+1]]:level.end;
      const direction=Math.sign(after.x-before.x),sag=points.slice(offset,offset+5);
      assert.equal(sag.length,5);
      for(let i=1;i<sag.length;i++)assert.equal(Math.sign(sag[i].x-sag[i-1].x),direction,`level${index+1} reverses inside hammock`);
      assert.ok(sag[2].y>sag[0].y&&sag[2].y>sag[4].y,'Paws follow the fabric sag');
      if(direction<0)reversed++;else forward++;
      offset+=5;
    }
    assert.equal(offset,points.length-1);
  }
  assert.ok(reversed>=3,'Real late-level return routes exercise right-to-left hammocks');assert.ok(forward>0);
});
