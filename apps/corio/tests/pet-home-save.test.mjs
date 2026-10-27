import test from 'node:test';
import assert from 'node:assert/strict';
import {readPetHome} from '../dist/pet/save-v4.mjs';
import {createPetHomeState,petHomeAction,advancePetHome} from '../dist/mini/pet-home.mjs';
import {createPetLifeState,petLifeAction,advancePetLife} from '../dist/mini/pet-continuous.mjs';
import {PET_LEVELS,createPet,petAction} from '../dist/mini/pet-care.mjs';

test('v4 cat and care budget restore atomically, including cooling and dirty slots',()=>{
 let state=createPetHomeState();state=petHomeAction(state,{type:'scoop',index:0});
 state=advancePetHome(petHomeAction(state,{type:'treat'}),3);
 const loaded=readPetHome(JSON.stringify({version:4,cat:state,budget:{used:17,bonus:10}}));
 assert.deepEqual(loaded.state,state);assert.deepEqual(loaded.budget,{used:17,bonus:10});assert.equal(loaded.migrated,false);
 loaded.state.litter.slots[0]=true;assert.equal(state.litter.slots[0],false);
});
test('read-only v3 migration preserves a partial activity and earned budget',()=>{
 const old=advancePetLife(petLifeAction(createPetLifeState(),{type:'play'}),1.25),raw=JSON.stringify({version:3,cat:old,budget:{used:19,bonus:5}});
 const loaded=readPetHome(null,raw);assert.equal(loaded.migrated,true);assert.equal(loaded.state.version,4);
 for(const key of['needs','bowls','activity','activityLeft','activeSeconds','affection','lamp','memories'])assert.deepEqual(loaded.state[key],old[key],key);
 for(const [key,value]of Object.entries(old.care))assert.equal(loaded.state.care[key],value);
 assert.deepEqual(loaded.budget,{used:19,bonus:5});assert.equal(JSON.stringify({version:3,cat:old,budget:{used:19,bonus:5}}),raw);
});
test('v2 evening migration still works without rewriting either historical format',()=>{
 const old={version:2,active:1,scenes:PET_LEVELS.map((_,i)=>createPet(i))};old.scenes[1]=petAction(old.scenes[1],{type:'rest'});
 const raw=JSON.stringify(old),loaded=readPetHome(null,null,raw);assert.equal(loaded.migrated,true);assert.equal(loaded.state.version,4);assert.equal(loaded.state.care.rest,1);assert.equal(JSON.stringify(old),raw);
});
test('a valid new home wins; malformed v4 can recover from the untouched v3 cat',()=>{
 const current=petHomeAction(createPetHomeState(),{type:'light'}),old=createPetLifeState();
 assert.deepEqual(readPetHome(JSON.stringify(current),JSON.stringify(old)).state,current);
 const recovered=readPetHome('{',JSON.stringify(old));assert.equal(recovered.recovered,true);assert.equal(recovered.migrated,true);assert.deepEqual(recovered.state.needs,old.needs);
 for(const raw of[null,'{','{}','null']){const loaded=readPetHome(raw,'{','{}');assert.deepEqual(loaded.state,createPetHomeState());assert.equal(loaded.migrated,false);}
});
