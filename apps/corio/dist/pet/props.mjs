import {PET_RIBBON_SHAPE} from './ribbon-shape.mjs?v=0.26.0';
import {litterShape} from '../characters.mjs?v=0.26.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
let serial=0;
export function petProp(kind,x,y,width,height){
 const crop=kind==='scratch'?[154,516,946,280]:[144,439,967,444];
 const file=kind==='scratch'?'pet-scratchpad-alpha-v1.png':'pet-litter-tray-alpha-v1.png';
 return `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${crop.join(' ')}" aria-hidden="true"><image href="${asset(file)}" width="1254" height="1254"/></svg>`;
}
export function petRibbon(x,y,width=80){
 const shape=PET_RIBBON_SHAPE,id='pet-ribbon-'+(++serial);
 return `<g data-pet-teaser><path d="M${x+18} ${y-85}Q${x+35} ${y-32} ${x} ${y-12}" fill="none" stroke="#e4c998" stroke-width="3"/><svg x="${x-width/2}" y="${y-width*100/144/2}" width="${width}" height="${width*100/144}" viewBox="${shape.bounds.join(' ')}" overflow="visible"><defs><clipPath id="${id}">${shape.paths.map(p=>`<path d="${p.d}" fill-rule="${p.fillRule}"/>`).join('')}</clipPath></defs><image href="${asset(shape.image)}" width="1536" height="1024" clip-path="url(#${id})"/></svg></g>`;
}
export function petToolPreview(tool){
 let drawing='';
 if(tool==='brush')drawing=`<image href="${asset('brush-v1.png')}" x="-34" y="-34" width="105" height="105"/>`;
 if(tool==='scritch')drawing='<circle r="15" fill="#f4ead420" stroke="#f1d39d" stroke-width="2" stroke-dasharray="3 4"/>';
 if(tool==='tease')drawing=petRibbon(0,0,70);
 if(tool==='scoop')drawing='<g transform="rotate(-25)"><path d="M10 0V72" stroke="#173744" stroke-width="14" stroke-linecap="round"/><path d="M10 0V72" stroke="#c79551" stroke-width="8" stroke-linecap="round"/><path d="M-22-25H42L33 16H-13Z" fill="#9cafa0" stroke="#173744" stroke-width="3"/>'+[-8,3,14,25].map(x=>`<path d="M${x}-15L${x-2} 7" stroke="#173744" stroke-width="4" stroke-linecap="round"/>`).join('')+'</g>';
 return `<g data-pet-tool-preview opacity="0" pointer-events="none">${drawing}</g>`;
}
export function petTray(state,box,{close=false,front=false}={}){
 const [x,y,w,h]=box,id='pet-tray-front-'+(++serial),drawing=petProp('litter',...box);
 if(front)return `<g data-pet-tray-front pointer-events="none"><defs><clipPath id="${id}"><rect x="${x}" y="${y+h*.66}" width="${w}" height="${h*.34}"/></clipPath></defs><g clip-path="url(#${id})">${drawing}</g></g>`;
 const points=[[.29,.43],[.61,.4],[.43,.58],[.78,.57]];
 const clumps=state.litter.slots.map((dirty,i)=>{
  if(!dirty)return'';const [px,py]=points[i],cw=w*.12,ch=h*.18,cx=x+w*px,cy=y+h*py;
  return `<g data-pet-clump="${i}" role="button" tabindex="${close?0:-1}" aria-label="Убрать комочек ${i+1}"><rect class="pet-clump-hit" x="${cx-cw/2}" y="${cy-ch/2}" width="${cw}" height="${ch}" rx="10" fill="transparent"/><svg x="${cx-cw/2}" y="${cy-ch/2}" width="${cw}" height="${ch}" pointer-events="none">${litterShape(i)}</svg></g>`;
 }).join('');
 return `<g ${close?'data-pet-tray-close':'data-care="litter" role="button" tabindex="0" aria-label="Убрать лоток"'}>${close?'':`<rect class="pet-object-hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="20"/>`}${drawing}${clumps}</g>`;
}
