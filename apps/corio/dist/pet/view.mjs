import {catFigure,foodFigure,CAT_POSES} from '../characters.mjs?v=0.23.0';
import {petLifeAvailable} from '../mini/pet-continuous.mjs?v=0.23.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
const image=(file,x,y,w,h)=>`<image href="${asset(file)}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const names=['Сытость','Вода','Игра','Силы'];
const eyePoints={lookback:[[1316,149,12,10],[1364,154,22,12]],attentive:[[268,125,21,14],[322,135,13,14]],cautious:[[564,408,10,11],[607,407,18,13]],stretch:[[151,761,12,11],[195,760,19,12]],loaf:[[838,701,20,8],[910,700,18,9]]};
export function petWish(state){
 if(state.asleep)return'Кориолан дремлет. Можно просто посидеть рядом.';
 if(state.activity==='eat')return'Кориолан ест.';
 if(state.activity==='drink')return'Кориолан пьёт воду.';
 if(state.activity==='play')return'Клубок убегает, а кот тянется за ним.';
 if(state.activity==='pet')return'Подставляет голову под ладонь.';
 if(state.needs[0]<65&&state.bowls.food===0)return'Кажется, пора насыпать корм.';
 if(state.needs[1]<65&&state.bowls.water===0)return'В поилке закончилась вода.';
 if(state.needs[2]<40)return'А где мой клубок?';
 return'Хорошо, когда ты рядом.';
}
function visualPose(state){return state.activity==='idle'?(state.needs[2]<30?'lookback':Math.floor(state.activeSeconds/35)%2?'attentive':'loaf'):state.pose;}
function place(state){return{eat:'food',drink:'water',play:'play',sleep:'rest'}[state.activity]||null;}
export function petSceneKey(state,portrait){return JSON.stringify([portrait,visualPose(state),place(state),state.bowls,state.asleep,state.lamp,...['food','water','play','rest'].map(type=>petLifeAvailable(state,type))]);}
function cat(state,portrait){
 const pose=visualPose(state),placement=place(state);
 const positions=portrait?{food:[120,700,422,283],water:[290,700,422,283],play:[240,520,416,281],rest:[28,570,318,191]}:{food:[210,407,422,283],water:[602,407,422,283],play:[437,416,416,281],rest:[65,399,365,219]};
 const home=pose==='lookback'?(portrait?[290,457,274,337]:[450,348,274,337]):pose==='attentive'?(portrait?[289,414,280,380]:[456,305,280,380]):(portrait?[275,520,305,274]:[440,410,305,274]),p=positions[placement]||home;
 const crop=CAT_POSES[pose],k=Math.min(p[2]/crop[2],p[3]/crop[3]),head={lookback:[1340,165,65,55],attentive:[290,155,65,65],cautious:[590,415,63,49],stretch:[173,767,63,50],loaf:[871,725,86,63],sleep:[1193,823,100,70]}[pose],flipped=placement==='water'||placement==='play';
 const hx=p[0]+(p[2]-crop[2]*k)/2+((flipped?crop[0]*2+crop[2]-head[0]:head[0])-crop[0])*k,hy=p[1]+p[3]-crop[3]*k+(head[1]-crop[1])*k;
 const eyes=eyePoints[pose];
 let figure=catFigure(pose,{className:'pet-figure',x:p[0],y:p[1],width:p[2],height:p[3],flipX:flipped});
 if(eyes){const lids='<g class="pet-eyelids" aria-hidden="true">'+eyes.map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx+3}" ry="${ry+3}" fill="#f6eedb"/><path d="M${x-rx} ${y} Q${x} ${y+ry*.7} ${x+rx} ${y-1}" fill="none" stroke="#173744" stroke-width="4" stroke-linecap="round"/>`).join('')+'</g>';figure=figure.slice(0,-6)+(flipped?`<g transform="translate(${CAT_POSES[pose][0]*2+CAT_POSES[pose][2]} 0) scale(-1 1)">${lids}</g>`:lids)+'</svg>';}
 return `<g class="pet-character ${pose==='sleep'?'is-sleeping':''}" ${state.asleep?'data-care="rest"':''} data-pet-pose="${pose}" data-pet-action-pose="${placement||'home'}" role="button" tabindex="0" aria-label="${state.asleep?'Разбудить кота':'Погладить Кориолана'}"><ellipse class="pet-cat-hit" cx="${hx}" cy="${hy}" rx="${head[2]*k}" ry="${head[3]*k}" fill="transparent"/><ellipse class="pet-contact-shadow" pointer-events="none" cx="${p[0]+p[2]*.5}" cy="${p[1]+p[3]-8}" rx="${p[2]*.38}" ry="12" fill="#173744" opacity=".13"/>${figure}</g>`;
}
export function petRoom(state,portrait=false){
 const labels={food:'Насыпать корм',water:'Налить воду',play:'Покатать клубок',rest:state.asleep?'Разбудить кота':'Устроиться в лежанке'};
 const object=(action,x,y,w,h,drawing,label)=>`<g class="pet-object ${petLifeAvailable(state,action)?'available':'satisfied'}" data-care="${action}" role="button" tabindex="0" aria-label="${labels[action]}" aria-disabled="${!petLifeAvailable(state,action)}"><title>${labels[action]}</title><rect class="pet-object-hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="24"/>${drawing}<text class="pet-object-label" x="${x+w/2}" y="${y+h+20}" text-anchor="middle">${label}</text></g>`;
 const bowl=(x,y,filled)=>`<svg x="${x}" y="${y}" width="210" height="145" viewBox="50 280 1160 750">${image('bowl-v1.png',0,0,1254,1254)}</svg>`+(filled?`<svg x="${x+42}" y="${y-5}" width="128" height="78" viewBox="18 101 361 248">${image('food-atlas-v1.png',0,0,1536,1024)}</svg>`:'');
 const f=portrait?[28,850]:[50,608],w=portrait?[545,850]:[934,608],b=portrait?[5,660,350,165]:[25,470,440,207],t=portrait?[600,630]:[935,402];
 const food=object('food',f[0],f[1],225,145,bowl(f[0]+7,f[1]+2,state.bowls.food>0),'Корм');
 const water=object('water',w[0],w[1],215,145,bowl(w[0]+4,w[1]+2,false)+(state.bowls.water?`<svg x="${w[0]+4}" y="${w[1]+2}" width="210" height="145" viewBox="50 280 1160 750"><ellipse cx="625" cy="500" rx="420" ry="125" fill="#6b9da6" opacity=".8"/><path d="M330 480Q530 390 800 455" fill="none" stroke="#f4ead4" stroke-width="17" opacity=".5"/></svg>`:''),'Вода');
 const play=object('play',t[0],t[1],165,150,`<g data-pet-toy>${image('yarn-v1.png',t[0]+11,t[1]+6,145,145)}</g>`,'Играть');
 const bed=object('rest',b[0]+10,b[1],b[2]-20,b[3],`<svg x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" viewBox="40 212 1453 683">${image('pet-bed-alpha-v1.png',0,0,1536,1024)}</svg>`,'Лежанка');
 const background=portrait?image('pet-room-painted-v1.png',-330,0,1575,1050):image('pet-room-painted-v1.png',0,0,1200,800);
 return `<div class="pet-room-view"><svg class="pet-painting" viewBox="0 0 ${portrait?'800 1050':'1200 800'}" role="group" aria-label="Уголок Кориолана" preserveAspectRatio="xMidYMid meet">${background}${bed}${cat(state,portrait)}${food}${water}${play}<g class="pet-sleep-marks" aria-hidden="true" opacity="${state.asleep?1:0}"><text x="${portrait?265:340}" y="${portrait?570:390}">z</text><text x="${portrait?290:365}" y="${portrait?535:355}">z</text></g>${state.lamp==='dim'?`<rect width="${portrait?800:1200}" height="${portrait?1050:800}" fill="#112a3c" opacity=".25" pointer-events="none"/>`:''}</svg><p class="pet-wish">${petWish(state)}</p></div>`;
}
export function petNeeds(state){return names.map((name,i)=>`<div class="pet-need"><span>${name}</span><span class="pet-need-track" data-need="${i}" role="img" aria-label="${name}: ${Math.round(state.needs[i])} из 100"><i style="transform:scaleX(${state.needs[i]/100})"></i></span></div>`).join('');}
