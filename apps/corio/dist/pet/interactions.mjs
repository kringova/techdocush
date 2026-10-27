// Intentional, finite care gestures. Model changes belong to the caller.
const GESTURES=Object.freeze({
 brush:{zone:'body',distance:80,duration:200},
 scritch:{zone:'ear',distance:40,duration:180},
 tease:{zone:'tease',distance:100,duration:300},
 scoop:{zone:null,distance:0,duration:0}
});
const ARROWS={ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]};

export function createPetInteractions({scene,getTool=()=>null,blocked=()=>false,available=()=>true,onCommit=()=>{},onHoldChange=()=>{}}){
 const doc=scene.ownerDocument,win=doc.defaultView;
 let hold=null,virtual=null,frame=null,pendingPreview=null,suppressUntil=0,lastTool=null;
 const now=()=>win.performance.now();
 const tool=()=>{const value=getTool();return Object.hasOwn(GESTURES,value)?value:null;};
 const painting=()=>scene.querySelector('.pet-painting')||scene.querySelector('svg');
 const usable=value=>!!value&&!doc.hidden&&!blocked()&&available(value);
 const stop=event=>{event.preventDefault();event.stopImmediatePropagation();};
 const suppressClick=()=>{suppressUntil=now()+750;};
 function consumeClick(){const consume=now()<=suppressUntil&&suppressUntil!==0;suppressUntil=0;return consume;}
 function pointIn(element,x,y){
  try{
   const matrix=element.getScreenCTM();if(!matrix)return false;
   const point=new win.DOMPoint(x,y).matrixTransform(matrix.inverse());
   if(typeof element.isPointInFill==='function')return element.isPointInFill(point);
   // A zone may be a group, but only actual child geometry counts.
   return [...element.querySelectorAll('path,rect,circle,ellipse,polygon,polyline')].some(child=>pointIn(child,x,y));
  }catch{return false;}
 }
 function svgPoint(svg,x,y){
  try{const matrix=svg?.getScreenCTM();return matrix?new win.DOMPoint(x,y).matrixTransform(matrix.inverse()):null;}catch{return null;}
 }
 function screenPoint(svg,x,y){
  try{const matrix=svg?.getScreenCTM();return matrix?new win.DOMPoint(x,y).matrixTransform(matrix):null;}catch{return null;}
 }
 function zoneFor(value,svg=painting()){return svg?.querySelector(`[data-pet-zone="${GESTURES[value]?.zone}"]`)||null;}
 function clumpAt(x,y){
  const clump=doc.elementFromPoint(x,y)?.closest?.('[data-pet-clump]');
  return clump&&scene.contains(clump)&&/^[0-3]$/.test(clump.dataset.petClump)?clump:null;
 }
 function live(current){return current.svg===painting()&&current.svg?.isConnected&&scene.contains(current.zone)&&current.tool===tool()&&usable(current.tool);}
 function clearPreview(){
  if(frame!==null){win.cancelAnimationFrame(frame);frame=null;}
  pendingPreview=null;
  const old=hold?.preview;
  if(old){old.element.setAttribute('opacity','0');if(old.transform===null)old.element.removeAttribute('transform');else old.element.setAttribute('transform',old.transform);}
 }
 function cancel(){
  if(!hold){if(frame!==null){win.cancelAnimationFrame(frame);frame=null;}pendingPreview=null;return;}
  const current=hold;clearPreview();hold=null;
  // A replacement view may have copied the active preview's attributes.
  for(const preview of scene.querySelectorAll('[data-pet-tool-preview]'))preview.setAttribute('opacity','0');
  if(current.pointer!==null){
   suppressClick();
   try{if(scene.hasPointerCapture(current.pointer))scene.releasePointerCapture(current.pointer);}catch{}
  }
  onHoldChange(false);
 }
 function previewAt(x,y){
  if(!hold?.preview)return;
  pendingPreview={x,y};
  if(frame!==null)return;
  frame=win.requestAnimationFrame(()=>{
   frame=null;const position=pendingPreview;pendingPreview=null;
   if(!hold||!position||!live(hold)){cancel();return;}
   const preview=hold.preview.element,parent=preview.parentElement;
   const point=svgPoint(parent,position.x,position.y);if(!point)return;
   preview.setAttribute('transform',`translate(${point.x} ${point.y})`);
   preview.setAttribute('opacity','1');
  });
 }
 function start(value,zone,svg,x,y,pointer,input){
  const preview=svg.querySelector('[data-pet-tool-preview]');
  const at=now();
  hold={tool:value,zone,svg,pointer,input,start:at,lastAt:at,lastX:x,lastY:y,startX:x,startY:y,distance:0,insideTime:0,inZone:true,maxTravel:0,
   index:value==='scoop'?Number(zone.dataset.petClump):null,
   preview:preview?{element:preview,transform:preview.getAttribute('transform')}:null};
  onHoldChange(true);
  // The caller may synchronously replace the scene while freezing its clock.
  if(!hold||!live(hold)){cancel();return false;}
  if(pointer!==null)try{scene.setPointerCapture(pointer);}catch{}
  previewAt(x,y);return true;
 }
 function update(x,y){
  if(!hold)return false;
  const current=hold,time=now(),distance=Math.hypot(x-current.lastX,y-current.lastY);
  if(!live(current)||distance>100){cancel();return false;}
  const inside=current.tool==='scoop'?clumpAt(x,y)===current.zone:pointIn(current.zone,x,y);
  let uninterrupted=current.inZone&&inside;
  // Do not count a straight segment that cuts across an irregular zone's gap.
  if(uninterrupted&&current.tool!=='scoop')for(let step=1,count=Math.ceil(distance/8);step<count;step++){
   if(!pointIn(current.zone,current.lastX+(x-current.lastX)*step/count,current.lastY+(y-current.lastY)*step/count)){uninterrupted=false;break;}
  }
  if(uninterrupted){current.distance+=distance;current.insideTime+=Math.max(0,time-current.lastAt);}
  current.maxTravel=Math.max(current.maxTravel,Math.hypot(x-current.startX,y-current.startY));
  current.lastX=x;current.lastY=y;current.lastAt=time;current.inZone=inside;
  previewAt(x,y);return true;
 }
 function finish(x,y){
  if(!update(x,y)||!hold)return;
  const current=hold,rule=GESTURES[current.tool],position=svgPoint(current.svg,x,y);
  const accepted=current.inZone&&position&&(current.tool==='scoop'
   ?current.maxTravel<=12&&clumpAt(x,y)===current.zone
   :current.distance>=rule.distance&&current.insideTime>=rule.duration);
  const payload=position?{x:position.x,y:position.y,...(current.tool==='scoop'?{index:current.index}:{})}:null;
  cancel();
  if(accepted)onCommit(current.tool,payload);
 }
 function sync(){
  const selected=tool();
  if(selected!==lastTool){cancel();virtual=null;lastTool=selected;}
  if(hold&&!live(hold))cancel();
  if(virtual&&(virtual.svg!==painting()||!scene.contains(virtual.zone)||!usable(selected)))virtual=null;
  // New view markup always starts with an invisible preview.
  if(!hold)for(const preview of scene.querySelectorAll('[data-pet-tool-preview]'))if(preview.getAttribute('opacity')!=='0')preview.setAttribute('opacity','0');
 }
 function down(event){
  if(event.button!==0||event.isPrimary===false)return;
  sync();const selected=tool();if(!selected)return;
  stop(event);suppressClick();
  if(hold||!usable(selected))return;
  const svg=painting(),zone=selected==='scoop'?clumpAt(event.clientX,event.clientY):zoneFor(selected,svg);
  if(!svg||!zone||(selected!=='scoop'&&!pointIn(zone,event.clientX,event.clientY)))return;
  start(selected,zone,svg,event.clientX,event.clientY,event.pointerId,'pointer');
 }
 function move(event){
  if(!hold||hold.input!=='pointer'||hold.pointer!==event.pointerId)return;
  stop(event);
  if(event.pointerType==='mouse'&&event.buttons===0){cancel();return;}
  update(event.clientX,event.clientY);
 }
 function up(event){
  if(!hold||hold.input!=='pointer'||hold.pointer!==event.pointerId)return;
  stop(event);finish(event.clientX,event.clientY);
 }
 function interrupted(event){if(hold?.input==='pointer'&&event.pointerId===hold.pointer){stop(event);cancel();}}
 function centre(zone,svg){
  try{
   // A clipped raster can make a group's bbox include its entire source atlas.
   // The explicit hit rectangle describes the visible clump instead.
   const geometry=zone.matches?.('[data-pet-clump]')?(zone.querySelector('.pet-clump-hit')||zone):zone;
   const bounds=geometry.getBBox(),matrix=geometry.getScreenCTM();if(!matrix)return null;
   for(const [rx,ry]of [[.5,.5],[.25,.5],[.75,.5],[.5,.25],[.5,.75],[.25,.25],[.75,.75]]){
    const position=new win.DOMPoint(bounds.x+bounds.width*rx,bounds.y+bounds.height*ry).matrixTransform(matrix);
    if(pointIn(zone,position.x,position.y))return svgPoint(svg,position.x,position.y);
   }
  }catch{}
  return null;
 }
 function keyboard(event){
  if(event.key==='Escape'){if(hold){stop(event);cancel();}return;}
  if(!ARROWS[event.key]&&!['Enter',' '].includes(event.key))return;
  if(event.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;
  sync();const selected=tool();if(!selected)return;
  stop(event);
  if(!usable(selected)||hold?.input==='pointer')return;
  const svg=painting();if(!svg)return;
  if(selected==='scoop'){
   const clumps=[...svg.querySelectorAll('[data-pet-clump]')].filter(node=>/^[0-3]$/.test(node.dataset.petClump));
   if(ARROWS[event.key]){
    if(!clumps.length)return;
    const index=clumps.indexOf(virtual?.zone),direction=['ArrowLeft','ArrowUp'].includes(event.key)?-1:1;
    const zone=clumps[index<0?0:(index+direction+clumps.length)%clumps.length],position=centre(zone,svg);
    if(position){virtual={tool:selected,zone,svg,x:position.x,y:position.y};zone.focus?.({preventScroll:true});}
   }else if(!event.repeat){
    const target=event.target.closest?.('[data-pet-clump]'),zone=target&&scene.contains(target)?target:virtual?.zone;
    if(!zone||!clumps.includes(zone))return;
    const position=centre(zone,svg),screen=position&&screenPoint(svg,position.x,position.y);
    if(!screen||clumpAt(screen.x,screen.y)!==zone)return;
    suppressClick();onCommit('scoop',{index:Number(zone.dataset.petClump),x:position.x,y:position.y});
   }
   return;
  }
  const zone=zoneFor(selected,svg);if(!zone)return;
  if(ARROWS[event.key]){
   if(!virtual||virtual.tool!==selected||virtual.zone!==zone){const position=centre(zone,svg);if(!position)return;virtual={tool:selected,zone,svg,x:position.x,y:position.y};}
   const origin=screenPoint(svg,virtual.x,virtual.y);if(!origin)return;
   if(!hold&&!start(selected,zone,svg,origin.x,origin.y,null,'keyboard'))return;
   const [dx,dy]=ARROWS[event.key],x=origin.x+dx,y=origin.y+dy;
   if(!pointIn(zone,x,y))return;
   const position=svgPoint(svg,x,y);if(!position)return;
   if(update(x,y)){virtual.x=position.x;virtual.y=position.y;}
  }else if(!event.repeat&&hold?.input==='keyboard'){
   const position=screenPoint(svg,virtual.x,virtual.y);suppressClick();if(position)finish(position.x,position.y);else cancel();
  }
 }
 scene.addEventListener('pointerdown',down,{capture:true,passive:false});
 win.addEventListener('pointermove',move,{capture:true,passive:false});
 win.addEventListener('pointerup',up,{capture:true,passive:false});
 win.addEventListener('pointercancel',interrupted,{capture:true,passive:false});
 scene.addEventListener('lostpointercapture',interrupted,{capture:true,passive:false});
 scene.addEventListener('click',event=>{if(consumeClick()||tool())stop(event);},{capture:true});
 scene.addEventListener('keydown',keyboard,{capture:true});
 doc.addEventListener('keydown',event=>{if(event.key==='Escape'&&hold){stop(event);cancel();}},{capture:true});
 win.addEventListener('blur',cancel);
 doc.addEventListener('visibilitychange',()=>{if(doc.hidden)cancel();});
 const observer=new win.MutationObserver(()=>{if(hold&&!live(hold))cancel();});
 observer.observe(scene,{childList:true,subtree:true});
 if(scene.parentNode)observer.observe(scene.parentNode,{childList:true});
 sync();
 return{sync,cancel,isHolding:()=>!!hold,consumeClick,state:()=>({
  holding:!!hold,tool:hold?.tool??tool(),input:hold?.input??null,pointer:hold?.pointer??null,
  distance:hold?.distance??0,duration:hold?hold.insideTime+(hold.inZone?Math.max(0,now()-hold.lastAt):0):0,
  inZone:hold?.inZone??false,index:hold?.index??null,
  keyboardPoint:virtual?{x:virtual.x,y:virtual.y,index:virtual.tool==='scoop'?Number(virtual.zone.dataset.petClump):null}:null,
  previewPending:frame!==null
 })};
}
