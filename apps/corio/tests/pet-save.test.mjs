import test from 'node:test';
import assert from 'node:assert/strict';
import {readPetHome,readPetBudget} from '../dist/pet/save.mjs';
import {createPetLifeState,advancePetLife,petLifeAction} from '../dist/mini/pet-continuous.mjs';
import {PET_LEVELS,createPet,petAction} from '../dist/mini/pet-care.mjs';
test('one continuous cat restores exactly without adding absent time or a scenario envelope',()=>{
 let state=petLifeAction(createPetLifeState(),{type:'food'});state=advancePetLife(state,13.5);
 const loaded=readPetHome(JSON.stringify(state));assert.deepEqual(loaded.state,state);assert.equal(loaded.migrated,false);
 for(const field of ['index','won','goals','trace','scenes'])assert.equal(Object.hasOwn(loaded.state,field),false);
 loaded.state.needs[0]=5;assert.notEqual(state.needs[0],5);
});
test('the active old saved evening migrates read-only into the same continuing cat',()=>{
 const old={version:2,active:2,scenes:PET_LEVELS.map((_,i)=>createPet(i))};old.scenes[2]=petAction(old.scenes[2],{type:'food'});
 const raw=JSON.stringify(old),loaded=readPetHome(null,raw);assert.equal(loaded.migrated,true);assert.equal(loaded.state.care.food,1);assert.equal(loaded.state.activeSeconds,0);assert.equal(loaded.state.needs[0],old.scenes[2].needs[0]*25);assert.equal(JSON.stringify(old),raw);
});
test('a new save takes priority, while a corrupted save can recover from the untouched legacy book',()=>{
 const old={version:2,active:0,scenes:PET_LEVELS.map((_,i)=>createPet(i))},state=petLifeAction(createPetLifeState(),{type:'light'});
 assert.deepEqual(readPetHome(JSON.stringify(state),JSON.stringify(old)).state,state);
 assert.equal(readPetHome('{',JSON.stringify(old)).migrated,true);assert.equal(readPetHome('{',JSON.stringify(old)).recovered,true);
 for(const raw of ['{','null','{}',null])assert.deepEqual(readPetHome(raw).state,createPetLifeState());
});
test('optional care budget persistence rejects malformed counters and restores earned bonus',()=>{
 assert.deepEqual(readPetBudget('{"used":17,"bonus":10}'),{used:17,bonus:10});
 for(const raw of ['{}','null','{','{"used":-1,"bonus":0}','{"used":1.2,"bonus":0}','{"used":0,"bonus":-5}'])assert.deepEqual(readPetBudget(raw),{used:0,bonus:0});
});
test('a single saved envelope restores the cat and its earned care budget atomically',()=>{
 const cat=advancePetLife(petLifeAction(createPetLifeState(),{type:'food'}),8),budget={used:19,bonus:10};
 const loaded=readPetHome(JSON.stringify({version:3,cat,budget}));
 assert.deepEqual(loaded.state,cat);assert.deepEqual(loaded.budget,budget);
 assert.equal(readPetHome(JSON.stringify(cat)).budget,null,'Direct v3 saves still migrate without discarding the cat');
});
