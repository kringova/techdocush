import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {YARN_LEVELS,YARN_ANCHOR,YARN_POINT_SPACING} from '../dist/mini/yarn-data.mjs';
import {GAMES,createMini,miniAction,solutionFor,yarnConflicts,yarnCrossings} from '../dist/mini/engine.mjs';
import {renderYarnView} from '../dist/mini/yarn-view.mjs';

test('five yarn tasks each form exactly one anchored open chain with a free end',()=>{
  assert.equal(YARN_LEVELS.length,5);assert.deepEqual(GAMES.yarn.levels,YARN_LEVELS);
  assert.equal(new Set(YARN_LEVELS.map(level=>JSON.stringify(level.points))).size,5);
  for(const level of YARN_LEVELS){
    assert.equal(level.anchor,YARN_ANCHOR);assert.equal(level.anchor,0);
    assert.equal(level.edges.length,level.points.length-1);
    assert.deepEqual(level.edges,Array.from({length:level.points.length-1},(_,i)=>[i,i+1]));
    const degree=Array(level.points.length).fill(0);for(const[a,b]of level.edges){degree[a]++;degree[b]++;}
    assert.equal(degree[0],1);assert.equal(degree.at(-1),1);assert.ok(degree.slice(1,-1).every(n=>n===2));
    for(let i=0;i<level.points.length;i++)for(let j=i+1;j<level.points.length;j++)assert.ok(Math.hypot(level.points[i].x-level.points[j].x,level.points[i].y-level.points[j].y)>=YARN_POINT_SPACING);
  }
});

test('reference moves solve all five tasks legally without moving the anchor or mutating data',()=>{
  const snapshot=JSON.stringify(YARN_LEVELS),counts=[];
  for(let index=0;index<5;index++){
    const level=YARN_LEVELS[index],anchor=level.points[0],path=solutionFor('yarn',index);
    assert.deepEqual(path,level.solution);assert.ok(path.length);
    let state=createMini('yarn',index);assert.equal(state.won,false);assert.ok(yarnConflicts(state.points,level.edges).length);
    for(let i=0;i<path.length;i++){
      const before=JSON.stringify(state),action=path[i];assert.notEqual(action.node,0);
      const next=miniAction(state,action);assert.equal(next.moves,state.moves+1);assert.equal(JSON.stringify(state),before);
      assert.deepEqual(next.points[0],anchor);if(i<path.length-1)assert.equal(next.won,false,'No padded moves after a win');
      for(let a=0;a<next.points.length;a++)for(let b=a+1;b<next.points.length;b++)assert.ok(Math.hypot(next.points[a].x-next.points[b].x,next.points[a].y-next.points[b].y)>=YARN_POINT_SPACING);
      state=next;
    }
    assert.equal(state.won,true);assert.equal(yarnConflicts(state.points,level.edges).length,0);
    assert.equal(state.moves,level.metrics.referenceMoves);assert.equal(level.metrics.optimal,false);
    const second=solutionFor('yarn',index);second[0].x=-999;assert.notEqual(solutionFor('yarn',index)[0].x,-999);
    assert.deepEqual(createMini('yarn',index),createMini('yarn',index));counts.push(state.moves);
  }
  assert.deepEqual(counts,[2,3,5,9,10]);assert.equal(JSON.stringify(YARN_LEVELS),snapshot);
});

test('geometric complexity grows through genuine proper crossings, with no graph cycles or fans',()=>{
  let previous=0;
  for(const level of YARN_LEVELS){const crossings=yarnCrossings(level.points,level.edges);assert.equal(crossings.length,level.metrics.initialCrossings);assert.ok(crossings.length>previous);previous=crossings.length;for(const cross of crossings){assert.ok(Number.isFinite(cross.x)&&Number.isFinite(cross.y));assert.ok(cross.over>cross.under);}}
  assert.deepEqual(YARN_LEVELS.map(level=>level.metrics.initialCrossings),[1,6,10,14,18]);
});

test('anchor and malformed moves are exact no-ops; overlapping bends never spend a move or win',()=>{
  const state=createMini('yarn');
  for(const action of[{type:'move',node:0,x:70,y:90},{type:'move',node:'1',x:50,y:50},{type:'move',node:1,x:NaN,y:50},{type:'move',node:1,x:Infinity,y:50},{type:'move',node:-1,x:40,y:40}])assert.equal(miniAction(state,action),state);
  const overlap=miniAction(state,{type:'move',node:1,...state.points[2]});assert.equal(overlap.moves,0);assert.equal(overlap.won,false);assert.deepEqual(overlap.points,state.points);assert.match(overlap.message,/изгибами нити/);
  const clamped=miniAction(state,{type:'move',node:5,x:200,y:-50});assert.deepEqual(clamped.points[5],{x:92,y:8});assert.deepEqual(clamped.points[0],state.points[0]);
});

test('folded-back adjacent segments, nonadjacent overlaps, point-on-thread and collapsed edges conflict',()=>{
  assert.ok(yarnConflicts([{x:10,y:50},{x:80,y:50},{x:40,y:50}],[[0,1],[1,2]]).length);
  assert.deepEqual(yarnConflicts([{x:10,y:50},{x:40,y:50},{x:80,y:50}],[[0,1],[1,2]]),[]);
  assert.ok(yarnConflicts([{x:10,y:50},{x:90,y:50},{x:40,y:50},{x:60,y:50}],[[0,1],[2,3]]).length);
  assert.ok(yarnConflicts([{x:10,y:50},{x:90,y:50},{x:50,y:50},{x:50,y:90}],[[0,1],[2,3]]).length);
  assert.ok(yarnConflicts([{x:40,y:40},{x:40,y:40}],[[0,1]]).length);
});

test('renderer has one ball, one complete thread trajectory, neutral bend handles and no movable anchor',()=>{
  for(const level of YARN_LEVELS){
    const snapshot=JSON.stringify(level.points),html=renderYarnView(level.points,level);
    assert.equal((html.match(/class="thread-ball"/g)||[]).length,1);
    assert.equal((html.match(/<img /g)||[]).length,1);
    assert.equal((html.match(/data-thread-path/g)||[]).length,1);
    assert.equal((html.match(/data-node=/g)||[]).length,level.points.length-1);
    assert.doesNotMatch(html,/data-node="0"|yarn-node|<span>\d+<\/span>/);
    assert.equal((html.match(/class="thread-bridge"/g)||[]).length,level.metrics.initialCrossings);
    const d=html.match(/data-thread-path d="([^"]+)"/)[1];assert.equal((d.match(/L/g)||[]).length,level.edges.length);assert.doesNotMatch(d,/[Zz]/);
    assert.equal(JSON.stringify(level.points),snapshot);
  }
});

test('thread rendering and rules contain no idle timer, animation loop or continuous simulation',async()=>{
  for(const file of['../dist/mini/yarn-data.mjs','../dist/mini/yarn-view.mjs']){const source=await readFile(new URL(file,import.meta.url),'utf8');assert.doesNotMatch(source,/requestAnimationFrame|setInterval|setTimeout|Math\.random/);}
});
