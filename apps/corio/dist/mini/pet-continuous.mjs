import {PET_LEVELS as OLD_PET_LEVELS,validatePetSave} from './pet-care.mjs?v=0.23.2';

// A persistent pet, not a sequence of puzzles. Only explicit active time counts.
// These are game rates, not feeding quantities or real cat-care instructions.
export const PET_LIFE_KEY='corio-pet-life-v3';
export const PET_LIFE_VERSION=3;
export const PET_LIFE_DURATIONS=Object.freeze({eat:6,drink:4,play:6,pet:2});
export const PET_LIFE_RATES=Object.freeze({awake:Object.freeze([-.035,-.05,-.025,-.04]),asleep:Object.freeze([-.01,-.015,-.005,.32])});
export const PET_LIFE_MEMORIES=Object.freeze({
  'first-meal':'Первый ужин вместе',
  'first-drink':'Свежая вода',
  'first-play':'Первая игра',
  'first-nap':'Тихая передышка',
  'first-pet':'Первое поглаживание'
});
export const PET_LIFE_MESSAGES=Object.freeze({
  idle:'Кориолан рядом. Можно устроиться поудобнее.',
  food:'В миске свежий корм. Кот подойдёт, когда захочет.',
  water:'В поилке свежая вода. Кот попьёт, когда захочет.',
  eating:'Кориолан подошёл к миске.',
  drinking:'Кот подошёл попить.',
  ate:'Кот поел и устроился рядом.',
  drank:'Кориолан попил свежей воды.',
  playing:'Кот потянулся за игрушкой.',
  played:'Немного поиграли. Кориолан доволен.',
  petting:'Кориолан подставил голову под ладонь.',
  petted:'Коту приятно побыть рядом.',
  sleep:'Кориолан устроился поудобнее и задремал.',
  wake:'Кот проснулся и оглядывается.',
  asleep:'Кот спит. Пусть немного отдохнёт.',
  tired:'Кориолан устал. Лучше немного отдохнуть.',
  busy:'Кот сейчас занят. Можно немного подождать.',
  dim:'Свет стал мягче. Можно побыть в тишине.',
  warm:'В комнате снова горит тёплый свет.',
  migrated:'Кориолан снова рядом. Продолжим наш вечер.'
});
const memoryIds=Object.keys(PET_LIFE_MEMORIES),messageSet=new Set(Object.values(PET_LIFE_MESSAGES));
const careKeys=['food','water','play','pet','rest'];
const poses=['loaf','attentive','cautious','stretch','sleep'];
const activities=['idle','eat','drink','play','sleep','pet'];
const lastActions=[null,'food','water','play','rest'];
const stateKeys=['version','id','needs','bowls','asleep','pose','lastAction','activity','activityLeft','activeSeconds','affection','lamp','care','memories','message'];
const EPS=1e-8;
const MAX=Number.MAX_SAFE_INTEGER;
const clamp=(n,min=5,max=100)=>Math.max(min,Math.min(max,n));
const clean=n=>Math.abs(n)>=1e6?n:Math.round(n*1e9)/1e9;
const record=value=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&(Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null);
const exact=(value,keys)=>record(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const range=(value,min,max)=>typeof value==='number'&&Number.isFinite(value)&&value>=min&&value<=max;
const clone=state=>({...state,needs:[...state.needs],bowls:{...state.bowls},care:{...state.care},memories:[...state.memories]});
const addMemory=(state,id)=>{if(!state.memories.includes(id)&&state.memories.length<12)state.memories.push(id);};
const bump=(state,type)=>{state.care[type]=Math.min(MAX,state.care[type]+1);};
const love=(state,n)=>{state.affection=clamp(state.affection+n,0);};

export function createPetLifeState(){
  return{version:PET_LIFE_VERSION,id:'pet',needs:[62,58,55,76],bowls:{food:0,water:1},asleep:false,pose:'loaf',lastAction:null,activity:'idle',activityLeft:0,activeSeconds:0,affection:0,lamp:'warm',care:{food:0,water:0,play:0,pet:0,rest:0},memories:[],message:PET_LIFE_MESSAGES.idle};
}
function fallAsleep(state){
  state.asleep=true;state.activity='sleep';state.activityLeft=0;state.pose='sleep';state.lastAction='rest';state.message=PET_LIFE_MESSAGES.sleep;addMemory(state,'first-nap');
}
function wake(state){
  state.asleep=false;state.activity='idle';state.activityLeft=0;state.pose='attentive';state.lastAction='rest';state.message=PET_LIFE_MESSAGES.wake;
}
function begin(state,activity){
  state.activity=activity;state.activityLeft=PET_LIFE_DURATIONS[activity];
  state.pose=activity==='play'?'stretch':activity==='pet'?'attentive':'cautious';
  if(activity==='eat')state.lastAction='food';
  if(activity==='drink')state.lastAction='water';
  if(activity==='play')state.lastAction='play';
  state.message=PET_LIFE_MESSAGES[{eat:'eating',drink:'drinking',play:'playing',pet:'petting'}[activity]];
}
function finish(state){
  const type=state.activity;
  if(type==='eat'){
    if(state.bowls.food>0){state.bowls.food--;state.needs[0]=clamp(state.needs[0]+22);love(state,.5);addMemory(state,'first-meal');}
    state.message=PET_LIFE_MESSAGES.ate;
  }else if(type==='drink'){
    if(state.bowls.water>0){state.bowls.water--;state.needs[1]=clamp(state.needs[1]+30);love(state,.25);addMemory(state,'first-drink');}
    state.message=PET_LIFE_MESSAGES.drank;
  }else if(type==='play'){
    state.needs[2]=clamp(state.needs[2]+12);state.needs[3]=clamp(state.needs[3]-5);state.needs[1]=clamp(state.needs[1]-4);love(state,1);addMemory(state,'first-play');state.message=PET_LIFE_MESSAGES.played;
  }else if(type==='pet'){
    state.needs[2]=clamp(state.needs[2]+3);love(state,1);addMemory(state,'first-pet');state.message=PET_LIFE_MESSAGES.petted;
  }
  state.activity='idle';state.activityLeft=0;state.pose='loaf';
}
function settle(state){
  if(state.asleep){if(state.needs[3]>=90-EPS)wake(state);else return;}
  if(state.activity!=='idle')return;
  if(state.needs[3]<=25+EPS){fallAsleep(state);return;}
  if(state.needs[0]<=65+EPS&&state.bowls.food>0){begin(state,'eat');return;}
  if(state.needs[1]<=65+EPS&&state.bowls.water>0)begin(state,'drink');
}

export function advancePetLife(state,seconds){
  if(typeof seconds!=='number'||!Number.isFinite(seconds)||seconds<=0)return state;
  let remaining=Math.min(seconds,30);const next=clone(state);
  settle(next);
  while(remaining>EPS){
    const rates=next.asleep?PET_LIFE_RATES.asleep:PET_LIFE_RATES.awake;
    let dt=Math.min(remaining,1);
    if(next.activityLeft>EPS)dt=Math.min(dt,next.activityLeft);
    if(next.asleep&&next.needs[3]<90-EPS)dt=Math.min(dt,(90-next.needs[3])/rates[3]);
    else if(next.activity==='idle'){
      if(next.needs[3]>25+EPS)dt=Math.min(dt,(next.needs[3]-25)/-rates[3]);
      if(next.bowls.food>0&&next.needs[0]>65+EPS)dt=Math.min(dt,(next.needs[0]-65)/-rates[0]);
      if(next.bowls.water>0&&next.needs[1]>65+EPS)dt=Math.min(dt,(next.needs[1]-65)/-rates[1]);
    }
    next.needs=next.needs.map((n,i)=>clamp(n+rates[i]*dt));
    next.activeSeconds=Math.min(MAX,next.activeSeconds+dt);
    if(next.activityLeft>0){next.activityLeft=Math.max(0,next.activityLeft-dt);if(next.activityLeft<=EPS)finish(next);}
    remaining=Math.max(0,remaining-dt);
    settle(next);
  }
  next.needs=next.needs.map(clean);next.activeSeconds=clean(next.activeSeconds);next.activityLeft=clean(next.activityLeft);next.affection=clean(next.affection);
  return next;
}

export function petLifeAvailable(state,type){
  if(type==='food'||type==='water')return state.bowls[type]<3;
  if(type==='rest'||type==='light')return true;
  if(type==='play')return !state.asleep&&state.activity==='idle'&&state.needs[3]>=25;
  if(type==='pet')return !state.asleep&&state.activity==='idle';
  return false;
}
export function petLifeAction(state,action){
  const type=action?.type;
  if(!['food','water','play','rest','pet','light'].includes(type))return state;
  if((type==='food'||type==='water')&&!petLifeAvailable(state,type))return state;
  const next=clone(state);
  if(type==='food'||type==='water'){
    next.bowls[type]=3;bump(next,type);next.message=PET_LIFE_MESSAGES[type];return next;
  }
  if(type==='light'){
    next.lamp=next.lamp==='warm'?'dim':'warm';next.message=PET_LIFE_MESSAGES[next.lamp];return next;
  }
  if(type==='rest'){
    bump(next,'rest');if(next.asleep)wake(next);else fallAsleep(next);return next;
  }
  if(next.asleep){next.message=PET_LIFE_MESSAGES.asleep;return next;}
  if(next.activity!=='idle'){next.message=PET_LIFE_MESSAGES.busy;return next;}
  if(type==='play'&&next.needs[3]<25){next.message=PET_LIFE_MESSAGES.tired;return next;}
  bump(next,type);begin(next,type);return next;
}

export function validatePetLifeSave(value){
  try{
    if(!exact(value,stateKeys)||value.version!==PET_LIFE_VERSION||value.id!=='pet'||!Array.isArray(value.needs)||value.needs.length!==4||!value.needs.every(n=>range(n,5,100)))return null;
    if(!exact(value.bowls,['food','water'])||!Object.values(value.bowls).every(n=>Number.isInteger(n)&&range(n,0,3)))return null;
    if(typeof value.asleep!=='boolean'||!poses.includes(value.pose)||!lastActions.includes(value.lastAction)||!activities.includes(value.activity)||!range(value.activityLeft,0,10)||!range(value.activeSeconds,0,MAX)||!range(value.affection,0,100)||!['warm','dim'].includes(value.lamp)||!messageSet.has(value.message))return null;
    if(!exact(value.care,careKeys)||!Object.values(value.care).every(n=>Number.isSafeInteger(n)&&n>=0)||!Array.isArray(value.memories)||value.memories.length>12||new Set(value.memories).size!==value.memories.length||!value.memories.every(id=>memoryIds.includes(id)))return null;
    if(value.asleep!==(value.activity==='sleep')||value.asleep!==(value.pose==='sleep')||value.asleep&&value.lastAction!=='rest')return null;
    const duration=PET_LIFE_DURATIONS[value.activity];
    if(duration===undefined?value.activityLeft!==0:value.activityLeft<=0||value.activityLeft>duration)return null;
    if(value.activity==='eat'&&(value.bowls.food<1||value.pose!=='cautious'||value.lastAction!=='food'))return null;
    if(value.activity==='drink'&&(value.bowls.water<1||value.pose!=='cautious'||value.lastAction!=='water'))return null;
    if(value.activity==='play'&&(value.pose!=='stretch'||value.lastAction!=='play'))return null;
    if(value.activity==='pet'&&value.pose!=='attentive')return null;
    if(value.activity==='idle'&&(value.pose==='cautious'&&!['food','water'].includes(value.lastAction)||value.pose==='stretch'&&value.lastAction!=='play'||value.pose==='attentive'&&value.lastAction!=='rest'))return null;
    return clone(value);
  }catch{return null;}
}

// Read the previous five-scene book without changing it or keeping its levels.
// Current needs and known care counts survive; no absent time is manufactured.
export function migratePetBook(value){
  try{
    const book=typeof value==='string'?JSON.parse(value):value;
    if(!exact(book,['version','active','scenes'])||book.version!==2||!Number.isInteger(book.active)||book.active<0||book.active>=OLD_PET_LEVELS.length||!Array.isArray(book.scenes)||book.scenes.length!==OLD_PET_LEVELS.length)return null;
    const scenes=book.scenes.map((scene,index)=>{const valid=validatePetSave(scene);return valid?.index===index?valid:null;});
    if(scenes.some(scene=>!scene))return null;
    const old=scenes[book.active],next=createPetLifeState();
    next.needs=old.needs.map(n=>clamp(n*25));
    // Old puzzle openings used zero energy as a prerequisite. Give the new
    // continuous pet a gentle first evening instead of inheriting that setup.
    next.needs[3]=Math.max(45,next.needs[3]);next.pose=old.pose;next.lastAction=old.lastAction;
    for(const type of ['food','water','play','rest'])next.care[type]=old.actions[type];
    next.bowls.food=old.actions.food>0?1:0;next.bowls.water=old.actions.water>0?2:1;
    next.asleep=old.pose==='sleep';next.activity=next.asleep?'sleep':'idle';next.activityLeft=0;
    next.affection=Math.min(20,(old.actions.food+old.actions.play+old.actions.rest)*.5);
    for(const [type,id]of [['food','first-meal'],['water','first-drink'],['play','first-play'],['rest','first-nap']])if(old.actions[type]>0)addMemory(next,id);
    next.message=PET_LIFE_MESSAGES.migrated;
    return validatePetLifeSave(next);
  }catch{return null;}
}
