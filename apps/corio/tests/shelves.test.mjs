import test from 'node:test';
import assert from 'node:assert/strict';
import {ITEMS,SHELF_LEVELS,createShelfGame,transfer,solveShelf} from '../dist/shelves/engine.mjs';
test('five shelf layouts preserve all items and have constructive solutions',()=>{
  assert.equal(SHELF_LEVELS.length,5);
  for(let index=0;index<SHELF_LEVELS.length;index++){
    let game=createShelfGame(index);const initial=game.shelves.flat().sort(),path=solveShelf(index);assert.ok(path?.length);
    for(const[from,to]of path){const previous=game;game=transfer(game,from,to);assert.notEqual(game,previous);assert.equal(game.moves,previous.moves+1);assert.deepEqual(game.shelves.flat().sort(),initial);assert.ok(game.shelves.every(s=>s.length<=SHELF_LEVELS[index].capacity));}
    assert.equal(game.won,true);assert.equal(game.moves,path.length);assert.ok(game.shelves.filter(s=>s.length).every(s=>new Set(s).size===1));
  }
});
test('only the rightmost item moves to a compatible or empty shelf; old states remain intact',()=>{
  const game=createShelfGame(),snapshot=JSON.stringify(game);assert.equal(transfer(game,0,1),game);assert.equal(transfer(game,0,0),game);assert.equal(transfer(game,3,0),game);
  const next=transfer(game,0,3);assert.deepEqual(next.shelves[0],['yarn','yarn']);assert.deepEqual(next.shelves[3],['bowl']);assert.equal(JSON.stringify(game),snapshot);assert.equal(transfer(next,0,3),next);
  assert.ok(Object.values(ITEMS).every(i=>i.name&&i.file));
});
