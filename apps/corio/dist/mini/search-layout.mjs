// Slots are source-pixel rectangles in the accepted 1536 × 1024 paintings.
// Each object can use four fixed slots. A seeded matching assigns one per object.
export const SEARCH_SLOTS={
  room:[[55,625,150,100],[215,277,150,100],[710,455,130,90],[540,430,150,100],[1000,535,140,110],[1155,310,150,100],[1340,50,145,110],[35,825,165,130],[65,365,150,100],[900,42,140,120],[520,170,140,110],[175,130,130,115],[700,760,135,120]],
  kitchen:[[50,635,130,100],[670,240,130,80],[240,390,130,170],[944,414,110,100],[820,575,140,200],[1380,195,110,100],[1080,455,120,80],[180,650,135,110],[1220,480,220,95],[965,260,100,80],[900,35,130,180],[220,50,140,180],[730,820,150,110]],
  yard:[[400,385,220,180],[420,665,130,100],[650,565,135,100],[1240,390,140,90],[1360,510,165,240],[255,380,130,190],[350,790,150,100],[1020,380,150,100],[1360,5,150,190],[50,800,180,130],[1060,525,140,105],[70,545,145,100],[840,75,160,120]]
};
export function searchSlotsFor(index,scene){
  if(scene==='yard'){
    if([0,4,5,8].includes(index))return[0,4,5,8];
    const compact=[1,2,3,6,7,9,10,11,12],at=compact.indexOf(index);
    return[0,2,4,6].map(offset=>compact[(at+offset)%9]);
  }
  if(scene==='kitchen'&&[2,4].includes(index))return[2,4,10,11]; // hanging cloths keep their scale
  return[0,3,6,9].map(offset=>(index+offset)%13);
}
function random(seed){let n=seed>>>0;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
function shuffle(values,rng){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function searchLayout(items,seed,scene){
  const rng=random(seed),occupied=Array(13).fill(-1),result=Array(13).fill(-1);
  const choices=items.map((_,i)=>shuffle(searchSlotsFor(i,scene),rng));
  function assign(index,visited){
    for(const slot of choices[index]){
      if(visited.has(slot))continue;visited.add(slot);
      if(occupied[slot]<0||assign(occupied[slot],visited)){occupied[slot]=index;result[index]=slot;return true;}
    }
    return false;
  }
  for(const index of shuffle(items.map((_,i)=>i),rng))if(!assign(index,new Set()))throw new Error('Search layout has no complete matching');
  return Object.fromEntries(items.map((item,index)=>[item.id,result[index]]));
}
export function placeSearchObject(scene,slot,bounds,floorY=bounds[1]+bounds[3]){
  const [x,y,width,height]=SEARCH_SLOTS[scene][slot],scale=Math.min(width/bounds[2],height/bounds[3],1.08);
  const w=bounds[2]*scale,h=bounds[3]*scale;
  return{x:x+(width-w)/2,y:y+height-(floorY-bounds[1])*scale,width:w,height:h,slot,scale};
}
