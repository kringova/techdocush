import {SHELF_LEVELS} from './levels.mjs?v=0.15.0';
export {SHELF_LEVELS};
export const ITEMS={yarn:{name:'Клубок',plural:'Клубки',file:'yarn-v1.png'},bowl:{name:'Миска',plural:'Миски',file:'bowl-v1.png'},brush:{name:'Щётка',plural:'Щётки',file:'brush-v1.png'}};
export function solved(shelves,capacity){return shelves.every(s=>s.length===0||(s.length===capacity&&s.every(item=>item===s[0])));}
export function createShelfGame(index=0){if(!SHELF_LEVELS[index])throw new RangeError('Unknown shelf layout');const level=SHELF_LEVELS[index];return{index,shelves:level.shelves.map(s=>[...s]),moves:0,won:false};}
export function transfer(state,from,to){
  const source=state.shelves[from],target=state.shelves[to],capacity=SHELF_LEVELS[state.index].capacity;
  if(state.won||from===to||!source?.length||!target||target.length>=capacity||(target.length&&target.at(-1)!==source.at(-1)))return state;
  const shelves=state.shelves.map(s=>[...s]);shelves[to].push(shelves[from].pop());return{...state,shelves,moves:state.moves+1,won:solved(shelves,capacity)};
}
export function solveShelf(index){
  if(!SHELF_LEVELS[index])throw new RangeError('Unknown shelf layout');
  return SHELF_LEVELS[index].solution.map(action=>[...action]);
}
