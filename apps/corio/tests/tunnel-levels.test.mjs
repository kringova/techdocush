import test from 'node:test';
import assert from 'node:assert/strict';
import {TUNNEL_LEVELS} from '../dist/mini/tunnel-data.mjs';
import {solveTunnelLevel,validateTunnelLevel,tunnelGeometryKey,tunnelRouteMetrics} from '../dist/mini/tunnel-solver.mjs';
import {connectedRoute} from '../dist/mini/engine.mjs';
const clone=v=>structuredClone(v),dirs=[[0,-1],[1,0],[0,1],[-1,0]];
const freeze=v=>{if(v&&typeof v==='object'){Object.freeze(v);for(const x of Object.values(v))freeze(x);}return v;};
function replay(level,actions){const pieces=clone(level.pieces);for(const action of actions){assert.equal(action.type,'turn');assert.ok(pieces[action.piece]&&!pieces[action.piece].fixed);pieces[action.piece].turn=(pieces[action.piece].turn+1)%4;}return pieces;}
// Deliberately different oracle: BFS over complete rotation states, not paths.
// Restricted to tiny fixtures; actual state transitions cost exactly one click.
function bruteShortest(level){
 const movable=level.pieces.flatMap((p,i)=>p.fixed?[]:[i]),initial=level.pieces.map(p=>p.turn),queue=[{turns:initial,cost:0}],seen=new Set([initial.join(',')]);
 const wins=turns=>{
  const edges=level.pieces.map((p,i)=>p.edges.map(e=>(e+turns[i])%4)),cells=new Map(level.pieces.map((p,i)=>[p.x+','+p.y,i]));
  const first=cells.get('0,'+level.start.y);if(first===undefined||!edges[first].includes(3))return false;
  const todo=[first],visited=new Set(todo);
  for(let at=0;at<todo.length;at++){const i=todo[at],p=level.pieces[i];for(const e of edges[i]){const[dx,dy]=dirs[e],x=p.x+dx,y=p.y+dy;if(x===level.end.x&&y===level.end.y)return true;const next=cells.get(x+','+y);if(next!==undefined&&!visited.has(next)&&edges[next].includes((e+2)%4)){visited.add(next);todo.push(next);}}}return false;
 };
 for(let cursor=0;cursor<queue.length;cursor++){const s=queue[cursor];if(wins(s.turns))return s.cost;for(const i of movable){const turns=[...s.turns];turns[i]=(turns[i]+1)%4;const key=turns.join(',');if(!seen.has(key)){seen.add(key);queue.push({turns,cost:s.cost+1});}}}
 return null;
}
const platform=(x,y,kind='shelf')=>({x,y,edges:[1,3],turn:0,kind,fixed:true});
const pipe=(x,y,edges,turn=0)=>({x,y,edges,turn,kind:'pipe',fixed:false});
const branchFixture=()=>({w:5,h:4,start:{x:-1,y:2},end:{x:5,y:2},pieces:[
 platform(0,2),pipe(1,2,[3,0],3),pipe(1,1,[2,1],1),platform(2,1,'hammock'),pipe(3,1,[3,2],1),pipe(3,2,[0,1],1),platform(4,2),
 pipe(1,3,[0,1],3),platform(2,3,'hammock'),pipe(3,3,[3,0],0)
]});

test('50tunnel geometries remain distinct without names, turns, translations or reflected padding',()=>{
 assert.equal(TUNNEL_LEVELS.length,50);assert.equal(new Set(TUNNEL_LEVELS.map(tunnelGeometryKey)).size,50);
 for(const [index,level]of TUNNEL_LEVELS.entries()){
  assert.equal(level.id,'tunnels-50-v1-'+(index+1));assert.ok(level.w<=7&&level.h<=6);
  validateTunnelLevel(level);
  const modified=clone(level);modified.name='Other name';modified.h+=2;modified.start.y++;modified.end.y++;for(const p of modified.pieces){p.y++;if(!p.fixed)p.turn=(p.turn+1)%4;}
  assert.equal(tunnelGeometryKey(modified),tunnelGeometryKey(level));
  const mirrored=clone(level);for(const p of mirrored.pieces)p.x=level.w-1-p.x;[mirrored.start.y,mirrored.end.y]=[level.end.y,level.start.y];
  assert.equal(tunnelGeometryKey(mirrored),tunnelGeometryKey(level));
 }
});
test('the first tutorial keeps its three modules and is solved by exactly one click',()=>{
 const l=TUNNEL_LEVELS[0];assert.equal(l.name,'Между полками');assert.deepEqual([l.w,l.h],[3,3]);
 assert.deepEqual(l.start,{x:-1,y:1});assert.deepEqual(l.end,{x:3,y:1});
 assert.deepEqual(l.pieces,[platform(0,1),pipe(1,1,[3,1],1),platform(2,1,'hammock')]);
 assert.equal(l.minMoves,1);assert.deepEqual(l.solution,[{type:'turn',piece:1}]);
});
test('all50solutions are globally shortest, initially unsolved and replay through reciprocal production joints',()=>{
 for(const level of TUNNEL_LEVELS){
  const before=JSON.stringify(level),result=solveTunnelLevel(freeze(clone(level)));
  assert.equal(result.proof.complete,true,level.id);assert.equal(result.solvable,true);assert.ok(result.minMoves>0);
  assert.equal(result.minMoves,level.minMoves);assert.equal(level.solution.length,level.minMoves);
  assert.deepEqual(result.actions,level.solution);assert.deepEqual(result.route,level.route);
  assert.equal(result.proof.lowerBound,result.proof.upperBound);assert.equal(level.proof.lowerBound,level.minMoves);assert.equal(level.proof.upperBound,level.minMoves);
  assert.deepEqual(connectedRoute({pieces:level.pieces},level),[],'No initial victory: '+level.id);
  let pieces=clone(level.pieces);
  for(const[index,action]of level.solution.entries()){
   assert.equal(action.type,'turn');assert.equal(pieces[action.piece].fixed,false);
   pieces[action.piece].turn=(pieces[action.piece].turn+1)%4;
   if(index<level.solution.length-1)assert.equal(connectedRoute({pieces},level).length,0,'Cannot win cheaper with the action prefix');
  }
  const route=connectedRoute({pieces},level);assert.ok(route.length>0,level.id);assert.equal(new Set(route).size,route.length);
  assert.equal(pieces[route[0]].x,0);assert.equal(pieces[route[0]].y,level.start.y);
  assert.equal(pieces[route.at(-1)].x,level.w-1);assert.equal(pieces[route.at(-1)].y,level.end.y);
  for(let i=1;i<route.length;i++)assert.equal(Math.abs(pieces[route[i]].x-pieces[route[i-1]].x)+Math.abs(pieces[route[i]].y-pieces[route[i-1]].y),1);
  assert.deepEqual(tunnelRouteMetrics(level,result.route),Object.fromEntries(Object.entries(level.metrics).filter(([key])=>!['rotationCost','feasibleRoutes','falseSpurs','band'].includes(key))));
  assert.equal(JSON.stringify(level),before);
 }
});
test('fixed shelves and hammocks stay horizontal; every movable module has exactly two supported ports',()=>{
 let shelves=0,hammocks=0;
 for(const level of TUNNEL_LEVELS)for(const p of level.pieces){
  assert.equal(p.edges.length,2);assert.equal(new Set(p.edges).size,2);
  if(p.fixed){assert.deepEqual(p.edges,[1,3]);assert.equal(p.turn,0);assert.ok(['shelf','hammock'].includes(p.kind));if(p.kind==='shelf')shelves++;else hammocks++;}
  else{assert.equal(p.kind,'pipe');assert.ok([1,2,3].includes(Math.abs(p.edges[0]-p.edges[1])));}
 }
 assert.ok(shelves>0&&hammocks>0);
});
test('the sequence introduces height changes, false paths, route choices and leftward return travel',()=>{
 for(const [index,l]of TUNNEL_LEVELS.entries()){
  if(index<10)assert.ok(l.w<=5&&l.h<=4);
  if(index>=10&&index<20)assert.ok(l.metrics.verticalSteps>=2&&l.metrics.fixedPlatforms>=1);
  if(index>=20&&index<30)assert.ok(l.metrics.feasibleRoutes>=2&&l.metrics.distractors>=1,'Two genuinely different routes, noTpiece');
  if(index>=30)assert.ok(l.metrics.leftSteps>=1,'Every return-course optimum includes a left step');
  if(index>=40)assert.ok(l.metrics.feasibleRoutes>=2&&l.metrics.rotationCost>=18);
 }
 assert.ok(TUNNEL_LEVELS[30].route.some((p,i,a)=>i>0&&TUNNEL_LEVELS[30].pieces[p].x<TUNNEL_LEVELS[30].pieces[a[i-1]].x));
});
test('path solver matches an independent rotation-state BFS on small tutorials and a real two-route choice',()=>{
 for(const l of TUNNEL_LEVELS.slice(0,7))assert.equal(solveTunnelLevel(l).minMoves,bruteShortest(l));
 const l=branchFixture();l.solution=[{type:'invalid-reference',piece:999}];l.minMoves=999;
 const result=solveTunnelLevel(l);assert.equal(result.minMoves,1);assert.equal(result.minMoves,bruteShortest(l));
 assert.deepEqual(result.route,[0,1,7,8,9,5,6]);assert.deepEqual(result.actions,[{type:'turn',piece:7}]);
 assert.equal(result.proof.feasibleRoutes,2);assert.ok(result.route.includes(7)&&!result.route.includes(2),'Chooses the cheaper lower route rather than resetting every tile to0');
 assert.ok(connectedRoute({pieces:replay(l,result.actions)},l).length>0);
});
test('straight symmetry costs zero or one click; an elbow may really require three clockwise clicks',()=>{
 const straight=clone(TUNNEL_LEVELS[0]);straight.pieces[1].turn=2;assert.equal(solveTunnelLevel(straight).minMoves,0);
 straight.pieces[1].turn=3;assert.equal(solveTunnelLevel(straight).minMoves,1);
 const elbow={w:2,h:2,start:{x:-1,y:1},end:{x:2,y:0},pieces:[pipe(0,1,[3,0],1),pipe(0,0,[2,1]),platform(1,0)]};
 const result=solveTunnelLevel(elbow);assert.equal(result.minMoves,3);assert.equal(result.minMoves,bruteShortest(elbow));assert.deepEqual(result.actions,Array.from({length:3},()=>({type:'turn',piece:0})));
});
test('the solver reports unsolvable boards and budget-limited bounds without inventing optimality',()=>{
 const disconnected={w:2,h:2,start:{x:-1,y:1},end:{x:2,y:0},pieces:[platform(0,1),platform(1,0)]};
 const none=solveTunnelLevel(disconnected);assert.equal(none.solvable,false);assert.equal(none.minMoves,null);assert.equal(none.proof.complete,true);assert.equal(none.proof.upperBound,null);assert.equal(bruteShortest(disconnected),null);
 const limited=solveTunnelLevel(branchFixture(),{maxExpanded:7});assert.equal(limited.proof.complete,false);assert.equal(limited.minMoves,null);assert.equal(limited.proof.lowerBound,0);assert.equal(limited.proof.upperBound,1);assert.equal(limited.proof.reason,'expansion-budget');assert.ok(limited.actions.length>0);
 const unknown=solveTunnelLevel(branchFixture(),{maxExpanded:1});assert.equal(unknown.solvable,null,'An exhausted budget without an incumbent does not prove impossibility');assert.equal(unknown.minMoves,null);assert.equal(unknown.proof.complete,false);
 const invalid=clone(TUNNEL_LEVELS[0]);invalid.pieces[0].edges=[0,2];assert.throws(()=>solveTunnelLevel(invalid),/Fixed platforms/);
 const tee=clone(TUNNEL_LEVELS[0]);tee.pieces[1].edges=[0,1,3];assert.throws(()=>solveTunnelLevel(tee),/two-port/);
});
