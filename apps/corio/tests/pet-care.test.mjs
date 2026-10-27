import test from 'node:test';
import assert from 'node:assert/strict';
import {PET_LEVELS,PET_ACTIONS,PET_SAVE_KEY,PET_BEST_KEY,PET_SAVE_MAX_ACTIONS,createPet,petAction,petGoals,petAvailable,petSolution,validatePetSave} from '../dist/mini/pet-care.mjs';

test('five evenings have distinct goals and finite authored solutions',()=>{
  assert.equal(PET_LEVELS.length,5);
  assert.equal(new Set(PET_LEVELS.map(level=>JSON.stringify([level.needs,level.goals]))).size,5);
  assert.deepEqual(PET_LEVELS.map(level=>level.metrics.referenceMoves),[2,3,4,5,7]);
  for(let i=0;i<PET_LEVELS.length;i++){
    let state=createPet(i);const initial=structuredClone(state),path=petSolution(i);
    assert.ok(!state.won);assert.ok(!petGoals(state).every(goal=>goal.done));
    for(const action of path){assert.equal(petAvailable(state,action.type),true);const before=structuredClone(state),next=petAction(state,action);assert.deepEqual(state,before);assert.equal(next.moves,state.moves+1);state=next;}
    assert.equal(state.won,true);assert.ok(petGoals(state).every(goal=>goal.done));assert.equal(state.moves,PET_LEVELS[i].metrics.referenceMoves);
    assert.equal(petAction(state,{type:'food'}),state,'A completed evening cannot consume another action');
    assert.deepEqual(createPet(i),initial,'Starting/replaying an evening has no global mutation');
    path[0].type='not-an-action';assert.notEqual(petSolution(i)[0].type,'not-an-action');
  }
  assert.ok(Object.isFrozen(PET_LEVELS[0].goals));
});

test('food, water, play and rest obey energy and fullness without an unavailable action spending a move',()=>{
  const tired=createPet(1),before=structuredClone(tired),blocked=petAction(tired,{type:'play'});
  assert.deepEqual(tired,before);assert.equal(blocked.moves,0);assert.deepEqual(blocked.needs,tired.needs);assert.equal(blocked.trace.length,0);assert.match(blocked.message,/передышка/);
  assert.ok(petAvailable(petAction(tired,{type:'rest'}),'play'));
  for(const [type,need]of[['food',0],['water',1],['rest',3]]){
    const state={...createPet(0),needs:[4,4,1,4]},next=petAction(state,{type});assert.equal(next.moves,0);assert.equal(next.needs[need],4);assert.deepEqual(next.actions,state.actions);
  }
  const playful={...createPet(0),needs:[4,4,0,4]},played=petAction(playful,{type:'play'});
  assert.deepEqual(played.needs,[4,3,2,3]);
  const rested=petAction(played,{type:'rest'});assert.equal(rested.needs[2],2,'Rest does not erase play');assert.equal(rested.needs[0],4,'Rest does not undo a meal');
  assert.equal(petAction(playful,{type:'__proto__'}),playful);assert.equal(petAction(playful,{type:'constructor'}),playful);assert.equal(petAction(playful,null),playful);
});

test('each persisted intermediate state replays exactly, including blocked notices and victory',()=>{
  assert.notEqual(PET_SAVE_KEY,'corio-pet-v1');assert.notEqual(PET_BEST_KEY,'corio-pet-v1');
  for(let i=0;i<PET_LEVELS.length;i++){
    let state=createPet(i);assert.deepEqual(validatePetSave(JSON.parse(JSON.stringify(state))),state);
    for(const action of petSolution(i)){
      const snapshot=structuredClone(state);state=petAction(state,action);
      assert.deepEqual(validatePetSave(JSON.parse(JSON.stringify(state))),state);
      assert.deepEqual(validatePetSave(snapshot),snapshot,'Undo snapshots remain independently valid');
    }
  }
  const blocked=petAction(createPet(1),{type:'play'});assert.deepEqual(validatePetSave(blocked),blocked);
  const restored=validatePetSave(createPet(0));restored.needs[0]=4;restored.actions.food=99;restored.trace.push('food');assert.equal(createPet(0).needs[0],1);
});

test('corrupted or forged saves never supply victory, counters, needs or extra fields',()=>{
  const good=petAction(createPet(0),{type:'food'});
  const changes=[
    {won:true},{moves:600},{needs:[4,4,4,4]},{actions:{food:8,water:0,play:0,rest:0}},
    {pose:'sleep'},{lastAction:'water'},{index:4},{message:'arbitrary HTML'},
    {trace:['rest']},{trace:['__proto__']},{trace:['water','water']},{extra:'unknown'},
    {needs:[NaN,1,2,3]},{index:-1},{index:1.5},{moves:Infinity},{trace:['food',null]}
  ];
  for(const patch of changes)assert.equal(validatePetSave({...good,...patch}),null,JSON.stringify(patch));
  const win=petSolution(0).reduce(petAction,createPet(0));assert.equal(validatePetSave({...win,trace:[...win.trace,'play'],moves:win.moves+1}),null,'A trace cannot continue after a win');
  const oversized=Array(PET_SAVE_MAX_ACTIONS+1).fill('play');assert.equal(validatePetSave({...good,trace:oversized,moves:oversized.length}),null,'Oversized logs are rejected rather than truncated');
  for(const value of [null,[],{},'string',Object.create({id:'pet'})])assert.equal(validatePetSave(value),null);
});

test('no reachable calm state becomes a dead end',()=>{
  // This is a finite abstract graph: only counts relevant to a goal distinguish
  // vertices. Reverse reachability proves that every reachable vertex can win.
  for(let i=0;i<PET_LEVELS.length;i++){
    const caps=Object.fromEntries(Object.keys(PET_ACTIONS).map(type=>[type,Math.max(0,...PET_LEVELS[i].goals.filter(goal=>goal.action===type).map(goal=>goal.count))]));
    const key=state=>[state.needs.join(','),...Object.keys(PET_ACTIONS).map(type=>Math.min(caps[type],state.actions[type])),state.lastAction,state.won].join('/');
    const initial=createPet(i),queue=[initial],seen=new Map([[key(initial),initial]]),reverse=new Map(),winning=[];
    for(let at=0;at<queue.length;at++){
      const state=queue[at],from=key(state);if(state.won){winning.push(from);continue;}
      for(const type of Object.keys(PET_ACTIONS)){
        if(!petAvailable(state,type))continue;
        const next=petAction(state,{type}),to=key(next);if(!reverse.has(to))reverse.set(to,[]);reverse.get(to).push(from);
        if(!seen.has(to)){seen.set(to,next);queue.push(next);}
      }
    }
    const canFinish=new Set(winning),back=[...winning];
    for(let at=0;at<back.length;at++)for(const from of reverse.get(back[at])||[])if(!canFinish.has(from)){canFinish.add(from);back.push(from);}
    assert.ok(winning.length>0);assert.equal(canFinish.size,seen.size,'Evening '+(i+1)+' has an unreachable win from a legal state');
  }
});
