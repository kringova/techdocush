import {catFigure,litterShape,foodFigure} from './characters.mjs?v=0.9.1';
const asset=file=>new URL('./assets/'+file,import.meta.url).href;
for(const [name,pose]of [['pet','loaf'],['grooming','wet'],['yarn','stretch']]){
  const cover=document.querySelector('.'+name+'-cover');if(!cover)continue;
  const label=cover.querySelector('.label')?.outerHTML||'';
  cover.innerHTML=(name==='pet'?`<img class="cover-painting" src="${asset('search-room-painted-v1.png')}" alt="">`:'')+catFigure(pose,{className:'cover-character'})+(name==='yarn'?`<img class="cover-wool" src="${asset('yarn-v1.png')}" alt="">`:'')+label;
}
const search=document.querySelector('.search-cover-bg');if(search)search.src=asset('search-room-integrated-v2.png');
const litter=document.querySelector('.litter-cover');if(litter){const label=litter.querySelector('.label')?.outerHTML||'';litter.innerHTML=`<div class="cover-litter-grid">${[0,null,2,-1,0,-1].map(shape=>`<span>${shape!==null&&shape>=0?litterShape(shape):''}</span>`).join('')}</div>`+label;}

const food=document.querySelector('.food-cover');if(food){const label=food.querySelector('.label')?.outerHTML||'';food.innerHTML=`<div class="cover-food-plate">${['dry','chocolate','water','candy'].map(kind=>foodFigure(kind)).join('')}</div>`+label;}
