import {groomToolIcon,GROOM_TOOL_LABELS} from './grooming-tools.mjs?v=0.22.0';
import {renderGroomingView} from './grooming-view.mjs?v=0.22.0';
import {foodView} from './food-view.mjs?v=0.22.0';
import {renderYarnView} from './yarn-view.mjs?v=0.22.0';
import {renderTunnelView} from './tunnel-art.mjs?v=0.22.0';
import {searchView} from './search-art.mjs?v=0.22.0';
import {FOODS,PET_ACTIONS,GROOM_TOOLS,GROOM_STEPS,tunnelEdges,connectedRoute,traceTunnelRoute,yarnConflicts,yarnCrossings} from './engine.mjs?v=0.22.0';
import {catFigure,litterShape,foodFigure} from '../characters.mjs?v=0.22.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
export const CAT=asset('player-v1.png'),YARN=asset('yarn-v1.png');
const img=(file,alt='',className='')=>`<img class="${className}" src="${asset(file)}" alt="${alt}" draggable="false">`;
const button=(text,attributes,extra='')=>`<button type="button" ${attributes} ${extra}>${text}</button>`;
export function foodIcon(kind){return foodFigure({kibble:'dry',can:'wet'}[kind]||kind);}
export function toolsFor(id,selection,sfx){
  if(id==='search')return button('− Уменьшить','data-zoom="out"')+button('+ Приблизить','data-zoom="in"')+button('Подсказка','data-hint');
  if(id==='food')return'';
  if(id==='pet')return Object.entries(PET_ACTIONS).map(([key,value])=>button(value.name,`data-care="${key}" id="care-${key}"`)).join('');
  if(id==='grooming')return Object.entries(GROOM_TOOLS).map(([key,name])=>button(groomToolIcon(key)+'<span>'+GROOM_TOOL_LABELS[key]+'</span>',`aria-label="${name}" data-tool="${key}" id="tool-${key}" aria-pressed="${selection===key}" ${key==='pause'&&selection?'class="care-rest"':''}`)).join('');
  if(id==='litter')return button(`Шуршание: ${sfx?'вкл':'выкл'}`,'data-sfx aria-pressed="'+sfx+'"');
  return'';
}
export function renderScene(id,state,level,selected,preview){
  if(id==='search')return searchView(state,level,selected||1);
  if(id==='tunnels')return renderTunnelView(state,level);
  if(id==='food')return foodView(state,level,selected);
  if(id==='pet')return`<div class="pet-room painted-home">${catFigure(state.pose,{className:'pet-cat'})}${img('bowl-v1.png','','room-bowl')}${img('yarn-v1.png','','room-yarn')}<p class="pet-thought">${state.message||'Кот рядом. Чего сейчас не хватает?'}</p></div><div class="need-meters">${['Сытость','Вода','Игра','Силы'].map((name,i)=>`<div><span>${name}</span><span class="need-dots" aria-label="${state.needs[i]} из 4">${Array.from({length:4},(_,n)=>`<i class="${n<state.needs[i]?'filled':''}"></i>`).join('')}</span></div>`).join('')}</div>`;
  if(id==='grooming')return renderGroomingView(state,level);
  if(id==='litter')return`<div class="litter-room"><div class="litter-intro">${catFigure('lookback',{className:'litter-cat'})}<span>Не всё, что спрятано, — пара.<br>Иногда здесь просто песок.</span></div><div class="litter-box" style="--cols:${level.w};--rows:${level.h}">${level.cells.map((shape,cell)=>{
    const matched=state.matched.includes(cell),open=state.open.includes(cell),empty=state.empty.includes(cell),visible=matched||open||empty;
    return button(visible?(empty?'<span class="clean-sand" aria-hidden="true"></span>':litterShape(shape)):`<span class="grains" aria-hidden="true"></span><span class="sand-ridge" aria-hidden="true"></span>`,`data-cell="${cell}" id="cell-${cell}" class="sand-cell ${visible?'dug':'covered'} ${matched?'matched':''} ${open?'face-up':''}" aria-label="Ячейка ${cell+1}: ${matched?'пара найдена':empty?'пусто':open?['дуга','две гранулы','спираль','капля','зигзаг','овал','три гранулы','развилка','кольцо','Т-форма','уголок','четыре выступа'][shape]:'скрыта'}" ${visible?'disabled':''}`);
  }).join('')}</div><div class="clump-tray"><span>Найденные пары</span>${Array.from({length:level.pairs},(_,shape)=>`<span class="pair-token ${state.matched.some(cell=>level.cells[cell]===shape)?'found':''}">${litterShape(shape)}</span>`).join('')}</div></div>`;
  if(id==='yarn')return renderYarnView(preview||state.points,level);
  return'';
}
function spotName(kind){return{dust:'Пыль',tangle:'Свободные шерстинки',mud:'Грязное пятно',soapy:'Мокрое пятно',foam:'Пена',wet:'Мокрая шерсть'}[kind];}
export function goalText(id,state,level){
  if(id==='search')return`Найдено ${state.found.length} / ${level.targets.length}`;
  if(id==='tunnels'){const count=(level.checkpoints||[]).length;if(state.won)return'Трасса соединена';if(count){const trace=traceTunnelRoute(state,level);return `Колокольчики на пути: ${trace.visitedCheckpoints.length} / ${count}`;}return'Проведи кота к миске';}
  if(id==='food')return`Разобрано ${state.sorted.length} / ${level.items.length}`;
  if(id==='pet')return`Готово ${state.needs.filter(n=>n>=3).length} / 4`;
  if(id==='grooming')return`Осталось участков: ${state.spots.length}`;
  if(id==='litter')return`Пары ${state.matched.length/2} / ${level.pairs}`;
  if(state.won)return'Нить свободна';
  const crossings=yarnCrossings(state.points,level.edges).length;
  return crossings?`Пересечения нити: ${crossings}`:yarnConflicts(state.points,level.edges).length?'Убери наложение нити':'Нить свободна';
}
