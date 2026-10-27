import {createPetHomeState,validatePetHomeSave,migratePetLifeV3} from '../mini/pet-home.mjs?v=0.25.0';
import {readPetHome as readPrevious,readPetBudget} from './save.mjs?v=0.25.0';
export {readPetBudget,PET_BUDGET_KEY} from './save.mjs?v=0.25.0';

export function readPetHome(raw,previousRaw=null,oldBookRaw=null){
 if(raw){try{
  const value=JSON.parse(raw),envelope=value?.version===4&&Object.hasOwn(value,'cat');
  const state=validatePetHomeSave(envelope?value.cat:value);
  if(state)return{state,budget:envelope?readPetBudget(JSON.stringify(value.budget)):null,migrated:false,recovered:false};
 }catch{}}
 const previous=readPrevious(previousRaw,oldBookRaw);
 const usable=!!previousRaw&&!previous.recovered||previous.migrated;
 const migrated=usable?migratePetLifeV3(previous.state):null;
 return{state:migrated||createPetHomeState(),budget:migrated?previous.budget:null,migrated:!!migrated,recovered:!!raw};
}
