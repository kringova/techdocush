import {SEARCH_LEVELS,SEARCH_SCENES} from './search-data.mjs?v=0.8.2';
// Original short scenarios for comparing mechanics. No clocks or offline decay.
const copy=value=>structuredClone(value);
export const FOODS={
  dry:{name:'Кошачий корм',safe:true,why:'Полнорационный кошачий корм — основа питания.',icon:'kibble'},
  wet:{name:'Влажный корм',safe:true,why:'Полнорационный корм для кошек подходит для обычного кормления.',icon:'can'},
  treat:{name:'Кошачье лакомство',safe:true,why:'Лакомство дают понемногу.',icon:'treat'},
  water:{name:'Питьевая вода',safe:true,why:'Свежая вода нужна всегда. Ей место в отдельной поилке.',icon:'water'},
  chicken:{name:'Готовая курица',detail:'Без соли, приправ и костей',safe:true,why:'Только полностью приготовленная, без соли и приправ, маленьким кусочком.',icon:'chicken'},
  chocolate:{name:'Тёмный шоколад',safe:false,why:'Шоколад опасен для кошек.',icon:'chocolate'},
  onion:{name:'Лук',safe:false,why:'Лук может повреждать клетки крови.',icon:'onion'},
  garlic:{name:'Чеснок',safe:false,why:'Чеснок опасен для кошек.',icon:'garlic'},
  coffee:{name:'Кофе',safe:false,why:'Кофеин опасен для кота.',icon:'coffee'},
  bone:{name:'Кость',safe:false,why:'Костью можно подавиться или травмироваться.',icon:'bone'},
  raw:{name:'Сырое мясо',safe:false,why:'Может содержать опасные бактерии.',icon:'raw'},
  candy:{name:'Конфета',safe:false,why:'Выбираем кошачьи лакомства, а обычную конфету убираем.',icon:'candy'}
};
const foodLevels=[
  {name:'Первая миска',items:['dry','chocolate','water','candy']},
  {name:'Маленькое угощение',items:['treat','onion','wet','bone','dry','chocolate']},
  {name:'После кухни',items:['raw','chicken','garlic','water','coffee','wet']},
  {name:'Всё на тарелке',items:['bone','treat','candy','onion','chicken','dry','raw','water']},
  {name:'Ужин готов',items:['coffee','wet','garlic','treat','raw','chicken','chocolate','water','bone','candy']}
];
const dir=(a,b)=>b.x>a.x?1:b.x<a.x?3:b.y>a.y?2:0;
const delta=[[0,-1],[1,0],[0,1],[-1,0]];
const pathLevel=(name,w,h,points,fixed=[])=>{
  const path=points.map(([x,y])=>({x,y}));
  const pieces=path.map((p,i)=>{const before=path[i-1]||{x:-1,y:p.y},after=path[i+1]||{x:w,y:p.y},edges=[dir(p,before),dir(p,after)],fixedIndex=fixed.indexOf(i);return{...p,edges,turn:fixedIndex>=0?0:(Math.abs(edges[0]-edges[1])===2?1:i%3+1),kind:fixedIndex>=0?(fixedIndex%2?'hammock':'shelf'):'pipe',fixed:fixedIndex>=0};});
  return{name,w,h,pieces,start:{x:-1,y:path[0].y},end:{x:w,y:path.at(-1).y}};
};
const tunnelLevels=[
  pathLevel('Между полками',3,3,[[0,1],[1,1],[2,1]],[0,2]),
  pathLevel('Первый подъём',4,3,[[0,2],[1,2],[1,1],[2,1],[3,1]],[0,3]),
  pathLevel('Через гамак',5,4,[[0,2],[1,2],[1,1],[2,1],[3,1],[3,2],[4,2]],[0,3,6]),
  pathLevel('Выше к окну',5,5,[[0,3],[1,3],[1,2],[1,1],[2,1],[3,1],[3,2],[4,2]],[0,4]),
  pathLevel('Длинный вечерний путь',6,5,[[0,3],[1,3],[1,2],[1,1],[2,1],[3,1],[3,2],[3,3],[4,3],[5,3]],[0,4,8])
];
export function tunnelEdges(piece){return piece.edges.map(edge=>(edge+piece.turn)%4);}
export function connectedRoute(state,level){
  const pieces=state.pieces,start=pieces.findIndex(p=>p.x===0&&p.y===level.start.y);
  if(start<0||!tunnelEdges(pieces[start]).includes(3))return[];
  const queue=[start],parents=new Map([[start,-1]]);
  for(let cursor=0;cursor<queue.length;cursor++){
    const index=queue[cursor],piece=pieces[index];
    for(const edge of tunnelEdges(piece)){
      const [dx,dy]=delta[edge],x=piece.x+dx,y=piece.y+dy;
      if(x===level.end.x&&y===level.end.y){const route=[];let at=index;while(at>=0){route.unshift(at);at=parents.get(at);}return route;}
      const next=pieces.findIndex(p=>p.x===x&&p.y===y);
      if(next>=0&&!parents.has(next)&&tunnelEdges(pieces[next]).includes((edge+2)%4)){parents.set(next,index);queue.push(next);}
    }
  }return[];
}
const petLevels=[
  {name:'Вода и ужин',needs:[1,1,4,4]},
  {name:'Хочется поиграть',needs:[3,3,0,3]},
  {name:'После игры',needs:[1,1,4,1]},
  {name:'Дождливый вечер',needs:[2,2,1,2]},
  {name:'Собираемся спать',needs:[1,1,1,1]}
];
export const PET_ACTIONS={food:{name:'Порция корма',effect:[2,-1,0,0]},water:{name:'Свежая вода',effect:[0,3,0,0]},play:{name:'Поиграть',effect:[-1,-1,2,-1]},rest:{name:'Отдохнуть',effect:[-1,0,-1,3]}};
const spot=(id,kind,x,y)=>({id,kind,x,y});
const groomingLevels=[
  {name:'Пыльные лапы',spots:[spot(0,'dust',45,66),spot(1,'dust',66,70),spot(2,'tangle',48,43)]},
  {name:'Шерстинки на боках',spots:[spot(0,'tangle',37,45),spot(1,'tangle',48,52),spot(2,'dust',62,69),spot(3,'dust',43,68)]},
  {name:'Одно грязное пятно',spots:[spot(0,'mud',44,51)]},
  {name:'После прогулки',spots:[spot(0,'mud',39,49),spot(1,'dust',63,69),spot(2,'tangle',51,44),spot(3,'dust',43,67)]},
  {name:'Перед сном',spots:[spot(0,'mud',40,50),spot(1,'mud',53,50),spot(2,'tangle',48,40),spot(3,'dust',62,68)]}
];
export const GROOM_STEPS={dust:['wipe',null],tangle:['brush',null],mud:['water','soapy'],soapy:['soap','foam'],foam:['rinse','wet'],wet:['towel',null]};
export const GROOM_TOOLS={wipe:'Тканевая салфетка',brush:'Щётка',water:'Тёплая вода',soap:'Шампунь для кошек',rinse:'Смыть пену',towel:'Полотенце',pause:'Передышка'};
const litterLevels=Array.from({length:5},(_,i)=>{
  const w=[3,4,4,5,6][i],h=[2,3,4,4,4][i],pairs=i+2;
  const cells=[...Array.from({length:pairs},(_,shape)=>[shape,shape]).flat(),...Array(w*h-pairs*2).fill(null)];
  let seed=7349+i*977;
  for(let n=cells.length-1;n>0;n--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const at=seed%(n+1);[cells[n],cells[at]]=[cells[at],cells[n]];}
  return{name:['Две первые пары','Пустые местечки','Четыре формы','Запомнить и найти','Весь лоток'][i],w,h,pairs,cells};
});
const circle=(n,r=34,cx=50,cy=50)=>Array.from({length:n},(_,i)=>({x:cx+r*Math.cos(-Math.PI/2+i*Math.PI*2/n),y:cy+r*Math.sin(-Math.PI/2+i*Math.PI*2/n)}));
const yarnLevel=(name,n,wheel=false)=>{
  const solution=circle(n),edges=Array.from({length:n},(_,i)=>[i,(i+1)%n]);
  if(wheel){solution.push({x:50,y:50});for(let i=0;i<n;i++)edges.push([i,n]);}
  else if(n>4)for(let i=2;i<n-1;i++)edges.push([0,i]);
  const order=Array.from({length:n},(_,i)=>i%2===0?i/2:Math.ceil(n/2)+(i-1)/2),points=order.map(i=>({...solution[i]}));
  if(wheel)points.push({x:12,y:45});
  return{name,edges,solution,points};
};
const yarnLevels=[yarnLevel('Первый узел',4),yarnLevel('Пять клубочков',5),yarnLevel('Нити подлиннее',6),yarnLevel('Клубок в середине',6,true),yarnLevel('Большая путаница',7,true)];
const orient=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
const onSegment=(a,b,p)=>Math.abs(orient(a,b,p))<.01&&p.x>=Math.min(a.x,b.x)-.01&&p.x<=Math.max(a.x,b.x)+.01&&p.y>=Math.min(a.y,b.y)-.01&&p.y<=Math.max(a.y,b.y)+.01;
export function yarnConflicts(points,edges){
  const bad=new Set();
  for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++){
    const [a,b]=edges[i],[c,d]=edges[j];if([a,b].some(v=>v===c||v===d))continue;
    const p=points[a],q=points[b],r=points[c],s=points[d];
    if(orient(p,q,r)*orient(p,q,s)<0&&orient(r,s,p)*orient(r,s,q)<0||onSegment(p,q,r)||onSegment(p,q,s)||onSegment(r,s,p)||onSegment(r,s,q)){bad.add(i);bad.add(j);}
  }
  for(let i=0;i<points.length;i++)for(let j=0;j<edges.length;j++)if(!edges[j].includes(i)&&onSegment(points[edges[j][0]],points[edges[j][1]],points[i]))bad.add(j);
  return [...bad];
}
export const GAMES={
  search:{title:'Куда пропало?',levels:SEARCH_LEVELS,rule:'Найди предметы из списка. Приближай сцену кнопкой «+» и передвигай её, чтобы рассмотреть детали.'},
  tunnels:{title:'Настенная трасса',levels:tunnelLevels,rule:'Поворачивай трубы. Соедини левую площадку с лакомством справа. Полки и гамаки закреплены.'},
  food:{title:'Что в миске?',levels:foodLevels,rule:'Выбери продукт на тарелке, затем отправь его в подходящую зону. Воду ставим в отдельную поилку.'},
  pet:{title:'Вечер с котом',levels:petLevels,rule:'Помоги коту поесть, попить, поиграть и отдохнуть. Доведи все четыре показателя до трёх отметок.'},
  grooming:{title:'Чистые лапы',levels:groomingLevels,rule:'Выбери инструмент и коснись пятнышка. Следи за настроением: если кот устал, дай ему передышку.'},
  litter:{title:'Пары в лотке',levels:litterLevels,rule:'Открывай ячейки совком и ищи две одинаковые формы. Здесь есть и пустые места. Несовпавшая пара снова скроется — запоминай, где что лежит.'},
  yarn:{title:'Распутай клубок',levels:yarnLevels,rule:'Перетаскивай клубочки, чтобы нити не пересекались. Между клубками должно оставаться место.'}
};
export function createMini(id,index=0){
  const level=GAMES[id]?.levels[index];if(!level)throw new RangeError('Unknown game or level');
  let data={};
  if(id==='search')data={found:[],mistakes:0,hint:null};
  if(id==='tunnels')data={pieces:copy(level.pieces)};
  if(id==='food')data={remaining:level.items.map((type,id)=>({type,id})),sorted:[],mistakes:0};
  if(id==='pet')data={needs:[...level.needs],pose:'loaf'};
  if(id==='grooming')data={spots:copy(level.spots),patience:3,washed:false};
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
    next.won=connectedRoute(next,level).length>0;
  }else if(id==='food'){
    const at=next.remaining.findIndex(item=>item.id===action.item);if(action.type!=='sort'||at<0||!['safe','away'].includes(action.bin))return state;
    const item=next.remaining[at],food=FOODS[item.type];
    if(food.safe!==(action.bin==='safe')){next.mistakes++;next.message=food.why+' Попробуй другую зону.';}
    else{next.remaining.splice(at,1);next.sorted.push(item);next.message=food.why;}
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
      const at=next.spots.findIndex(spot=>spot.id===action.spot);if(at<0||!GROOM_TOOLS[action.tool])return state;
      if(next.patience===0)return{...state,message:'Кот хочет передохнуть. Нажми «Передышка».'};
      const mark=next.spots[at],step=GROOM_STEPS[mark.kind];next.patience--;
      if(step[0]!==action.tool)next.message='Для этого пятнышка нужен другой инструмент.';
      else if(step[1]){mark.kind=step[1];if(action.tool==='water')next.washed=true;next.message={soapy:'Пятно намочено. Теперь кошачий шампунь.',foam:'Пену нужно полностью смыть.',wet:'Осталось промокнуть полотенцем.'}[step[1]];}
      else{next.spots.splice(at,1);next.message='Готово. Хорошо получилось.';}
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
    if(action.type!=='move'||!next.points[action.node]||!Number.isFinite(action.x)||!Number.isFinite(action.y))return state;
    const point={x:Math.max(8,Math.min(92,action.x)),y:Math.max(8,Math.min(92,action.y))};
    if(next.points.some((p,i)=>i!==action.node&&Math.hypot(p.x-point.x,p.y-point.y)<9))return{...state,message:'Оставь немного места между клубочками.'};
    if(Math.hypot(next.points[action.node].x-point.x,next.points[action.node].y-point.y)<.1)return state;
    next.points[action.node]=point;next.won=yarnConflicts(next.points,level.edges).length===0;
  }
  next.moves++;return next;
}
export function solutionFor(id,index){
  const level=GAMES[id].levels[index];
  if(id==='search')return level.targets.map(item=>({type:'find',item}));
  if(id==='tunnels')return level.pieces.flatMap((p,piece)=>Array.from({length:p.fixed?0:(4-p.turn)%4},()=>({type:'turn',piece})));
  if(id==='food')return level.items.map((type,item)=>({type:'sort',item,bin:FOODS[type].safe?'safe':'away'}));
  if(id==='pet'){
    const initial=createMini(id,index),queue=[{state:initial,path:[]}],seen=new Set();
    for(let cursor=0;cursor<queue.length;cursor++){const {state,path}=queue[cursor];if(state.won)return path;const key=state.needs.join(',');if(seen.has(key))continue;seen.add(key);for(const type of Object.keys(PET_ACTIONS)){const next=miniAction(state,{type});if(next.moves>state.moves)queue.push({state:next,path:[...path,{type}]});}}return null;
  }
  if(id==='grooming'){
    const actions=[];let state=createMini(id,index);while(!state.won){const action=state.patience===0?{type:'pause'}:{type:'clean',spot:state.spots[0].id,tool:GROOM_STEPS[state.spots[0].kind][0]};actions.push(action);state=miniAction(state,action);}return actions;
  }
  if(id==='litter')return Array.from({length:level.pairs},(_,shape)=>level.cells.flatMap((value,cell)=>value===shape?[{type:'reveal',cell}]:[])).flat();
  if(id==='yarn'){
    // Move to known untangled geometry via a free staging area, respecting spacing.
    let state=createMini(id,index);const path=[];
    for(let pass=0;pass<3&&!state.won;pass++)for(let node=0;node<level.solution.length;node++){
      const goal=level.solution[node],block=state.points.findIndex((p,i)=>i!==node&&Math.hypot(p.x-goal.x,p.y-goal.y)<10);
      if(block>=0){const free=[{x:9,y:9},{x:91,y:9},{x:91,y:91},{x:9,y:91},{x:50,y:9}].find(p=>!state.points.some((q,i)=>i!==block&&Math.hypot(q.x-p.x,q.y-p.y)<11));if(free){const action={type:'move',node:block,...free},next=miniAction(state,action);if(next.moves>state.moves){path.push(action);state=next;}}}
      const action={type:'move',node,...goal},next=miniAction(state,action);if(next.moves>state.moves){path.push(action);state=next;}if(state.won)break;
    }return state.won?path:null;
  }
}
