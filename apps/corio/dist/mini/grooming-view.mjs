import {GROOM_TEXTURE_FILE,GROOM_TEXTURE_SIZE,GROOM_TEXTURE_CROPS} from './grooming-crops.mjs?v=0.23.1';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
const freeze=value=>{for(const v of Object.values(value))if(v&&typeof v==='object')freeze(v);return Object.freeze(value);};
// Both approved wet and candidate dry images use the same 1254px seated camera.
// Masks stay below the face and outside the grey bobtail. No screen-space stickers.
export const GROOM_ZONES=freeze({
 shoulder:{name:'плечо',hit:[430,640],box:[310,555,280,220],path:'M340 580l42 11 22-24 26 33 45-28 17 35 58-8-9 42 26 23-32 28 10 39-40-6-14 35-46-14-38 18-8-38-52 7 12-40-30-25 29-25Z'},
 chest:{name:'грудь',hit:[580,835],box:[440,710,275,260],path:'M478 730l36 17 30-28 23 37 47-20-1 35 53 8-19 41 31 30-37 22 9 43-36-9-24 41-26-21-44 19-9-40-43 8 15-37-25-29 24-25Z'},
 flank:{name:'бок',hit:[805,720],box:[680,585,270,270],path:'M720 605l27 22 39-24 25 35 44-19-5 39 47 13-21 30 27 39-38 10 5 40-46-7-18 36-27-27-36 12-2-40-37-17 23-34-21-31 35-15Z'},
 belly:{name:'нижняя часть бока',hit:[790,960],box:[650,840,285,240],path:'M692 860l33 20 25-25 24 31 46-12 13 32 43-9-14 38 33 25-36 16 8 40-43-12-22 40-29-21-45 8 5-35-40-11 25-32-20-34 31-16Z'},
 frontpaws:{name:'передние лапы',hit:[490,1125],box:[340,1030,310,185],path:'M382 1055l36 18 31-17 16 23 46-12 27 17 45-13-10 34 35 22-26 20 3 35-39-6-23 17-33-15-36 13-16-21-46 8 6-31-25-17 25-24Z'},
 hindpaw:{name:'задняя лапа',hit:[960,1125],box:[810,1040,300,170],path:'M848 1060l39 16 24-19 26 26 39-12 16 22 42-7-12 30 31 15-19 22 8 24-41-8-23 18-36-14-32 9-9-25-39 7 11-30-27-18Z'}
});
const names={dust:'пыль',tangle:'свободная шерсть',mud:'грязь',soapy:'влажная грязь',foam:'пена',wet:'мокрая шерсть'};
let serial=0;
export function groomPose(state){return !state.won&&state.washed===true?'wet':'dry';}
function texture(kind,box,opacity){
 const crop=GROOM_TEXTURE_CROPS[kind];if(!crop||opacity<=0)return'';
 return `<svg x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" viewBox="${crop.join(' ')}" preserveAspectRatio="none" overflow="hidden" opacity="${opacity}" style="${kind==='dust'||kind==='mud'?'mix-blend-mode:multiply':''}"><image href="${asset(GROOM_TEXTURE_FILE)}" width="${GROOM_TEXTURE_SIZE[0]}" height="${GROOM_TEXTURE_SIZE[1]}"/></svg>`;
}
export function renderGroomingView(state,level){
 const pose=groomPose(state),file=pose==='wet'?'cat-wet-v1.png':'cat-dry-happy-v2.png',base=asset(file),prefix='care-'+(++serial),alpha=prefix+'-alpha';
 const marks=state.won?[]:state.spots;
 const zoneDefs=marks.map(mark=>`<mask id="${prefix}-zone-${mark.id}" maskUnits="userSpaceOnUse" x="0" y="552" width="1254" height="702" style="mask-type:alpha"><path d="${GROOM_ZONES[mark.zone].path}" fill="white" filter="url(#${prefix}-feather)"/></mask>`).join('');
 const overlays=marks.map(mark=>{
  const zone=GROOM_ZONES[mark.zone],fraction=mark.remaining/mark.strength,clip=prefix+'-zone-'+mark.id;
  let content='';
  const recolor=(filter,opacity)=>`<image href="${base}" width="1254" height="1254" filter="url(#${prefix}-${filter})" opacity="${opacity}"/>`;
  if(mark.kind==='dust')content=recolor('dust',fraction*.6)+texture('dust',zone.box,fraction*.65);
  if(mark.kind==='tangle')content=texture('tangle',zone.box,fraction*.96);
  if(mark.kind==='mud')content=recolor('mud',.45+fraction*.4)+texture('mud',zone.box,.2+fraction*.45);
  if(mark.kind==='soapy')content=recolor('mud',fraction*.32)+texture('mud',zone.box,fraction*.4)+texture('foam',zone.box,(1-fraction)*.85);
  if(mark.kind==='foam')content=texture('foam',zone.box,fraction*.98);
  if(mark.kind==='wet')content=recolor('damp',fraction*.48);
  return `<g data-coat-zone="${mark.zone}" data-coat-kind="${mark.kind}" data-coat-remaining="${mark.remaining}" mask="url(#${clip})"><g mask="url(#${alpha})">${content}</g></g>`;
 }).join('');
 const targets=marks.map(mark=>{const z=GROOM_ZONES[mark.zone];return `<button type="button" class="care-zone" id="spot-${mark.id}" data-spot="${mark.id}" data-zone="${mark.zone}" style="left:${z.hit[0]/12.54}%;top:${z.hit[1]/12.54}%" aria-label="${z.name}: ${names[mark.kind]}"></button>`;}).join('');
 const hearts=state.won?'<g data-care-hearts fill="#d67f8c" opacity=".9">'+[[160,180,.9],[650,5,.9],[950,280,.85]].map(([x,y,k])=>`<g transform="translate(${x} ${y}) scale(${k*4})"><path d="M12 21 3 12C-4 4 7-3 12 5 17-3 28 4 21 12Z"/></g>`).join('')+'</g>':'';
 return `<div class="care-room" data-care-finished="${state.won}"><div class="care-cat-wrap" data-care-pose="${pose}" data-care-state="${state.won?'clean-dry-happy':pose==='wet'?'wet':'dirty-dry'}"><svg class="care-coat" viewBox="0 0 1254 1254" role="img" aria-label="Белый голубоглазый бобтейл: ${pose==='wet'?'мокрая':'сухая'} шерсть"><defs><mask id="${alpha}" style="mask-type:alpha"><image href="${base}" width="1254" height="1254"/></mask>${zoneDefs}<filter id="${prefix}-feather" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="18"/></filter><filter id="${prefix}-dust"><feColorMatrix type="matrix" values=".65 0 0 0 .12  0 .58 0 0 .11  0 0 .44 0 .08  0 0 0 1 0"/></filter><filter id="${prefix}-mud"><feColorMatrix type="matrix" values=".39 0 0 0 .1  0 .29 0 0 .07  0 0 .18 0 .04  0 0 0 1 0"/></filter><filter id="${prefix}-damp"><feColorMatrix type="matrix" values=".8 0 0 0 .02  0 .86 0 0 .02  0 0 .9 0 .03  0 0 0 1 0"/></filter></defs><image data-care-base href="${base}" width="1254" height="1254"/>${overlays}${hearts}</svg>${targets}</div><div class="care-comfort" aria-label="Запас спокойствия: ${state.patience} из 3"><span>${state.patience?'Можно продолжать':'Нужна передышка'}</span>${[0,1,2].map(n=>`<i class="${n<state.patience?'filled':''}" aria-hidden="true"></i>`).join('')}</div></div>`;
}
