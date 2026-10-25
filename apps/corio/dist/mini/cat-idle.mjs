// Only one local detail changes at a time. No render loop runs between reactions.
export function createCatIdle({host,isBlocked,parts=['eyes','ear','lick']}){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let focused=document.hasFocus(),timer=null,nextAt=0,animation=null,bag=[],lastReaction=null,reactions=0;
  const blocked=()=>!focused||document.hidden||isBlocked();
  function cancelAnimation(){animation?.cancel();animation=null;}
  function clear(){clearTimeout(timer);timer=null;nextAt=0;cancelAnimation();}
  function nextPart(){
    if(!bag.length){
      bag=[...parts];
      for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
      if(bag.length>1&&bag.at(-1)===lastReaction)[bag[0],bag[bag.length-1]]=[bag.at(-1),bag[0]];
    }
    return bag.pop();
  }
  function schedule(){
    if(timer!==null||blocked()||reduced.matches)return;
    const delay=8000+Math.random()*4000;nextAt=performance.now()+delay;
    timer=setTimeout(()=>{timer=null;nextAt=0;if(!blocked()){reactions++;react(nextPart());}},delay);
  }
  function react(part){
    if(blocked()||reduced.matches)return;
    clearTimeout(timer);timer=null;nextAt=0;cancelAnimation();lastReaction=part;
    const layer=host.querySelector(`[data-cat-layer="${part}"]`);
    if(layer){
      animation=layer.animate([{opacity:0},{opacity:1,offset:.18},{opacity:1,offset:.66},{opacity:0}],{duration:part==='eyes'?260:part==='lick'?520:620,easing:'ease-in-out'});
      animation.onfinish=()=>{animation=null;};
    }
    // Intervals measure from the start of a reaction, not its last frame.
    schedule();
  }
  function reconcile(){
    const suspended=blocked()||reduced.matches;
    host.classList.toggle('life-paused',suspended);
    if(suspended)clear();else schedule();
    // Pin compositor animation time as well as its CSS play state. WebKit can
    // otherwise deliver a late transform sample while a modal is opening.
    const ambient=host.querySelector('.search-ambient');
    for(const a of ambient?.getAnimations({subtree:true})||[]){
      if(suspended){const time=a.currentTime;a.pause();if(time!==null)a.currentTime=time;}
      else if(a.playState==='paused')a.play();
    }
  }
  document.addEventListener('visibilitychange',reconcile);
  window.addEventListener('blur',()=>{focused=false;reconcile();});
  window.addEventListener('focus',()=>{focused=true;reconcile();});
  for(const event of ['corio:pause','corio:resume','corio:platform-pause','corio:platform-resume'])window.addEventListener(event,reconcile);
  reduced.addEventListener('change',reconcile);
  const observer=new MutationObserver(reconcile);
  for(const dialog of document.querySelectorAll('dialog'))observer.observe(dialog,{attributes:true,attributeFilter:['open']});
  return{
    react,reconcile,
    afterRender(){cancelAnimation();reconcile();},
    newLevel(){clear();bag=[];},
    snapshot:()=>({idleReactions:reactions,lastReaction,animationRunning:animation?.playState==='running',nextIdleIn:nextAt?Math.max(0,nextAt-performance.now()):null,reducedMotion:reduced.matches,blocked:blocked()})
  };
}
