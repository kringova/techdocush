import {SEARCH_SOURCE_SHAPES} from './search-source-shapes.mjs?v=0.14.1';
import {placeSearchObject} from './search-layout.mjs?v=0.14.1';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
let serial=0;
export const sourceProp=(scene,id)=>{
  const s=SEARCH_SOURCE_SHAPES[scene];
  const shape=s.items[id];
  return{...shape,image:s.image,source:scene+'/'+id,floorY:scene==='room'&&id==='book'?463:shape.bounds[1]+shape.bounds[3]};
};
const paths=(shape,extra='')=>shape.paths.map(p=>`<path d="${p.d}" fill-rule="${p.fillRule}" clip-rule="${p.fillRule}" ${extra}/>`).join('');
export function searchPropGeometry(item){
  const [scene,id]=item.source.split('/');return sourceProp(scene,id);
}
export function exactSearchSilhouette(item){
  const shape=searchPropGeometry(item);
  return `<svg class="search-silhouette" viewBox="${shape.bounds.join(' ')}" data-shape-source="${shape.source}" aria-hidden="true">${paths(shape)}</svg>`;
}
export function movableSearchProp(item,level){
  const shape=searchPropGeometry(item),p=placeSearchObject(level.scene,level.layout[item.id],shape.bounds,shape.floorY),key='source-prop-'+(++serial);
  const floor=p.y+(shape.floorY-shape.bounds[1])*p.scale,cx=p.x+p.width/2;
  const hanging=level.scene==='room'&&p.slot===9?{x:985,y:12}:level.scene==='kitchen'&&p.slot===10?{x:985,y:20}:level.scene==='kitchen'&&p.slot===11?{x:248,y:25}:level.scene==='yard'&&p.slot===8?{x:1425,y:39}:null;
  const attachY=item.id==='flowerpot'?p.y+(650-shape.bounds[1])*p.scale:p.y+4;
  const support=hanging?`<path d="M${hanging.x} ${hanging.y} L${cx} ${attachY}" fill="none" stroke="#bba777" stroke-width="2"/><circle cx="${hanging.x}" cy="${hanging.y}" r="3" fill="#173744"/>`:`<ellipse cx="${cx+2}" cy="${floor+1}" rx="${Math.min(35,p.width*.26)}" ry="${Math.min(3.5,p.height*.04)}" fill="#112d3829"/>`;
  return{placement:p,shape,svg:`${support}<svg x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" viewBox="${shape.bounds.join(' ')}" data-shape-source="${shape.source}" overflow="visible"><defs><clipPath id="${key}" clipPathUnits="userSpaceOnUse">${paths(shape)}</clipPath></defs><image href="${asset(shape.image)}" width="1536" height="1024" clip-path="url(#${key})"/></svg>`};
}
export function repairSearchBackground(scene){
  const shapes=SEARCH_SOURCE_SHAPES[scene],key='old-props-'+(++serial);
  // Cleanplates are shown only around the removed props. All other accepted pixels stay original.
  // The room ball is occluded by cat fur: never expand its repair into the cat.
  const regions=Object.values(shapes.items).map(shape=>paths(shape,`fill="white" stroke="white" stroke-width="${shape.partial?0:18}" stroke-linejoin="round"`)).join('');
  return `<defs><mask id="${key}" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024"><rect width="1536" height="1024" fill="black"/>${regions}</mask></defs><image href="${asset('search-'+scene+'-cleanplate-v1.png')}" width="1536" height="1024" mask="url(#${key})" pointer-events="none"/>`;
}
