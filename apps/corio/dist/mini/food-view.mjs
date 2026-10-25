import {FOODS} from './engine.mjs?v=0.10.0';
import {FOOD_PILE_ASPECT,foodIsExposed} from './food-data.mjs?v=0.10.0';
import {foodFigure,catFigure} from '../characters.mjs?v=0.10.0';
const bowl=new URL('../assets/food-pile-bowl-alpha-v1.png',import.meta.url).href;
const crop=[35,113,1184,1036],mouth={x:627,y:558,ry:480};
const rx=mouth.ry*FOOD_PILE_ASPECT;
const pileBox={left:(mouth.x-rx-crop[0])/crop[2]*100,top:(mouth.y-mouth.ry-crop[1])/crop[3]*100,width:rx*2/crop[2]*100,height:mouth.ry*2/crop[3]*100};
const trash='<svg viewBox="0 0 70 65" aria-hidden="true"><path d="m17 16 5 43q13 5 26 0l5-43" fill="#9cafa0" stroke="#173744" stroke-width="3"/><path d="M13 15h44M26 14V8h17v6M28 25l2 26M42 25l-2 26" fill="none" stroke="#173744" stroke-width="3" stroke-linecap="round"/></svg>';
export function foodView(state,level,selected){
  const chosen=state.remaining.find(item=>item.id===selected);
  const pieces=state.remaining.map(item=>{
    const p=level.placements[item.id],food=FOODS[item.type],exposed=foodIsExposed(state.remaining,level,item.id);
    return `<button id="food-${item.id}" class="food-piece pile-piece" data-food="${item.id}" data-exposed="${exposed}" aria-label="${food.name}${food.detail?', '+food.detail:''}${exposed?'':', под другими продуктами'}" aria-disabled="${!exposed}" aria-pressed="${selected===item.id}" tabindex="${exposed?0:-1}" style="left:${p.x}%;top:${p.y}%;width:${p.width}%;height:${p.height}%;transform:rotate(${p.angle}deg);z-index:${p.z}">${foodFigure(item.type)}<svg class="food-hit" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="50" ry="50" fill="transparent"/></svg></button>`;
  }).join('');
  return `<div class="food-table pile-game"><div class="food-observer">${catFigure('cautious',{className:'food-cat'})}<span>Что сегодня в миске?</span></div><div class="food-pile-stage" style="aspect-ratio:${crop[2]}/${crop[3]}"><svg class="pile-bowl" viewBox="${crop.join(' ')}" aria-hidden="true"><image href="${bowl}" width="1254" height="1254"/></svg><div class="food-pile" role="group" aria-label="Продукты в миске" style="left:${pileBox.left}%;top:${pileBox.top}%;width:${pileBox.width}%;height:${pileBox.height}%">${pieces}</div></div><p class="food-selection" aria-live="polite">${chosen?FOODS[chosen.type].name+(FOODS[chosen.type].detail?' · '+FOODS[chosen.type].detail:''):'Возьми продукт сверху'}</p><div class="food-bins"><button id="food-safe" data-bin="safe" class="food-bin" aria-label="Коту">${foodFigure('treat')}<strong>Коту</strong></button><button id="food-away" data-bin="away" class="food-bin" aria-label="В мусор">${trash}<strong>В мусор</strong></button></div></div>`;
}
export function fitFoodScene(scene){
  const stage=scene.querySelector('.food-pile-stage');if(!stage)return;
  const table=scene.querySelector('.pile-game'),bins=scene.querySelector('.food-bins'),note=scene.querySelector('.food-selection');
  const style=getComputedStyle(table),padding=parseFloat(style.paddingTop)+parseFloat(style.paddingBottom);
  const height=Math.max(80,scene.clientHeight-bins.offsetHeight-note.offsetHeight-padding-16),width=Math.min(scene.clientWidth-20,height*crop[2]/crop[3]);
  stage.style.width=width+'px';stage.style.height=width*crop[3]/crop[2]+'px';
}
