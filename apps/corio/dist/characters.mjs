const asset=file=>new URL('./assets/'+file,import.meta.url).href;
let serial=0;
function croppedImage(file,view,size){
  const clip='corio-crop-'+(++serial);
  return`<defs><clipPath id="${clip}"><rect x="${view[0]}" y="${view[1]}" width="${view[2]}" height="${view[3]}"/></clipPath></defs><image href="${asset(file)}" width="${size[0]}" height="${size[1]}" clip-path="url(#${clip})"/>`;
}
export const CAT_POSES={
  attentive:[104,21,373,505],cautious:[502,124,563,377],lookback:[1119,57,365,449],
  stretch:[31,562,555,374],loaf:[603,570,406,365],sleep:[1037,623,487,292]
};
// SVG viewBox uses the untouched high-resolution PNG; there are no low-res cutouts.
export function catFigure(pose='attentive',{className='',label='Белый голубоглазый бобтейл с коротким серым хвостиком',x,y,width,height,id,flipX=false}={}){
  const crop=CAT_POSES[pose],file=crop?'cat-reactions-alpha-v1.png':pose==='wet'?'cat-wet-v1.png':pose==='towel'?'cat-towel-v1.png':'player-v1.png';
  const view=crop||[0,0,1254,1254],size=crop?[1536,1024]:[1254,1254];
  const drawing=croppedImage(file,view,size);
  return`<svg ${id?`id="${id}"`:''} class="cat-figure ${className}" data-cat-pose="${pose}" viewBox="${view.join(' ')}" ${x!==undefined?`x="${x}" y="${y}" width="${width}" height="${height}"`:''} role="img" aria-label="${label}" preserveAspectRatio="xMidYMax meet" overflow="hidden">${flipX?`<g transform="translate(${view[0]*2+view[2]} 0) scale(-1 1)">${drawing}</g>`:drawing}</svg>`;
}
const shapes=[[129,140,310,291],[616,215,310,198],[1126,156,298,267],[122,643,306,233],[593,654,374,222],[1144,657,273,210]];
export function litterShape(index){return`<svg class="litter-shape" viewBox="${shapes[index].join(' ')}" aria-hidden="true">${croppedImage('litter-pairs-atlas-v1.png',shapes[index],[1536,1024])}</svg>`;}

const foodCrops={"dry":[18,101,361,248],"wet":[433,18,299,339],"treat":[803,120,303,221],"water":[1156,111,359,233],"chicken":[17,393,378,274],"chocolate":[414,394,339,256],"onion":[810,340,284,348],"garlic":[1198,368,296,312],"coffee":[32,690,334,276],"bone":[392,695,375,266],"raw":[776,701,376,279],"candy":[1177,708,343,252]};
export function foodFigure(kind){const crop=foodCrops[kind];return`<svg class="food-figure" viewBox="${crop.join(' ')}" aria-hidden="true">${croppedImage('food-atlas-v1.png',crop,[1536,1024])}</svg>`;}

const walkCrops=[[38,134,550,420],[666,140,550,420],[50,718,550,420],[671,718,550,420]];
export function catWalkFrame(frame=0,{id,x,y,width=86,height=65.67}={}){
  const crop=walkCrops[frame%4],clip='cat-walk-'+(++serial);
  return`<svg ${id?`id="${id}"`:''} class="cat-figure walking-cat" data-walk-frame="${frame%4}" data-facing="right" viewBox="${crop.join(' ')}" x="${x}" y="${y}" width="${width}" height="${height}" overflow="hidden" role="img" aria-label="Белый бобтейл идёт вправо"><defs><clipPath id="${clip}"><rect data-walk-clip x="${crop[0]}" y="${crop[1]}" width="550" height="420"/></clipPath></defs><g data-walk-direction><image href="${asset('cat-walk-right-v1.png')}" width="1254" height="1254" clip-path="url(#${clip})"/></g></svg>`;
}
export function setCatWalkFrame(element,frame,facing='right'){
  const index=frame%4,crop=walkCrops[index];element.setAttribute('viewBox',crop.join(' '));element.dataset.walkFrame=index;element.dataset.facing=facing;
  const rect=element.querySelector('[data-walk-clip]');rect.setAttribute('x',crop[0]);rect.setAttribute('y',crop[1]);
  element.querySelector('[data-walk-direction]').setAttribute('transform',facing==='left'?`translate(${crop[0]*2+550} 0) scale(-1 1)`:'');
}
