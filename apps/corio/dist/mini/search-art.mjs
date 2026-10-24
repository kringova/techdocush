import {SEARCH_SCENES} from './search-data.mjs?v=0.5.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
function shape(id){
  const figures={
    key:'<circle cx="27" cy="28" r="13" fill="none"/><path d="m36 38 33 33m-8-7 9-9m-19 0 9-9" fill="none"/>',
    cup:'<path d="M17 28h48v34q-4 20-24 20T17 62Z" fill="#d4b47c"/><path d="M65 36h13q17 25-13 27" fill="none"/><ellipse cx="41" cy="28" rx="24" ry="7" fill="#6e6350"/>',
    sock:'<path d="M42 11h31v47q9 4 5 17-8 14-25 7L21 67q-7-9 5-18l16 8Z" fill="#b7be9b"/><path d="M43 23h29M43 35h29M43 47h29" stroke="#637e76" stroke-width="8"/>',
    glasses:'<circle cx="27" cy="54" r="17" fill="none"/><circle cx="74" cy="54" r="17" fill="none"/><path d="M44 50q6-8 13 0M10 51 7 30m84 21 2-21" fill="none"/>',
    bell:'<path d="M27 65q5-15 5-28 0-27 20-27t20 27q0 13 5 28Z" fill="#c9a15f"/><path d="M21 66h62v10H21Z" fill="#b68a4c"/><circle cx="52" cy="83" r="8" fill="#d4b47c"/>',
    ribbon:'<path d="M45 42Q9 6 8 36q-7 34 38 15M55 42q36-36 37-6 7 34-38 15" fill="#7fa0ac"/><path d="m43 49-12 40 20-10 8 13 3-42" fill="#7fa0ac"/><circle cx="50" cy="46" r="10" fill="#aac0bd"/>',
    book:'<path d="M21 10h59v77H21q-15-8 0-15Z" fill="#8fa295"/><path d="M21 10v63h59M21 79h59" fill="none"/><path d="M57 11h12v44l-6-7-6 7Z" fill="#d6b67e"/>',
    ball:'<circle cx="50" cy="50" r="35" fill="#cbaa72"/><path d="M23 28q46 11 52 44M16 49q46 11 52 35" fill="none" stroke="#7c9a8b" stroke-width="12"/>',
    spoon:'<ellipse cx="50" cy="26" rx="14" ry="21" fill="#b7c5b5"/><path d="M50 46v44" stroke="#b7c5b5" stroke-width="10"/>',
    towel:'<path d="M24 9h55v79H24Z" fill="#d6c69f"/><path d="M26 24h51M26 37h51M26 68h51M26 81h51" stroke="#839c8e" stroke-width="8"/>',
    apple:'<path d="M50 32q-32-20-32 19 0 36 30 35 32 4 34-35-1-35-32-19Z" fill="#b98764"/><path d="M50 32q-7-17 4-25" fill="none"/><path d="M52 19q21-24 29-8-11 20-29 8Z" fill="#819978"/>',
    mitt:'<path d="M35 83 20 50q-11-24 1-27 9-4 14 13V20q-1-19 18-17 26 0 26 30v50Z" fill="#b6ba96"/><path d="m42 12 30 25m-35-7 36 28M29 46l39 30" fill="none" stroke="#849c88" stroke-width="3"/>',
    fish:'<path d="M21 47q30-37 56 0-26 36-56 0l-16 20V27Z" fill="#7e9daa"/><circle cx="64" cy="43" r="3" fill="#173744"/><path d="m42 25-4 19 10 23" fill="none"/>',
    whisk:'<path d="M50 88V50q-35-8-22-35 24-31 44 0 13 27-22 35m0 0q-19-32 0-46 19 14 0 46" fill="none" stroke="#bac5b3" stroke-width="5"/><path d="M50 58v31" stroke="#bb9763" stroke-width="12"/>',
    sponge:'<rect x="12" y="28" width="76" height="44" rx="13" fill="#d0b67f"/><path d="M15 53h70v14H15Z" fill="#7c9b84"/><circle cx="31" cy="39" r="3"/><circle cx="56" cy="44" r="3"/><circle cx="73" cy="36" r="3"/>',
    watering:'<path d="M26 40h48v44H26Z" fill="#8ba399"/><path d="M74 46q26-21 14-37-13-10-27 4M26 54 7 32 1 38l25 39" fill="none" stroke-width="7"/>',
    pinecone:'<path d="M50 9q-44 37-21 74 21 19 42-1 23-37-21-73Z" fill="#a68961"/><path d="m32 30 18 8 18-8m-42 19 24 9 24-9m-45 20 21 8 21-8M50 11v75" fill="none"/>',
    feather:'<path d="M73 8q-63-7-53 52 8 22 28 7 25-18 25-59Z" fill="#d9d4bb"/><path d="M20 89 64 20M28 72l-8-21m15 9 24-4m-14-12-4-23" fill="none"/>',
    flowerpot:'<path d="M25 59h52l-9 32H34Z" fill="#b99269"/><path d="M49 59V27m1 23q-23-22-29-8 7 22 29 8m0-9q26-17 28-3-6 17-28 3" fill="#8d9e80"/><g fill="#c5ac75"><circle cx="49" cy="17" r="10"/><circle cx="39" cy="25" r="10"/><circle cx="59" cy="25" r="10"/></g><circle cx="49" cy="25" r="7" fill="#e5d1a3"/>',
    shovel:'<path d="M49 40V11h21v29Z" fill="none" stroke="#ae8f60" stroke-width="8"/><path d="M59 40v14" stroke="#ae8f60" stroke-width="8"/><path d="M41 53h34q7 30-18 40-22-11-16-40Z" fill="#9bad9b"/>',
    leaf:'<path d="M72 10q-67 0-58 54 21 30 53 7 22-26 5-61Z" fill="#c6ab72"/><path d="M20 91 63 26m-28 42-19-9m34-12 21-1" fill="none"/>',
    glove:'<path d="M32 85 15 56q-10-21 1-24 8-2 15 12V17q0-13 10-10v28-30q10-10 13 3v26-25q11-6 13 6v24-19q13-2 12 11v37l-7 17Z" fill="#a4b399"/>',
    lantern:'<path d="M28 31h47v49H28Z" fill="#b7c3b0"/><path d="m20 31 11-13h40l13 13ZM23 80h58v9H23Z" fill="#8d9f89"/><path d="M38 18q-3-22 15-17 14 1 12 17" fill="none"/><path d="M46 42h13v27H46Z" fill="#ddbf82"/>'
  };
  return`<g stroke="#173744" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="#afbd9f">${figures[id]||figures.ball}</g>`;
}
export function searchView(state,level,zoom=1){
  const objects=SEARCH_SCENES[level.scene],targetNames=level.targets.map(id=>objects.find(item=>item.id===id).name),cat={room:[580,393],kitchen:[328,407],yard:[330,290]}[level.scene];
  return`<div class="search-targets"><strong>Найти</strong>${level.targets.map((id,i)=>`<span class="${state.found.includes(id)?'found':''}">${targetNames[i]}</span>`).join('')}</div><div class="search-viewport"><svg viewBox="0 0 800 520" style="width:${zoom*100}%" aria-label="${{room:'Комната у лампы',kitchen:'Домашняя кухня',yard:'Тихий двор'}[level.scene]}"><image href="${asset('search-'+level.scene+'-v1.svg')}" width="800" height="520"/><image href="${asset('player-v1.png')}" x="${cat[0]}" y="${cat[1]}" width="95" height="110" pointer-events="none"/>${objects.map(item=>{
    const file={yarn:'yarn-v1.png',brush:'brush-v1.png',bowl:'bowl-v1.png'}[item.id],found=state.found.includes(item.id),drawing=file?`<image href="${asset(file)}" width="100" height="100" pointer-events="none"/>`:shape(item.id);
    return`<g role="button" tabindex="0" data-find="${item.id}" id="find-${item.id}" aria-label="${item.name}${found?', найдено':''}" transform="translate(${item.x-item.size/2} ${item.y-item.size/2}) rotate(${item.angle} ${item.size/2} ${item.size/2})" class="search-object ${found?'collected':''}"><rect width="${item.size}" height="${item.size}" fill="transparent"/>${state.hint===item.id?`<rect x="-8" y="-8" width="${item.size+16}" height="${item.size+16}" rx="10" class="search-hint"/>`:''}<g transform="scale(${item.size/100})">${drawing}</g></g>`;
  }).join('')}</svg></div>`;
}
