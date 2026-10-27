import {FOODS} from './engine.mjs?v=0.24.0';
import {FOOD_PILE_ASPECT,foodIsExposed} from './food-data.mjs?v=0.24.0';
import {foodFigure} from '../characters.mjs?v=0.24.0';
import {foodCatPortrait} from './food-feedback.mjs?v=0.24.0';
const bowl=new URL('../assets/food-pile-bowl-alpha-v1.png',import.meta.url).href;
const crop=[35,113,1184,1036],mouth={x:627,y:558,ry:480};
const rx=mouth.ry*FOOD_PILE_ASPECT;
const pileBox={left:(mouth.x-rx-crop[0])/crop[2]*100,top:(mouth.y-mouth.ry-crop[1])/crop[3]*100,width:rx*2/crop[2]*100,height:mouth.ry*2/crop[3]*100};
const hearts='<span class="food-heart-burst" aria-hidden="true">'+Array.from({length:5},()=>'<svg viewBox="0 0 24 24"><path d="M12 21 3 12C-4 4 7-3 12 5 17-3 28 4 21 12Z" fill="#d67f8c"/></svg>').join('')+'</span>';
const trashAsset=new URL('../assets/food-trash-painted-alpha-v1.png',import.meta.url).href;
const trash=`<svg viewBox="0 0 1254 1254" aria-hidden="true"><image href="${trashAsset}" width="1254" height="1254"/></svg>`;
export function renderFoodInfo(state,selected){
  const chosen=state.remaining.find(item=>item.id===selected)||state.sorted.at(-1),food=chosen?FOODS[chosen.type]:null;
  return food?`<strong>${food.displayName||food.name}</strong>`:'<strong>Выбери продукт</strong>';
}
export function foodView(state,level,selected){
  const chosen=state.remaining.find(item=>item.id===selected);
  const pieces=state.remaining.map(item=>{
    const p=level.placements[item.id],food=FOODS[item.type],exposed=foodIsExposed(state.remaining,level,item.id);
    return `<button id="food-${item.id}" class="food-piece pile-piece" data-food="${item.id}" data-exposed="${exposed}" aria-label="${food.displayName||food.name}${exposed?'':', под другими продуктами'}" aria-disabled="${!exposed}" aria-pressed="${selected===item.id}" tabindex="${exposed?0:-1}" style="left:${p.x}%;top:${p.y}%;width:${p.width}%;height:${p.height}%;transform:rotate(${p.angle}deg);z-index:${p.z}">${foodFigure(item.type)}<svg class="food-hit" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="50" ry="50" fill="transparent"/></svg></button>`;
  }).join('');
  return `<div class="food-table pile-game"><div class="food-play-area"><div class="food-pile-stage" style="aspect-ratio:${crop[2]}/${crop[3]}"><svg class="pile-bowl" viewBox="${crop.join(' ')}" aria-hidden="true"><image href="${bowl}" width="1254" height="1254"/></svg><div class="food-pile" role="group" aria-label="Продукты в миске" style="left:${pileBox.left}%;top:${pileBox.top}%;width:${pileBox.width}%;height:${pileBox.height}%">${pieces}</div></div><div class="food-note-slot" data-food-note-slot></div></div><div class="food-bins ${chosen?'food-ready':''}"><button id="food-safe" data-bin="safe" class="food-bin food-destination" aria-label="Коту"><span class="food-destination-art food-cat-target" data-food-cat>${foodCatPortrait()}</span>${hearts}<span class="food-retch-mark" aria-hidden="true"><svg viewBox="0 0 50 20"><path d="M4 15q1-6 8-5 3-9 10-5 7-5 10 3 10-1 14 7Z" fill="#c19a68" stroke="#173744" stroke-width="1.5"/></svg></span></button><button id="food-away" data-bin="away" class="food-bin food-destination" aria-label="В мусор"><span class="food-destination-art food-trash-target">${trash}</span></button></div></div>`;
}
export function fitFoodScene(scene){
  const stage=scene.querySelector('.food-pile-stage');if(!stage)return;
  const table=scene.querySelector('.pile-game'),face=Math.min(330,scene.clientWidth*.41,Math.max(82,scene.clientHeight*.42));
  table.style.setProperty('--food-face-size',face+'px');table.style.setProperty('--food-dock-height',Math.round(face*.71)+'px');
  const area=scene.querySelector('.food-play-area'),height=Math.max(40,area.clientHeight),compact=matchMedia('(max-width:650px)').matches,gap=area.clientWidth<650?6:18;
  const dockOverlap=parseFloat(getComputedStyle(table).getPropertyValue('--food-dock-overlap'))||12;
  const noteWidth=compact?Math.min(280,area.clientWidth):Math.min(220,Math.max(190,area.clientWidth*.22),area.clientWidth*.46);
  // Reserve error space on portrait screens so revealing an explanation never
  // moves the food or changes the size of an item held by the player.
  const noteReserve=compact?Math.min(110,Math.max(60,height-80)):0;
  const noteMax=compact?noteReserve:Math.max(60,Math.min(200,height-2*(dockOverlap+2)));
  table.style.setProperty('--food-note-width',noteWidth+'px');
  table.style.setProperty('--food-note-reserve',noteReserve+'px');
  table.style.setProperty('--food-note-min-height',Math.min(compact?60:100,noteMax)+'px');
  table.style.setProperty('--food-note-max-height',noteMax+'px');
  table.style.setProperty('--food-note-font',(compact?(area.clientWidth<330?12:13):14)+'px');
  area.style.gap=gap+'px';
  const width=Math.max(40,compact?Math.min(area.clientWidth,(height-noteReserve-gap)*crop[2]/crop[3]):Math.min(area.clientWidth-noteWidth-gap,height*crop[2]/crop[3]));
  stage.style.width=width+'px';stage.style.height=width*crop[3]/crop[2]+'px';
}
