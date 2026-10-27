import {createPetLifeState,validatePetLifeSave,migratePetBook} from '../mini/pet-continuous.mjs?v=0.23.1';
export const PET_BUDGET_KEY='corio-pet-care-budget-v1';
export function readPetHome(raw,legacyRaw=null){
 if(raw){try{const parsed=JSON.parse(raw),envelope=parsed?.version===3&&Object.hasOwn(parsed,'cat'),state=validatePetLifeSave(envelope?parsed.cat:parsed);if(state)return{state,budget:envelope?readPetBudget(JSON.stringify(parsed.budget)):null,migrated:false,recovered:false};}catch{}}
 const migrated=migratePetBook(legacyRaw);
 return{state:migrated||createPetLifeState(),budget:null,migrated:!!migrated,recovered:!!raw};
}
export function readPetBudget(raw){
 try{const value=JSON.parse(raw);if(value&&Number.isSafeInteger(value.used)&&value.used>=0&&Number.isSafeInteger(value.bonus)&&value.bonus>=0)return{used:value.used,bonus:value.bonus};}catch{}
 return{used:0,bonus:0};
}
