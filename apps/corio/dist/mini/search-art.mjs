import {SEARCH_SCENES} from './search-data.mjs?v=0.8.2';
import {catFigure} from '../characters.mjs?v=0.8.2';
import {PAINTED_SCENES} from './search-painted.mjs?v=0.8.2';
import {searchSilhouette} from './search-silhouettes.mjs?v=0.8.2';
import {SEARCH_CATS} from './search-cat-art.mjs?v=0.8.2';
import {searchAmbient,searchNight} from './search-ambient.mjs?v=0.8.2';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
let serial=0;
function catLayers(scene){
  const cat=SEARCH_CATS[scene],prefix='cat-detail-'+(++serial);
  if(!cat.frame)return'';
  return ['eyes','ear','lick'].map(part=>{
    const id=prefix+'-'+part,polygons=cat.masks[part].map(p=>`<polygon points="${p.map(([x,y])=>[x*800/1536,y*520/1024].join(',')).join(' ')}"/>`).join('');
    return`<defs><clipPath id="${id}">${polygons}</clipPath></defs><image data-cat-layer="${part}" opacity="0" href="${asset(part==='lick'?cat.lickFrame:cat.frame)}" width="800" height="520" preserveAspectRatio="none" clip-path="url(#${id})" pointer-events="none"/>`;
  }).join('');
}
export function searchView(state,level,zoom=1){
  const objects=SEARCH_SCENES[level.scene],art=PAINTED_SCENES[level.scene];
  const silhouettes=level.clues==='silhouettes',night=level.lighting==='night',cat=SEARCH_CATS[level.scene].bounds;
  return`<div class="search-targets ${silhouettes?'silhouette-targets':''}" aria-label="${silhouettes?'Силуэты искомых предметов':'Список искомых предметов'}"><strong>Найти</strong>${level.targets.map(id=>{const name=objects.find(item=>item.id===id).name;return`<span class="target-clue ${state.found.includes(id)?'found':''}" aria-label="${name}${state.found.includes(id)?', найдено':''}">${silhouettes?searchSilhouette(id):name}${state.found.includes(id)?'<i aria-hidden="true">✓</i>':''}</span>`;}).join('')}</div><div class="search-viewport"><div class="search-canvas"><div class="search-painting"><svg data-search-scene="${level.scene}" class="${night?'night-scene':''}" viewBox="0 0 800 520" style="width:${zoom*100}%" aria-label="${{room:'Комната у лампы',kitchen:'Домашняя кухня',yard:'Тихий двор'}[level.scene]}"><image href="${asset(art.image||'search-'+level.scene+'-painted-v1.png')}" width="800" height="520" preserveAspectRatio="none"/>${art.integratedCat?'':catFigure(art.pose,{x:art.cat[0],y:art.cat[1],width:art.cat[2],height:art.cat[3]})}${catLayers(level.scene)}<g role="button" tabindex="0" data-cat-react aria-label="Позвать кота: он ответит мяуканьем" class="search-cat"><rect x="${cat[0]*800/1536}" y="${cat[1]*520/1024}" width="${cat[2]*800/1536}" height="${cat[3]*520/1024}" rx="25" fill="transparent"/></g>${objects.map(item=>{
    const b=art.bounds[item.id],found=state.found.includes(item.id),x=b[0]*800/1536,y=b[1]*520/1024,w=b[2]*800/1536,h=b[3]*520/1024;
    // The drawing lives in the background. Overlay only transparent, named hit regions.
    return`<g role="button" tabindex="${found?-1:0}" data-find="${item.id}" id="find-${item.id}" aria-label="${item.name}${found?', найдено':''}" class="search-object ${found?'collected':''}"><rect x="${x-5}" y="${y-5}" width="${w+10}" height="${h+10}" rx="5" fill="transparent"/>${found?`<circle cx="${x+w}" cy="${y}" r="9" class="found-mark"/><path d="m${x+w-4} ${y} 3 3 5-6" class="found-tick"/>`:''}${state.hint===item.id?`<rect x="${x-9}" y="${y-9}" width="${w+18}" height="${h+18}" rx="10" class="search-hint"/>`:''}</g>`;
  }).join('')}</svg>${searchAmbient(level.scene)}${night?searchNight():''}</div></div></div>`;
}
