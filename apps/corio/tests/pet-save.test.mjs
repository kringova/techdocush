import test from 'node:test';
import assert from 'node:assert/strict';
import {newPetBook,readPetBook,petPrevious} from '../dist/pet/save.mjs';
import {petAction,petSolution} from '../dist/mini/pet-care.mjs';
test('a saved book resumes separate unfinished evenings and restores undo after reload',()=>{
 const book=newPetBook();book.scenes[0]=petAction(book.scenes[0],{type:'food'});book.scenes[1]=petAction(book.scenes[1],{type:'rest'});book.active=1;
 const loaded=readPetBook(JSON.stringify(book));assert.deepEqual(loaded,book);assert.deepEqual(petPrevious(loaded.scenes[0]),newPetBook().scenes[0]);assert.equal(petPrevious(loaded.scenes[1]).moves,0);assert.equal(loaded.scenes[1].pose,'sleep');
});
test('one invalid or misplaced evening cannot replace the canonical save book',()=>{
 const book=newPetBook();book.scenes[2].won=true;assert.equal(readPetBook(JSON.stringify(book)),null);
 const swapped=newPetBook();[swapped.scenes[0],swapped.scenes[1]]=[swapped.scenes[1],swapped.scenes[0]];assert.equal(readPetBook(JSON.stringify(swapped)),null);
 for(const raw of['{',null,'null','{}',JSON.stringify({...newPetBook(),active:5})])assert.equal(readPetBook(raw),null);
});
test('completed evenings resume exactly and undo returns to the last unfinished action',()=>{
 const book=newPetBook();for(const action of petSolution(4))book.scenes[4]=petAction(book.scenes[4],action);book.active=4;
 const loaded=readPetBook(JSON.stringify(book));assert.equal(loaded.scenes[4].won,true);assert.equal(loaded.scenes[4].pose,'sleep');const before=petPrevious(loaded.scenes[4]);assert.equal(before.won,false);assert.equal(before.moves,6);assert.equal(before.lastAction,'water');assert.equal(petAction(before,{type:'rest'}).won,true);
});
