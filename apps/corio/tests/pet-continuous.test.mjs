import test from 'node:test';
import assert from 'node:assert/strict';
import {createPet,petAction,PET_LEVELS} from '../dist/mini/pet-care.mjs';
import {PET_LIFE_KEY,PET_LIFE_VERSION,createPetLifeState,advancePetLife,petLifeAvailable,petLifeAction,validatePetLifeSave,migratePetBook} from '../dist/mini/pet-continuous.mjs';
const tick=(state,total)=>{while(total>0){const seconds=Math.min(total,30);state=advancePetLife(state,seconds);total-=seconds;}return state;};
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-6,`${actual} != ${expected}`);
function sameLife(a,b){
  a.needs.forEach((n,i)=>near(n,b.needs[i]));near(a.activeSeconds,b.activeSeconds);near(a.activityLeft,b.activityLeft);near(a.affection,b.affection);
  for(const key of['version','id','bowls','asleep','pose','lastAction','activity','lamp','care','memories','message'])assert.deepEqual(a[key],b[key],key);
}
test('a continuous pet has no level, goal, victory, trace or absent-time clock',()=>{
  const state=createPetLifeState();assert.equal(PET_LIFE_KEY,'corio-pet-life-v3');assert.equal(PET_LIFE_VERSION,3);
  for(const key of['index','level','goals','won','trace','timestamp','savedAt'])assert.equal(Object.hasOwn(state,key),false);
  assert.deepEqual(state.needs,[62,58,55,76]);assert.deepEqual(state.bowls,{food:0,water:1});
  assert.deepEqual(validatePetLifeSave(JSON.parse(JSON.stringify(state))),state);
  for(const value of[0,-1,NaN,Infinity,'30',null,undefined])assert.equal(advancePetLife(state,value),state);
  sameLife(advancePetLife(state,999999),advancePetLife(state,30));
});
test('food fills a bowl; the cat eats by itself after six active seconds and never eats from an empty bowl',()=>{
  const initial={...createPetLifeState(),bowls:{food:0,water:0}},before=structuredClone(initial),filled=petLifeAction(initial,{type:'food'});
  assert.deepEqual(initial,before);assert.equal(filled.needs[0],62);assert.equal(filled.bowls.food,3);assert.equal(filled.care.food,1);
  const eating=advancePetLife(filled,2);assert.equal(eating.activity,'eat');assert.equal(eating.activityLeft,4);assert.equal(eating.bowls.food,3);assert.ok(eating.needs[0]<62);
  const ate=advancePetLife(eating,4);assert.equal(ate.bowls.food,2);assert.ok(ate.needs[0]>83);assert.equal(ate.activity,'idle');assert.ok(ate.memories.includes('first-meal'));
  const empty=tick(initial,90);assert.equal(empty.bowls.food,0);assert.ok(!empty.memories.includes('first-meal'));assert.ok(empty.needs[0]<62);
});
test('autonomous drinking consumes one stocked serving only on completion',()=>{
  const state=createPetLifeState(),drink=advancePetLife(state,3);assert.equal(drink.activity,'drink');assert.equal(drink.activityLeft,1);assert.equal(drink.bowls.water,1);
  const done=advancePetLife(drink,1);assert.equal(done.bowls.water,0);assert.ok(done.needs[1]>87);assert.ok(done.memories.includes('first-drink'));
  const refilled=petLifeAction(done,{type:'water'});assert.equal(refilled.bowls.water,3);assert.equal(refilled.needs[1],done.needs[1]);
  const cancelled=petLifeAction(drink,{type:'rest'});assert.equal(cancelled.asleep,true);assert.equal(cancelled.bowls.water,1,'A cancelled unfinished drink does not consume water');
});
test('full bowls cannot consume care actions and availability matches sleeping, busy and tired states',()=>{
  let state=createPetLifeState();
  for(const type of['food','water']){
    assert.equal(petLifeAvailable(state,type),true);state=petLifeAction(state,{type});
    const before=structuredClone(state);assert.equal(petLifeAvailable(state,type),false);
    for(let i=0;i<4;i++)state=petLifeAction(state,{type});
    assert.deepEqual(state,before,'A full '+type+' bowl is not refilled or counted again');assert.equal(state.bowls[type],3);assert.equal(state.care[type],1);
  }
  const busy=petLifeAction(state,{type:'play'}),sleeping=petLifeAction(state,{type:'rest'}),tired={...state,needs:[62,58,55,24]};
  for(const type of['play','pet']){assert.equal(petLifeAvailable(state,type),true);assert.equal(petLifeAvailable(busy,type),false);assert.equal(petLifeAvailable(sleeping,type),false);}
  assert.equal(petLifeAvailable(tired,'play'),false);assert.equal(petLifeAvailable(tired,'pet'),true);
  for(const sample of[state,busy,sleeping,tired])for(const type of['rest','light'])assert.equal(petLifeAvailable(sample,type),true);
  assert.equal(petLifeAvailable(state,'constructor'),false);
});
test('play and petting can repeat without any victory and build permanent bounded affection',()=>{
  let state={...createPetLifeState(),bowls:{food:0,water:0}};
  const start=petLifeAction(state,{type:'play'});assert.equal(start.activity,'play');assert.equal(start.care.play,1);assert.equal(start.needs[2],55);
  const played=advancePetLife(start,6);assert.ok(played.needs[2]>66);assert.ok(played.needs[3]<71);assert.ok(played.needs[1]<54);assert.ok(played.memories.includes('first-play'));
  state=played;
  for(let i=0;i<150;i++){state=petLifeAction(state,{type:'pet'});state=advancePetLife(state,2);}
  assert.equal(state.care.pet,150);assert.equal(state.affection,100);assert.ok(state.memories.includes('first-pet'));assert.equal(new Set(state.memories).size,state.memories.length);assert.ok(state.memories.length<=12);assert.equal(Object.hasOwn(state,'won'),false);
  const continued=petLifeAction({...state,needs:[100,100,100,100]},{type:'food'});assert.equal(continued.care.food,1);assert.equal(continued.bowls.food,3);
  assert.equal(advancePetLife(continued,30).affection,100,'Affection does not decay');
});
test('a tired cat naps by itself, recovers gradually and awakens; manual rest toggles without disease or depletion',()=>{
  const tired={...createPetLifeState(),needs:[20,20,20,24],bowls:{food:0,water:0}},asleep=advancePetLife(tired,1);
  assert.equal(asleep.asleep,true);assert.equal(asleep.pose,'sleep');assert.ok(asleep.needs[3]>24);assert.ok(asleep.memories.includes('first-nap'));
  const blocked=petLifeAction(asleep,{type:'play'});assert.equal(blocked.care.play,0);assert.equal(blocked.asleep,true);
  const awake=tick(asleep,220);assert.equal(awake.asleep,false);assert.ok(awake.needs[3]>89);assert.ok(awake.needs.every(n=>n>=5));
  const manual=petLifeAction(awake,{type:'rest'});assert.equal(manual.asleep,true);assert.equal(manual.care.rest,1);
  const wake=petLifeAction(manual,{type:'rest'});assert.equal(wake.asleep,false);assert.equal(wake.care.rest,2);
  const long=tick({...createPetLifeState(),bowls:{food:0,water:0}},7200);assert.ok(long.needs.every(n=>n>=5&&n<=100));assert.equal(Object.hasOwn(long,'dead'),false);
});
test('time integration is equivalent across fractional ticks, activity completions and need thresholds',()=>{
  const cases=[
    createPetLifeState(),
    {...createPetLifeState(),needs:[65.2,66,55,76],bowls:{food:3,water:3}},
    {...createPetLifeState(),needs:[62,58,55,25.5],bowls:{food:0,water:0}},
    {...createPetLifeState(),needs:[62,58,55,89],asleep:true,pose:'sleep',activity:'sleep',activityLeft:0,lastAction:'rest'},
    petLifeAction(createPetLifeState(),{type:'play'})
  ];
  for(const initial of cases){
    const before=structuredClone(initial);
    const one=advancePetLife(initial,20),half=Array.from({length:40}).reduce(state=>advancePetLife(state,.5),initial),mixed=[.1,.3,.6,2,7,10].reduce((state,n)=>advancePetLife(state,n),initial);
    sameLife(one,half);sameLife(one,mixed);assert.deepEqual(initial,before);
  }
});
test('strict saves reject unknown properties, messages, malformed activities and nonfinite data',()=>{
  const good=createPetLifeState();
  const invalid=[
    null,[],{}, {...good,won:true},{...good,version:2},{...good,needs:[-1,50,50,50]}, {...good,needs:[50,50,50,Infinity]},
    {...good,bowls:{food:4,water:1}}, {...good,bowls:{food:.5,water:1}}, {...good,care:{...good.care,play:-1}},
    {...good,message:'<img onerror=alert(1)>'}, {...good,memories:['made-up']}, {...good,memories:['first-play','first-play']},
    {...good,asleep:true},{...good,pose:'cautious'},{...good,pose:'stretch',lastAction:'food'},{...good,pose:'attentive'},{...good,activity:'play',activityLeft:9,pose:'stretch',lastAction:'play'},
    {...good,activity:'eat',activityLeft:2,pose:'cautious',lastAction:'food'}, {...good,activityLeft:1}, {...good,activeSeconds:NaN}
  ];
  for(const value of invalid)assert.equal(validatePetLifeSave(value),null);
  let state=good;for(const type of ['food','water','play','light','rest','rest','pet']){state=petLifeAction(state,{type});state=advancePetLife(state,8);assert.deepEqual(validatePetLifeSave(JSON.parse(JSON.stringify(state))),state);}
  const restored=validatePetLifeSave(good);restored.needs[0]=99;restored.bowls.food=3;restored.care.pet=10;restored.memories.push('first-pet');assert.equal(good.needs[0],62);assert.equal(good.bowls.food,0);assert.equal(good.care.pet,0);assert.deepEqual(good.memories,[]);
  const longCounter=advancePetLife({...good,activeSeconds:Number.MAX_SAFE_INTEGER},30);assert.ok(validatePetLifeSave(longCounter),'A saturated lifetime counter remains a valid save');
});
test('v2 migration preserves active needs and care without bringing back levels or mutating the book',()=>{
  const scenes=PET_LEVELS.map((_,i)=>createPet(i));scenes[3]=petAction(scenes[3],{type:'food'});scenes[3]=petAction(scenes[3],{type:'rest'});
  const book={version:2,active:3,scenes},before=structuredClone(book),state=migratePetBook(book);
  assert.deepEqual(book,before);assert.ok(state);assert.deepEqual(state.needs,[75,50,5,100]);assert.equal(state.pose,'sleep');assert.equal(state.asleep,true);assert.equal(state.care.food,1);assert.equal(state.care.rest,1);assert.equal(state.activeSeconds,0);assert.ok(state.memories.includes('first-meal'));assert.ok(state.memories.includes('first-nap'));
  assert.equal(Object.hasOwn(state,'index'),false);assert.equal(Object.hasOwn(state,'won'),false);assert.equal(Object.hasOwn(state,'trace'),false);assert.deepEqual(migratePetBook(JSON.stringify(book)),state);assert.deepEqual(validatePetLifeSave(state),state);
  assert.equal(migratePetBook({...book,active:9}),null);assert.equal(migratePetBook({...book,scenes:book.scenes.slice(1)}),null);assert.equal(migratePetBook({...book,extra:true}),null);
  const corrupt=structuredClone(book);corrupt.scenes[3].needs[0]=4;assert.equal(migratePetBook(corrupt),null);
});
test('a zero-energy legacy puzzle migrates into an awake interactive evening without changing the old book',()=>{
  const book={version:2,active:1,scenes:PET_LEVELS.map((_,i)=>createPet(i))},before=structuredClone(book);
  assert.equal(book.scenes[1].needs[3],0);
  const migrated=migratePetBook(book);assert.ok(migrated);assert.equal(migrated.needs[3],45);assert.deepEqual(migrated.needs.slice(0,3),[75,100,5]);assert.equal(migrated.pose,book.scenes[1].pose);
  for(const type of['food','water','play','rest'])assert.equal(migrated.care[type],book.scenes[1].actions[type]);
  assert.equal(migrated.asleep,false);assert.equal(petLifeAvailable(migrated,'play'),true);
  const continued=advancePetLife(migrated,10);assert.equal(continued.asleep,false);assert.equal(petLifeAvailable(continued,'play'),true);assert.equal(petLifeAction(continued,{type:'play'}).activity,'play');assert.deepEqual(book,before);
  const v3={...createPetLifeState(),needs:[62,58,55,10]};assert.equal(validatePetLifeSave(v3).needs[3],10,'Existing v3 energy is not raised by validation');
});
