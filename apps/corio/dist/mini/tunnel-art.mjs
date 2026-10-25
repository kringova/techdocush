import {tunnelEdges,connectedRoute} from './engine.mjs?v=0.8.0';
import {catWalkFrame} from '../characters.mjs?v=0.8.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
const KIT={"straight-h":{"crop":[16,171,488,211],"ends":{"L":[66,276],"R":[454,276]}},"straight-v":{"crop":[578,13,202,430],"ends":{"U":[679,58],"D":[679,399]}},"elbow-lu":{"crop":[876,72,357,339],"ends":{"L":[925,312],"U":[1145,114]}},"elbow-ur":{"crop":[56,483,374,353],"ends":{"U":[156,527],"R":[384,737]}},"elbow-rd":{"crop":[472,542,360,329],"ends":{"R":[783,639],"D":[568,825]}},"elbow-dl":{"crop":[873,543,358,331],"ends":{"D":[1134,826],"L":[920,640]}},"shelf":{"crop":[9,966,469,204],"ends":{"L":[40,995],"R":[448,995]}},"hammock":{"crop":[474,928,449,246],"ends":{"L":[518,982],"R":[884,982]}},"treat-bowl":{"crop":[956,1003,286,183],"ends":{}}};
let serial=0;
const directions=['U','R','D','L'];
function drawImage(id,transform){
  const c=KIT[id].crop,clip='tunnel-crop-'+(++serial);
  return`<g transform="${transform}" class="painted-module"><defs><clipPath id="${clip}"><rect x="${c[0]}" y="${c[1]}" width="${c[2]}" height="${c[3]}"/></clipPath></defs><image href="${asset('tunnel-kit-alpha-v1.png')}" width="1254" height="1254" clip-path="url(#${clip})"/></g>`;
}
function align(id,x,y){
  const entries=Object.entries(KIT[id].ends),[a,b]=entries,p=a[1],r=b[1],target=d=>({L:[x-50,y],R:[x+50,y],U:[x,y-50],D:[x,y+50]})[d],q=target(a[0]),s=target(b[0]);
  let sx,sy;
  if(p[0]===r[0])sx=sy=(s[1]-q[1])/(r[1]-p[1]);
  else if(p[1]===r[1])sx=sy=(s[0]-q[0])/(r[0]-p[0]);
  else{sx=(s[0]-q[0])/(r[0]-p[0]);sy=(s[1]-q[1])/(r[1]-p[1]);}
  return drawImage(id,`translate(${q[0]-p[0]*sx} ${q[1]-p[1]*sy}) scale(${sx} ${sy})`);
}
function pipeId(edges){
  const names=edges.map(e=>directions[e]);
  if(names.includes('L')&&names.includes('R'))return'straight-h';
  if(names.includes('U')&&names.includes('D'))return'straight-v';
  return ['elbow-lu','elbow-ur','elbow-rd','elbow-dl'].find(id=>id.slice(6).split('').every(d=>names.includes(d.toUpperCase())));
}
export function tunnelGeometry(level){
  const lo=Math.min(level.start.y,level.end.y,...level.pieces.map(p=>p.y)),hi=Math.max(level.start.y,level.end.y,...level.pieces.map(p=>p.y));
  return{width:(level.w+2)*100,y:lo*100-60,height:(hi-lo+1)*100+120};
}
export function tunnelWalkPoints(state,level){
  const route=connectedRoute(state,level),points=[{x:50,y:(level.start.y+.5)*100+22}];
  for(const i of route){const p=state.pieces[i],x=(p.x+1.5)*100,y=(p.y+.5)*100+22;
    if(p.kind==='hammock')points.push({x:x-50,y},{x:x-25,y:y+15},{x,y:y+21},{x:x+25,y:y+15},{x:x+50,y});
    else points.push({x,y});
  }
  points.push({x:(level.w+1.5)*100,y:(level.end.y+.5)*100+22});return points;
}
export function renderTunnelView(state,level){
  const geometry=tunnelGeometry(level),W=geometry.width,startY=(level.start.y+.5)*100,endY=(level.end.y+.5)*100;
  const mask='tunnel-cat-mask-'+(++serial),pipes=state.pieces.filter(p=>p.kind==='pipe');
  const tiles=state.pieces.map((piece,index)=>{
    const x=(piece.x+1.5)*100,y=(piece.y+.5)*100;
    if(piece.kind==='shelf'||piece.kind==='hammock')return align(piece.kind,x,y+22);
    const edges=tunnelEdges(piece),drawing=align(pipeId(edges),x,y);
    return`<g role="button" tabindex="0" data-piece="${index}" id="piece-${index}" aria-label="Повернуть туннель ${index+1}" class="tunnel-piece">${drawing}<rect x="${x-47}" y="${y-44}" width="94" height="88" rx="12" fill="transparent" class="tunnel-hit"/><g class="turn-handle" transform="translate(${x+25} ${y+30})"><circle r="12"/><path d="M-5 2a5 5 0 1 0 1-6m-2-2 2 3 3-2"/></g></g>`;
  }).join('');
  const c=KIT['treat-bowl'].crop,scale=54/c[2],dish=drawImage('treat-bowl',`translate(${W-50-27-c[0]*scale} ${endY+22-((c[1]+c[3]-8)*scale)}) scale(${scale})`);
  return`<div class="tunnel-wall"><svg viewBox="0 ${geometry.y} ${W} ${geometry.height}" aria-label="Кошачьи полки, тканевые гамаки и открытые туннели на домашней стене"><defs><mask id="${mask}" maskUnits="userSpaceOnUse" x="-100" y="${geometry.y-100}" width="${W+200}" height="${geometry.height+200}"><rect x="-100" y="${geometry.y-100}" width="${W+200}" height="${geometry.height+200}" fill="white"/>${pipes.map(p=>`<rect x="${(p.x+1)*100}" y="${(p.y+.5)*100-80}" width="100" height="160" fill="black"/>`).join('')}</mask></defs>${align('shelf',50,startY+22)}${align('shelf',W-50,endY+22)}${tiles}${dish}<g mask="url(#${mask})">${catWalkFrame(0,{id:'route-cat',x:7,y:startY+22-63.17,width:86,height:65.67})}</g></svg></div>`;
}
