// Percent rectangles in a fixed bowl mouth. x/y are the unrotated top-left;
// rotation is around the rectangle centre, z increases towards the viewer.
export const FOOD_PILE_ASPECT=1.35;

// Original food-atlas-v1 crop sizes from characters.mjs. Keeping native aspect
// here makes the physical image box and its interaction ellipse agree.
const cropSizes={
  dry:[361,248],treat:[303,221],chicken:[378,274],wet:[299,339],
  raw:[376,279],bone:[375,266],candy:[343,252],chocolate:[339,256],
  onion:[284,348],garlic:[296,312]
};
const allTypes=['dry','treat','chicken','wet','raw','bone','candy','chocolate','onion','garlic'];
const anchors=[
  [50,28],[69,33],[77,50],[69,67],[50,72],[31,67],[23,50],[31,33],
  [42,43],[59,43],[42,59],[59,59]
];
const random=seed=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const round=value=>Math.round(value*1000)/1000;

function makeLevel(name,layers,types,seed){
  const rng=random(seed),items=Array.from({length:layers*anchors.length},(_,i)=>types[i%types.length]);
  for(let i=items.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[items[i],items[j]]=[items[j],items[i]];}
  const placements=items.map((type,id)=>{
    const layer=Math.floor(id/anchors.length),[ax,ay]=anchors[id%anchors.length];
    const width=round(17+7*rng()),[cropWidth,cropHeight]=cropSizes[type];
    const height=width*cropHeight/cropWidth*FOOD_PILE_ASPECT,angle=round((rng()-.5)*38);
    const radians=angle*Math.PI/180,c=Math.abs(Math.cos(radians)),s=Math.abs(Math.sin(radians));
    const halfX=(width*FOOD_PILE_ASPECT*c+height*s)/(2*FOOD_PILE_ASPECT);
    const halfY=(width*FOOD_PILE_ASPECT*s+height*c)/2;
    // Keep even the rotated native rectangle inside the bowl, rather than
    // trimming onion stems or the open tin's lid at the pile boundary.
    const cx=Math.max(10+halfX,Math.min(90-halfX,ax+(rng()-.5)*3));
    const cy=Math.max(10+halfY,Math.min(90-halfY,ay+(rng()-.5)*3));
    return{id,x:cx-width/2,y:cy-height/2,width,height,angle,z:id,layer};
  });
  return{name,items,placements,layers};
}

// Built once from fixed seeds. Restarting a bowl never generates a new pile.
export const FOOD_LEVELS=[
  makeLevel('Первая полная миска',2,['dry','treat','chicken','bone','candy','chocolate'],17561),
  makeLevel('Под верхним слоем',3,['dry','treat','chicken','wet','raw','bone','candy','chocolate'],27581),
  makeLevel('Полная миска',4,allTypes,37607),
  makeLevel('Плотная куча',5,allTypes,47623),
  makeLevel('Большая миска',6,allTypes,57649)
];

// Samples stay inside the footprint: a narrow visible outline alone does not
// make an otherwise covered item selectable. Three uncovered samples are a
// noticeable patch; the centre is not mandatory, and several items can qualify.
const probes=[
  [0,0],
  ...Array.from({length:8},(_,i)=>[.4*Math.cos(i*Math.PI/4),.4*Math.sin(i*Math.PI/4)]),
  ...Array.from({length:12},(_,i)=>[.8*Math.cos(i*Math.PI/6),.8*Math.sin(i*Math.PI/6)])
];
const geometry=p=>{
  const a=p.angle*Math.PI/180;
  return{x:(p.x+p.width/2)*FOOD_PILE_ASPECT,y:p.y+p.height/2,
    rx:p.width*FOOD_PILE_ASPECT/2,ry:p.height/2,c:Math.cos(a),s:Math.sin(a)};
};
function contains(ellipse,x,y){
  const dx=x-ellipse.x,dy=y-ellipse.y;
  const u=(dx*ellipse.c+dy*ellipse.s)/ellipse.rx;
  const v=(-dx*ellipse.s+dy*ellipse.c)/ellipse.ry;
  return u*u+v*v<=1;
}

export function foodIsExposed(remaining,level,id){
  if(!Number.isInteger(id)||!remaining.some(item=>item.id===id))return false;
  const placement=level.placements[id];
  if(!placement||placement.id!==id)return false;
  const target=geometry(placement),above=remaining.flatMap(item=>{
    const p=level.placements[item.id];
    return p&&p.z>placement.z?[geometry(p)]:[];
  });
  let visible=0;
  for(const[u,v]of probes){
    const px=u*target.rx,py=v*target.ry;
    const x=target.x+px*target.c-py*target.s,y=target.y+px*target.s+py*target.c;
    if(!above.some(ellipse=>contains(ellipse,x,y))&&++visible>=3)return true;
  }
  return false;
}
