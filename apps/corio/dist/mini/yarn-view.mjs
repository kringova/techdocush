import {yarnConflicts,yarnCrossings} from './engine.mjs?v=0.17.1';
const YARN=new URL('../assets/yarn-v1.png',import.meta.url).href;
const n=value=>Number(value.toFixed(3));
export function renderYarnView(points,level){
  const crossings=yarnCrossings(points,level.edges),bad=yarnConflicts(points,level.edges);
  const path=points.map((p,i)=>`${i?'L':'M'}${n(p.x)} ${n(p.y)}`).join(' ');
  const bridges=crossings.map(cross=>{
    const [a,b]=level.edges[cross.over],p=points[a],q=points[b],length=Math.hypot(q.x-p.x,q.y-p.y);
    const dx=(q.x-p.x)/length*1.9,dy=(q.y-p.y)/length*1.9;
    const d=`M${n(cross.x-dx)} ${n(cross.y-dy)}L${n(cross.x+dx)} ${n(cross.y+dy)}`;
    return`<g class="thread-bridge"><path d="${d}" class="thread-gap"/><path d="${d}" class="thread-ink"/><path d="${d}" class="thread-fibre"/></g>`;
  }).join('');
  return`<div class="yarn-board thread-board" data-thread-crossings="${crossings.length}" data-thread-conflicts="${bad.length}"><svg class="thread-drawing" viewBox="0 0 100 100" aria-hidden="true"><path data-thread-path d="${path}" class="thread-ink"/><path d="${path}" class="thread-fibre"/><path d="${path}" class="thread-grain"/>${bridges}</svg><img class="thread-ball" src="${YARN}" alt="Один клубок, начало нити закреплено" draggable="false" style="left:${points[0].x}%;top:${points[0].y}%">${points.slice(1).map((p,i)=>{
    const node=i+1,end=node===points.length-1;
    return`<button type="button" class="thread-handle${end?' thread-end':''}" data-node="${node}" id="node-${node}" style="left:${p.x}%;top:${p.y}%" aria-label="${end?'Свободный конец нити':'Изгиб нити '+node}. Перетаскивай или двигай стрелками."><span aria-hidden="true"></span></button>`;
  }).join('')}</div><p class="thread-note">Клубок закреплён · маленькие кольца можно тянуть</p>`;
}
