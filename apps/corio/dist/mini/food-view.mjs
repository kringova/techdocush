import {FOODS} from './engine.mjs?v=0.12.0';
import {FOOD_PILE_ASPECT,foodIsExposed} from './food-data.mjs?v=0.12.0';
import {foodFigure} from '../characters.mjs?v=0.12.0';
import {foodCatPortrait} from './food-feedback.mjs?v=0.12.0';
const bowl=new URL('../assets/food-pile-bowl-alpha-v1.png',import.meta.url).href;
const crop=[35,113,1184,1036],mouth={x:627,y:558,ry:480};
const rx=mouth.ry*FOOD_PILE_ASPECT;
const pileBox={left:(mouth.x-rx-crop[0])/crop[2]*100,top:(mouth.y-mouth.ry-crop[1])/crop[3]*100,width:rx*2/crop[2]*100,height:mouth.ry*2/crop[3]*100};
const hearts='<span class="food-heart-burst" aria-hidden="true">'+Array.from({length:5},()=>'<svg viewBox="0 0 24 24"><path d="M12 21 3 12C-4 4 7-3 12 5 17-3 28 4 21 12Z" fill="#d67f8c"/></svg>').join('')+'</span>';
const trash='<svg viewBox="0 0 70 65" aria-hidden="true"><path d="m17 16 5 43q13 5 26 0l5-43" fill="#9cafa0" stroke="#173744" stroke-width="3"/><path d="M13 15h44M26 14V8h17v6M28 25l2 26M42 25l-2 26" fill="none" stroke="#173744" stroke-width="3" stroke-linecap="round"/></svg>';
export function foodView(state,level,selected){
  const chosen=state.remaining.find(item=>item.id===selected);
  const pieces=state.remaining.map(item=>{
    const p=level.placements[item.id],food=FOODS[item.type],exposed=foodIsExposed(state.remaining,level,item.id);
    return `<button id="food-${item.id}" class="food-piece pile-piece" data-food="${item.id}" data-exposed="${exposed}" aria-label="${food.name}${food.detail?', '+food.detail:''}${exposed?'':', под другими продуктами'}" aria-disabled="${!exposed}" aria-pressed="${selected===item.id}" tabindex="${exposed?0:-1}" style="left:${p.x}%;top:${p.y}%;width:${p.width}%;height:${p.height}%;transform:rotate(${p.angle}deg);z-index:${p.z}">${foodFigure(item.type)}<svg class="food-hit" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="50" ry="50" fill="transparent"/></svg></button>`;
  }).join('');
  const food=chosen?FOODS[chosen.type]:null;
  return `<div class="food-table pile-game"><div class="food-play-area"><div class="food-pile-stage" style="aspect-ratio:${crop[2]}/${crop[3]}"><svg class="pile-bowl" viewBox="${crop.join(' ')}" aria-hidden="true"><image href="${bowl}" width="1254" height="1254"/></svg><div class="food-pile" role="group" aria-label="Продукты в миске" style="left:${pileBox.left}%;top:${pileBox.top}%;width:${pileBox.width}%;height:${pileBox.height}%">${pieces}</div></div><aside class="food-selection ${food?'has-selection':''}" aria-live="polite" aria-label="Выбранный продукт">${food?`<strong>${food.name}</strong>${food.detail?`<span>${food.detail}</span>`:''}`:'Нажми на еду, чтобы рассмотреть'}</aside></div><div class="food-bins ${chosen?'food-ready':''}"><button id="food-safe" data-bin="safe" class="food-bin food-destination" aria-label="Коту"><span class="food-destination-art food-cat-target" data-food-cat>${foodCatPortrait()}</span>${hearts}<span class="food-retch-mark" aria-hidden="true"><svg viewBox="0 0 50 20"><path d="M4 15q1-6 8-5 3-9 10-5 7-5 10 3 10-1 14 7Z" fill="#c19a68" stroke="#173744" stroke-width="1.5"/></svg></span><strong>Коту</strong></button><button id="food-away" data-bin="away" class="food-bin food-destination" aria-label="В мусор"><span class="food-destination-art food-trash-target">${trash}</span><strong>В мусор</strong></button></div><p class="food-feedback-message" data-food-message role="status" aria-live="polite">${state.message||'Выбери продукт сверху'}</p></div>`;
}
export function fitFoodScene(scene){
  const stage=scene.querySelector('.food-pile-stage');if(!stage)return;
  const table=scene.querySelector('.pile-game'),face=Math.min(330,scene.clientWidth*.41,Math.max(82,scene.clientHeight*.42));
  table.style.setProperty('--food-face-size',face+'px');table.style.setProperty('--food-dock-height',Math.round(face*.71+18)+'px');
  const area=scene.querySelector('.food-play-area'),note=scene.querySelector('.food-selection'),style=getComputedStyle(area);
  const gap=parseFloat(style.columnGap)||0,height=Math.max(40,area.clientHeight),width=Math.max(40,Math.min(area.clientWidth-note.offsetWidth-gap,height*crop[2]/crop[3]));
  stage.style.width=width+'px';stage.style.height=width*crop[3]/crop[2]+'px';
}
