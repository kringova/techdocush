import {catFigure,foodFigure,CAT_POSES} from '../characters.mjs?v=0.22.0';
import {PET_ACTIONS,petGoals,petAvailable} from '../mini/pet-care.mjs?v=0.22.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
const image=(file,x,y,w,h)=>`<image href="${asset(file)}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const names=['Сытость','Вода','Игра','Силы'];
const eyePoints={attentive:[[268,125,21,14],[322,135,13,14]],cautious:[[564,408,10,11],[607,407,18,13]],stretch:[[151,761,12,11],[195,760,19,12]],loaf:[[838,701,20,8],[910,700,18,9]]};
export function petWish(state){
 if(state.won)return'Всё хорошо. Можно устроиться поудобнее.';
 if(state.needs[3]===0)return'Сначала немного отдохну.';
 if(state.needs[1]<2)return'Кажется, хочется попить.';
 if(state.needs[0]<2)return'Не пора ли поужинать?';
 if(state.needs[2]<2)return'А где мой клубок?';
 return'Хорошо, когда ты рядом.';
}
function cat(state,portrait){
 const pose=CAT_POSES[state.pose]?state.pose:'loaf';
 const positions=portrait?{food:[120,700,422,283],water:[290,700,422,283],play:[240,520,416,281],rest:[28,570,318,191]}:{food:[210,407,422,283],water:[602,407,422,283],play:[437,416,416,281],rest:[65,399,365,219]};
 const home=portrait?[275,520,305,274]:[440,410,305,274],p=state.won&&state.lastAction!=='rest'?home:positions[state.lastAction]||home;
 const crop=CAT_POSES[pose],k=Math.min(p[2]/crop[2],p[3]/crop[3]),head={attentive:[290,155,65,65],cautious:[590,415,63,49],stretch:[173,767,63,50],loaf:[871,725,86,63],sleep:[1193,823,100,70]}[pose],flipped=state.lastAction==='water'||state.lastAction==='play';
 const hx=p[0]+(p[2]-crop[2]*k)/2+((flipped?crop[0]*2+crop[2]-head[0]:head[0])-crop[0])*k,hy=p[1]+p[3]-crop[3]*k+(head[1]-crop[1])*k;
 const eyes=eyePoints[pose];
 let figure=catFigure(pose,{className:'pet-figure',x:p[0],y:p[1],width:p[2],height:p[3],flipX:state.lastAction==='water'||state.lastAction==='play'});
 if(eyes){const lids='<g class="pet-eyelids" aria-hidden="true">'+eyes.map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx+3}" ry="${ry+3}" fill="#f6eedb"/><path d="M${x-rx} ${y} Q${x} ${y+ry*.7} ${x+rx} ${y-1}" fill="none" stroke="#173744" stroke-width="4" stroke-linecap="round"/>`).join('')+'</g>';figure=figure.slice(0,-6)+((state.lastAction==='water'||state.lastAction==='play')?`<g transform="translate(${CAT_POSES[pose][0]*2+CAT_POSES[pose][2]} 0) scale(-1 1)">${lids}</g>`:lids)+'</svg>';}
 return `<g class="pet-character ${pose==='sleep'?'is-sleeping':''}" data-pet-pose="${pose}" data-pet-action-pose="${state.lastAction||'home'}" role="button" tabindex="0" aria-label="Погладить Кориолана"><ellipse class="pet-cat-hit" cx="${hx}" cy="${hy}" rx="${head[2]*k}" ry="${head[3]*k}" fill="transparent"/><ellipse class="pet-contact-shadow" pointer-events="none" cx="${p[0]+p[2]*.5}" cy="${p[1]+p[3]-8}" rx="${p[2]*.38}" ry="12" fill="#173744" opacity=".13"/>${figure}</g>`;
}
export function petRoom(state,portrait=false){
 const object=(action,x,y,w,h,drawing,label)=>`<g class="pet-object ${petAvailable(state,action)?'available':'satisfied'}" data-care="${action}" role="button" tabindex="0" aria-label="${PET_ACTIONS[action].name}" aria-disabled="${!petAvailable(state,action)}"><title>${PET_ACTIONS[action].name}</title><rect class="pet-object-hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="24"/>${drawing}<text class="pet-object-label" x="${x+w/2}" y="${y+h+20}" text-anchor="middle">${label}</text></g>`;
 const bowl=(x,y,filled)=>`<svg x="${x}" y="${y}" width="210" height="145" viewBox="50 280 1160 750">${image('bowl-v1.png',0,0,1254,1254)}</svg>`+(filled?`<svg x="${x+42}" y="${y-5}" width="128" height="78" viewBox="18 101 361 248">${image('food-atlas-v1.png',0,0,1536,1024)}</svg>`:'');
 const f=portrait?[28,850]:[50,608],w=portrait?[545,850]:[934,608],b=portrait?[5,660,350,165]:[25,470,440,207],t=portrait?[600,630]:[935,402];
 const food=object('food',f[0],f[1],225,145,bowl(f[0]+7,f[1]+2,state.actions.food>0),'Корм');
 const water=object('water',w[0],w[1],215,145,`<svg x="${w[0]+4}" y="${w[1]+2}" width="208" height="145" viewBox="1156 111 359 233">${image('food-atlas-v1.png',0,0,1536,1024)}</svg>`,'Вода');
 const play=object('play',t[0],t[1],165,150,`<g data-pet-toy>${image('yarn-v1.png',t[0]+11,t[1]+6,145,145)}</g>`,'Играть');
 const bed=object('rest',b[0]+10,b[1],b[2]-20,b[3],`<svg x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" viewBox="40 212 1453 683">${image('pet-bed-alpha-v1.png',0,0,1536,1024)}</svg>`,'Лежанка');
 const background=portrait?image('pet-room-painted-v1.png',-330,0,1575,1050):image('pet-room-painted-v1.png',0,0,1200,800);
 return `<div class="pet-room-view"><svg class="pet-painting" viewBox="0 0 ${portrait?'800 1050':'1200 800'}" role="group" aria-label="Уголок Кориолана" preserveAspectRatio="xMidYMid meet">${background}${bed}${cat(state,portrait)}${food}${water}${play}<g class="pet-sleep-marks" aria-hidden="true" opacity="${state.pose==='sleep'?1:0}"><text x="${portrait?265:340}" y="${portrait?570:390}">z</text><text x="${portrait?290:365}" y="${portrait?535:355}">z</text></g></svg><p class="pet-wish">${petWish(state)}</p></div>`;
}
export function petNeeds(state){return names.map((name,i)=>`<div class="pet-need"><span>${name}</span><span class="pet-need-dots" role="img" aria-label="${state.needs[i]} из 4">${[0,1,2,3].map(n=>`<i class="${n<state.needs[i]?'filled':''}"></i>`).join('')}</span></div>`).join('');}
export function petChecklist(state){return petGoals(state).map(goal=>`<li class="${goal.done?'done':''}"><span aria-hidden="true">${goal.done?'✓':'○'}</span> ${goal.text}</li>`).join('');}
