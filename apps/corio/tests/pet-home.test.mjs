import test from 'node:test';
import assert from 'node:assert/strict';
import {createPetLifeState,petLifeAction,advancePetLife} from '../dist/mini/pet-continuous.mjs';
import {PET_HOME_KEY,PET_HOME_VERSION,PET_HOME_DURATIONS,createPetHomeState,advancePetHome,petHomeAction,petHomeAvailable,validatePetHomeSave,migratePetLifeV3} from '../dist/mini/pet-home.mjs';
const tick=(state,total)=>{while(total>0){const n=Math.min(total,30);state=advancePetHome(state,n);total-=n;}return state;};
const quiet=()=>({...createPetHomeState(),needs:[80,80,50,80],bowls:{food:0,water:0}});
const doAction=(state,type)=>advancePetHome(petHomeAction(state,{type}),PET_HOME_DURATIONS[type]);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
function same(a,b){
 for(const key of ['activeSeconds','activityLeft','affection','petLoad','handsCooldown','treatLoad','queasyLeft'])near(a[key],b[key]);a.needs.forEach((n,i)=>near(n,b.needs[i]));near(a.litter.nextIn,b.litter.nextIn);
 for(const key of ['id','version','bowls','asleep','pose','lastAction','activity','care','memories','message','lamp'])assert.deepEqual(a[key],b[key],key);
 for(const key of ['slots','cursor','pending'])assert.deepEqual(a.litter[key],b.litter[key]);
}
test('home stays continuous with bounded state and independent active-time needs',()=>{
 const state=createPetHomeState();assert.equal(PET_HOME_KEY,'corio-pet-home-v4');assert.equal(PET_HOME_VERSION,4);assert.deepEqual(state.litter.slots,[true,false,false,false]);
 for(const key of ['index','level','goals','won','trace','savedAt'])assert.equal(Object.hasOwn(state,key),false);
 for(const n of [0,-1,NaN,Infinity,'30'])assert.equal(advancePetHome(state,n),state);
 same(advancePetHome(state,999),advancePetHome(state,30));assert.deepEqual(validatePetHomeSave(JSON.parse(JSON.stringify(state))),state);
 const before=structuredClone(state);const filled=petHomeAction(state,{type:'food'});assert.deepEqual(state,before);assert.equal(filled.needs[0],state.needs[0]);assert.equal(filled.bowls.food,3);assert.equal(petHomeAction(filled,{type:'food'}),filled);
 const ate=advancePetHome(filled,6);assert.ok(ate.needs[0]>83);assert.equal(ate.bowls.food,2);
});
test('three quick pets elicit a grumble without a third affection reward and then recover',()=>{
 let state=quiet();state=doAction(state,'pet');state=doAction(state,'pet');const loved=state.affection;
 state=doAction(state,'pet');assert.equal(state.activity,'grumble');assert.equal(state.pose,'lookback');assert.equal(state.handsCooldown,25);assert.equal(state.affection,loved);assert.equal(state.care.pet,3);
 assert.equal(petHomeAvailable(state,'pet'),false);assert.equal(petHomeAvailable(state,'brush'),false);
 const rejected=petHomeAction(state,{type:'pet'});assert.equal(rejected.care.pet,3);assert.equal(rejected.affection,loved);
 state=tick(state,25);assert.equal(state.handsCooldown,0);assert.equal(state.activity,'idle');assert.ok(state.petLoad<2.5);assert.equal(petHomeAvailable(state,'pet'),true);assert.equal(petHomeAvailable(state,'brush'),true);
 const brushed=doAction(state,'brush');assert.ok(brushed.affection>state.affection);assert.ok(brushed.petLoad<state.petLoad);
});
test('three quick treats cause temporary queasiness, fewer joy and energy, and no overfeeding gain',()=>{
 let state=quiet();state=doAction(state,'treat');state=doAction(state,'treat');const before=structuredClone(state);
 state=doAction(state,'treat');assert.equal(state.activity,'queasy');assert.equal(state.pose,'cautious');assert.equal(state.queasyLeft,60);assert.ok(state.needs[2]<before.needs[2]-11);assert.ok(state.needs[3]<before.needs[3]-7);assert.equal(state.affection,before.affection);assert.ok(state.needs[0]<before.needs[0]);
 assert.equal(petHomeAvailable(state,'treat'),false);assert.equal(petHomeAvailable(state,'play'),false);assert.equal(petHomeAvailable(state,'tease'),false);assert.equal(petHomeAvailable(state,'scratch'),false);
 const rejected=petHomeAction(state,{type:'treat'});assert.equal(rejected.care.treat,3);assert.equal(rejected.queasyLeft,60);
 state=tick(state,60);assert.equal(state.queasyLeft,0);assert.ok(state.treatLoad<2.7);assert.equal(petHomeAvailable(state,'treat'),true);assert.equal(petHomeAvailable(state,'tease'),true);
});
test('spaced pets and treats settle their load instead of accumulating a permanent penalty',()=>{
 let state=quiet();for(let i=0;i<3;i++){state=doAction(state,'pet');state=tick(state,30);assert.equal(state.handsCooldown,0);}
 assert.equal(state.care.pet,3);assert.equal(state.affection,3);
 state=quiet();for(let i=0;i<3;i++){state=doAction(state,'treat');state=tick(state,45);assert.equal(state.queasyLeft,0);}
 assert.equal(state.care.treat,3);assert.equal(state.affection,.75);
});
test('teaser, brush and scratcher have distinct useful effects without consuming each other',()=>{
 const state=quiet(),teased=doAction(state,'tease'),brushed=doAction(state,'brush'),scratched=doAction(state,'scratch');
 assert.ok(teased.needs[2]>state.needs[2]+13);assert.ok(teased.needs[3]<state.needs[3]-6);assert.equal(teased.care.tease,1);assert.ok(teased.memories.includes('first-tease'));
 assert.ok(brushed.affection>state.affection);assert.equal(brushed.care.brush,1);assert.ok(brushed.memories.includes('first-brush'));
 assert.ok(scratched.needs[2]>state.needs[2]+8);assert.equal(scratched.care.scratch,1);assert.ok(scratched.memories.includes('first-scratch'));
 assert.equal(petHomeAvailable({...state,asleep:true,activity:'sleep',pose:'sleep'},'tease'),false);
 assert.equal(petHomeAvailable({...state,needs:[80,80,50,20]},'scratch'),false);
});
test('scooping removes one actual clump and invalid or empty cells are exact no-ops',()=>{
 const state=quiet(),before=structuredClone(state);assert.equal(petHomeAvailable(state,'scoop',0),true);
 for(const index of [undefined,-1,4,1,2,.5,'0',NaN])assert.equal(petHomeAction(state,{type:'scoop',index}),state);
 const clean=petHomeAction(state,{type:'scoop',index:0});assert.deepEqual(state,before);assert.deepEqual(clean.litter.slots,[false,false,false,false]);assert.equal(clean.care.scoop,1);assert.equal(clean.litter.nextIn,120);assert.ok(clean.memories.includes('first-scoop'));assert.equal(petHomeAction(clean,{type:'scoop',index:0}),clean);assert.equal(petHomeAvailable(clean,'scoop'),false);
});
test('the cat visits a deterministic litter slot after active time and queues visits when busy or full',()=>{
 let state=tick(quiet(),120);assert.equal(state.activity,'litter');assert.equal(state.activityLeft,6);assert.equal(state.litter.pending,true);assert.deepEqual(state.litter.slots,[true,false,false,false]);
 assert.equal(petHomeAvailable(state,'scoop'),false);assert.equal(petHomeAvailable(state,'scoop',0),false);assert.equal(petHomeAction(state,{type:'scoop',index:0}),state,'Do not scoop while the cat is using the tray');
 state=tick(state,6);assert.deepEqual(state.litter.slots,[true,true,false,false]);assert.equal(state.litter.cursor,2);assert.equal(state.litter.nextIn,120);assert.equal(state.litter.pending,false);
 state=tick(state,126);assert.deepEqual(state.litter.slots,[true,true,true,false]);state=tick(state,126);assert.deepEqual(state.litter.slots,[true,true,true,true]);state=tick(state,120);assert.equal(state.litter.pending,true);assert.equal(state.activity,'idle');
 state=petHomeAction(state,{type:'scoop',index:1});state=advancePetHome(state,1);assert.equal(state.activity,'litter');state=advancePetHome(state,5);assert.deepEqual(state.litter.slots,[true,true,true,true]);assert.equal(state.litter.pending,false);
 let busy=petHomeAction({...quiet(),litter:{...quiet().litter,nextIn:2}},{type:'tease'});busy=advancePetHome(busy,2);assert.equal(busy.activity,'tease');assert.equal(busy.litter.pending,true);busy=advancePetHome(busy,4);assert.equal(busy.activity,'litter');
});
test('cooldown, activity and litter boundaries preserve fractional-tick equivalence',()=>{
 const cases=[quiet(),{...quiet(),litter:{...quiet().litter,nextIn:5.2}},doAction(doAction(doAction(quiet(),'pet'),'pet'),'pet'),doAction(doAction(doAction(quiet(),'treat'),'treat'),'treat'),{...quiet(),needs:[80,80,50,89],asleep:true,activity:'sleep',pose:'sleep',lastAction:'rest'}];
 for(const initial of cases){const before=structuredClone(initial),one=advancePetHome(initial,20),half=Array.from({length:40}).reduce(state=>advancePetHome(state,.5),initial),mixed=[.1,.3,.6,2,7,10].reduce((state,n)=>advancePetHome(state,n),initial);same(one,half);same(one,mixed);assert.deepEqual(initial,before);assert.ok(validatePetHomeSave(one));}
});
test('v4 validation rejects extra fields, impossible cooldowns, stock, slots and activities',()=>{
 const good=quiet();
 const invalid=[null,[],{}, {...good,won:true},{...good,version:3},{...good,needs:[NaN,50,50,50]}, {...good,handsCooldown:26}, {...good,petLoad:4},{...good,treatLoad:-1},{...good,queasyLeft:61},{...good,litter:{...good.litter,slots:[true]}},{...good,litter:{...good.litter,slots:[1,false,false,false]}},{...good,litter:{...good.litter,cursor:4}},{...good,litter:{...good.litter,pending:true}},{...good,activity:'grumble',activityLeft:3,pose:'lookback',lastAction:'pet'},{...good,activity:'litter',activityLeft:3,pose:'cautious',lastAction:'litter'}, {...good,message:'<script>anything</script>'},{...good,memories:['unknown']},{...good,care:{...good.care,scoop:-1}}];
 for(const value of invalid)assert.equal(validatePetHomeSave(value),null);
 let state=good;for(const type of ['pet','brush','treat','scratch','tease','play']){state=doAction(state,type);assert.deepEqual(validatePetHomeSave(JSON.parse(JSON.stringify(state))),state);}
 const restored=validatePetHomeSave(good);restored.litter.slots[0]=false;restored.care.scoop=10;assert.equal(good.litter.slots[0],true);assert.equal(good.care.scoop,0);
});
test('v3 migration preserves previous needs, care, memories and unfinished old actions without modifying the input',()=>{
 for(const type of ['play','pet','rest']){
  let old=petLifeAction(createPetLifeState(),{type});old=advancePetLife(old,1);const before=structuredClone(old),state=migratePetLifeV3(old);assert.ok(state);
  for(const key of ['needs','bowls','asleep','pose','lastAction','activity','activityLeft','activeSeconds','affection','lamp','memories','message'])assert.deepEqual(state[key],old[key],key);
  for(const key of Object.keys(old.care))assert.equal(state.care[key],old.care[key]);assert.equal(state.care.treat,0);assert.equal(state.petLoad,0);assert.deepEqual(state.litter.slots,[true,false,false,false]);assert.deepEqual(old,before);assert.deepEqual(migratePetLifeV3(JSON.stringify(old)),state);assert.ok(validatePetHomeSave(state));
 }
 const invalid={...createPetLifeState(),needs:[999,50,50,50]};assert.equal(migratePetLifeV3(invalid),null);
});
test('seeded mixed care walks keep every generated snapshot valid and preserve split-time behavior',()=>{
 let seed=744;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 const choices=['food','water','pet','pet','pet','brush','treat','treat','treat','tease','scratch','play','rest','light','scoop'];
 const openings=[quiet(),doAction(doAction(doAction(quiet(),'pet'),'pet'),'pet'),doAction(doAction(doAction(quiet(),'treat'),'treat'),'treat'),{...quiet(),litter:{slots:[true,true,true,true],nextIn:0,cursor:3,pending:true}}];
 for(const opening of openings){
  let state=opening;
  for(let i=0;i<200;i++){
   const before=structuredClone(state),type=choices[Math.floor(random()*choices.length)],next=petHomeAction(state,{type,index:Math.floor(random()*4)});
   assert.deepEqual(state,before);assert.ok(validatePetHomeSave(next),'State after '+type);
   const seconds=.1+random()*29.9,one=advancePetHome(next,seconds),split=advancePetHome(advancePetHome(next,seconds*.37),seconds*.63);
   same(one,split);assert.ok(validatePetHomeSave(one),'State after active time');state=one;
  }
 }
});
