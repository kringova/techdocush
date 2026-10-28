// Contact cues follow the real activity/approach; there is no background clock.
export function createPetFeedback({scene,feedback,blocked,isApproaching}){
 let pending=null;
 const selectors={food:'[data-care="food"] .pet-object-hit',water:'[data-care="water"] .pet-object-hit',play:'[data-care="play"] .pet-object-hit',scratch:'[data-care="scratch"] .pet-object-hit',rest:'[data-care="rest"] .pet-object-hit',brush:'[data-pet-zone="body"]',scritch:'[data-pet-zone="ear"]'};
 function capture(type,index){
  const node=type==='scoop'?scene.querySelector(`[data-pet-clump="${index}"] .pet-clump-hit`):null;
  if(!node)return null;const r=node.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};
 }
 function emit(event,point=null){
  if(blocked())return;
  const kind=event.slice(4),alias={eat:'food',drink:'water',wake:'rest',treat:'scritch',grumble:'scritch',queasy:'scritch'}[kind]||kind;
  const target=scene.querySelector(selectors[alias]||'.pet-cat-hit');
  feedback.emit(event,{target,point});
 }
 function defer(event,state){
  if(isApproaching())pending={event,activity:state.activity};else emit(event);
 }
 function changed(before,after,{type,index,point}={}){
  if(before===after)return;
  if(pending&&pending.activity!==after.activity)pending=null;
  if(type==='scoop'&&after.care.scoop>before.care.scoop)emit('pet.scoop',point);
  else if(['food','water'].includes(type)&&after.care[type]>before.care[type])emit('pet.'+type);
  else if(type==='brush'&&after.care.brush>before.care.brush)defer('pet.brush',after);
  else if(type==='pet'&&after.care.pet>before.care.pet)defer('pet.scritch',after);
  if(before.activity===after.activity&&before.asleep===after.asleep)return;
  const kind={eat:'eat',drink:'drink',treat:'treat',sleep:'rest',grumble:'grumble',queasy:'queasy'}[after.activity]||(before.asleep&&!after.asleep?'wake':null);
  if(kind)defer('pet.'+kind,after);
  // Reduced motion still receives an immediate accepted-action confirmation.
  if(['play','tease','scratch'].includes(after.activity)&&scene.ownerDocument.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches)defer('pet.'+after.activity,after);
 }
 function arrived(state){const current=pending;pending=null;if(current&&current.activity===state.activity)emit(current.event);}
 function contact(activity){if(['play','tease','scratch'].includes(activity))emit('pet.'+activity);}
 function cancel(){pending=null;feedback.cancel();}
 return{capture,changed,arrived,contact,cancel};
}
