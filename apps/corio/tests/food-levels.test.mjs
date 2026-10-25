import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {FOOD_LEVELS,FOOD_PILE_ASPECT,foodIsExposed} from '../dist/mini/food-data.mjs';
import {FOOD_CROP_SIZES} from '../dist/mini/food-geometry.mjs';
import {FOODS,createMini,miniAction,solutionFor} from '../dist/mini/engine.mjs';
const baseline=JSON.parse(await readFile(new URL('./fixtures/food-first-015.json',import.meta.url),'utf8'));
const sha=source=>createHash('sha256').update(source).digest('hex');
const core=level=>({name:level.name,items:level.items,placements:level.placements,layers:level.layers});
const recipe=level=>JSON.stringify([level.spec.family,level.spec.layerPlan,level.layers,level.items.length,level.spec.counts,level.spec.layerSizes]);
const remaining=level=>level.items.map((type,id)=>({type,id}));
// Independent algebraic oracle: each covering ellipse is an expanded quadratic
// form, rather than the production inverse-rotation/contains implementation.
function oracleFor(level){
 const ellipses=level.placements.map(p=>{const a=p.angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a),rx=p.width*1.35/2,ry=p.height/2;return{x:(p.x+p.width/2)*1.35,y:p.y+p.height/2,rx,ry,c,s,A:c*c/(rx*rx)+s*s/(ry*ry),B:c*s*(1/(rx*rx)-1/(ry*ry)),D:s*s/(rx*rx)+c*c/(ry*ry),z:p.z};});
 const probes=[[0,0],...Array.from({length:8},(_,i)=>[.4*Math.cos(i*Math.PI/4),.4*Math.sin(i*Math.PI/4)]),...Array.from({length:12},(_,i)=>[.8*Math.cos(i*Math.PI/6),.8*Math.sin(i*Math.PI/6)])];
 return(items,id)=>{if(!items.some(item=>item.id===id))return false;const target=ellipses[id];let patches=0;
  for(const[u,v]of probes){const x=target.x+u*target.rx*target.c-v*target.ry*target.s,y=target.y+u*target.rx*target.s+v*target.ry*target.c;
   const hidden=items.some(item=>{const q=ellipses[item.id];if(q.z<=target.z)return false;const dx=x-q.x,dy=y-q.y;return q.A*dx*dx+2*q.B*dx*dy+q.D*dy*dy<=1;});
   if(!hidden&&++patches>=3)return true;
  }return false;
 };
}

test('FOOD50 preserves the exact first prototype, unchanged food categories and unchanged exposure rules',async()=>{
 assert.equal(baseline.sourceTag,'corio-source-015-20261025');assert.deepEqual(core(FOOD_LEVELS[0]),baseline.level);assert.equal(sha(JSON.stringify(core(FOOD_LEVELS[0]))),baseline.firstCoreSha);
 const geometry=await readFile(new URL('../dist/mini/food-geometry.mjs',import.meta.url),'utf8');assert.equal(sha(geometry.slice(geometry.indexOf('// Samples stay inside the footprint:'))),baseline.geometryRulesSha);
 const engine=await readFile(new URL('../dist/mini/engine.mjs',import.meta.url),'utf8'),start=engine.indexOf('export const FOODS='),end=engine.indexOf('\n};',start)+3;assert.equal(sha(engine.slice(start,end)),baseline.foodsDeclarationSha);
 assert.equal(FOOD_PILE_ASPECT,1.35);assert.equal(FOODS.water.safe,true);assert.equal(FOODS.coffee.safe,false);
});

test('50 recipes differ in real composition or layer layout and follow the five monotone content bands',()=>{
 assert.equal(FOOD_LEVELS.length,50);assert.equal(new Set(FOOD_LEVELS.map(recipe)).size,50);assert.equal(new Set(FOOD_LEVELS.map(l=>l.name)).size,50);
 const spatial=l=>JSON.stringify(Array.from({length:l.layers},(_,layer)=>l.placements.filter(p=>p.layer===layer).map(p=>[Math.round((p.x+p.width/2)/5),Math.round((p.y+p.height/2)/5)]).sort((a,b)=>a[0]-b[0]||a[1]-b[1])));
 assert.equal(new Set(FOOD_LEVELS.map(spatial)).size,50,'Actual coarse layer geometry differs, independent of labels, ids, types and seeds');
 const families=new Set();let previous=0,total=0;
 for(const[index,l]of FOOD_LEVELS.entries()){
  const band=Math.floor(index/10),within=index%10,n=24+12*band+[0,0,2,4,4,6,8,8,10,12][within];assert.equal(l.id,'food-50-v1-'+(index+1));assert.equal(l.items.length,n);assert.ok(n>=previous&&n-previous<=4||index===0);previous=n;total+=n;
  const layers=band===0?(within<4?2:3):band+2+(within>=5?1:0);assert.equal(l.layers,layers);assert.equal(new Set(l.placements.map(p=>p.layer)).size,layers);assert.ok(l.idea.length>20);
  const allowed=Object.keys(FOOD_CROP_SIZES);for(const type of l.items)assert.ok(allowed.includes(type));assert.ok(!l.items.includes('water')&&!l.items.includes('coffee'));
  const types=new Set(l.items);assert.equal(types.size,band===0?6:band===1?8:band===2&&within<3?9:10);
  for(const type of types)assert.ok(l.items.filter(t=>t===type).length>=4);assert.ok(l.items.some(t=>FOODS[t].safe)&&l.items.some(t=>!FOODS[t].safe));
  const counts=Object.fromEntries([...types].map(t=>[t,l.items.filter(x=>x===t).length]));assert.deepEqual(counts,l.spec.counts);assert.equal(l.spec.safeCount,l.items.filter(t=>FOODS[t].safe).length);assert.equal(l.spec.awayCount,n-l.spec.safeCount);assert.deepEqual(l.spec.layerSizes,Array.from({length:l.layers},(_,layer)=>l.placements.filter(p=>p.layer===layer).length));families.add(l.spec.family);
 }
 assert.equal(total,2670);assert.equal(families.size,10);
});

test('every item keeps its native aspect, readable width and complete rotated bounds inside the bowl',()=>{
 for(const l of FOOD_LEVELS){assert.equal(l.placements.length,l.items.length);assert.equal(new Set(l.placements.map(p=>p.z)).size,l.items.length);
  for(const[id,p]of l.placements.entries()){
   assert.equal(p.id,id);assert.ok(p.width>=17&&p.width<=24);assert.ok(p.layer>=0&&p.layer<l.layers);const[cw,ch]=FOOD_CROP_SIZES[l.items[id]];assert.ok(Math.abs(p.height-p.width*ch/cw*1.35)<1e-10);
   const a=p.angle*Math.PI/180;for(const u of[-.5,.5])for(const v of[-.5,.5]){const dx=u*p.width*1.35,dy=v*p.height,x=p.x+p.width/2+(dx*Math.cos(a)-dy*Math.sin(a))/1.35,y=p.y+p.height/2+dx*Math.sin(a)+dy*Math.cos(a);assert.ok(x>=10-1e-10&&x<=90+1e-10&&y>=10-1e-10&&y<=90+1e-10);}
  }
 }
});

test('all 2670 reference sorts are exposed; an independent oracle checks every remaining item at every step',()=>{
 const definitions=JSON.stringify(FOOD_LEVELS);let checked=0,hiddenNoops=0;
 for(const[index,l]of FOOD_LEVELS.entries()){
  const oracle=oracleFor(l),order=l.clearOrder;assert.equal(order.length,l.items.length);assert.equal(new Set(order).size,order.length);assert.deepEqual(order,l.placements.toSorted((a,b)=>b.z-a.z).map(p=>p.id));assert.equal(l.minMoves,l.items.length);
  let state=createMini('food',index);const inventory=[...state.remaining].sort((a,b)=>a.id-b.id);
  for(const id of order){
   let hidden;
   for(const item of state.remaining){const actual=foodIsExposed(state.remaining,l,item.id);assert.equal(actual,oracle(state.remaining,item.id),'Exposure disagreement at '+l.id+'/'+item.id);if(!actual)hidden=item;checked++;}
   if(hidden){assert.equal(miniAction(state,{type:'sort',item:hidden.id,bin:FOODS[hidden.type].safe?'safe':'away'}),state);hiddenNoops++;}
   assert.equal(foodIsExposed(state.remaining,l,id),true);const before=JSON.stringify(state),next=miniAction(state,{type:'sort',item:id,bin:FOODS[l.items[id]].safe?'safe':'away'});assert.equal(next.moves,state.moves+1);assert.equal(next.mistakes,0);assert.equal(JSON.stringify(state),before);assert.deepEqual([...next.remaining,...next.sorted].sort((a,b)=>a.id-b.id),inventory);state=next;
  }
  assert.equal(state.won,true);assert.equal(state.moves,l.minMoves);assert.equal(state.remaining.length,0);assert.equal(state.sorted.length,l.items.length);
 }
 assert.ok(checked>75_000);assert.ok(hiddenNoops>1000);assert.equal(JSON.stringify(FOOD_LEVELS),definitions);
});

test('every surface offers safe and away choices; three safe feeds are reachable within five reference removals',()=>{
 for(const[index,l]of FOOD_LEVELS.entries()){
  const r=remaining(l),surface=r.filter(i=>foodIsExposed(r,l,i.id));assert.ok(surface.length>1);assert.ok(surface.some(i=>FOODS[i.type].safe));assert.ok(surface.some(i=>!FOODS[i.type].safe));assert.ok(surface.length<r.length,'At least one lower object is covered');
  assert.ok(l.clearOrder.slice(0,5).filter(id=>FOODS[l.items[id]].safe).length>=3);
  for(const category of[true,false]){const item=surface.find(i=>FOODS[i.type].safe===category),state=createMini('food',index),snapshot=JSON.stringify(state),wrong=miniAction(state,{type:'sort',item:item.id,bin:category?'away':'safe'});assert.equal(wrong.moves,1);assert.equal(wrong.mistakes,1);assert.deepEqual(wrong.remaining,state.remaining);assert.deepEqual(wrong.sorted,[]);assert.equal(wrong.won,false);assert.equal(JSON.stringify(state),snapshot);}
  assert.deepEqual(createMini('food',index),createMini('food',index));assert.deepEqual(solutionFor('food',index),solutionFor('food',index));assert.equal(solutionFor('food',index).length,l.minMoves);
 }
});

test('alternative choices never require the stored order and reveal-only removals cannot deadlock',()=>{
 for(const index of[0,9,10,19,20,29,30,39,40,49]){
  const l=FOOD_LEVELS[index];let state=createMini('food',index),step=0;
  while(!state.won){const available=state.remaining.filter(i=>foodIsExposed(state.remaining,l,i.id));assert.ok(available.length);const item=available[step++%2?0:available.length-1],beforeAvailable=new Set(available.map(i=>i.id));state=miniAction(state,{type:'sort',item:item.id,bin:FOODS[item.type].safe?'safe':'away'});for(const i of state.remaining)if(beforeAvailable.has(i.id))assert.equal(foodIsExposed(state.remaining,l,i.id),true,'Removing a cover cannot hide a formerly exposed item');}
  assert.equal(state.moves,l.items.length);assert.equal(state.mistakes,0);
 }
});

test('runtime content is static and has no random authoring or exposure search at module load',async()=>{
 const text=await readFile(new URL('../dist/mini/food-levels.mjs',import.meta.url),'utf8');assert.doesNotMatch(text,/\bimport\s|Math\.random|makeLevel\s*\(|foodIsExposed\s*\(/);
 const facade=await readFile(new URL('../dist/mini/food-data.mjs',import.meta.url),'utf8');assert.match(facade,/food-levels\.mjs\?v=[0-9.]+/);assert.equal(new Set([...facade.matchAll(/\?v=([0-9.]+)/g)].map(match=>match[1])).size,1);assert.doesNotMatch(facade,/Array\.from|function|Math\./);
});
