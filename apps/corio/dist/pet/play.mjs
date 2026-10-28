// Finite reactions to one play activity. WAAPI owns interpolation; no frame loop.
// Hooks are plain groups: body/toy in scene units, paw in raw atlas coordinates.
export function createPetPlay({scene,blocked=()=>false,isApproaching=()=>false,onContact=()=>{}}){
 const doc=scene.ownerDocument,win=doc.defaultView;
 const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');
 let current=null,lastState=null;
 function cancel(){
  const old=current;current=null;
  if(old){for(const timer of old.contacts)win.clearTimeout(timer);for(const animation of old.animations)animation.cancel();}
  scene.removeAttribute('data-pet-play-active');
 }
 function stop(){cancel();lastState=null;}
 function eligible(state){return ['play','tease','scratch'].includes(state?.activity)&&Number.isFinite(state.activityLeft)&&state.activityLeft>0&&!blocked()&&!isApproaching()&&!doc.hidden&&!reduced.matches;}
 function sync(state){
  lastState=state;
  if(!eligible(state)){cancel();return;}
  const scratch=state.activity==='scratch',tease=state.activity==='tease';
  const body=scene.querySelector('[data-pet-play-body]'),paw=scene.querySelector('[data-pet-play-paw]'),toy=scratch?null:scene.querySelector(tease?'[data-pet-teaser]':'[data-pet-toy]');
  if(!body||!paw||!scratch&&!toy||![body,paw,toy].filter(Boolean).every(element=>element.isConnected&&typeof element.animate==='function')){cancel();return;}
  const episode=state.activity+':'+(state.care?.[state.activity]??0);
  // Keep a naturally completed record until activity/DOM changes. A clock render
  // just before the reducer completes must not create another short tap.
  if(current&&current.body===body&&current.paw===paw&&current.toy===toy&&current.episode===episode)return;
  cancel();
  const duration=Math.min(6000,state.activityLeft*1000);
  if(duration<450)return;
  const taps=Math.max(1,Math.min(3,Math.floor(duration/1400))),frames={body:[],paw:[],toy:[]};
  // The paw rises first; the ball starts moving only after contact at phase .42.
  const phases=[
   [0,0,0,0,0,0,0],
   [.12,3,-1,6,0,0,0],
   [.25,8,-2,14,0,0,0],
   [.38,10,-1,1,0,0,0],
   [.43,9,0,-2,3,-1,4],
   [.61,4,0,0,18,-5,25],
   [.8,0,0,0,25,0,39],
   [1,0,0,0,0,0,0]
  ];
  for(let tap=0;tap<taps;tap++)for(const [phase,x,y,angle,tx,ty,roll]of phases){
   if(tap>0&&phase===0)continue;
   const offset=(tap+phase)/taps;
   frames.body.push({offset,transform:`translate(${scratch?-x*.4:x}px,${y}px)`});
   // This layer is inside the atlas mirror. Positive raw rotation raises its
   // forepaw; applying another flip here would turn it away from the toy.
   frames.paw.push({offset,transform:`translate(235px,815px) rotate(${angle}deg) translate(-235px,-815px)`});
   frames.toy.push({offset,transform:`translate(${tease?tx*.6:tx}px,${tease?ty*2:ty}px) rotate(${tease?roll/8:roll}deg)`});
  }
  const record={body,paw,toy,episode,animations:[],contacts:[],finished:false};current=record;
  try{
   for(const [name,element]of Object.entries({body,paw,toy})){
    if(!element)continue;
    const bounds=name==='toy'?element.getBBox():null;
    const origin=name==='toy'?`${bounds.x+bounds.width/2}px ${bounds.y+bounds.height/2}px`:'0px 0px';
    const keyframes=frames[name].map(frame=>({...frame,transformBox:'view-box',transformOrigin:origin,easing:'ease-in-out'}));
    record.animations.push(element.animate(keyframes,{duration,iterations:1,fill:'none',easing:'linear'}));
   }
  }catch{cancel();return;}
  for(let tap=0;tap<taps;tap++)record.contacts.push(win.setTimeout(()=>{if(current===record&&!blocked()&&!doc.hidden&&!reduced.matches)onContact(state.activity);},(tap+.43)/taps*duration));
  scene.setAttribute('data-pet-play-active','true');
  Promise.all(record.animations.map(animation=>animation.finished.catch(()=>{}))).then(()=>{
   if(current!==record)return;
   record.finished=true;scene.removeAttribute('data-pet-play-active');
  });
 }
 function resume(){if(lastState)sync(lastState);}
 doc.addEventListener('visibilitychange',()=>{if(doc.hidden)cancel();else resume();});
 win.addEventListener('blur',cancel);win.addEventListener('focus',resume);
 reduced.addEventListener('change',()=>{if(reduced.matches)cancel();else resume();});
 // Root normally calls stop before replacing the SVG. This also covers a
 // replacement by another view owner without animating detached old nodes.
 const observer=new win.MutationObserver(()=>{
  if(current&&![current.body,current.paw,current.toy].filter(Boolean).every(element=>element.isConnected&&scene.contains(element)))cancel();
 });
 observer.observe(scene,{childList:true,subtree:true});
 return{sync,stop};
}
