import {SEARCH_SCENES} from './search-data.mjs?v=0.7.0';
import {catFigure} from '../characters.mjs?v=0.7.0';
import {PAINTED_SCENES} from './search-painted.mjs?v=0.7.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
export function searchView(state,level,zoom=1){
  const objects=SEARCH_SCENES[level.scene],art=PAINTED_SCENES[level.scene];
  return`<div class="search-targets"><strong>Найти</strong>${level.targets.map(id=>`<span class="${state.found.includes(id)?'found':''}">${objects.find(item=>item.id===id).name}</span>`).join('')}</div><div class="search-viewport"><div class="search-canvas"><svg viewBox="0 0 800 520" style="width:${zoom*100}%" aria-label="${{room:'Комната у лампы',kitchen:'Домашняя кухня',yard:'Тихий двор'}[level.scene]}"><image href="${asset(art.image||'search-'+level.scene+'-painted-v1.png')}" width="800" height="520" preserveAspectRatio="none"/>${art.integratedCat?'':catFigure(art.pose,{x:art.cat[0],y:art.cat[1],width:art.cat[2],height:art.cat[3]})}${objects.map(item=>{
    const b=art.bounds[item.id],found=state.found.includes(item.id),x=b[0]*800/1536,y=b[1]*520/1024,w=b[2]*800/1536,h=b[3]*520/1024;
    // The drawing lives in the background. Overlay only transparent, named hit regions.
    return`<g role="button" tabindex="${found?-1:0}" data-find="${item.id}" id="find-${item.id}" aria-label="${item.name}${found?', найдено':''}" class="search-object ${found?'collected':''}"><rect x="${x-5}" y="${y-5}" width="${w+10}" height="${h+10}" rx="5" fill="transparent"/>${found?`<circle cx="${x+w}" cy="${y}" r="9" class="found-mark"/><path d="m${x+w-4} ${y} 3 3 5-6" class="found-tick"/>`:''}${state.hint===item.id?`<rect x="${x-9}" y="${y-9}" width="${w+18}" height="${h+18}" rx="10" class="search-hint"/>`:''}</g>`;
  }).join('')}</svg></div></div>`;
}
