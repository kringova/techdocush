import {PET_LEVELS,createPet,petAction,validatePetSave} from '../mini/pet-care.mjs?v=0.22.0';
export function newPetBook(){return{version:2,active:0,scenes:PET_LEVELS.map((_,i)=>createPet(i))};}
export function readPetBook(raw){
 try{
  const book=JSON.parse(raw);
  if(!book||book.version!==2||!Number.isInteger(book.active)||book.active<0||book.active>=PET_LEVELS.length||!Array.isArray(book.scenes)||book.scenes.length!==PET_LEVELS.length)return null;
  const scenes=book.scenes.map((state,index)=>{const valid=validatePetSave(state);return valid?.index===index?valid:null;});
  return scenes.every(Boolean)?{version:2,active:book.active,scenes}:null;
 }catch{return null;}
}
export function petPrevious(state){
 if(!state.trace.length)return state;
 let previous=createPet(state.index);
 for(const type of state.trace.slice(0,-1))previous=petAction(previous,{type});
 return previous;
}
