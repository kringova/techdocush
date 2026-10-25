import test from 'node:test';
import assert from 'node:assert/strict';
import {GAMES,FOODS,FOOD_LEVELS,FOOD_PILE_ASPECT,foodIsExposed,GROOM_STEPS,createMini,miniAction,solutionFor,connectedRoute,yarnConflicts} from '../dist/mini/engine.mjs';
import {foodFigure} from '../dist/characters.mjs';
import {SEARCH_SCENES} from '../dist/mini/search-data.mjs';
import {SEARCH_SLOTS,searchSlotsFor,placeSearchObject} from '../dist/mini/search-layout.mjs';
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
test('search covers all12fixed variants, distinct boards and exactly5/7/9/11/13goals per ten levels',()=>{
  const levels=GAMES.search.levels,combinations=new Set(),lists=new Set();let previous=0;
  for(const [index,level] of levels.entries()){
    combinations.add([level.scene,level.clues,level.lighting].join('/'));
    const key=[level.scene,level.clues,level.lighting,JSON.stringify(level.layout)].join('/');assert.ok(!lists.has(key),'No repeated board');lists.add(key);
    assert.equal(level.targets.length,5+2*Math.floor(index/10));
    assert.equal(new Set(level.targets).size,level.targets.length);assert.ok(level.targets.length>=previous);previous=level.targets.length;
    for(const target of level.targets)assert.ok(SEARCH_SCENES[level.scene].some(item=>item.id===target));
  }
  assert.equal(combinations.size,12);assert.equal(levels[0].targets.length,5);assert.equal(levels.at(-1).targets.length,13);
});
test('each object uses three or four actual locations; every board assigns one object per slot',()=>{
  for(const [scene,items] of Object.entries(SEARCH_SCENES)){
    assert.equal(items.length,13);assert.equal(new Set(items.map(i=>i.id)).size,13);
    const levels=GAMES.search.levels.filter(l=>l.scene===scene);
    for(const level of levels){assert.equal(new Set(Object.values(level.layout)).size,13);for(const [index,item] of items.entries())assert.ok(searchSlotsFor(index,scene).includes(level.layout[item.id]));}
    for(const item of items){const n=new Set(levels.map(l=>l.layout[item.id])).size;assert.ok(n>=3&&n<=4,scene+'/'+item.id);}
    for(let i=0;i<13;i++){
      const [x,y,w,h]=SEARCH_SLOTS[scene][i];assert.ok(x>=0&&y>=0&&x+w<=1536&&y+h<=1024);
      for(let j=i+1;j<13;j++){const [a,b,c,d]=SEARCH_SLOTS[scene][j];assert.ok(x+w<=a||a+c<=x||y+h<=b||b+d<=y,'Slots must not overlap: '+scene+'/'+i+'/'+j);}
      const p=placeSearchObject(scene,i,[0,0,240,80]);assert.ok(p.x>=x&&p.y>=y&&p.x+p.width<=x+w+.001&&p.y+p.height<=y+h+.001);assert.ok(Math.abs(p.width/p.height-3)<.00001,'Native aspect ratio is preserved');
    }
  }
});
test('wall route needs reciprocal joints; fixed shelves cannot turn',()=>{
  let state=createMini('tunnels');const level=GAMES.tunnels.levels[0];assert.deepEqual(connectedRoute(state,level),[]);assert.equal(miniAction(state,{type:'turn',piece:0}),state);
  state=miniAction(state,{type:'turn',piece:1});assert.equal(state.won,true);assert.equal(connectedRoute(state,level).length,3);
});
test('food has five fixed dense bowls with repeated solids and increasing layers and variety',()=>{
  assert.equal(GAMES.food.levels,FOOD_LEVELS);assert.equal(FOOD_PILE_ASPECT,1.35);
  const allowed=['dry','treat','chicken','wet','raw','bone','candy','chocolate','onion','garlic'];
  for(const [index,level]of FOOD_LEVELS.entries()){
    assert.equal(level.items.length,[24,36,48,60,72][index]);
    assert.equal(new Set(level.items).size,[6,8,10,10,10][index]);
    assert.equal(level.layers,index+2);assert.equal(new Set(level.placements.map(p=>p.layer)).size,index+2);
    assert.equal(level.placements.length,level.items.length);assert.equal(new Set(level.placements.map(p=>p.z)).size,level.items.length);
    for(const type of new Set(level.items)){assert.ok(allowed.includes(type));assert.ok(level.items.filter(t=>t===type).length>=4,'Every included type repeats at least four times');}
    assert.ok(level.items.some(type=>FOODS[type].safe));assert.ok(level.items.some(type=>!FOODS[type].safe));
    assert.ok(!level.items.includes('water')&&!level.items.includes('coffee'));
  }
  assert.deepEqual([...new Set(FOOD_LEVELS.at(-1).items)].sort(),allowed.sort());
  assert.equal(FOODS.water.name,'Питьевая вода');assert.equal(FOODS.water.safe,true);
  assert.equal(FOODS.coffee.name,'Кофе');assert.equal(FOODS.coffee.safe,false);
});
test('food placements preserve atlas aspect and keep rotated native rectangles inside the bowl',()=>{
  for(const level of FOOD_LEVELS)for(const [id,p]of level.placements.entries()){
    assert.equal(p.id,id);assert.ok(p.width>=17&&p.width<=24);
    assert.ok(['x','y','width','height','angle','z','layer'].every(key=>Number.isFinite(p[key])));
    const [, ,cropWidth,cropHeight]=foodFigure(level.items[id]).match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
    assert.ok(Math.abs(p.height-p.width*cropHeight/cropWidth*FOOD_PILE_ASPECT)<1e-10,'Native food crop must not stretch');
    const a=p.angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
    for(const u of[-.5,.5])for(const v of[-.5,.5]){
      const dx=u*p.width*FOOD_PILE_ASPECT,dy=v*p.height;
      const x=p.x+p.width/2+(dx*c-dy*s)/FOOD_PILE_ASPECT,y=p.y+p.height/2+dx*s+dy*c;
      assert.ok(x>=10-1e-10&&x<=90+1e-10&&y>=10-1e-10&&y<=90+1e-10,'Rotated food extends past bowl bounds');
    }
  }
});
const foodFixture=placements=>({items:placements.map(()=> 'dry'),placements:placements.map((p,id)=>({id,x:40,y:40,width:20,height:20,angle:0,z:id,layer:id,...p}))});
const foodRemaining=level=>level.items.map((type,id)=>({type,id}));
const freeze=value=>{if(value&&typeof value==='object'){Object.freeze(value);for(const v of Object.values(value))freeze(v);}return value;};
test('food exposure uses the union of remaining upper ellipses and opens when a covering item is removed',()=>{
  const level=freeze(foodFixture([{}, {x:30,y:35,width:25,height:30}, {x:45,y:35,width:25,height:30}]));
  const remaining=freeze(foodRemaining(level)),before=JSON.stringify({remaining,level});
  assert.equal(foodIsExposed(remaining,level,0),false,'Two upper pieces together cover the lower piece');
  assert.equal(foodIsExposed(remaining.filter(i=>i.id!==1),level,0),true,'Removing the left cover reveals a usable patch');
  assert.equal(foodIsExposed(remaining.filter(i=>i.id!==2),level,0),true,'Removing the right cover also reveals a usable patch');
  assert.equal(foodIsExposed(remaining,level,2),true,'The highest remaining z is always available');
  assert.equal(foodIsExposed(remaining.filter(i=>i.id!==0),level,0),false,'Removed items are not selectable');
  assert.equal(foodIsExposed(remaining,level,99),false);assert.equal(foodIsExposed(remaining,level,'0'),false);
  assert.equal(JSON.stringify({remaining,level}),before);
});
test('food requires a visible patch rather than a single sliver and rotates in physical bowl coordinates',()=>{
  const sliver=foodFixture([{}, {x:33.7,y:38,width:24,height:24}]);
  assert.equal(foodIsExposed(foodRemaining(sliver),sliver,0),false,'A tiny isolated rim opening is not enough to grab');
  const patch=foodFixture([{}, {x:33.4,y:38,width:24,height:24}]);
  assert.equal(foodIsExposed(foodRemaining(patch),patch,0),true,'A wider uncovered region is selectable');
  const side=foodFixture([{x:54,y:49.5,width:1,height:1},{x:30,y:45,width:40,height:10,angle:90}]);
  assert.equal(foodIsExposed(foodRemaining(side),side,0),true,'A90degree cover is narrower in x after the1.35 aspect correction');
  const below=foodFixture([{x:49.5,y:73.5,width:1,height:1},{x:30,y:45,width:40,height:10,angle:90}]);
  assert.equal(foodIsExposed(foodRemaining(below),below,0),false,'The same rotated cover extends farther down in physical y');
});
test('covered food clicks are identical no-ops and several exposed pieces can be taken in any order',()=>{
  for(const [index,level]of FOOD_LEVELS.entries()){
    const state=freeze(createMini('food',index)),before=JSON.stringify(state);
    const exposed=state.remaining.filter(i=>foodIsExposed(state.remaining,level,i.id));
    const hidden=state.remaining.find(i=>!foodIsExposed(state.remaining,level,i.id));
    assert.ok(hidden,'Every dense bowl must start with covered food');assert.ok(exposed.length>1);
    const belowTop=exposed.find(i=>level.placements[i.id].z<Math.max(...level.placements.map(p=>p.z)));
    assert.ok(belowTop,'Availability must not require the single highest z');
    for(const bin of['safe','away'])assert.equal(miniAction(state,{type:'sort',item:hidden.id,bin}),state);
    for(const item of[exposed[0],exposed.at(-1),belowTop]){
      const next=miniAction(state,{type:'sort',item:item.id,bin:FOODS[item.type].safe?'safe':'away'});
      assert.equal(next.moves,1);assert.equal(next.mistakes,0);assert.equal(next.remaining.length,state.remaining.length-1);
      assert.deepEqual(next.sorted,[item]);assert.ok(!next.remaining.some(i=>i.id===item.id));
    }
    assert.equal(JSON.stringify(state),before);
  }
});
test('an exposed chocolate sent to the wrong zone spends one move, stays put, and can then be removed correctly',()=>{
  const level=FOOD_LEVELS[0];let state=createMini('food'),chocolate;
  while(!(chocolate=state.remaining.find(i=>i.type==='chocolate'&&foodIsExposed(state.remaining,level,i.id)))){
    const item=state.remaining.find(i=>foodIsExposed(state.remaining,level,i.id));assert.ok(item);
    state=miniAction(state,{type:'sort',item:item.id,bin:FOODS[item.type].safe?'safe':'away'});
  }
  const before=JSON.stringify(state),wrong=miniAction(state,{type:'sort',item:chocolate.id,bin:'safe'});
  assert.equal(JSON.stringify(state),before);assert.deepEqual(wrong.remaining,state.remaining);assert.deepEqual(wrong.sorted,state.sorted);
  assert.equal(wrong.mistakes,state.mistakes+1);assert.equal(wrong.moves,state.moves+1);assert.ok(wrong.message.includes(FOODS.chocolate.why));
  assert.equal(foodIsExposed(wrong.remaining,level,chocolate.id),true);
  const right=miniAction(wrong,{type:'sort',item:chocolate.id,bin:'away'});
  assert.equal(right.remaining.length,state.remaining.length-1);assert.deepEqual(right.sorted.at(-1),chocolate);
  assert.equal(right.mistakes,wrong.mistakes);assert.equal(right.moves,wrong.moves+1);
  assert.equal(FOODS.candy.safe,false);assert.ok(FOODS.chicken.name.includes('Готовая'));
});
test('food solutions and alternative exposed choices fully clear every bowl without deadlock or reroll',()=>{
  const definitions=JSON.stringify(FOOD_LEVELS);
  for(const [index,level]of FOOD_LEVELS.entries()){
    const solution=solutionFor('food',index);assert.equal(solution.length,level.items.length);assert.deepEqual(solutionFor('food',index),solution);
    let solved=createMini('food',index);
    for(const action of solution){assert.equal(foodIsExposed(solved.remaining,level,action.item),true);solved=miniAction(solved,action);}
    assert.equal(solved.won,true);assert.equal(solved.moves,level.items.length);assert.equal(solved.mistakes,0);
    for(const policy of['first','last','mixed']){
      let state=createMini('food',index),seed=3571+index;
      while(state.remaining.length){
        const available=state.remaining.filter(i=>foodIsExposed(state.remaining,level,i.id));assert.ok(available.length,'No blocked deadlock');
        const highest=state.remaining.reduce((a,b)=>level.placements[a.id].z>level.placements[b.id].z?a:b);
        assert.equal(foodIsExposed(state.remaining,level,highest.id),true);
        seed=(Math.imul(seed,1664525)+1013904223)>>>0;
        const item=policy==='first'?available[0]:policy==='last'?available.at(-1):available[seed%available.length];
        const before=JSON.stringify(state),next=miniAction(state,{type:'sort',item:item.id,bin:FOODS[item.type].safe?'safe':'away'});
        assert.equal(JSON.stringify(state),before);assert.equal(next.moves,state.moves+1);state=next;
      }
      assert.equal(state.won,true);assert.equal(state.moves,level.items.length);assert.equal(state.mistakes,0);
    }
    const first=createMini('food',index),restart=createMini('food',index);
    assert.deepEqual(restart,first);assert.deepEqual(first.remaining,level.items.map((type,id)=>({type,id})));
    assert.notEqual(restart.remaining,first.remaining);assert.notEqual(restart.remaining[0],first.remaining[0]);
  }
  assert.equal(JSON.stringify(FOOD_LEVELS),definitions);
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
