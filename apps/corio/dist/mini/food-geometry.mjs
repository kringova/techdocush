// Unchanged physical ellipse/probe rules from food prototype015.
export const FOOD_PILE_ASPECT=1.35;
export const FOOD_CROP_SIZES={dry:[361,248],treat:[303,221],chicken:[378,274],wet:[299,339],raw:[376,279],bone:[375,266],candy:[343,252],chocolate:[339,256],onion:[284,348],garlic:[296,312]};
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
