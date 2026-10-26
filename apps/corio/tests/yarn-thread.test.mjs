import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const baseline=JSON.parse(await readFile(new URL('./fixtures/yarn-first-0171.json',import.meta.url),'utf8'));
const median=xs=>[...xs].sort((a,b)=>a-b)[Math.floor(xs.length/2)];
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const minDistance=ps=>Math.min(...ps.flatMap((p,i)=>ps.slice(i+1).map(q=>distance(p,q))));
function properPairs(ps,edges){const cross=(a,b)=>a.x*b.y-a.y*b.x,subtract=(a,b)=>({x:a.x-b.x,y:a.y-b.y}),out=[];for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++){const[a,b]=edges[i],[c,d]=edges[j];if([a,b].some(n=>n===c||n===d))continue;const p=ps[a],r=subtract(ps[b],p),q=ps[c],s=subtract(ps[d],q),den=cross(r,s);if(Math.abs(den)<1e-12)continue;const t=cross(subtract(q,p),s)/den,u=cross(subtract(q,p),r)/den;if(t>0&&t<1&&u>0&&u<1)out.push([i,j]);}return out;}
function geometrySignature(ps){const d=[];for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++)d.push(distance(ps[i],ps[j])**2);const max=Math.max(...d);return JSON.stringify(d.map(n=>Math.round(n/max*1000)));}
function pointSegmentDistance(p,a,b){const vx=b.x-a.x,vy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*vx+(p.y-a.y)*vy)/(vx*vx+vy*vy)));return Math.hypot(p.x-a.x-t*vx,p.y-a.y-t*vy);}
import {YARN_LEVELS,YARN_ANCHOR,YARN_POINT_SPACING} from '../dist/mini/yarn-data.mjs';
import {GAMES,createMini,miniAction,solutionFor,yarnConflicts,yarnCrossings} from '../dist/mini/engine.mjs';
import {renderYarnView} from '../dist/mini/yarn-view.mjs';

test('fifty yarn tasks each form exactly one anchored open chain with a free end',()=>{
  assert.equal(YARN_LEVELS.length,50);assert.deepEqual(GAMES.yarn.levels,YARN_LEVELS);
  assert.equal(new Set(YARN_LEVELS.map(level=>JSON.stringify(level.points))).size,50);
  for(const level of YARN_LEVELS){
    assert.equal(level.anchor,YARN_ANCHOR);assert.equal(level.anchor,0);
    assert.equal(level.edges.length,level.points.length-1);
    assert.deepEqual(level.edges,Array.from({length:level.points.length-1},(_,i)=>[i,i+1]));
    const degree=Array(level.points.length).fill(0);for(const[a,b]of level.edges){degree[a]++;degree[b]++;}
    assert.equal(degree[0],1);assert.equal(degree.at(-1),1);assert.ok(degree.slice(1,-1).every(n=>n===2));
    for(let i=0;i<level.points.length;i++)for(let j=i+1;j<level.points.length;j++)assert.ok(Math.hypot(level.points[i].x-level.points[j].x,level.points[i].y-level.points[j].y)>=YARN_POINT_SPACING);
  }
});

test('reference moves solve all fifty tasks legally without moving the anchor or mutating data',()=>{
  const snapshot=JSON.stringify(YARN_LEVELS),counts=[];
  for(let index=0;index<50;index++){
    const level=YARN_LEVELS[index],anchor=level.points[0],path=solutionFor('yarn',index);
    assert.deepEqual(path,level.solution);assert.ok(path.length);
    let state=createMini('yarn',index);assert.equal(state.won,false);assert.ok(yarnConflicts(state.points,level.edges).length);
    for(let i=0;i<path.length;i++){
      const before=JSON.stringify(state),action=path[i];assert.notEqual(action.node,0);
      const next=miniAction(state,action);assert.equal(next.moves,state.moves+1);assert.equal(JSON.stringify(state),before);
      assert.deepEqual(next.points[0],anchor);if(i<path.length-1)assert.equal(next.won,false,'No padded moves after a win');
      for(let a=0;a<next.points.length;a++)for(let b=a+1;b<next.points.length;b++)assert.ok(Math.hypot(next.points[a].x-next.points[b].x,next.points[a].y-next.points[b].y)>=(index?10.5:YARN_POINT_SPACING));
      state=next;
    }
    assert.equal(state.won,true);assert.equal(yarnConflicts(state.points,level.edges).length,0);
    assert.equal(state.moves,level.metrics.referenceMoves);assert.equal(level.metrics.optimal,false);
    const second=solutionFor('yarn',index);second[0].x=-999;assert.notEqual(solutionFor('yarn',index)[0].x,-999);
    assert.deepEqual(createMini('yarn',index),createMini('yarn',index));counts.push(state.moves);
  }
  assert.equal(counts[0],2);assert.equal(counts.length,50);assert.equal(JSON.stringify(YARN_LEVELS),snapshot);
});

test('tutorial is exact and fifty crossing structures and normalized geometries are genuinely different',()=>{
 const first=YARN_LEVELS[0];for(const key of ['name','points','edges','solution'])assert.deepEqual(first[key],baseline.level[key],key);assert.equal(baseline.sourceTag,'corio-source-0171-20261026');
 const structures=new Set(),shapes=new Set();
 for(const[index,level]of YARN_LEVELS.entries()){
  assert.equal(level.id,'yarn-50-v1-'+(index+1));assert.equal(level.spec.band,Math.floor(index/10)+1);assert.ok(level.idea.length>20);
  const independent=properPairs(level.points,level.edges),actual=yarnCrossings(level.points,level.edges);assert.deepEqual(actual.map(c=>[c.under,c.over]),independent);assert.equal(actual.length,level.metrics.initialCrossings);
  structures.add(JSON.stringify([level.points.length,independent]));shapes.add(geometrySignature(level.points));
  for(const p of level.points)assert.ok(p.x>=8&&p.x<=92&&p.y>=8&&p.y<=92);assert.ok(minDistance(level.points)>=13);assert.ok(level.points.length<=14);
  if(index){const gap=Math.min(...level.points.flatMap((p,i)=>level.edges.filter(e=>!e.includes(i)).map(([a,b])=>pointSegmentDistance(p,level.points[a],level.points[b]))));assert.ok(gap>=2.4);const crossGap=Math.min(...actual.flatMap((c,i)=>actual.slice(i+1).map(d=>distance(c,d))));assert.ok(crossGap>=2.8);}
 }
 assert.equal(structures.size,50);assert.equal(shapes.size,50);
 const ps=YARN_LEVELS[20].points;assert.equal(geometrySignature(ps),geometrySignature(ps.map(p=>({x:17-p.y*2,y:-9+p.x*2}))));
});

test('five bands increase controls, proper-crossing load and reference effort without a steep first five',()=>{
 assert.deepEqual(YARN_LEVELS.slice(0,10).map(l=>l.metrics.initialCrossings),[1,1,1,2,2,2,3,3,3,4]);
 let cross=0,moves=0,cover=0;
 for(let band=0;band<5;band++){const rows=YARN_LEVELS.slice(band*10,band*10+10),nodes=rows.map(l=>l.points.length),nextCross=median(rows.map(l=>l.metrics.initialCrossings)),nextMoves=median(rows.map(l=>l.solution.length)),nextCover=median(rows.map(l=>l.metrics.initialCrossingCoverLowerBound));assert.ok(nextCross>cross);assert.ok(nextMoves>moves);assert.ok(nextCover>=cover);assert.ok(nodes.every(n=>n===[6,7,9,11,13][band]||band===4&&n===14));cross=nextCross;moves=nextMoves;cover=nextCover;}
 for(const[index,level]of YARN_LEVELS.entries())if(index){let ps=structuredClone(level.points),previous=yarnCrossings(ps,level.edges).length;for(const move of level.solution){ps[move.node]={x:move.x,y:move.y};const next=yarnCrossings(ps,level.edges).length;assert.ok(next<previous,'Each reference move visibly removes crossings');previous=next;}assert.equal(previous,0);}
});

test('initial crossing-cover bounds are independently minimal endpoint hitting sets, not claimed move optima',()=>{
 const popcount=mask=>{let n=0;while(mask){mask&=mask-1;n++;}return n;};
 for(const level of YARN_LEVELS){
  const requirements=properPairs(level.points,level.edges).map(([a,b])=>[...level.edges[a],...level.edges[b]].filter(n=>n!==0).reduce((mask,n)=>mask|(1<<(n-1)),0));
  let best=level.points.length;for(let mask=0;mask<(1<<(level.points.length-1));mask++){const count=popcount(mask);if(count>=best)continue;if(requirements.every(required=>required&mask))best=count;}
  assert.equal(level.metrics.initialCrossingCoverLowerBound,best);assert.ok(level.solution.length>=best);assert.equal(level.metrics.optimal,false);
 }
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
