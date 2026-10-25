import {catFigure,litterShape,foodFigure} from './characters.mjs?v=0.16.0';
const asset=file=>new URL('./assets/'+file,import.meta.url).href;
for(const [name,pose]of [['pet','loaf'],['grooming','wet'],['yarn','stretch']]){
  const cover=document.querySelector('.'+name+'-cover');if(!cover)continue;
  const label=cover.querySelector('.label')?.outerHTML||'';
  cover.innerHTML=(name==='pet'?`<img class="cover-painting" src="${asset('search-room-painted-v1.png')}" alt="">`:'')+catFigure(pose,{className:'cover-character'})+(name==='yarn'?`<svg class="cover-thread" viewBox="0 0 400 220" aria-hidden="true"><path d="M80 140C165 60 280 103 220 153S139 159 201 117 327 110 330 168" fill="none" stroke="#173744" stroke-width="7" stroke-linecap="round"/><path d="M80 140C165 60 280 103 220 153S139 159 201 117 327 110 330 168" fill="none" stroke="#e4c694" stroke-width="4" stroke-linecap="round"/></svg><img class="cover-wool" src="${asset('yarn-v1.png')}" alt="">`:'')+label;
}
const search=document.querySelector('.search-cover-bg');if(search)search.src=asset('search-room-integrated-v2.png');
const litter=document.querySelector('.litter-cover');if(litter){const label=litter.querySelector('.label')?.outerHTML||'';litter.innerHTML=`<div class="cover-litter-grid">${[0,null,2,-1,0,-1].map(shape=>`<span>${shape!==null&&shape>=0?litterShape(shape):''}</span>`).join('')}</div>`+label;}

const food=document.querySelector('.food-cover');if(food){const label=food.querySelector('.label')?.outerHTML||'';food.innerHTML=`<div class="cover-food-plate">${['dry','chocolate','water','candy'].map(kind=>foodFigure(kind)).join('')}</div>`+label;}
