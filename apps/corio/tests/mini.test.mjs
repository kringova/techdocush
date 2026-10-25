import test from 'node:test';
import assert from 'node:assert/strict';
import {GAMES,FOODS,GROOM_STEPS,createMini,miniAction,solutionFor,connectedRoute,yarnConflicts} from '../dist/mini/engine.mjs';
import {SEARCH_SCENES} from '../games/corio/mini/search-data.mjs';
for(const[id,game]of Object.entries(GAMES))test(`${id}: all scenarios finish through valid actions without mutating old states`,()=>{
  const count=id==='search'?50:5;assert.equal(game.levels.length,count);const definitions=new Set();
  for(let index=0;index<count;index++){
    definitions.add(JSON.stringify(game.levels[index]));let state=createMini(id,index);assert.equal(state.won,false);
    if(id==='yarn')assert.ok(yarnConflicts(state.points,game.levels[index].edges).length>0);
    const actions=solutionFor(id,index);assert.ok(actions?.length);
    for(const action of actions){const before=JSON.stringify(state),next=miniAction(state,action);assert.equal(JSON.stringify(state),before);assert.ok(next.moves>=state.moves);state=next;}
    assert.equal(state.won,true,`${id} ${index+1}`);assert.ok(state.moves>0);assert.equal(miniAction(state,actions[0]),state);
  }
  assert.equal(definitions.size,count);
});
test('search has all12fixed scene/clue/light variants, unique target lists and a growing search load',()=>{
  const levels=GAMES.search.levels,combinations=new Set(),lists=new Set();let previous=0;
  for(const level of levels){
    combinations.add([level.scene,level.clues,level.lighting].join('/'));
    const key=[level.scene,level.clues,level.lighting,[...level.targets].sort().join(',')].join('/');assert.ok(!lists.has(key),'No repeated variant with the same target set');lists.add(key);
    assert.equal(new Set(level.targets).size,level.targets.length);assert.ok(level.targets.length>=previous);previous=level.targets.length;
    for(const target of level.targets)assert.ok(SEARCH_SCENES[level.scene].some(item=>item.id===target));
  }
  assert.equal(combinations.size,12);assert.equal(levels[0].targets.length,3);assert.equal(levels.at(-1).targets.length,12);
});
test('wall route needs reciprocal joints; fixed shelves cannot turn',()=>{
  let state=createMini('tunnels');const level=GAMES.tunnels.levels[0];assert.deepEqual(connectedRoute(state,level),[]);assert.equal(miniAction(state,{type:'turn',piece:0}),state);
  state=miniAction(state,{type:'turn',piece:1});assert.equal(state.won,true);assert.equal(connectedRoute(state,level).length,3);
});
test('wrong food stays on the plate and never goes into the cat bowl',()=>{
  const state=createMini('food'),chocolate=state.remaining.find(i=>i.type==='chocolate'),wrong=miniAction(state,{type:'sort',item:chocolate.id,bin:'safe'});assert.equal(wrong.remaining.length,state.remaining.length);assert.equal(wrong.sorted.length,0);assert.equal(wrong.mistakes,1);assert.equal(wrong.moves,1);assert.ok(wrong.message);
  const right=miniAction(wrong,{type:'sort',item:chocolate.id,bin:'away'});assert.equal(right.remaining.length,state.remaining.length-1);assert.equal(FOODS.candy.safe,false);assert.ok(FOODS.chicken.name.includes('Готовая'));
});
test('pet actions cap needs, reject extra feeding at satiety, and require replenishment after play',()=>{
  const state={...createMini('pet'),needs:[4,4,0,4]},fed=miniAction(state,{type:'food'});assert.equal(fed.moves,0);assert.deepEqual(fed.needs,state.needs);
  const play=miniAction(state,{type:'play'});assert.deepEqual(play.needs,[3,3,2,3]);assert.ok(play.needs.every(n=>n>=0&&n<=4));
});
test('grooming distinguishes cloth, water, shampoo, rinse and towel; rest is required',()=>{
  let state=createMini('grooming',2);const wrong=miniAction(state,{type:'clean',tool:'wipe',spot:0});assert.equal(wrong.spots[0].kind,'mud');
  for(const tool of ['water','soap','rinse'])state=miniAction(state,{type:'clean',tool,spot:0});assert.equal(state.patience,0);assert.equal(state.spots[0].kind,'wet');
  const blocked=miniAction(state,{type:'clean',tool:'towel',spot:0});assert.equal(blocked.moves,state.moves);assert.equal(blocked.spots.length,1);
  state=miniAction(state,{type:'pause'});state=miniAction(state,{type:'clean',tool:'towel',spot:0});assert.equal(state.won,true);assert.equal(state.spots.length,0);assert.equal(GROOM_STEPS.dust[0],'wipe');
});
test('litter has exact pairs and empty cells on every increasingly large board',()=>{
  let previous=0;
  for(const level of GAMES.litter.levels){assert.ok(level.cells.length>previous);previous=level.cells.length;assert.ok(level.cells.includes(null));for(let shape=0;shape<level.pairs;shape++)assert.equal(level.cells.filter(v=>v===shape).length,2);}
});
test('empty sand preserves the first selection; mismatches lock until settled without spending a move',()=>{
  const level=GAMES.litter.levels[0],a=level.cells.indexOf(0),b=level.cells.indexOf(1),empty=level.cells.indexOf(null);
  let state=miniAction(createMini('litter'),{type:'reveal',cell:a});
  state=miniAction(state,{type:'reveal',cell:empty});assert.deepEqual(state.open,[a]);assert.deepEqual(state.empty,[empty]);assert.equal(miniAction(state,{type:'reveal',cell:empty}),state);
  state=miniAction(state,{type:'reveal',cell:b});assert.equal(state.pending,true);assert.equal(miniAction(state,{type:'reveal',cell:level.cells.lastIndexOf(0)}),state);
  const settled=miniAction(state,{type:'settle'});assert.equal(settled.moves,state.moves);assert.equal(settled.pending,false);assert.deepEqual(settled.open,[]);assert.deepEqual(settled.empty,[empty]);assert.deepEqual(state.open,[a,b]);
});
test('litter matching clears only equal forms and does not require digging empty cells',()=>{
  const level=GAMES.litter.levels[0];let state=createMini('litter');
  for(const action of solutionFor('litter',0))state=miniAction(state,action);
  assert.equal(state.won,true);assert.equal(state.matched.length,4);assert.deepEqual(state.empty,[]);assert.equal(state.moves,4);
});
test('yarn overlap and collinear shortcuts do not count as untangling',()=>{
  const state=createMini('yarn'),target=state.points[1],rejected=miniAction(state,{type:'move',node:0,...target});assert.equal(rejected.moves,state.moves);assert.deepEqual(rejected.points,state.points);
  assert.ok(yarnConflicts([{x:10,y:50},{x:90,y:50},{x:40,y:50},{x:60,y:50}],[[0,1],[2,3]]).length>0);
});
test('hidden-object search separates hints, wrong taps and finds; all three environments are present',()=>{
  const state=createMini('search'),hint=miniAction(state,{type:'hint'});assert.equal(hint.moves,1);assert.deepEqual(hint.found,[]);assert.ok(hint.hint);
  const wrong=miniAction(state,{type:'find',item:null});assert.equal(wrong.mistakes,1);assert.deepEqual(wrong.found,[]);
  const found=miniAction(hint,{type:'find',item:hint.hint});assert.equal(found.found.length,1);assert.equal(found.hint,null);assert.equal(miniAction(found,{type:'find',item:found.found[0]}),found);
  assert.deepEqual([...new Set(GAMES.search.levels.map(level=>level.scene))].sort(),['kitchen','room','yard']);
});
