// Five authored evenings. Only player actions change the cat; there is no clock.
// Numbers describe game state, not real feeding portions or veterinary advice.
const freeze=value=>{if(value&&typeof value==='object'){for(const item of Object.values(value))freeze(item);Object.freeze(value);}return value;};
export const PET_SAVE_KEY='corio-pet-care-v2';
export const PET_BEST_KEY='corio-pet-care-best-v2';
export const PET_SAVE_MAX_ACTIONS=4096;
export const PET_ACTIONS=freeze({
  food:{name:'Покормить',effect:[2,0,0,0]},
  water:{name:'Обновить воду',effect:[0,3,0,0]},
  play:{name:'Поиграть',effect:[0,-1,2,-1]},
  rest:{name:'Устроить передышку',effect:[0,0,0,3]}
});
export const PET_LEVELS=freeze([
  {
    name:'Вода и ужин',
    intro:'Кориолан подошёл к мискам. В одной пусто, а воду пора обновить.',
    needs:[1,1,4,4],
    goals:[
      {id:'dinner',text:'Наполнить миску',need:0,min:3,action:'food',count:1},
      {id:'water',text:'Налить свежую воду',need:1,min:3,action:'water',count:1}
    ],
    solution:['food','water'],metrics:{referenceMoves:2}
  },
  {
    name:'Сначала передышка',
    intro:'Игрушка уже рядом, но кот устал. Сначала дайте ему отдохнуть.',
    needs:[3,4,0,0],
    goals:[
      {id:'rest',text:'Дать коту передышку',action:'rest',count:1},
      {id:'play',text:'Поиграть два раза',need:2,min:3,action:'play',count:2},
      {id:'energy',text:'Оставить силы после игры',need:3,min:1}
    ],
    solution:['rest','play','play'],metrics:{referenceMoves:3}
  },
  {
    name:'После погони',
    intro:'Кот наигрался и проголодался. Устройте ужин, обновите воду и помогите ему улечься.',
    needs:[0,0,3,0],
    goals:[
      {id:'dinner',text:'Приготовить ужин',need:0,min:3,action:'food',count:2},
      {id:'water',text:'Обновить воду',need:1,min:3,action:'water',count:1},
      {id:'sleep',text:'Закончить вечер отдыхом',need:3,min:3,action:'rest',count:1,lastAction:'rest'}
    ],
    solution:['food','food','water','rest'],metrics:{referenceMoves:4}
  },
  {
    name:'Дождь за окном',
    intro:'На улице дождь, а дома ждут миска, игрушка и тёплый коврик. Чередуйте игру с отдыхом.',
    needs:[1,2,0,1],
    goals:[
      {id:'dinner',text:'Покормить кота',need:0,min:3,action:'food',count:1},
      {id:'play',text:'Поиграть два раза',need:2,min:3,action:'play',count:2},
      {id:'water',text:'Оставить свежую воду',need:1,min:3,action:'water',count:1},
      {id:'rest',text:'Дать передышку между делами',need:3,min:2,action:'rest',count:1}
    ],
    solution:['food','rest','play','play','water'],metrics:{referenceMoves:5}
  },
  {
    name:'Пора спать',
    intro:'Последняя игра перед сном. Пусть у кота останутся ужин, вода и спокойное место для отдыха.',
    needs:[0,1,0,1],
    goals:[
      {id:'dinner',text:'Приготовить ужин',need:0,min:3,action:'food',count:2},
      {id:'play',text:'Поиграть перед сном',need:2,min:3,action:'play',count:2},
      {id:'water',text:'Оставить свежую воду',need:1,min:3,action:'water',count:1},
      {id:'sleep',text:'Уложить довольного кота',need:3,min:3,action:'rest',count:2,lastAction:'rest'}
    ],
    solution:['rest','play','play','food','food','water','rest'],metrics:{referenceMoves:7}
  }
]);
const poses=freeze({food:'cautious',water:'cautious',play:'stretch',rest:'sleep'});
const acceptedMessages=freeze({
  food:'Кориолан поел. Теперь можно побыть рядом.',
  water:'В поилке свежая вода. Кот подошёл попить.',
  play:'Кот потянулся за игрушкой. После игры хочется пить и отдыхать.',
  rest:'Кориолан устроился поудобнее и отдыхает.'
});
const blockedMessages=freeze({
  food:'Кот уже сыт. Можно поиграть или отдохнуть.',
  water:'В поилке уже есть свежая вода.',
  play:'Кот устал. Сначала нужна передышка.',
  rest:'Кот уже отдохнул. Можно заняться чем-нибудь ещё.'
});
const wonMessage='Кот устроился поудобнее. Хороший вечер.';
const actionKeys=Object.keys(PET_ACTIONS);
const knownMessages=new Set([...Object.values(acceptedMessages),...Object.values(blockedMessages),...PET_LEVELS.map(level=>level.intro),wonMessage]);
const stateKeys=['id','index','moves','won','message','needs','pose','lastAction','actions','trace'];
const isRecord=value=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&(Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null);
const exactKeys=(value,keys)=>isRecord(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const validIndex=index=>Number.isInteger(index)&&index>=0&&index<PET_LEVELS.length;

export function petGoals(state){
  return PET_LEVELS[state.index].goals.map(goal=>({...goal,done:
    (goal.need===undefined||state.needs[goal.need]>=goal.min)&&
    (goal.action===undefined||state.actions[goal.action]>=goal.count)&&
    (goal.lastAction===undefined||state.lastAction===goal.lastAction)
  }));
}
export function createPet(index=0){
  if(!validIndex(index))throw new RangeError('Unknown pet evening');
  return{id:'pet',index,moves:0,won:false,message:PET_LEVELS[index].intro,needs:[...PET_LEVELS[index].needs],pose:'loaf',lastAction:null,actions:{food:0,water:0,play:0,rest:0},trace:[]};
}
export function petAvailable(state,type){
  if(!Object.hasOwn(PET_ACTIONS,type)||state.won)return false;
  return type==='food'?state.needs[0]<4:type==='water'?state.needs[1]<4:type==='play'?state.needs[3]>0:state.needs[3]<4;
}
function transition(state,type,record){
  const next={...state,moves:state.moves+1,needs:state.needs.map((n,i)=>Math.max(0,Math.min(4,n+PET_ACTIONS[type].effect[i]))),pose:poses[type],lastAction:type,actions:{...state.actions,[type]:state.actions[type]+1},trace:record?[...state.trace,type]:state.trace,message:acceptedMessages[type]};
  next.won=petGoals(next).every(goal=>goal.done);
  if(next.won){next.pose=type==='rest'?'sleep':'loaf';next.message=wonMessage;}
  return next;
}
export function petAction(state,action){
  const type=action?.type;
  if(state.won||!Object.hasOwn(PET_ACTIONS,type))return state;
  if(!petAvailable(state,type))return state.message===blockedMessages[type]?state:{...state,message:blockedMessages[type]};
  return transition(state,type,true);
}
export function petSolution(index=0){
  if(!validIndex(index))throw new RangeError('Unknown pet evening');
  return PET_LEVELS[index].solution.map(type=>({type}));
}

// Save the complete reducer state as JSON under PET_SAVE_KEY. Validation never
// advances time: replaying accepted actions reconstructs counters and victory.
// A last unavailable tap may change only its whitelisted message, not gameplay.
// The generous input-size bound protects loading from a corrupted megabyte log;
// it does not limit actions in petAction or the game's calm mode.
export function validatePetSave(value){
  try{
    if(!exactKeys(value,stateKeys)||value.id!=='pet'||!validIndex(value.index)||!Array.isArray(value.trace)||value.trace.length>PET_SAVE_MAX_ACTIONS)return null;
    if(!Array.isArray(value.needs)||value.needs.length!==4||!value.needs.every(n=>Number.isInteger(n)&&n>=0&&n<=4))return null;
    if(!Number.isSafeInteger(value.moves)||value.moves<0||value.moves!==value.trace.length||typeof value.won!=='boolean'||!knownMessages.has(value.message))return null;
    if(!exactKeys(value.actions,actionKeys)||!actionKeys.every(type=>Number.isSafeInteger(value.actions[type])&&value.actions[type]>=0)||!['loaf','cautious','stretch','sleep'].includes(value.pose)||!(value.lastAction===null||actionKeys.includes(value.lastAction)))return null;
    let replay=createPet(value.index);
    for(const type of value.trace){if(typeof type!=='string'||!petAvailable(replay,type))return null;replay=transition(replay,type,false);}
    if(replay.moves!==value.moves||replay.won!==value.won||replay.pose!==value.pose||replay.lastAction!==value.lastAction||!replay.needs.every((n,i)=>n===value.needs[i])||!actionKeys.every(type=>replay.actions[type]===value.actions[type]))return null;
    const notice=Object.entries(blockedMessages).some(([type,message])=>value.message===message&&!petAvailable(replay,type)&&!replay.won);
    if(value.message!==replay.message&&!notice)return null;
    return{...replay,message:value.message,trace:[...value.trace]};
  }catch{return null;}
}
