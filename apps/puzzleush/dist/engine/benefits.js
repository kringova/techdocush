// Platform benefits live outside gameplay undo snapshots. No purchases or SDK
// mocks: a grant is called only by the platform's confirmed reward callback.
export function createBenefits(storage,key){
 const empty=()=>({version:1,hints:0,candidates:{},readHints:{},attempts:{},receipts:[]});
 let state=empty();
 const raw=storage.getItem(key);
 if(raw){
  const x=JSON.parse(raw);
  if(x.version!==1||!Number.isSafeInteger(x.hints)||x.hints<0||!Array.isArray(x.receipts)||!x.receipts.every(v=>typeof v==='string'))throw Error('Invalid benefits');
  for(const field of ['candidates','readHints','attempts'])if(!x[field]||typeof x[field]!=='object'||Array.isArray(x[field]))throw Error('Invalid benefits');
  for(const a of Object.values(x.attempts))if(!a||typeof a.id!=='string'||!Number.isInteger(a.errors)||a.errors<0||a.errors>4||!['playing','paused','finished'].includes(a.status))throw Error('Invalid attempt');
  state=x;
 }
 const write=change=>{const next=structuredClone(state),result=change(next);storage.setItem(key,JSON.stringify(next));state=next;return result;};
 const once=(receipt,change)=>{
  if(state.receipts.includes(receipt))return false;
  return write(s=>{change(s);s.receipts.push(receipt);return true;});
 };
 return {
  snapshot:()=>structuredClone(state),
  hasCandidates:puzzle=>!!state.candidates[puzzle],
  grantCandidates:(puzzle,receipt)=>once(receipt,s=>{s.candidates[puzzle]=true;}),
  grantHints:receipt=>once(receipt,s=>{s.hints+=3;}),
  canRead:fingerprint=>!!state.readHints[fingerprint]||state.hints>0,
  readHint:fingerprint=>{
   if(state.readHints[fingerprint])return true;
   if(!state.hints)return false;
   return write(s=>{s.hints--;s.readHints[fingerprint]=true;return true;});
  },
  attempt:puzzle=>structuredClone(state.attempts[puzzle]||null),
  startAttempt:(puzzle,id)=>write(s=>{s.attempts[puzzle]={id,errors:0,status:'playing'};}),
  mistake:puzzle=>write(s=>{const a=s.attempts[puzzle];if(!a||a.status!=='playing')return false;a.errors++;if(a.errors===4)a.status='paused';return true;}),
  finish:puzzle=>write(s=>{if(s.attempts[puzzle])s.attempts[puzzle].status='finished';}),
  revive:(puzzle,id,receipt)=>{
   const a=state.attempts[puzzle];if(!a||a.id!==id||a.status!=='paused')return false;
   return once(receipt,s=>{s.attempts[puzzle].errors=0;s.attempts[puzzle].status='playing';});
  }
 };
}
