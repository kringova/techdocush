const atlas=new URL('../assets/food-cat-reactions-alpha-v1.png',import.meta.url).href;
const frames={neutral:[50,0,600,627],pleased:[654,0,600,627],displeased:[50,627,600,627],retch:[654,627,600,627]};
const descriptions={neutral:'Кориолан ждёт угощения',pleased:'Кориолан доволен',displeased:'Кориолан недоволен',retch:'Кориолану нехорошо'};
let serial=0;
export function foodCatPortrait(mood='neutral'){
  if(!frames[mood])mood='neutral';
  const crop=frames[mood],clip='food-cat-frame-'+(++serial);
  return `<svg class="food-cat-face" data-food-cat-portrait data-mood="${mood}" viewBox="${crop.join(' ')}" role="img" aria-label="${descriptions[mood]}" preserveAspectRatio="xMidYMax meet" overflow="hidden"><defs><clipPath id="${clip}"><rect x="${crop[0]}" y="${crop[1]}" width="${crop[2]}" height="${crop[3]}"/></clipPath></defs><image href="${atlas}" width="1254" height="1254" clip-path="url(#${clip})"/></svg>`;
}

// One timeout for a current reaction, no idle frame loop. The remaining duration
// is held while the game is paused, hidden or covered by a settings panel.
export function createFoodFeedback({scene,isBlocked=()=>false}){
  let mood='neutral',mistakes=0,retchShown=false,message='Выбери продукт сверху',timer=null,startedAt=0,remaining=0,disposed=false,animations=[];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const blocked=()=>document.hidden||isBlocked();
  const cancelAnimations=()=>{for(const animation of animations)animation.cancel();animations=[];};
  function stopClock(){if(timer!==null){clearTimeout(timer);timer=null;remaining=Math.max(0,remaining-(performance.now()-startedAt));}startedAt=0;}
  function clearReaction(){stopClock();cancelAnimations();remaining=0;mood='neutral';}
  function paint(){
    if(disposed)return;
    const portrait=scene.querySelector('[data-food-cat]'),note=scene.querySelector('[data-food-message]'),table=scene.querySelector('.pile-game');
    cancelAnimations();
    if(portrait){portrait.innerHTML=foodCatPortrait(mood);portrait.dataset.reaction=mood;}
    if(note){note.textContent=message;note.dataset.reaction=mood;}
    if(table){table.dataset.foodReaction=mood;table.dataset.foodMistakes=mistakes;table.dataset.foodRetchShown=String(retchShown);}
    if(mood==='retch'&&portrait&&!reduced.matches){
      const elapsed=Math.max(0,1800-remaining-(timer!==null?performance.now()-startedAt:0));
      const face=portrait.querySelector('.food-cat-face');
      const animation=face.animate([{transform:'translateY(0) rotate(0deg)'},{transform:'translateY(5px) rotate(-3deg)',offset:.3},{transform:'translateY(1px) rotate(1deg)',offset:.65},{transform:'translateY(0) rotate(0deg)'}],{duration:600,iterations:3,easing:'ease-in-out',fill:'none'});
      animation.currentTime=Math.min(1799,elapsed);animations=[animation];
      if(blocked())animation.pause();
    }
  }
  function schedule(){
    if(disposed||mood==='neutral'||remaining<=0||blocked())return;
    if(timer===null){startedAt=performance.now();timer=setTimeout(()=>{timer=null;startedAt=0;remaining=0;mood='neutral';paint();},remaining);}
  }
  function sync(){
    if(disposed)return;
    if(blocked()){stopClock();for(const animation of animations){const held=animation.currentTime;animation.pause();if(held!==null)animation.currentTime=held;}}
    else{for(const animation of animations)animation.play();schedule();}
  }
  function react(next,duration){clearReaction();mood=next;remaining=duration;paint();schedule();}
  function afterRender(){paint();sync();}
  function newLevel(){clearReaction();mistakes=0;retchShown=false;message='Выбери продукт сверху';paint();}
  function sorted({correct,mistakes:count,message:text}){
    mistakes=count;if(text)message=text;
    if(mood==='retch'&&remaining>0){paint();sync();return;}
    if(!correct&&mistakes>=3&&!retchShown){retchShown=true;react('retch',1800);}
    else react(correct?'pleased':'displeased',correct?1100:1400);
  }
  function undo(count){clearReaction();mistakes=count;message='Действие отменено. Можно выбрать другой продукт.';paint();}
  function setMessage(text){message=String(text||'Выбери продукт сверху');const note=scene.querySelector('[data-food-message]');if(note)note.textContent=message;}
  const observer=new MutationObserver(sync);
  for(const dialog of document.querySelectorAll('dialog'))observer.observe(dialog,{attributes:true,attributeFilter:['open']});
  for(const type of['corio:pause','corio:resume','corio:platform-pause','corio:platform-resume','blur','focus'])window.addEventListener(type,sync);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',afterRender);
  return {afterRender,newLevel,sorted,undo,message:setMessage,state:()=>({mood,mistakes,retchShown,remaining:Math.max(0,remaining-(timer!==null?performance.now()-startedAt:0)),timerActive:timer!==null,animationCount:animations.length}),dispose(){disposed=true;clearReaction();observer.disconnect();for(const type of['corio:pause','corio:resume','corio:platform-pause','corio:platform-resume','blur','focus'])window.removeEventListener(type,sync);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',afterRender);}};
}
