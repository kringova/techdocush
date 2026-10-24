import {searchView} from './search-art.mjs?v=0.5.0';
import {FOODS,PET_ACTIONS,GROOM_TOOLS,GROOM_STEPS,tunnelEdges,connectedRoute,yarnConflicts} from './engine.mjs?v=0.5.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
export const CAT=asset('player-v1.png'),YARN=asset('yarn-v1.png');
const img=(file,alt='',className='')=>`<img class="${className}" src="${asset(file)}" alt="${alt}" draggable="false">`;
const button=(text,attributes,extra='')=>`<button type="button" ${attributes} ${extra}>${text}</button>`;
export function foodIcon(kind){
  const shapes={
    kibble:'<path d="M18 48h64L72 83H28Z" fill="#9cafa0"/><path d="M20 48c8-24 53-24 60 0" fill="#ae7947"/><circle cx="34" cy="40" r="5"/><circle cx="50" cy="34" r="5"/><circle cx="66" cy="41" r="5"/>',
    can:'<path d="M27 26h46v57H27Z" fill="#9cafa0"/><ellipse cx="50" cy="26" rx="23" ry="8" fill="#e5d7ba"/><path d="M28 43h44v26H28Z" fill="#d6b988"/><path d="M40 56h20M50 47v18"/>',
    treat:'<path d="M21 22h58l-7 61H28Z" fill="#d6b988"/><path d="M24 34h52"/><path d="M36 59q14-22 28 0-14 22-28 0Z" fill="#9cafa0"/>',
    water:'<path d="M19 51h62L69 81H31Z" fill="#b9c9c0"/><ellipse cx="50" cy="51" rx="31" ry="9" fill="#7ca2b4"/><path d="M48 15q-14 20 0 22 14-2 0-22Z" fill="#7ca2b4"/>',
    chicken:'<path d="M20 64q4-25 27-27 20-3 33 22 3 18-27 18-24 1-33-13Z" fill="#dfbe8e"/><path d="M32 62q15-13 30-3M37 69l19-4"/>',
    chocolate:'<path d="M21 22h58v61H21Z" fill="#946546"/><path d="M40 23v58M60 23v58M22 42h56M22 62h56"/>',
    onion:'<path d="M49 20q-2 13-18 25-20 26 7 36 38 12 45-13 2-19-25-35l-2-15Z" fill="#d4ad73"/><path d="M50 29q-22 39-9 51M55 32q22 30 11 45M48 19l-5-8M54 18l6-9"/>',
    garlic:'<path d="M47 15q1 25-14 30-27 24-7 36 26 13 51-2 15-17-9-36-17-7-15-28Z" fill="#e7dcc1"/><path d="M47 37q-13 28-8 45M54 38q17 29 6 45"/>',
    coffee:'<path d="M23 35h49v33q-4 18-23 18T23 68Z" fill="#d4ad73"/><path d="M72 43h11q15 25-11 25" fill="none"/><ellipse cx="48" cy="35" rx="25" ry="8" fill="#78573f"/><path d="M38 10q-9 9 0 15M55 10q-9 9 0 15" fill="none"/>',
    bone:'<path d="M26 27q-21-4-17 12 0 9 12 10l31 23q-1 17 13 16 12 0 10-13 18-5 9-16-6-6-15-1L38 35q4-16-12-8Z" fill="#e8dcc4"/>',
    raw:'<path d="M19 56q-4-31 28-30 36-11 38 23 9 31-29 34-26 6-37-27Z" fill="#b97d68"/><path d="M29 61q20-28 44-13M36 73q4-18 25-25" stroke="#e8c6a7" fill="none"/>',
    candy:'<path d="m26 39-15-9 2 40 16-10m42-21 16-9-1 40-16-10" fill="#9cafa0"/><rect x="25" y="32" width="49" height="37" rx="14" fill="#ceaa73"/><path d="m40 34 17 33"/>'
  };
  return`<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#173744" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="#9cafa0">${shapes[kind]||shapes.kibble}</g></svg>`;
}
export function toolsFor(id,selection,sfx){
  if(id==='search')return button('− Уменьшить','data-zoom="out"')+button('+ Приблизить','data-zoom="in"')+button('Подсказка','data-hint');
  if(id==='food')return'';
  if(id==='pet')return Object.entries(PET_ACTIONS).map(([key,value])=>button(value.name,`data-care="${key}" id="care-${key}"`)).join('');
  if(id==='grooming')return Object.entries(GROOM_TOOLS).map(([key,name])=>button(name,`data-tool="${key}" id="tool-${key}" aria-pressed="${selection===key}"`)).join('');
  if(id==='litter')return button('Совок',`data-tool="scoop" aria-pressed="${selection==='scoop'}"`)+button('Грабли',`data-tool="rake" aria-pressed="${selection==='rake'}"`)+button(`Звук наполнителя: ${sfx?'вкл':'выкл'}`,'data-sfx aria-pressed="'+sfx+'"');
  return'';
}
export function renderScene(id,state,level,selected,preview){
  if(id==='search')return searchView(state,level,selected||1);
  if(id==='tunnels')return tunnelView(state,level);
  if(id==='food')return`<div class="food-table"><div class="food-plate" aria-label="Продукты на тарелке">${state.remaining.map(item=>button(foodIcon(FOODS[item.type].icon)+`<span>${FOODS[item.type].name}</span>${FOODS[item.type].detail?`<small>${FOODS[item.type].detail}</small>`:''}`,`data-food="${item.id}" id="food-${item.id}" aria-pressed="${selected===item.id}" class="food-piece"`)).join('')}</div><div class="food-bins">${button(img('bowl-v1.png')+'<strong>Подходит коту</strong><small>Корм, вода, маленькое угощение</small>','data-bin="safe" class="food-bin"')}${button('<span class="away-dish" aria-hidden="true">↗</span><strong>Убрать</strong><small>Оставить за пределами миски</small>','data-bin="away" class="food-bin"')}</div><div class="sorted-items">${state.sorted.map(item=>`<span title="${FOODS[item.type].name}">${foodIcon(FOODS[item.type].icon)}</span>`).join('')}</div></div>`;
  if(id==='pet')return`<div class="pet-room"><div class="window-night" aria-hidden="true"><i></i></div><div class="room-lamp" aria-hidden="true"></div><div class="pet-rug"></div>${img('player-v1.png','Белый кот с голубыми глазами и коротким серым хвостиком','pet-cat')}${img('bowl-v1.png','','room-bowl')}${img('yarn-v1.png','','room-yarn')}<p class="pet-thought">${state.message||'Кот рядом. Чего сейчас не хватает?'}</p></div><div class="need-meters">${['Сытость','Вода','Игра','Силы'].map((name,i)=>`<div><span>${name}</span><span class="need-dots" aria-label="${state.needs[i]} из 4">${Array.from({length:4},(_,n)=>`<i class="${n<state.needs[i]?'filled':''}"></i>`).join('')}</span></div>`).join('')}</div>`;
  if(id==='grooming')return`<div class="groom-room"><div class="groom-mat"></div>${img('player-v1.png','Кот на мягком коврике','groom-cat')}${state.spots.map(mark=>button(mark.kind==='tangle'?'〰':mark.kind==='foam'?'○':mark.kind==='wet'?'·':'',`class="groom-spot ${mark.kind}" style="left:${mark.x}%;top:${mark.y}%" data-spot="${mark.id}" id="spot-${mark.id}" aria-label="Пятнышко ${mark.id+1}: ${spotName(mark.kind)}"`)).join('')}<span class="whisker-note">Голова и усы вне зоны ухода</span></div><div class="patience"><span>${state.patience?'Настроение кота':'Нужна передышка'}</span>${[0,1,2].map(n=>`<i class="${n<state.patience?'filled':''}"></i>`).join('')}</div><div class="groom-key">${[...new Set(state.spots.map(s=>s.kind))].map(kind=>`<span>${spotName(kind)} → ${GROOM_TOOLS[GROOM_STEPS[kind][0]].toLowerCase()}</span>`).join('')}</div>`;
  if(id==='litter')return`<div class="litter-box" style="--cols:${level.w};--rows:${level.h}">${state.depth.map((depth,cell)=>button(depth?`<span class="grains depth-${depth}" aria-hidden="true"></span><span class="sand-depth">${depth}</span>`:level.clumps.includes(cell)&&!state.found.includes(cell)?'<span class="dry-clump" aria-hidden="true"></span>':'<span class="clean-sand" aria-hidden="true"></span>',`data-cell="${cell}" class="sand-cell ${depth?'covered':'dug'}" aria-label="Клетка ${cell+1}, ${depth?'слоёв: '+depth:state.found.includes(cell)?'комочек собран':'открыта'}"`)).join('')}</div><div class="clump-tray"><span>В совке</span>${Array.from({length:level.clumps.length},(_,i)=>`<i class="${i<state.found.length?'found':''}"></i>`).join('')}</div>`;
  if(id==='yarn')return yarnView(preview||state.points,level);
  return'';
}
function spotName(kind){return{dust:'Пыль',tangle:'Свободные шерстинки',mud:'Грязное пятно',soapy:'Мокрое пятно',foam:'Пена',wet:'Мокрая шерсть'}[kind];}
function tunnelView(state,level){
  const W=(level.w+2)*100,H=level.h*100,route=connectedRoute(state,level),points=piece=>[(piece.x+1.5)*100,(piece.y+.5)*100];
  const tiles=state.pieces.map((piece,index)=>{
    const [x,y]=points(piece),edges=tunnelEdges(piece),paths=edges.map(e=>{const end=[[x,y-50],[x+50,y],[x,y+50],[x-50,y]][e];return`M${x} ${y}L${end[0]} ${end[1]}`;}).join(' '),kind=piece.kind;
    if(kind==='shelf')return`<path d="M${x-50} ${y}h100" class="fixed-shelf"/><path d="M${x-25} ${y+10}v24m50-24v24" class="shelf-support"/><text x="${x}" y="${y-15}" class="module-label">полка</text>`;
    if(kind==='hammock')return`<path d="M${x-50} ${y}q50 50 100 0" class="hammock"/><path d="M${x-50} ${y-12}v22m100-22v22" class="shelf-support"/><text x="${x}" y="${y-17}" class="module-label">гамак</text>`;
    return`<path d="${paths}" class="tube-outline"/><path d="${paths}" class="tube-fill ${route.includes(index)?'connected':''}"/><g role="button" tabindex="0" data-piece="${index}" id="piece-${index}" aria-label="Повернуть трубу ${index+1}"><rect x="${x-44}" y="${y-44}" width="88" height="88" rx="12" fill="transparent"/><text x="${x+24}" y="${y+29}" class="rotate-mark">↻</text></g>`;
  }).join('');
  const startY=(level.start.y+.5)*100,endY=(level.end.y+.5)*100,catX=50,catY=startY;
  return`<div class="tunnel-wall"><svg viewBox="0 0 ${W} ${H}" aria-label="Трубы, полки и гамаки на стене"><defs><pattern id="wall-dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.2" fill="#173744" opacity=".1"/></pattern></defs><rect width="${W}" height="${H}" fill="url(#wall-dots)"/><path d="M10 ${startY+12}h90M${W-100} ${endY+12}h90" class="fixed-shelf"/>${tiles}<image id="route-cat" href="${CAT}" x="${catX-34}" y="${catY-65}" width="68" height="68"/><path d="m${W-54} ${endY-13} 8-9 10 10-9 9Z" fill="#c69662" stroke="#173744" stroke-width="3"/></svg></div>`;
}
function yarnView(points,level){
  const bad=yarnConflicts(points,level.edges);
  return`<div class="yarn-board"><svg viewBox="0 0 100 100" aria-hidden="true">${level.edges.map(([a,b],i)=>`<line x1="${points[a].x}" y1="${points[a].y}" x2="${points[b].x}" y2="${points[b].y}" class="thread-outline"/><line x1="${points[a].x}" y1="${points[a].y}" x2="${points[b].x}" y2="${points[b].y}" class="thread ${bad.includes(i)?'crossed':''}"/>`).join('')}</svg>${points.map((p,node)=>button(`<img src="${YARN}" alt="" draggable="false"><span>${node+1}</span>`,`class="yarn-node" data-node="${node}" id="node-${node}" style="left:${p.x}%;top:${p.y}%" aria-label="Клубок ${node+1}. Перетащи или двигай стрелками."`)).join('')}</div>`;
}
export function goalText(id,state,level){
  if(id==='search')return`Найдено ${state.found.length} / ${level.targets.length}`;
  if(id==='tunnels')return state.won?'Трасса соединена':'Цель: связать две площадки';
  if(id==='food')return`Разобрано ${state.sorted.length} / ${level.items.length}`;
  if(id==='pet')return`Готово ${state.needs.filter(n=>n>=3).length} / 4`;
  if(id==='grooming')return`Осталось пятнышек: ${state.spots.length}`;
  if(id==='litter')return`Найдено ${state.found.length} / ${level.clumps.length}`;
  return`Запутанных нитей: ${yarnConflicts(state.points,level.edges).length}`;
}
