import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,SIZE,DIRECTIONS,walkable,findPath,createGame,move,covered,unlocked} from '../dist/boxes/game-engine.mjs';

test('fifty distinct rooms have valid furniture, crates, mats and reachable puzzle solutions',()=>{
  assert.equal(LEVELS.length,50);const layouts=new Set();
  for(const level of LEVELS){
    assert.ok(walkable(level,level.start.x,level.start.y));assert.ok(walkable(level,level.exit.x,level.exit.y));
    assert.equal(level.boxes.length,level.targets.length);assert.ok(level.boxes.length>0);
    const cells=new Set();
    for(const p of level.props)for(let x=p.x;x<p.x+p.w;x++)for(let y=p.y;y<p.y+p.h;y++){assert.ok(x>0&&y>0&&x<level.size-1&&y<level.size-1);const key=`${x},${y}`;assert.ok(!cells.has(key));cells.add(key);assert.equal(walkable(level,x,y),false);}
    for(const p of [...level.boxes,...level.targets])assert.ok(walkable(level,p.x,p.y));
    assert.equal(new Set(level.boxes.map(p=>`${p.x},${p.y}`)).size,level.boxes.length);
    layouts.add(JSON.stringify([[...cells].sort(),level.start,level.boxes,level.targets,level.exit]));const path=findPath(level);assert.ok(path&&path.length>=4&&path.length<=150,`${level.name}: puzzle has no practical solution`);
  }assert.equal(layouts.size,50);
});

test('all fifty puzzles are won by legal adjacent moves and actual box pushes',()=>{
  for(let index=0;index<LEVELS.length;index++){
    let game=createGame(index);const path=findPath(LEVELS[index]);
    for(let i=0;i<path.length;i++){const previous=game;game=move(game,path[i]);assert.equal(Math.abs(game.x-previous.x)+Math.abs(game.y-previous.y),1);assert.equal(game.won,i===path.length-1);assert.ok(game.boxes.every(b=>walkable(LEVELS[index],b.x,b.y)));}
    assert.equal(game.moves,path.length);assert.ok(game.pushes>0);assert.equal(unlocked(game),true);assert.equal(move(game,'down'),game);
  }
});

test('walking to the door without solving the boxes cannot win',()=>{
  const level=LEVELS[0],queue=[{...level.start,path:[]}],seen=new Set();let route=null;
  for(let i=0;i<queue.length;i++){const p=queue[i],key=`${p.x},${p.y}`;if(seen.has(key))continue;seen.add(key);if(p.x===level.exit.x&&p.y===level.exit.y){route=p.path;break;}for(const[d,v]of Object.entries(DIRECTIONS)){const x=p.x+v.x,y=p.y+v.y;if(walkable(level,x,y)&&!level.boxes.some(b=>b.x===x&&b.y===y))queue.push({x,y,path:[...p.path,d]});}}
  assert.ok(route);let game=createGame(0);for(const d of route)game=move(game,d);assert.deepEqual({x:game.x,y:game.y},level.exit);assert.equal(game.won,false);assert.equal(game.pushes,0);assert.equal(unlocked(game),false);
});

test('crates cannot cross furniture, the boundary or another crate; pushing does not mutate old states',()=>{
  const initial=createGame(0),blocked={...initial,x:1,y:3};assert.equal(move(blocked,'left'),blocked);assert.equal(move(blocked,'down'),blocked);assert.equal(move(initial,'diagonal'),initial);
  const wall={...initial,x:3,y:2,boxes:[{x:3,y:1}]};assert.equal(move(wall,'up'),wall);
  const chained={...createGame(2),x:2,y:5,boxes:[{x:2,y:4},{x:2,y:3}]};assert.equal(move(chained,'up'),chained);
  const before=initial;const snapshot=JSON.stringify(before),after=move(before,'up');assert.equal(after.pushes,1);assert.deepEqual(after.boxes,[{x:3,y:2}]);assert.equal(JSON.stringify(before),snapshot);
});

test('the door relocks when a crate leaves a mat, and tutorial puzzle five requires temporary repositioning',()=>{
  const solved={...createGame(0),x:3,y:3,boxes:[{x:3,y:2}]};assert.equal(unlocked(solved),true);assert.equal(unlocked(move(solved,'up')),false);
  let game=createGame(4),last=0,freed=false;for(const d of findPath(LEVELS[4])){game=move(game,d);const count=covered(LEVELS[4],game.boxes);if(count<last)freed=true;last=count;}assert.equal(freed,true);assert.equal(game.won,true);
});

test('restarting resets crate positions and steps without modifying room definitions',()=>{
  const snapshot=JSON.stringify(LEVELS),initial=createGame(2);let game=move(initial,'up');assert.equal(game.moves,1);assert.deepEqual(createGame(2),initial);assert.equal(JSON.stringify(LEVELS),snapshot);assert.throws(()=>createGame(50),RangeError);
});

test('map sizes and box counts grow in stages while the introductory puzzles stay compact',()=>{
  assert.deepEqual([...new Set(LEVELS.map(level=>level.size-2))],[5,6,7,8,9]);
  for(let i=0;i<LEVELS.length;i++){assert.equal(LEVELS[i].size-2,5+Math.floor(i/10));if(i>0)assert.ok(LEVELS[i].size>=LEVELS[i-1].size);}
  assert.ok(LEVELS.slice(0,3).every(level=>findPath(level).length<=10));assert.ok(LEVELS.slice(0,10).every(level=>findPath(level).length<=35));assert.equal(LEVELS.at(-1).boxes.length,4);
});
