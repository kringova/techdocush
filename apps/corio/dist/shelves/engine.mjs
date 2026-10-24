export const ITEMS={yarn:{name:'Клубок',plural:'Клубки',file:'yarn-v1.png'},bowl:{name:'Миска',plural:'Миски',file:'bowl-v1.png'},brush:{name:'Щётка',plural:'Щётки',file:'brush-v1.png'}};
export const SHELF_LEVELS=[
  {name:'Первый порядок',capacity:3,shelves:[['yarn','yarn','bowl'],['bowl','bowl','yarn'],['brush','brush','brush'],[]]},
  {name:'Всё вперемешку',capacity:3,shelves:[['yarn','brush','yarn'],['bowl','yarn','bowl'],['brush','bowl','brush'],[]]},
  {name:'Полка подлиннее',capacity:4,shelves:[['yarn','brush','bowl','yarn'],['bowl','yarn','brush','bowl'],['brush','bowl','yarn','brush'],[]]}
];
export function solved(shelves,capacity){return shelves.every(s=>s.length===0||(s.length===capacity&&s.every(item=>item===s[0])));}
export function createShelfGame(index=0){if(!SHELF_LEVELS[index])throw new RangeError('Unknown shelf layout');const level=SHELF_LEVELS[index];return{index,shelves:level.shelves.map(s=>[...s]),moves:0,won:false};}
export function transfer(state,from,to){
  const source=state.shelves[from],target=state.shelves[to],capacity=SHELF_LEVELS[state.index].capacity;
  if(state.won||from===to||!source?.length||!target||target.length>=capacity||(target.length&&target.at(-1)!==source.at(-1)))return state;
  const shelves=state.shelves.map(s=>[...s]);shelves[to].push(shelves[from].pop());return{...state,shelves,moves:state.moves+1,won:solved(shelves,capacity)};
}
export function solveShelf(index){
  const initial=createShelfGame(index),nodes=[{state:initial,parent:-1,action:null}],seen=new Set();
  for(let cursor=0;cursor<nodes.length&&cursor<100000;cursor++){
    const {state}=nodes[cursor],key=state.shelves.map(s=>s.join(',')).sort().join('|');if(seen.has(key))continue;seen.add(key);
    if(state.won){const path=[];let at=cursor;while(nodes[at].parent>=0){path.unshift(nodes[at].action);at=nodes[at].parent;}return path;}
    for(let from=0;from<state.shelves.length;from++)for(let to=0;to<state.shelves.length;to++){const next=transfer(state,from,to);if(next!==state)nodes.push({state:next,parent:cursor,action:[from,to]});}
  }return null;
}
