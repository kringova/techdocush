import {catFigure,CAT_POSES,foodFigure} from '../characters.mjs?v=0.25.0';
import {petHomeAvailable as petLifeAvailable} from '../mini/pet-home.mjs?v=0.25.0';
import {petProp,petRibbon,petToolPreview,petTray} from './props.mjs?v=0.25.0';
const asset=file=>new URL('../assets/'+file,import.meta.url).href;
const image=(file,x,y,w,h)=>`<image href="${asset(file)}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const names=['Сытость','Вода','Игра','Силы'];
// All native cat drawings use the same scene units, including the walk atlas.
export const PET_CAT_SCALE=.66;
export function petTeaseTarget(portrait,target){
 const bounds=portrait?[490,805,740,815]:[740,610,940,650];
 const fallback=portrait?{x:680,y:810}:{x:850,y:630};
 return{x:Math.max(bounds[0],Math.min(bounds[2],Number.isFinite(target?.x)?target.x:fallback.x)),y:Math.max(bounds[1],Math.min(bounds[3],Number.isFinite(target?.y)?target.y:fallback.y))};
}
const eyePoints={lookback:[[1316,149,12,10],[1364,154,22,12]],attentive:[[268,125,21,14],[322,135,13,14]],cautious:[[564,408,10,11],[607,407,18,13]],stretch:[[151,761,12,11],[195,760,19,12]],loaf:[[838,701,20,8],[910,700,18,9]]};
export function petWish(state){
 if(state.queasyLeft>0)return'С лакомствами пока подождём. Пусть кот отдохнёт.';
 if(state.activity==='grumble'||state.handsCooldown>0)return'Мр-р! Сейчас хочется немного пространства.';
 if(state.asleep)return'Кориолан дремлет. Можно просто посидеть рядом.';
 if(state.activity==='litter')return'Кориолан в своём уголке. Подождём с уборкой.';
 if(state.activity==='brush')return'Подставляет спинку под мягкую щётку.';
 if(state.activity==='tease')return'Следит за бантиком и тянется лапой.';
 if(state.activity==='scratch')return'Тянется и перебирает лапами у когтеточки.';
 if(state.activity==='treat')return'Кориолан пробует лакомство.';
 if(state.activity==='eat')return'Кориолан ест.';
 if(state.activity==='drink')return'Кориолан пьёт воду.';
 if(state.activity==='play')return'Клубок убегает, а кот тянется за ним.';
 if(state.activity==='pet')return'Подставляет голову под ладонь.';
 if(state.needs[0]<65&&state.bowls.food===0)return'Кажется, пора насыпать корм.';
 if(state.needs[1]<65&&state.bowls.water===0)return'В поилке закончилась вода.';
 if(state.needs[2]<40)return'А где мой клубок?';
 if(state.litter.slots.filter(Boolean).length>=3)return'Похоже, пора убрать лоток.';
 return'Хорошо, когда ты рядом.';
}
function visualPose(state){return state.activity==='idle'?(state.queasyLeft>0?'cautious':state.handsCooldown>0||state.needs[2]<30?'lookback':Math.floor(state.activeSeconds/35)%2?'attentive':'loaf'):state.pose;}
function place(state){return{eat:'food',drink:'water',play:'play',sleep:'rest',tease:'tease',treat:'food',scratch:'scratch',brush:'brush',litter:'litter'}[state.activity]||null;}
const bedBox=portrait=>portrait?[25,621,340,160]:[45,387,350,165];
export function petSceneKey(state,portrait){return JSON.stringify([portrait,state.activity,visualPose(state),place(state),state.bowls,state.asleep,state.lamp,state.litter.slots,...['food','water','play','rest','pet','brush','treat','tease','scratch','scoop'].map(type=>petLifeAvailable(state,type))]);}
function cat(state,portrait,options={}){
 const pose=visualPose(state),placement=place(state);
 const crop=CAT_POSES[pose],k=PET_CAT_SCALE,width=crop[2]*k,height=crop[3]*k;
 const tease=petTeaseTarget(portrait,options.teaseTarget);
 const positions=portrait?{food:[90,643],water:[324,683],play:[255,543],rest:[193-width/2,743-height],tease:[tease.x-393,tease.y-213],scratch:[281,637],litter:[355,561]}:{food:[90,405],water:[720,445],play:[598,312],rest:[220-width/2,512-height],tease:[tease.x-393,tease.y-213],scratch:[501,517],litter:[555,257]};
 const origin=positions[placement]||[(portrait?428:592)-width/2,(portrait?794:685)-height],p=[...origin,width,height];
 const head={lookback:[1340,165,65,55],attentive:[290,155,65,65],cautious:[590,415,63,49],stretch:[173,767,63,50],loaf:[871,725,86,63],sleep:[1193,823,100,70]}[pose],flipped=['water','play','tease'].includes(placement);
 const hx=p[0]+(p[2]-crop[2]*k)/2+((flipped?crop[0]*2+crop[2]-head[0]:head[0])-crop[0])*k,hy=p[1]+p[3]-crop[3]*k+(head[1]-crop[1])*k;
 const eyes=eyePoints[pose];
 let figure=catFigure(pose,{className:'pet-figure',x:p[0],y:p[1],width:p[2],height:p[3]}),open=figure.indexOf('>')+1,content=figure.slice(open,-6);
 if(pose==='stretch'&&['play','tease','scratch'].includes(state.activity)){
  const paw='M226 790L254 812L227 840L159 875L98 900L56 904L39 889L45 868L117 828L184 803Z';
  const cut='M198 808L232 833L159 875L98 900L56 904L39 889L45 868L117 828Z';
  const overlay=catFigure(pose),drawing=overlay.slice(overlay.indexOf('>')+1,-6);
  content=`<defs><mask id="pet-paw-body" maskUnits="userSpaceOnUse" x="31" y="562" width="555" height="374"><rect x="31" y="562" width="555" height="374" fill="white"/><path d="${cut}" fill="black"/></mask><clipPath id="pet-paw-layer"><path d="${paw}"/></clipPath></defs><g mask="url(#pet-paw-body)">${content}</g><g data-pet-play-paw><g clip-path="url(#pet-paw-layer)">${drawing}</g></g>`;
 }
 if(eyes)content+='<g class="pet-eyelids" aria-hidden="true">'+eyes.map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx+3}" ry="${ry+3}" fill="#f6eedb"/><path d="M${x-rx} ${y} Q${x} ${y+ry*.7} ${x+rx} ${y-1}" fill="none" stroke="#173744" stroke-width="4" stroke-linecap="round"/>`).join('')+'</g>';
 if(flipped)content=`<g transform="translate(${crop[0]*2+crop[2]} 0) scale(-1 1)">${content}</g>`;
 figure=figure.slice(0,open)+content+'</svg>';
 const body={attentive:[180,280,220,190],loaf:[650,775,300,125],cautious:[680,215,285,185],lookback:[1210,250,220,210],stretch:[250,620,260,230],sleep:[1200,650,230,170]}[pose];
 const ear={attentive:[267,64],loaf:[776,620],cautious:[552,328],lookback:[1310,100],stretch:[135,700],sleep:[1130,775]}[pose];
 const zone=(name,[x,y,w,h])=>{const rawX=flipped?crop[0]*2+crop[2]-x-w:x;return `<rect class="pet-gesture-zone" data-pet-zone="${name}" x="${p[0]+(rawX-crop[0])*k}" y="${p[1]+(y-crop[1])*k}" width="${w*k}" height="${h*k}" fill="transparent" pointer-events="none"/>`;};
 return `<g class="pet-character ${pose==='sleep'?'is-sleeping':''}" ${state.asleep?'data-care="rest"':''} data-pet-activity="${state.activity}" data-pet-scale="${k}" data-pet-foot-x="${p[0]+p[2]/2}" data-pet-foot-y="${p[1]+p[3]-8}" data-pet-pose="${pose}" data-pet-action-pose="${placement||'home'}" role="button" tabindex="0" aria-label="${state.asleep?'Разбудить кота':'Погладить Кориолана'}"><ellipse class="pet-cat-hit" cx="${hx}" cy="${hy}" rx="${head[2]*k}" ry="${head[3]*k}" fill="transparent"/><ellipse class="pet-contact-shadow" pointer-events="none" cx="${p[0]+p[2]*.5}" cy="${p[1]+p[3]-8}" rx="${p[2]*.38}" ry="12" fill="#173744" opacity=".13"/><g data-pet-play-body>${figure}</g>${zone('body',body)}${zone('ear',[ear[0]-40,ear[1]-30,80,80])}</g>`;
}
export function petRoom(state,portrait=false,options={}){
 const {tool=null,roomView='room'}=options;
 const labels={food:'Насыпать корм',water:'Налить воду',play:'Покатать клубок',rest:state.asleep?'Разбудить кота':'Устроиться в лежанке'};
 const object=(action,x,y,w,h,drawing,label)=>`<g class="pet-object ${petLifeAvailable(state,action)?'available':'satisfied'}" data-care="${action}" role="button" tabindex="0" aria-label="${labels[action]}" aria-disabled="${!petLifeAvailable(state,action)}"><title>${labels[action]}</title><rect class="pet-object-hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="24"/>${drawing}<text class="pet-object-label" x="${x+w/2}" y="${y+h+20}" text-anchor="middle">${label}</text></g>`;
 const bowl=(x,y,filled)=>`<svg x="${x}" y="${y}" width="210" height="145" viewBox="50 280 1160 750">${image('bowl-v1.png',0,0,1254,1254)}</svg>`+(filled?`<svg x="${x+42}" y="${y-5}" width="128" height="78" viewBox="18 101 361 248">${image('food-atlas-v1.png',0,0,1536,1024)}</svg>`:'');
 const f=portrait?[28,850]:[50,608],w=portrait?[545,850]:[934,608],b=bedBox(portrait),t=portrait?[600,630]:[935,402];
 const food=object('food',f[0],f[1],225,145,bowl(f[0]+7,f[1]+2,state.bowls.food>0),'Корм');
 const water=object('water',w[0],w[1],215,145,bowl(w[0]+4,w[1]+2,false)+(state.bowls.water?`<svg x="${w[0]+4}" y="${w[1]+2}" width="210" height="145" viewBox="50 280 1160 750"><ellipse cx="625" cy="500" rx="420" ry="125" fill="#6b9da6" opacity=".8"/><path d="M330 480Q530 390 800 455" fill="none" stroke="#f4ead4" stroke-width="17" opacity=".5"/></svg>`:''),'Вода');
 const play=object('play',t[0],t[1],165,150,`<g data-pet-toy>${image('yarn-v1.png',t[0]+11,t[1]+6,145,145)}</g>`,'Играть');
 const bedDrawing=`<svg x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" viewBox="40 212 1453 683">${image('pet-bed-alpha-v1.png',0,0,1536,1024)}</svg>`;
 const bed=object('rest',b[0]+10,b[1],b[2]-20,b[3],bedDrawing,'Лежанка');
 const bedFront=`<g data-pet-bed-front data-pet-front-active="${state.asleep}" pointer-events="none"><defs><clipPath id="pet-bed-front"><rect x="${b[0]}" y="${b[1]+b[3]*.7}" width="${b[2]}" height="${b[3]*.3}"/></clipPath></defs><g clip-path="url(#pet-bed-front)">${state.asleep?bedDrawing:''}</g></g>`;
 const background=portrait?image('pet-room-painted-v1.png',-330,0,1575,1050):image('pet-room-painted-v1.png',0,0,1200,800);
 const shade=state.lamp==='dim'?`<rect data-pet-shade width="${portrait?800:1200}" height="${portrait?1050:800}" fill="#0b1828" opacity=".760784" pointer-events="none"/>`:'';
 if(roomView==='litter')return `<div class="pet-room-view pet-litter-focus"><svg class="pet-painting" viewBox="${portrait?'0 250 800 500':'120 180 960 500'}" role="group" aria-label="Уборка лотка" tabindex="0">${background}<rect width="1200" height="1050" fill="#173744" opacity=".48" pointer-events="none"/>${petTray(state,portrait?[40,340,720,330]:[210,260,780,358],{close:true})}${shade}${petToolPreview('scoop')}</svg><p class="pet-wish">${state.activity==='litter'?'Кориолан пользуется лотком. Подождём.':state.litter.slots.some(Boolean)?'Подцепи комочки лопаткой.':'Чистый песок. Всё готово.'}</p></div>`;
 const scratchBox=portrait?[65,805,250,74]:[340,690,220,65],trayBox=portrait?[340,650,400,184]:[570,385,330,152];
 const scratch=(!portrait||state.activity==='scratch')?`<g data-care="scratch" role="button" tabindex="0" aria-label="Когтеточка"><rect class="pet-object-hit" x="${scratchBox[0]}" y="${scratchBox[1]}" width="${scratchBox[2]}" height="${scratchBox[3]}" rx="15"/>${petProp('scratch',...scratchBox)}</g>`:'';
 const tray=(!portrait||state.activity==='litter')?petTray(state,trayBox):'';
 const trayFront=state.activity==='litter'?petTray(state,trayBox,{front:true}):'';
 const tease=petTeaseTarget(portrait,options.teaseTarget);
 const teaser=state.activity==='tease'?petRibbon(tease.x,tease.y):'';
 const treat=state.activity==='treat'?`<svg class="pet-treat-piece" x="115" y="${portrait?833:595}" width="58" height="43" pointer-events="none">${foodFigure('treat')}</svg>`:'';
 const teaseZone=portrait?[490,740,270,100]:[740,600,200,80];
 const focusScratch=portrait&&state.activity==='scratch',visit=state.activity==='litter';
 return `<div class="pet-room-view"><svg class="pet-painting" viewBox="0 0 ${portrait?'800 1050':'1200 800'}" role="group" aria-label="Уголок Кориолана" preserveAspectRatio="xMidYMid meet" tabindex="0">${background}${bed}${tray}${scratch}${state.activity==='tease'?play:''}${cat(state,portrait,options)}${bedFront}${trayFront}${focusScratch?'':food+water}${focusScratch||visit||state.activity==='tease'?'':play}${teaser}${treat}<rect class="pet-gesture-zone" data-pet-zone="tease" x="${teaseZone[0]}" y="${teaseZone[1]}" width="${teaseZone[2]}" height="${teaseZone[3]}" fill="transparent" pointer-events="none"/><g class="pet-sleep-marks" aria-hidden="true" opacity="${state.asleep?1:0}"><text x="${portrait?265:340}" y="${portrait?555:340}">z</text><text x="${portrait?290:365}" y="${portrait?520:305}">z</text></g>${shade}${petToolPreview(tool)}</svg><p class="pet-wish">${petWish(state)}</p></div>`;
}
export function petNeeds(state){return names.map((name,i)=>`<div class="pet-need"><span>${name}</span><span class="pet-need-track" data-need="${i}" role="img" aria-label="${name}: ${Math.round(state.needs[i])} из 100"><i style="transform:scaleX(${state.needs[i]/100})"></i></span></div>`).join('');}
