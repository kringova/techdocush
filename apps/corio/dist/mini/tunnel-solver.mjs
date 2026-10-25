// Offline verifier. Runtime content imports tunnel-data.mjs, never this search.
const DELTAS=[[0,-1],[1,0],[0,1],[-1,0]];
const key=(x,y)=>x+','+y;
const shape=p=>Math.abs(p.edges[0]-p.edges[1])===2?'straight':'elbow';

export function validateTunnelLevel(level){
  if(!Number.isInteger(level.w)||!Number.isInteger(level.h)||level.w<1||level.h<1)throw new RangeError('Invalid tunnel board size');
  if(level.start?.x!==-1||level.end?.x!==level.w||![level.start.y,level.end.y].every(y=>Number.isInteger(y)&&y>=0&&y<level.h))throw new RangeError('Invalid tunnel terminals');
  const cells=new Map();
  for(const[piece,p]of level.pieces.entries()){
    if(!Number.isInteger(p.x)||!Number.isInteger(p.y)||p.x<0||p.x>=level.w||p.y<0||p.y>=level.h||cells.has(key(p.x,p.y)))throw new RangeError('Invalid or duplicate tunnel cell '+piece);
    if(!Array.isArray(p.edges)||p.edges.length!==2||new Set(p.edges).size!==2||!p.edges.every(e=>Number.isInteger(e)&&e>=0&&e<=3)||!Number.isInteger(p.turn)||p.turn<0||p.turn>3)throw new RangeError('Invalid two-port module '+piece);
    if(p.fixed){if(!['shelf','hammock'].includes(p.kind)||p.turn!==0||p.edges[0]!==1||p.edges[1]!==3)throw new RangeError('Fixed platforms must have edges[1,3], turn0');}
    else if(p.kind!=='pipe')throw new RangeError('Only straight/elbow pipes can rotate');
    cells.set(key(p.x,p.y),piece);
  }
  return cells;
}

function transitions(piece,incoming){
  const exits=new Map();
  for(let clicks=0;clicks<(piece.fixed?1:4);clicks++){
    const edges=piece.edges.map(e=>(e+piece.turn+clicks)%4);
    if(!edges.includes(incoming))continue;
    const outgoing=edges.find(e=>e!==incoming);
    if(!exits.has(outgoing))exits.set(outgoing,{outgoing,clicks,turn:(piece.turn+clicks)%4});
  }
  return [...exits.values()].sort((a,b)=>a.clicks-b.clicks||a.outgoing-b.outgoing);
}

/**
 * Complete shortest clockwise-rotation solver under the two-port rules.
 * Every winning orientation contains a simple start/end route (degree <=2).
 * For a chosen route each tile's incoming/outgoing pair fixes an orientation;
 * its minimum clockwise cost is independent of other route tiles. Straight
 * symmetry is handled by deduplicating equal exits at the least click cost.
 * Enumerating every permitted simple route and minimizing that sum therefore
 * gives a lower bound attained by the returned actions: a global optimum.
 * If the explicit expansion budget is reached, minMoves is null and the result
 * is not certified; a feasible incumbent is only an upper bound.
 */
export function solveTunnelLevel(level,{maxExpanded=2_000_000}={}){
  if(!Number.isInteger(maxExpanded)||maxExpanded<1)throw new RangeError('Invalid solver expansion budget');
  const cells=validateTunnelLevel(level),start=cells.get(key(0,level.start.y));
  let expanded=0,truncated=false,routes=0,best=null;
  const visited=new Uint8Array(level.pieces.length),route=[],orientations=[];
  function visit(index,incoming,cost){
    if(truncated)return;
    if(expanded>=maxExpanded){truncated=true;return;}expanded++;
    visited[index]=1;route.push(index);
    const p=level.pieces[index];
    for(const option of transitions(p,incoming)){
      const total=cost+option.clicks,[dx,dy]=DELTAS[option.outgoing],x=p.x+dx,y=p.y+dy;
      orientations.push({piece:index,turn:option.turn,clicks:option.clicks});
      if(x===level.end.x&&y===level.end.y){
        routes++;
        if(!best||total<best.cost||total===best.cost&&route.length<best.route.length)best={cost:total,route:[...route],orientations:orientations.map(o=>({...o}))};
      }else{
        const next=cells.get(key(x,y));
        if(next!==undefined&&!visited[next])visit(next,(option.outgoing+2)%4,total);
      }
      orientations.pop();if(truncated)break;
    }
    route.pop();visited[index]=0;
  }
  if(start!==undefined)visit(start,3,0);
  const complete=!truncated,actions=best?best.orientations.flatMap(o=>Array.from({length:o.clicks},()=>({type:'turn',piece:o.piece}))):[];
  return{solvable:best?true:complete?false:null,minMoves:complete&&best?best.cost:null,actions,route:best?.route||[],orientations:best?.orientations||[],proof:{
    complete,method:'Exhaustive simple-route enumeration with independent minimum clockwise local costs',
    lowerBound:complete&&best?best.cost:complete?null:0,upperBound:best?.cost??null,
    expandedStates:expanded,maxExpanded,feasibleRoutes:complete?routes:null,
    maxRoutePieces:level.pieces.length,reason:truncated?'expansion-budget':best?'all-simple-routes-exhausted':'no-route'
  }};
}

export function tunnelRouteMetrics(level,route){
  let verticalSteps=0,leftSteps=0;
  for(let i=1;i<route.length;i++){const a=level.pieces[route[i-1]],b=level.pieces[route[i]];if(b.y!==a.y)verticalSteps++;if(b.x<a.x)leftSteps++;}
  const ys=route.map(i=>level.pieces[i].y);
  return{width:level.w,height:level.h,pieces:level.pieces.length,movablePieces:level.pieces.filter(p=>!p.fixed).length,fixedPlatforms:level.pieces.filter(p=>p.fixed).length,routePieces:route.length,distractors:level.pieces.length-route.length,bends:route.filter(i=>shape(level.pieces[i])==='elbow').length,verticalSteps,leftSteps,heightSpan:ys.length?Math.max(...ys)-Math.min(...ys):0};
}

// Excludes names, initial turns, base orientation, wall padding and platform art.
// Reflection-equivalent arrangements share a key rather than padding the count.
export function tunnelGeometryKey(level){
  validateTunnelLevel(level);
  const minY=Math.min(...level.pieces.map(p=>p.y)),maxY=Math.max(...level.pieces.map(p=>p.y)),height=maxY-minY+1,keys=[];
  for(const mirrorX of[false,true])for(const mirrorY of[false,true]){
    const y=v=>mirrorY?maxY-v:v-minY;
    const cells=level.pieces.map(p=>[mirrorX?level.w-1-p.x:p.x,y(p.y),p.fixed?'platform':shape(p)]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
    keys.push(JSON.stringify([level.w,height,y(mirrorX?level.end.y:level.start.y),y(mirrorX?level.start.y:level.end.y),cells]));
  }
  return keys.sort()[0];
}
