import {SEARCH_SCENES} from './search-data.mjs?v=0.24.0';
import {PAINTED_SCENES} from './search-painted.mjs?v=0.24.0';
import {SEARCH_CATS} from './search-cat-art.mjs?v=0.24.0';
import {searchAmbient,searchNight} from './search-ambient.mjs?v=0.24.0';
import {exactSearchSilhouette,movableSearchProp,repairSearchBackground} from './search-props.mjs?v=0.24.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
const scale=800/1536,height=1024*scale;
let serial=0;
function catBasePatch(scene){
  return [SEARCH_CATS[scene].basePatch,SEARCH_CATS[scene].headPatch].filter(Boolean).map(patch=>{
  const id='cat-base-'+(++serial),[x,y,w,h]=patch.bounds;
  return `<g transform="scale(${scale})"><defs><filter id="${id}-soft" x="${x-12}" y="${y-12}" width="${w+24}" height="${h+24}" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="3"/></filter><mask id="${id}" maskUnits="userSpaceOnUse" x="${x-12}" y="${y-12}" width="${w+24}" height="${h+24}"><polygon points="${patch.polygon.map(p=>p.join(',')).join(' ')}" fill="white" filter="url(#${id}-soft)"/></mask></defs><image href="${asset(patch.file)}" width="1536" height="1024" mask="url(#${id})" pointer-events="none"/></g>`;
  }).join('');
}
function catLayers(scene){
  const cat=SEARCH_CATS[scene],prefix='cat-detail-'+(++serial);
  return ['eyes','ear','lick'].map(part=>{
    const id=prefix+'-'+part,polygons=cat.masks[part].map(p=>`<polygon points="${p.map(([x,y])=>[x*scale,y*scale].join(',')).join(' ')}"/>`).join('');
    return `<defs><clipPath id="${id}">${polygons}</clipPath></defs><image data-cat-layer="${part}" opacity="0" href="${asset(part==='lick'?cat.lickFrame:cat.frame)}" width="800" height="${height}" clip-path="url(#${id})" pointer-events="none"/>`;
  }).join('');
}
export function searchView(state,level,zoom=1){
  const objects=SEARCH_SCENES[level.scene],art=PAINTED_SCENES[level.scene];
  const silhouettes=level.clues==='silhouettes',night=level.lighting==='night',cat=SEARCH_CATS[level.scene].bounds;
  const clues=level.targets.map(id=>{
    const item=objects.find(item=>item.id===id),found=state.found.includes(id);
    return `<span class="target-clue ${found?'found':''}" data-clue="${id}" aria-label="${item.name}${found?', найдено':''}">${silhouettes?exactSearchSilhouette(item):item.name}${found?'<i aria-hidden="true">✓</i>':''}</span>`;
  }).join('');
  const props=objects.map(item=>{
    const found=state.found.includes(item.id),{placement:p,svg}=movableSearchProp(item,level);
    const x=p.x*scale,y=p.y*scale,w=p.width*scale,h=p.height*scale;
    return `<g role="button" tabindex="${found?-1:0}" data-find="${item.id}" data-slot="${p.slot}" id="find-${item.id}" aria-label="${item.name}${found?', найдено':''}" class="search-object ${found?'collected':''}"><rect x="${x-3}" y="${y-3}" width="${w+6}" height="${h+6}" rx="4" fill="transparent"/><g transform="scale(${scale})">${svg}</g>${found?`<circle cx="${x+w}" cy="${y}" r="8" class="found-mark"/><path d="m${x+w-3.5} ${y} 2.5 2.5 4.5-5.5" class="found-tick"/>`:''}${state.hint===item.id?`<rect x="${x-6}" y="${y-6}" width="${w+12}" height="${h+12}" rx="7" class="search-hint"/>`:''}</g>`;
  }).join('');
  return `<div class="search-targets ${silhouettes?'silhouette-targets':''}" aria-label="${silhouettes?'Силуэты искомых предметов':'Список искомых предметов'}"><strong>Найти</strong>${clues}</div><div class="search-viewport"><div class="search-canvas"><div class="search-painting"><svg data-search-scene="${level.scene}" class="${night?'night-scene':''}" viewBox="0 0 800 ${height}" style="width:${zoom*100}%" aria-label="${level.name}"><image href="${asset(art.image)}" width="800" height="${height}"/><g transform="scale(${scale})">${repairSearchBackground(level.scene)}</g>${catBasePatch(level.scene)}${catLayers(level.scene)}<g role="button" tabindex="0" data-cat-react aria-label="Позвать кота: он ответит мяуканьем" class="search-cat"><rect x="${cat[0]*scale}" y="${cat[1]*scale}" width="${cat[2]*scale}" height="${cat[3]*scale}" rx="22" fill="transparent"/></g>${props}</svg>${searchAmbient(level.scene)}${night?searchNight():''}</div></div></div>`;
}
