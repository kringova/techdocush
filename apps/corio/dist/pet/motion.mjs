import {catWalkFrame,setCatWalkFrame} from '../characters.mjs?v=0.23.1';

// At most fourteen low-frequency frames per approach; no idle animation loop.
export function createPetApproach({scene,blocked}){
 let timer=null,moving=null;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function anchor(){
  if(moving)return {...moving.position};
  const cat=scene.querySelector('.pet-character');
  return cat?{x:+cat.dataset.petFootX,y:+cat.dataset.petFootY,place:cat.dataset.petActionPose}:null;
 }
 function stop(){
  clearTimeout(timer);timer=null;
  if(moving){moving.target.style.removeProperty('visibility');moving.group.remove();moving=null;}
 }
 function move(from){
  stop();const target=scene.querySelector('.pet-character'),to=anchor();
  if(!from||!to||!target||from.place===to.place||blocked()||reduced.matches)return;
  const distance=Math.hypot(to.x-from.x,to.y-from.y);if(distance<15)return;
  const svg=scene.querySelector('.pet-painting'),group=document.createElementNS('http://www.w3.org/2000/svg','g');
  group.dataset.petWalking='true';group.setAttribute('pointer-events','none');group.setAttribute('aria-hidden','true');
  group.innerHTML=catWalkFrame(0,{x:0,y:0,width:245,height:245*420/550});
  svg.insertBefore(group,svg.querySelector('[data-pet-bed-front]'));
  const walker=group.querySelector('.walking-cat'),facing=to.x<from.x?'left':'right';
  const duration=Math.min(1100,Math.max(400,distance*1.7)),start=performance.now();
  target.style.visibility='hidden';moving={target,group,position:{...from,place:'walking'}};
  function frame(){
   timer=null;if(blocked()||reduced.matches){stop();return;}
   const elapsed=performance.now()-start,t=Math.min(1,elapsed/duration);
   const x=from.x+(to.x-from.x)*t,y=from.y+(to.y-from.y)*t;
   moving.position={x,y,place:'walking'};group.dataset.progress=String(t);group.dataset.footX=String(x);group.dataset.footY=String(y);
   group.setAttribute('transform',`translate(${x-122.5} ${y-245*420/550})`);
   setCatWalkFrame(walker,Math.floor(elapsed/90),facing);
   if(t>=1)stop();else timer=setTimeout(frame,90);
  }
  frame();
 }
 reduced.addEventListener('change',()=>{if(reduced.matches)stop();});
 return{anchor,move,stop};
}
