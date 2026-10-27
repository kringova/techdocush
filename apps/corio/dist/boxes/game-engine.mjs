import {GENERATED_LEVELS} from './levels.generated.mjs?v=0.22.0';
export const SIZE=7;
const room=(name,start,exit,props,boxes,targets)=>({name,start,exit,props,boxes,targets,size:7});
const at=(x,y)=>({x,y});
const prop=(kind,x,y,w,h)=>({kind,x,y,w,h});
export const LEVELS=[
  room('Первый коврик',at(3,4),at(4,1),[prop('sofa',1,4,1,2),prop('shelf',1,1,1,2),prop('table',5,3,1,2)],[at(3,3)],[at(3,2)]),
  room('Поворот',at(2,4),at(5,1),[prop('sofa',1,1,1,3),prop('shelf',3,1,2,1),prop('pouf',4,4,2,2)],[at(3,3)],[at(4,2)]),
  room('Две коробки',at(3,5),at(5,5),[prop('sofa',1,1,1,2),prop('shelf',5,1,1,2),prop('table',3,3,1,1)],[at(2,3),at(4,3)],[at(2,2),at(4,2)]),
  room('У шкафа',at(4,4),at(2,5),[prop('shelf',4,1,2,1),prop('table',1,3,1,2),prop('sofa',3,5,3,1)],[at(2,2),at(3,3)],[at(1,1),at(1,2)]),
  room('Узкий проход',at(2,5),at(5,5),[prop('shelf',1,3,2,1),prop('shelf',4,3,2,1)],[at(3,4),at(4,4)],[at(3,2),at(4,1)])
,...GENERATED_LEVELS];
export const DIRECTIONS={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
export function walkable(level,x,y){
  const size=level.size||SIZE;
  return Number.isInteger(x)&&Number.isInteger(y)&&x>0&&y>0&&x<size-1&&y<size-1&&!level.props.some(p=>x>=p.x&&y>=p.y&&x<p.x+p.w&&y<p.y+p.h);
}
export function createGame(index=0){
  if(!Number.isInteger(index)||!LEVELS[index])throw new RangeError('Unknown room');
  return{levelIndex:index,...LEVELS[index].start,boxes:LEVELS[index].boxes.map(p=>({...p})),moves:0,pushes:0,won:false};
}
export function covered(level,boxes){return level.targets.filter(t=>boxes.some(b=>b.x===t.x&&b.y===t.y)).length;}
export function unlocked(game,level=LEVELS[game.levelIndex]){return covered(level,game.boxes)===level.targets.length;}
export function move(game,direction,level=LEVELS[game.levelIndex]){
  const delta=DIRECTIONS[direction];if(!delta||game.won)return game;
  const x=game.x+delta.x,y=game.y+delta.y;
  if(!walkable(level,x,y))return game;
  let boxes=game.boxes,pushes=game.pushes;
  const box=boxes.findIndex(b=>b.x===x&&b.y===y);
  if(box>=0){
    const bx=x+delta.x,by=y+delta.y;
    if(!walkable(level,bx,by)||boxes.some(b=>b.x===bx&&b.y===by))return game;
    boxes=boxes.map((b,index)=>index===box?{x:bx,y:by}:b);pushes++;
  }
  const next={...game,x,y,boxes,pushes,moves:game.moves+1};
  return{...next,won:x===level.exit.x&&y===level.exit.y&&unlocked(next,level)};
}
function reachable(level,start,boxes){
  const queue=[start],paths=new Map([[`${start.x},${start.y}`,[]]]);
  for(let i=0;i<queue.length;i++){const p=queue[i];for(const[direction,d]of Object.entries(DIRECTIONS)){
    const x=p.x+d.x,y=p.y+d.y,key=`${x},${y}`;
    if(!paths.has(key)&&walkable(level,x,y)&&!boxes.some(b=>b.x===x&&b.y===y)){paths.set(key,[...paths.get(`${p.x},${p.y}`),direction]);queue.push({x,y});}
  }}return paths;
}
// Developer solver explores box pushes plus reachable player regions, not just a path to the door.
export function findPath(level){
  if(level.solution)return[...level.solution];
  const nodes=[{player:level.start,boxes:level.boxes,parent:-1,segment:[]}],seen=new Set();
  for(let i=0;i<nodes.length&&i<150000;i++){
    const node=nodes[i],paths=reachable(level,node.player,node.boxes);
    const key=node.boxes.map(b=>`${b.x},${b.y}`).sort().join('|')+'@'+[...paths.keys()].sort()[0];
    if(seen.has(key))continue;seen.add(key);
    if(covered(level,node.boxes)===level.targets.length&&paths.has(`${level.exit.x},${level.exit.y}`)){
      const segments=[paths.get(`${level.exit.x},${level.exit.y}`)];let cursor=i;
      while(cursor>=0){segments.unshift(nodes[cursor].segment);cursor=nodes[cursor].parent;}return segments.flat();
    }
    for(let j=0;j<node.boxes.length;j++){const b=node.boxes[j];for(const[direction,d]of Object.entries(DIRECTIONS)){
      const walk=paths.get(`${b.x-d.x},${b.y-d.y}`),x=b.x+d.x,y=b.y+d.y;
      if(!walk||!walkable(level,x,y)||node.boxes.some(other=>other.x===x&&other.y===y))continue;
      const boxes=node.boxes.map((other,index)=>index===j?{x,y}:other);
      nodes.push({player:b,boxes,parent:i,segment:[...walk,direction]});
    }}
  }return null;
}
