import test from 'node:test';
import assert from 'node:assert/strict';
import {TUNNEL_LEVELS} from '../dist/mini/tunnel-data.mjs';
import {tunnelEdges,traceTunnelRoute,connectedRoute} from '../dist/mini/tunnel-route.mjs';
import {solveTunnelLevel,validateTunnelLevel} from '../dist/mini/tunnel-solver.mjs';
const platform=(x,y)=>({x,y,edges:[1,3],turn:0,kind:'shelf',fixed:true});
const pipe=(x,y,edges,turn=0)=>({x,y,edges,turn,kind:'pipe',fixed:false});
const cross=(x,y)=>({x,y,edges:[0,1,2,3],turn:0,kind:'crossing',fixed:true});
const replay=(level,actions)=>{const pieces=structuredClone(level.pieces);for(const a of actions){assert.equal(pieces[a.piece].fixed,false);pieces[a.piece].turn=(pieces[a.piece].turn+1)%4;}return{pieces};};
const twice=()=>({w:4,h:3,start:{x:-1,y:1},end:{x:4,y:2},checkpoints:[3,6],pieces:[
 platform(0,1),cross(1,1),pipe(2,1,[3,0],1),pipe(2,0,[2,3]),pipe(1,0,[1,2]),pipe(1,2,[0,1],2),platform(2,2),platform(3,2)
]});
// Independent oracle: BFS over whole rotation configurations. Its traversal
// implements a switch on arrival direction rather than using production trace.
function oracle(level){
 const movable=level.pieces.flatMap((p,i)=>p.fixed?[]:[i]),start=level.pieces.map(p=>p.turn),todo=[{turns:start,moves:0}],seen=new Set([start.join(',')]);
 function wins(turns){let x=0,y=level.start.y,arrive=3;const used=new Set(),got=new Set();
  for(let count=0;count<level.pieces.length*2+1;count++){
   const i=level.pieces.findIndex(p=>p.x===x&&p.y===y);if(i<0)return false;const p=level.pieces[i],ports=p.edges.map(e=>(e+turns[i])%4);if(!ports.includes(arrive))return false;
   const channel=p.kind==='crossing'?(arrive===0||arrive===2?'vertical':'horizontal'):'ordinary',key=i+channel;if(used.has(key))return false;used.add(key);got.add(i);
   const leave=p.kind==='crossing'?({0:2,1:3,2:0,3:1})[arrive]:ports.filter(e=>e!==arrive)[0];if(leave===undefined)return false;
   if(leave===0)y--;else if(leave===1)x++;else if(leave===2)y++;else x--;
   if(x===level.end.x&&y===level.end.y)return(level.checkpoints||[]).every(i=>got.has(i));arrive=(leave+2)%4;
  }return false;
 }
 for(let at=0;at<todo.length;at++){const s=todo[at];if(wins(s.turns))return s.moves;for(const i of movable){const turns=[...s.turns];turns[i]=(turns[i]+1)%4;const key=turns.join(',');if(!seen.has(key)){seen.add(key);todo.push({turns,moves:s.moves+1});}}}
 return null;
}

test('crossing channels are isolated; arriving from left cannot turn into an upper shortcut',()=>{
 const fixture={w:3,h:3,start:{x:-1,y:1},end:{x:3,y:0},checkpoints:[],pieces:[platform(0,1),cross(1,1),pipe(1,0,[2,1]),platform(2,0)]};
 validateTunnelLevel(fixture);const trace=traceTunnelRoute(fixture,fixture);
 assert.equal(trace.connected,false);assert.equal(trace.complete,false);assert.deepEqual(connectedRoute(fixture,fixture),[]);
 assert.deepEqual(trace.steps.at(-1),{piece:1,incoming:3,outgoing:1,channel:'EW'});
 assert.equal(solveTunnelLevel(fixture).solvable,false);assert.equal(oracle(fixture),null);
 // This WOULD reach the exit if the crossing illegitimately turned up:
 assert.deepEqual([fixture.pieces[1].x,fixture.pieces[1].y-1],[fixture.pieces[2].x,fixture.pieces[2].y]);
 assert.ok(tunnelEdges(fixture.pieces[2]).includes(2));
});

test('one crossing is visited twice on separate channels, with a single fixed orientation',()=>{
 const level=twice(),result=solveTunnelLevel(level),solved=replay(level,result.actions),trace=traceTunnelRoute(solved,level);
 assert.equal(result.proof.complete,true);assert.equal(result.minMoves,oracle(level));assert.ok(result.minMoves>0);
 assert.equal(trace.complete,true);assert.equal(trace.route.filter(i=>i===1).length,2);
 assert.deepEqual(trace.steps.filter(s=>s.piece===1).map(s=>s.channel),['EW','NS']);
 for(const step of trace.steps.filter(s=>s.piece===1))assert.equal(step.outgoing,(step.incoming+2)%4);
 assert.deepEqual(new Set(trace.visitedCheckpoints),new Set(level.checkpoints));assert.equal(trace.route.length,new Set(trace.route).size+1);
 assert.ok(result.actions.every(a=>a.piece!==1));assert.deepEqual(solved.pieces[1],level.pieces[1]);
});

test('checkpoint order is free, but a connected exit without every checkpoint is not complete',()=>{
 const level=TUNNEL_LEVELS[24],short=solveTunnelLevel({...level,checkpoints:[]}),state=replay(level,short.actions),trace=traceTunnelRoute(state,level);
 assert.equal(short.route.length,9);assert.equal(short.minMoves,7);assert.equal(trace.connected,true);assert.equal(trace.complete,false);assert.ok(trace.missing.length);assert.deepEqual(connectedRoute(state,level),[]);
 const full=replay(level,level.solution),good=traceTunnelRoute(full,level);assert.equal(good.complete,true);assert.equal(good.route.length,19);
 assert.equal(traceTunnelRoute(full,{...level,checkpoints:[...level.checkpoints].reverse()}).complete,true);
 assert.ok(level.metrics.leftSteps>=2);assert.ok(level.minMoves>short.minMoves);
});

test('independent whole-state BFS confirms checkpoint and crossing fixtures, including unsatisfiable checkpoints',()=>{
 const fixtures=[twice(),{...twice(),checkpoints:[]},{...twice(),checkpoints:[0,1,3,6]}];
 const blocked={w:3,h:2,start:{x:-1,y:1},end:{x:3,y:1},checkpoints:[3],pieces:[platform(0,1),pipe(1,1,[1,3],1),platform(2,1),platform(0,0)]};fixtures.push(blocked);
 for(const level of fixtures){const result=solveTunnelLevel(level);assert.equal(result.proof.complete,true);assert.equal(result.minMoves,oracle(level));assert.equal(result.solvable,result.minMoves!==null);}
 assert.equal(solveTunnelLevel(blocked).solvable,false);assert.equal(solveTunnelLevel({...blocked,checkpoints:[]}).minMoves,1);
});

test('all channel steps are unique, all checkpoints are actually visited and budget bounds remain honest',()=>{
 for(const level of TUNNEL_LEVELS){const solved=replay(level,level.solution),before=JSON.stringify(solved),trace=traceTunnelRoute(solved,level);assert.equal(trace.complete,true);assert.equal(new Set(trace.steps.map(s=>s.piece+':'+s.channel)).size,trace.steps.length);assert.ok(trace.steps.length<=level.pieces.length+level.metrics.crossings);assert.deepEqual(trace.visitedCheckpoints.slice().sort((a,b)=>a-b),level.checkpoints.slice().sort((a,b)=>a-b));assert.equal(JSON.stringify(solved),before);}
 const bounded=solveTunnelLevel(twice(),{maxExpanded:1});assert.equal(bounded.proof.complete,false);assert.equal(bounded.minMoves,null);assert.equal(bounded.solvable,null);
 const bad=twice();bad.pieces[1].turn=1;assert.throws(()=>validateTunnelLevel(bad),/Crossings/);
 const cp=twice();cp.checkpoints=[1,1];assert.throws(()=>validateTunnelLevel(cp),/checkpoint/);
});
