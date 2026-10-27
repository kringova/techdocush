import {PET_LIFE_MEMORIES,PET_LIFE_MESSAGES,PET_LIFE_RATES,createPetLifeState,validatePetLifeSave} from './pet-continuous.mjs?v=0.25.0';

// Fictional balancing for an active, continuous home. There is no absent time,
// medical model, feeding recommendation, death, level or victory condition.
export const PET_HOME_KEY='corio-pet-home-v4';
export const PET_HOME_VERSION=4;
export const PET_HOME_DURATIONS=Object.freeze({eat:6,drink:4,play:6,tease:6,pet:2,brush:4,treat:3,scratch:5,litter:6,grumble:4,queasy:6});
export const PET_HOME_RATES=PET_LIFE_RATES;
export const PET_HOME_BALANCE=Object.freeze({petDecay:.05,petThreshold:2.5,handsCooldown:25,treatDecay:.025,treatThreshold:2.7,queasySeconds:60,litterInterval:120});
export const PET_HOME_MEMORIES=Object.freeze({...PET_LIFE_MEMORIES,
 'first-tease':'Игра с дразнилкой',
 'first-brush':'Мягкая щётка',
 'first-treat':'Кошачье лакомство',
 'first-scratch':'Своя когтеточка',
 'first-scoop':'Чистый лоток',
 'first-litter':'Привычный уголок'
});
export const PET_HOME_MESSAGES=Object.freeze({...PET_LIFE_MESSAGES,
 teasing:'Кориолан следит за дразнилкой.',
 teased:'Дразнилка поймана. Кот доволен игрой.',
 brushing:'Щётка мягко проходит по шерсти.',
 brushed:'Кориолан довольно устроился после щётки.',
 treating:'Кориолан пробует кошачье лакомство.',
 treated:'Лакомство съедено. Можно побыть рядом.',
 scratching:'Кот тянется у когтеточки.',
 scratched:'Кориолан поточил когти и потянулся.',
 littering:'Кориолан отошёл к лотку.',
 littered:'Кот вернулся из своего уголка.',
 scooped:'В лотке стало чище.',
 grumble:'Кот отвернулся. Давай дадим ему немного пространства.',
 hands:'Кориолану пока не хочется прикосновений.',
 queasy:'От частых лакомств коту стало нехорошо. Дадим ему спокойно отдохнуть.',
 recovering:'С лакомствами пока подождём. Пусть кот отдохнёт.',
 migrated:'Кориолан снова дома. Наш вечер продолжается.'
});
const EPS=1e-8,MAX=Number.MAX_SAFE_INTEGER;
const CARE_KEYS=['food','water','play','pet','rest','tease','brush','treat','scratch','scoop'];
const LAST_ACTIONS=[null,'food','water','play','pet','rest','tease','brush','treat','scratch','litter'];
const POSES=['loaf','attentive','cautious','stretch','sleep','lookback'];
const ACTIVITIES=['idle','sleep',...Object.keys(PET_HOME_DURATIONS)];
const STATE_KEYS=['version','id','needs','bowls','asleep','pose','lastAction','activity','activityLeft','activeSeconds','affection','lamp','care','memories','message','petLoad','handsCooldown','treatLoad','queasyLeft','litter'];
const MESSAGE_SET=new Set([...Object.values(PET_LIFE_MESSAGES),...Object.values(PET_HOME_MESSAGES)]),MEMORY_IDS=Object.keys(PET_HOME_MEMORIES);
const clamp=(n,min=5,max=100)=>Math.max(min,Math.min(max,n));
const clean=n=>Math.abs(n)>=1e6?n:Math.round(n*1e9)/1e9;
const record=value=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&(Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null);
const exact=(value,keys)=>record(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const range=(value,min,max)=>typeof value==='number'&&Number.isFinite(value)&&value>=min&&value<=max;
const clone=state=>({...state,needs:[...state.needs],bowls:{...state.bowls},care:{...state.care},memories:[...state.memories],litter:{...state.litter,slots:[...state.litter.slots]}});
const bump=(state,type)=>{state.care[type]=Math.min(MAX,state.care[type]+1);};
const love=(state,n)=>{state.affection=clamp(state.affection+n,0);};
const memory=(state,id)=>{if(!state.memories.includes(id)&&state.memories.length<12)state.memories.push(id);};

export function createPetHomeState(){
 const state=createPetLifeState();
 return{...state,version:PET_HOME_VERSION,care:{...state.care,tease:0,brush:0,treat:0,scratch:0,scoop:0},petLoad:0,handsCooldown:0,treatLoad:0,queasyLeft:0,litter:{slots:[true,false,false,false],nextIn:PET_HOME_BALANCE.litterInterval,cursor:1,pending:false}};
}
function idlePose(state){return state.queasyLeft>EPS?'cautious':state.handsCooldown>EPS?'lookback':'loaf';}
function fallAsleep(state){
 state.asleep=true;state.activity='sleep';state.activityLeft=0;state.pose='sleep';state.lastAction='rest';state.message=PET_HOME_MESSAGES.sleep;memory(state,'first-nap');
}
function wake(state){
 state.asleep=false;state.activity='idle';state.activityLeft=0;state.pose=state.queasyLeft>EPS||state.handsCooldown>EPS?idlePose(state):'attentive';state.lastAction='rest';state.message=PET_HOME_MESSAGES.wake;
}
function begin(state,activity){
 state.activity=activity;state.activityLeft=PET_HOME_DURATIONS[activity];
 state.pose={play:'stretch',tease:'stretch',scratch:'stretch',pet:'attentive',brush:'loaf',grumble:'lookback'}[activity]||'cautious';
 const action={eat:'food',drink:'water',grumble:'pet',queasy:'treat'}[activity]||activity;
 state.lastAction=action;
 state.message=PET_HOME_MESSAGES[{eat:'eating',drink:'drinking',play:'playing',tease:'teasing',pet:'petting',brush:'brushing',treat:'treating',scratch:'scratching',litter:'littering',grumble:'grumble',queasy:'queasy'}[activity]];
}
function finish(state){
 const activity=state.activity;
 if(activity==='eat'){
  if(state.bowls.food>0){state.bowls.food--;state.needs[0]=clamp(state.needs[0]+22);love(state,.5);memory(state,'first-meal');}state.message=PET_HOME_MESSAGES.ate;
 }else if(activity==='drink'){
  if(state.bowls.water>0){state.bowls.water--;state.needs[1]=clamp(state.needs[1]+30);love(state,.25);memory(state,'first-drink');}state.message=PET_HOME_MESSAGES.drank;
 }else if(activity==='play'||activity==='tease'){
  const tease=activity==='tease';state.needs[2]=clamp(state.needs[2]+(tease?14:12));state.needs[3]=clamp(state.needs[3]-(tease?7:5));state.needs[1]=clamp(state.needs[1]-(tease?5:4));love(state,1);memory(state,tease?'first-tease':'first-play');state.message=PET_HOME_MESSAGES[tease?'teased':'played'];
 }else if(activity==='pet'){
  state.petLoad=Math.min(3,state.petLoad+1);
  if(state.petLoad>=PET_HOME_BALANCE.petThreshold-EPS){state.petLoad=PET_HOME_BALANCE.petThreshold;state.handsCooldown=PET_HOME_BALANCE.handsCooldown;begin(state,'grumble');return;}
  state.needs[2]=clamp(state.needs[2]+3);love(state,1);memory(state,'first-pet');state.message=PET_HOME_MESSAGES.petted;
 }else if(activity==='brush'){
  state.petLoad=Math.max(0,state.petLoad-.5);state.needs[2]=clamp(state.needs[2]+2);love(state,1.5);memory(state,'first-brush');state.message=PET_HOME_MESSAGES.brushed;
 }else if(activity==='treat'){
  state.treatLoad=Math.min(3,state.treatLoad+1);
  if(state.treatLoad>=PET_HOME_BALANCE.treatThreshold-EPS){state.queasyLeft=PET_HOME_BALANCE.queasySeconds;state.needs[2]=clamp(state.needs[2]-12);state.needs[3]=clamp(state.needs[3]-8);begin(state,'queasy');return;}
  state.needs[0]=clamp(state.needs[0]+3);state.needs[2]=clamp(state.needs[2]+2);love(state,.25);memory(state,'first-treat');state.message=PET_HOME_MESSAGES.treated;
 }else if(activity==='scratch'){
  state.needs[2]=clamp(state.needs[2]+9);state.needs[3]=clamp(state.needs[3]-2);state.needs[1]=clamp(state.needs[1]-1);memory(state,'first-scratch');state.message=PET_HOME_MESSAGES.scratched;
 }else if(activity==='litter'){
  const slot=Array.from({length:4},(_,i)=>(state.litter.cursor+i)%4).find(index=>!state.litter.slots[index]);
  if(slot===undefined){state.litter.pending=true;state.litter.nextIn=0;}
  else{state.litter.slots[slot]=true;state.litter.cursor=(slot+1)%4;state.litter.pending=false;state.litter.nextIn=PET_HOME_BALANCE.litterInterval;memory(state,'first-litter');}
  state.message=PET_HOME_MESSAGES.littered;
 }
 state.activity='idle';state.activityLeft=0;state.pose=idlePose(state);
}
function settle(state){
 if(state.litter.nextIn<=EPS){state.litter.nextIn=0;state.litter.pending=true;}
 if(state.asleep){if(state.needs[3]>=90-EPS)wake(state);else return;}
 if(state.activity!=='idle')return;
 if(state.needs[3]<=25+EPS){fallAsleep(state);return;}
 if(state.litter.pending&&state.litter.slots.some(slot=>!slot)){begin(state,'litter');return;}
 if(state.queasyLeft<=EPS&&state.needs[0]<=65+EPS&&state.bowls.food>0){begin(state,'eat');return;}
 if(state.needs[1]<=65+EPS&&state.bowls.water>0){begin(state,'drink');return;}
 if(state.queasyLeft>EPS||state.handsCooldown>EPS||state.pose==='lookback'||state.pose==='cautious'&&state.lastAction==='treat')state.pose=idlePose(state);
}

export function advancePetHome(state,seconds){
 if(typeof seconds!=='number'||!Number.isFinite(seconds)||seconds<=0)return state;
 let remaining=Math.min(seconds,30);const next=clone(state);settle(next);
 while(remaining>EPS){
  const rates=next.asleep?PET_HOME_RATES.asleep:PET_HOME_RATES.awake;let dt=Math.min(remaining,1);
  if(next.activityLeft>EPS)dt=Math.min(dt,next.activityLeft);
  for(const counter of [next.handsCooldown,next.queasyLeft,next.litter.nextIn])if(counter>EPS)dt=Math.min(dt,counter);
  if(next.asleep&&next.needs[3]<90-EPS)dt=Math.min(dt,(90-next.needs[3])/rates[3]);
  else if(next.activity==='idle'){
   if(next.needs[3]>25+EPS)dt=Math.min(dt,(next.needs[3]-25)/-rates[3]);
   if(next.queasyLeft<=EPS&&next.bowls.food>0&&next.needs[0]>65+EPS)dt=Math.min(dt,(next.needs[0]-65)/-rates[0]);
   if(next.bowls.water>0&&next.needs[1]>65+EPS)dt=Math.min(dt,(next.needs[1]-65)/-rates[1]);
  }
  next.needs=next.needs.map((n,i)=>clamp(n+rates[i]*dt));next.activeSeconds=Math.min(MAX,next.activeSeconds+dt);
  next.petLoad=Math.max(0,next.petLoad-PET_HOME_BALANCE.petDecay*dt);next.treatLoad=Math.max(0,next.treatLoad-PET_HOME_BALANCE.treatDecay*dt);
  next.handsCooldown=Math.max(0,next.handsCooldown-dt);next.queasyLeft=Math.max(0,next.queasyLeft-dt);next.litter.nextIn=Math.max(0,next.litter.nextIn-dt);
  if(next.activityLeft>0){next.activityLeft=Math.max(0,next.activityLeft-dt);if(next.activityLeft<=EPS)finish(next);}
  remaining=Math.max(0,remaining-dt);settle(next);
 }
 next.needs=next.needs.map(clean);for(const key of ['activeSeconds','activityLeft','affection','petLoad','handsCooldown','treatLoad','queasyLeft'])next[key]=clean(next[key]);next.litter.nextIn=clean(next.litter.nextIn);return next;
}

export function petHomeAvailable(state,type,index){
 if(type==='food'||type==='water')return state.bowls[type]<3;
 if(type==='rest'||type==='light')return true;
 if(type==='scoop')return state.activity!=='litter'&&(index===undefined?state.litter.slots.some(Boolean):Number.isInteger(index)&&index>=0&&index<4&&state.litter.slots[index]);
 if(!['play','tease','pet','brush','treat','scratch'].includes(type)||state.asleep||state.activity!=='idle')return false;
 if(type==='play'||type==='tease'||type==='scratch')return state.needs[3]>=25&&state.queasyLeft<=EPS;
 if(type==='pet')return state.handsCooldown<=EPS&&state.petLoad<PET_HOME_BALANCE.petThreshold-EPS;
 if(type==='brush')return state.handsCooldown<=EPS;
 return state.queasyLeft<=EPS&&state.treatLoad<PET_HOME_BALANCE.treatThreshold-EPS;
}
export function petHomeAction(state,action){
 const type=action?.type,index=action?.index;
 if(!['food','water','play','rest','pet','light','tease','brush','treat','scratch','scoop'].includes(type))return state;
 if(type==='scoop'&&!petHomeAvailable(state,type,index)||type==='scoop'&&index===undefined)return state;
 if((type==='food'||type==='water')&&!petHomeAvailable(state,type))return state;
 const next=clone(state);
 if(type==='food'||type==='water'){next.bowls[type]=3;bump(next,type);next.message=PET_HOME_MESSAGES[type];return next;}
 if(type==='light'){next.lamp=next.lamp==='warm'?'dim':'warm';next.message=PET_HOME_MESSAGES[next.lamp];return next;}
 if(type==='scoop'){next.litter.slots[index]=false;bump(next,'scoop');love(next,.25);memory(next,'first-scoop');next.message=PET_HOME_MESSAGES.scooped;return next;}
 if(type==='rest'){bump(next,'rest');if(next.asleep)wake(next);else fallAsleep(next);return next;}
 if(!petHomeAvailable(state,type)){
  next.message=next.asleep?PET_HOME_MESSAGES.asleep:next.activity!=='idle'?PET_HOME_MESSAGES.busy:(type==='pet'||type==='brush')?PET_HOME_MESSAGES.hands:next.queasyLeft>EPS||type==='treat'?PET_HOME_MESSAGES.recovering:PET_HOME_MESSAGES.tired;return next;
 }
 bump(next,type);begin(next,type);return next;
}

export function validatePetHomeSave(value){
 try{
  if(!exact(value,STATE_KEYS)||value.version!==PET_HOME_VERSION||value.id!=='pet'||!Array.isArray(value.needs)||value.needs.length!==4||!value.needs.every(n=>range(n,5,100)))return null;
  if(!exact(value.bowls,['food','water'])||!Object.values(value.bowls).every(n=>Number.isInteger(n)&&range(n,0,3)))return null;
  if(typeof value.asleep!=='boolean'||!POSES.includes(value.pose)||!LAST_ACTIONS.includes(value.lastAction)||!ACTIVITIES.includes(value.activity)||!range(value.activityLeft,0,10)||!range(value.activeSeconds,0,MAX)||!range(value.affection,0,100)||!['warm','dim'].includes(value.lamp)||!MESSAGE_SET.has(value.message))return null;
  if(!exact(value.care,CARE_KEYS)||!Object.values(value.care).every(n=>Number.isSafeInteger(n)&&n>=0)||!Array.isArray(value.memories)||value.memories.length>12||new Set(value.memories).size!==value.memories.length||!value.memories.every(id=>MEMORY_IDS.includes(id)))return null;
  if(!range(value.petLoad,0,3)||!range(value.handsCooldown,0,PET_HOME_BALANCE.handsCooldown)||!range(value.treatLoad,0,3)||!range(value.queasyLeft,0,PET_HOME_BALANCE.queasySeconds))return null;
  if(!exact(value.litter,['slots','nextIn','cursor','pending'])||!Array.isArray(value.litter.slots)||value.litter.slots.length!==4||!value.litter.slots.every(slot=>typeof slot==='boolean')||!range(value.litter.nextIn,0,PET_HOME_BALANCE.litterInterval)||!Number.isInteger(value.litter.cursor)||value.litter.cursor<0||value.litter.cursor>3||typeof value.litter.pending!=='boolean'||value.litter.pending!==(value.litter.nextIn<=EPS))return null;
  if(value.asleep!==(value.activity==='sleep')||value.asleep!==(value.pose==='sleep')||value.asleep&&value.lastAction!=='rest')return null;
  const duration=PET_HOME_DURATIONS[value.activity];if(duration===undefined?value.activityLeft!==0:value.activityLeft<=0||value.activityLeft>duration)return null;
  const pose={eat:'cautious',drink:'cautious',play:'stretch',tease:'stretch',pet:'attentive',brush:'loaf',treat:'cautious',scratch:'stretch',litter:'cautious',grumble:'lookback',queasy:'cautious'}[value.activity];
  if(pose&&value.pose!==pose)return null;
  const last={eat:'food',drink:'water',play:'play',tease:'tease',brush:'brush',treat:'treat',scratch:'scratch',litter:'litter',grumble:'pet',queasy:'treat'}[value.activity];if(last&&value.lastAction!==last)return null;
  if(value.activity==='eat'&&value.bowls.food<1||value.activity==='drink'&&value.bowls.water<1||value.activity==='grumble'&&value.handsCooldown<=0||value.activity==='queasy'&&value.queasyLeft<=0||value.activity==='litter'&&(!value.litter.pending||value.litter.slots.every(Boolean)))return null;
  if(value.activity==='idle'&&value.pose==='attentive'&&value.lastAction!=='rest')return null;
  return clone(value);
 }catch{return null;}
}

export function migratePetLifeV3(value){
 try{
  const old=validatePetLifeSave(typeof value==='string'?JSON.parse(value):value);if(!old)return null;
  const state=createPetHomeState();
  for(const key of ['needs','bowls','asleep','pose','lastAction','activity','activityLeft','activeSeconds','affection','lamp','memories','message'])state[key]=old[key];
  state.care={...state.care,...old.care};return validatePetHomeSave(state);
 }catch{return null;}
}
