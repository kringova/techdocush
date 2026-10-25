// Pure runtime traversal. Crossing channels never communicate with each other.
const DELTAS=[[0,-1],[1,0],[0,1],[-1,0]];
export const tunnelEdges=piece=>piece.edges.map(edge=>(edge+piece.turn)%4);
export function traceTunnelRoute(state,level){
  const pieces=state.pieces,cells=new Map(pieces.map((p,i)=>[p.x+','+p.y,i]));
  const checkpoints=level.checkpoints||[],visitedCheckpoints=[],reached=new Set(),visited=new Set(),route=[],steps=[];
  let piece=cells.get('0,'+level.start.y),incoming=3,connected=false;
  while(piece!==undefined){
    const p=pieces[piece],edges=tunnelEdges(p);if(!edges.includes(incoming))break;
    const crossing=p.kind==='crossing',channel=crossing?(incoming%2?'EW':'NS'):'single';
    const visit=piece+':'+channel;if(visited.has(visit))break;
    const outgoing=crossing?(incoming+2)%4:edges.find(edge=>edge!==incoming);
    if(outgoing===undefined)break;
    visited.add(visit);route.push(piece);steps.push({piece,incoming,outgoing,channel});
    if(checkpoints.includes(piece)&&!reached.has(piece)){reached.add(piece);visitedCheckpoints.push(piece);}
    const [dx,dy]=DELTAS[outgoing],x=p.x+dx,y=p.y+dy;
    if(x===level.end.x&&y===level.end.y){connected=true;break;}
    piece=cells.get(x+','+y);incoming=(outgoing+2)%4;
  }
  const missing=checkpoints.filter(index=>!reached.has(index));
  return{route,steps,connected,complete:connected&&!missing.length,missing,visitedCheckpoints};
}
export function connectedRoute(state,level){const trace=traceTunnelRoute(state,level);return trace.complete?trace.route:[];}
