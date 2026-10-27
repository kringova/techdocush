import {GROOMING_LEVELS as groomingLevels} from './grooming-data.mjs?v=0.20.0';
import {LITTER_LEVELS as litterLevels} from './litter-data.mjs?v=0.20.0';
import {tunnelEdges,traceTunnelRoute,connectedRoute} from './tunnel-route.mjs?v=0.20.0';
export {tunnelEdges,traceTunnelRoute,connectedRoute};
import {TUNNEL_LEVELS} from './tunnel-data.mjs?v=0.20.0';
import {SEARCH_LEVELS,SEARCH_SCENES} from './search-data.mjs?v=0.20.0';
import {FOOD_LEVELS,FOOD_PILE_ASPECT,foodIsExposed} from './food-data.mjs?v=0.20.0';
import {YARN_LEVELS,YARN_ANCHOR,YARN_POINT_SPACING} from './yarn-data.mjs?v=0.20.0';
export {FOOD_LEVELS,FOOD_PILE_ASPECT,foodIsExposed};
// Original short scenarios for comparing mechanics. No clocks or offline decay.
const copy=value=>structuredClone(value);
export const FOODS={
  dry:{name:'Кошачий корм',safe:true,why:'Это корм для кошек. Его отправляют коту.',icon:'kibble'},
  wet:{name:'Влажный корм',safe:true,why:'Это корм для кошек. Его отправляют коту.',icon:'can'},
  treat:{name:'Кошачье лакомство',safe:true,why:'Это лакомство для кошек. Его отправляют коту.',icon:'treat'},
  water:{name:'Питьевая вода',safe:true,why:'Свежая вода нужна всегда. Ей место в отдельной поилке.',icon:'water'},
  chicken:{name:'Готовая курица',displayName:'Готовая курица без соли и костей',detail:'Без соли, приправ и костей',safe:true,why:'Эта курица полностью приготовлена, без соли, приправ и костей. Её можно отправить коту.',icon:'chicken'},
  chocolate:{name:'Тёмный шоколад',safe:false,why:'Шоколад опасен для кошек.',icon:'chocolate'},
  onion:{name:'Лук',safe:false,why:'Лук может повреждать клетки крови.',icon:'onion'},
  garlic:{name:'Чеснок',safe:false,why:'Чеснок опасен для кошек.',icon:'garlic'},
  coffee:{name:'Кофе',safe:false,why:'Кофеин опасен для кота.',icon:'coffee'},
  bone:{name:'Кость',safe:false,why:'Костью можно подавиться или травмироваться.',icon:'bone'},
  raw:{name:'Сырое мясо',safe:false,why:'Может содержать опасные бактерии.',icon:'raw'},
  candy:{name:'Конфета',safe:false,why:'Обычная конфета не подходит для кошачьей миски.',icon:'candy'},
  coffeeBeans:{name:'Кофейные зёрна',safe:false,why:'Кофеин опасен для кошек.',icon:'coffeeBeans'},
  leek:{name:'Лук-порей',safe:false,why:'Порей, как лук и чеснок, может повреждать клетки крови кошки.',icon:'leek'},
  dough:{name:'Сырое дрожжевое тесто',safe:false,why:'Тесто может разбухать в желудке, а при брожении образуется алкоголь.',icon:'dough'},
  tea:{name:'Чёрный чай',safe:false,why:'В чёрном чае есть кофеин, опасный для кошек.',icon:'tea'},
  grapes:{name:'Виноград',safe:false,why:'Кошкам не дают виноград. Его убираем из миски.',icon:'grapes'},
  treatStick:{name:'Кошачье лакомство: палочка',safe:true,why:'Это лакомство для кошек. Его отправляют коту.',icon:'treatStick'},
  treatPillow:{name:'Кошачье лакомство: подушечки',safe:true,why:'Это лакомство для кошек. Его отправляют коту.',icon:'treatPillow'},
  treatJerky:{name:'Кошачье лакомство: сушёные кусочки',safe:true,why:'Это лакомство для кошек. Его отправляют коту.',icon:'treatJerky'},
  treatPaste:{name:'Кошачье лакомство: пюре',safe:true,why:'Это лакомство для кошек. Его отправляют коту.',icon:'treatPaste'}
};
const petLevels=[
  {name:'Вода и ужин',needs:[1,1,4,4]},
  {name:'Хочется поиграть',needs:[3,3,0,3]},
  {name:'После игры',needs:[1,1,4,1]},
  {name:'Дождливый вечер',needs:[2,2,1,2]},
  {name:'Собираемся спать',needs:[1,1,1,1]}
];
export const PET_ACTIONS={food:{name:'Порция корма',effect:[2,-1,0,0]},water:{name:'Свежая вода',effect:[0,3,0,0]},play:{name:'Поиграть',effect:[-1,-1,2,-1]},rest:{name:'Отдохнуть',effect:[-1,0,-1,3]}};
export const GROOM_STEPS={dust:['wipe',null],tangle:['brush',null],mud:['water','soapy'],soapy:['soap','foam'],foam:['rinse','wet'],wet:['towel',null]};
export const GROOM_TOOLS={wipe:'Тканевая салфетка',brush:'Щётка',water:'Тёплая вода',soap:'Шампунь для кошек',rinse:'Смыть пену',towel:'Полотенце',pause:'Передышка'};
const orient=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
const onSegment=(a,b,p)=>Math.abs(orient(a,b,p))<.01&&p.x>=Math.min(a.x,b.x)-.01&&p.x<=Math.max(a.x,b.x)+.01&&p.y>=Math.min(a.y,b.y)-.01&&p.y<=Math.max(a.y,b.y)+.01;
export function yarnConflicts(points,edges){
  const bad=new Set();
  for(let i=0;i<edges.length;i++){
    const [a,b]=edges[i];if(Math.hypot(points[a].x-points[b].x,points[a].y-points[b].y)<.01)bad.add(i);
  }
  for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++){
    const [a,b]=edges[i],[c,d]=edges[j],shared=[a,b].find(v=>v===c||v===d);
    if(shared!==undefined){
      const p=points[shared],q=points[a===shared?b:a],r=points[c===shared?d:c];
      // Adjacent segments may meet, but folding straight back over the same
      // portion of thread is an overlap rather than an untangled shortcut.
      if(onSegment(p,q,r)||onSegment(p,r,q)){bad.add(i);bad.add(j);}continue;
    }
    const p=points[a],q=points[b],r=points[c],s=points[d];
    if(orient(p,q,r)*orient(p,q,s)<0&&orient(r,s,p)*orient(r,s,q)<0||onSegment(p,q,r)||onSegment(p,q,s)||onSegment(r,s,p)||onSegment(r,s,q)){bad.add(i);bad.add(j);}
  }
  for(let i=0;i<points.length;i++)for(let j=0;j<edges.length;j++)if(!edges[j].includes(i)&&onSegment(points[edges[j][0]],points[edges[j][1]],points[i]))bad.add(j);
  return [...bad];
}
export function yarnCrossings(points,edges){
  const crossings=[];
  for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++){
    const [a,b]=edges[i],[c,d]=edges[j];if([a,b].some(v=>v===c||v===d))continue;
    const p=points[a],q=points[b],r=points[c],s=points[d];
    if(orient(p,q,r)*orient(p,q,s)>=0||orient(r,s,p)*orient(r,s,q)>=0)continue;
    const vx=q.x-p.x,vy=q.y-p.y,wx=s.x-r.x,wy=s.y-r.y;
    const t=((r.x-p.x)*wy-(r.y-p.y)*wx)/(vx*wy-vy*wx);
    crossings.push({x:p.x+t*vx,y:p.y+t*vy,under:i,over:j});
  }return crossings;
}
export const GAMES={
  search:{title:'Куда пропало?',levels:SEARCH_LEVELS,rule:'Найди предметы из списка. Приближай сцену кнопкой «+» и передвигай её, чтобы рассмотреть детали.'},
  tunnels:{title:'Настенная трасса',levels:TUNNEL_LEVELS,rule:'Поворачивай тоннели. Проведи кота к лакомству через все колокольчики. Полки и гамаки закреплены.'},
  food:{title:'Что в миске?',levels:FOOD_LEVELS,rule:'Выбери открытый продукт в миске, затем отправь его в подходящую зону. Убирай верхние предметы, чтобы открывать нижние.'},
  pet:{title:'Вечер с котом',levels:petLevels,rule:'Помоги коту поесть, попить, поиграть и отдохнуть. Доведи все четыре показателя до трёх отметок.'},
  grooming:{title:'Чистые лапы',levels:groomingLevels,rule:'Выбери инструмент и проведи по загрязнённой шерсти. Несколько мягких движений очищают участок. Если кот устал, дай ему передышку.'},
  litter:{title:'Пары в лотке',levels:litterLevels,rule:'Открывай ячейки совком и ищи две одинаковые формы. Здесь есть и пустые места. Несовпавшая пара снова скроется — запоминай, где что лежит.'},
  yarn:{title:'Распутай клубок',levels:YARN_LEVELS,rule:'Один клубок — одна нить. Тяни изгибы и свободный конец, пока нить не перестанет пересекать себя. Клубок остаётся на месте.'}
};
export function createMini(id,index=0){
  const level=GAMES[id]?.levels[index];if(!level)throw new RangeError('Unknown game or level');
  let data={};
  if(id==='search')data={found:[],mistakes:0,hint:null};
  if(id==='tunnels')data={pieces:copy(level.pieces)};
  if(id==='food')data={remaining:level.items.map((type,id)=>({type,id})),sorted:[],mistakes:0};
  if(id==='pet')data={needs:[...level.needs],pose:'loaf'};
  if(id==='grooming')data={spots:copy(level.spots).map(mark=>({...mark,remaining:mark.strength})),patience:3,washed:false,workDone:0};
  if(id==='litter')data={open:[],matched:[],empty:[],pending:false};
  if(id==='yarn')data={points:copy(level.points)};
  return{id,index,moves:0,won:false,message:'',...data};
}
export function miniAction(state,action){
  if(state.won)return state;const {id,index}=state,level=GAMES[id].levels[index],next=copy(state);next.message='';
  if(id==='search'){
    if(action.type==='hint'){next.hint=level.targets.find(item=>!next.found.includes(item));if(!next.hint)return state;next.message='Подсказка отмечена на сцене.';}
    else if(action.type==='find'){if(next.found.includes(action.item))return state;if(level.targets.includes(action.item)){next.found.push(action.item);next.hint=null;next.message='Нашлось: '+SEARCH_SCENES[level.scene].find(item=>item.id===action.item).name+'.';}else{next.mistakes++;next.message='Этот предмет не из списка. Посмотри ещё.';}}else return state;next.won=next.found.length===level.targets.length;
  }else if(id==='tunnels'){
    const piece=next.pieces[action.piece];if(action.type!=='turn'||!piece||piece.fixed)return state;piece.turn=(piece.turn+1)%4;
    const trace=traceTunnelRoute(next,level);next.won=trace.complete;
    next.message=trace.complete?'Путь готов.':trace.connected?'До миски есть путь, но он проходит не через все колокольчики.':level.checkpoints?.length?'Соедини начало с миской через все колокольчики.':'Поверни тоннели, чтобы соединить площадку с миской.';
  }else if(id==='food'){
    const at=next.remaining.findIndex(item=>item.id===action.item);if(action.type!=='sort'||at<0||!['safe','away'].includes(action.bin)||!foodIsExposed(state.remaining,level,action.item))return state;
    const item=next.remaining[at],food=FOODS[item.type];
    if(food.safe!==(action.bin==='safe')){next.mistakes++;next.message=food.why;}
    else{next.remaining.splice(at,1);next.sorted.push(item);next.message='';}
    next.won=!next.remaining.length;
  }else if(id==='pet'){
    const choice=PET_ACTIONS[action.type];if(!choice)return state;
    if(action.type==='food'&&next.needs[0]>=4){next.message='Кот уже сыт. Лучше выбрать другое действие.';return{...state,message:next.message};}
    next.needs=next.needs.map((n,i)=>Math.max(0,Math.min(4,n+choice.effect[i])));
    if(next.needs.every((n,i)=>n===state.needs[i]))return state;
    next.pose={food:'cautious',water:'cautious',play:'stretch',rest:'sleep'}[action.type];
    next.message={food:'Кот поел. После корма можно попить.',water:'В поилке свежая вода.',play:'Поиграли. На игру уходят силы, после неё хочется пить.',rest:'Кот немного отдохнул.'}[action.type];
    next.won=next.needs.every(n=>n>=3);
  }else if(id==='grooming'){
    if(action.type==='pause'){
      if(next.patience===3)return state;next.patience=3;next.message='Передохнули. Можно продолжать.';
    }else{
      const at=next.spots.findIndex(spot=>spot.id===action.spot);
      if(action.type!=='clean'||at<0||!GROOM_TOOLS[action.tool]||action.tool==='pause')return state;
      if(next.patience===0)return{...state,message:'Кот хочет передохнуть. Нажми «Передышка».'};
      const mark=next.spots[at],step=GROOM_STEPS[mark.kind];next.patience--;
      if(step[0]!==action.tool)next.message='Для этого участка нужен другой инструмент.';
      else{
        next.workDone=(next.workDone||0)+1;
        if(action.tool==='water')next.washed=true;
        mark.remaining=(mark.remaining??mark.strength??1)-1;
        if(mark.remaining>0)next.message={dust:'Пыль уходит. Ещё мягкое движение.',tangle:'Свободной шерсти стало меньше.',mud:'Грязь размокает. Ещё немного воды.',soapy:'Распределяем шампунь по шерсти.',foam:'Пены стало меньше. Смываем остатки.',wet:'Шерсть подсыхает под полотенцем.'}[mark.kind];
        else if(step[1]){mark.kind=step[1];mark.remaining=mark.strength||1;next.message={soapy:'Шерсть намочена. Теперь шампунь для кошек.',foam:'Теперь нужно полностью смыть пену.',wet:'Осталось промокнуть полотенцем.'}[step[1]];}
        else{next.spots.splice(at,1);next.message='Этот участок чистый.';}
      }
    }next.won=!next.spots.length;
  }else if(id==='litter'){
    if(action.type==='settle'){
      if(!state.pending)return state;
      next.open=[];next.pending=false;next.message='Запомнили? Поищем дальше.';return next;
    }
    const cell=action.cell;
    if(action.type!=='reveal'||state.pending||!Number.isInteger(cell)||cell<0||cell>=level.cells.length||[...state.open,...state.matched,...state.empty].includes(cell))return state;
    if(level.cells[cell]===null){next.empty.push(cell);next.message='Только чистый наполнитель. Здесь пары нет.';}
    else{
      next.open.push(cell);
      if(next.open.length===2){
        if(level.cells[next.open[0]]===level.cells[cell]){next.matched.push(...next.open);next.open=[];next.message='Одинаковые! Пара нашлась.';}
        else{next.pending=true;next.message='Разные формы. Сейчас они снова скроются.';}
      }else next.message='Теперь найди такую же форму.';
    }
    next.won=next.matched.length===level.pairs*2;
  }else if(id==='yarn'){
    if(action.type!=='move'||!Number.isInteger(action.node)||action.node===(level.anchor??YARN_ANCHOR)||!next.points[action.node]||!Number.isFinite(action.x)||!Number.isFinite(action.y))return state;
    const point={x:Math.max(8,Math.min(92,action.x)),y:Math.max(8,Math.min(92,action.y))};
    if(next.points.some((p,i)=>i!==action.node&&Math.hypot(p.x-point.x,p.y-point.y)<YARN_POINT_SPACING))return{...state,message:'Оставь немного места между изгибами нити.'};
    if(Math.hypot(next.points[action.node].x-point.x,next.points[action.node].y-point.y)<.1)return state;
    next.points[action.node]=point;next.won=yarnConflicts(next.points,level.edges).length===0;
  }
  next.moves++;return next;
}
export function solutionFor(id,index){
  const level=GAMES[id].levels[index];
  if(id==='search')return level.targets.map(item=>({type:'find',item}));
  if(id==='tunnels')return copy(level.solution);
  if(id==='food'){
    if(level.clearOrder)return level.clearOrder.map(item=>({type:'sort',item,bin:FOODS[level.items[item]].safe?'safe':'away'}));
    const remaining=level.items.map((type,id)=>({type,id})),actions=[];
    while(remaining.length){
      const at=remaining.findIndex(item=>foodIsExposed(remaining,level,item.id));
      if(at<0)throw new Error('Food pile has no exposed item');
      const [item]=remaining.splice(at,1);
      actions.push({type:'sort',item:item.id,bin:FOODS[item.type].safe?'safe':'away'});
    }
    return actions;
  }
  if(id==='pet'){
    const initial=createMini(id,index),queue=[{state:initial,path:[]}],seen=new Set();
    for(let cursor=0;cursor<queue.length;cursor++){const {state,path}=queue[cursor];if(state.won)return path;const key=state.needs.join(',');if(seen.has(key))continue;seen.add(key);for(const type of Object.keys(PET_ACTIONS)){const next=miniAction(state,{type});if(next.moves>state.moves)queue.push({state:next,path:[...path,{type}]});}}return null;
  }
  if(id==='grooming'){
    const actions=[];let state=createMini(id,index);while(!state.won){const action=state.patience===0?{type:'pause'}:{type:'clean',spot:state.spots[0].id,tool:GROOM_STEPS[state.spots[0].kind][0]};actions.push(action);state=miniAction(state,action);}return actions;
  }
  if(id==='litter')return Array.from({length:level.pairs},(_,shape)=>level.cells.flatMap((value,cell)=>value===shape?[{type:'reveal',cell}]:[])).flat();
  if(id==='yarn'){
    return copy(level.solution);
  }
}
