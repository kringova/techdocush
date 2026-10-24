export const GAME_EVENTS=['gameLevelStart','gameLevelComplete','gameLevelExit','gameProgress','gameActivity','gameHintUsed','gameCandidatesUsed','gameRoundPaused','gameRoundFinished','gameRoundRevived','gameTutorialStart','gameTutorialStep','gameTutorialComplete','gameTutorialSkip','gameTutorialDoubleTap','gameRewardedRequest','gameRewardedOpen','gameRewardedEarned','gameRewardedClose','gameRewardedError','gameFullscreenRequest','gameFullscreenOpen','gameFullscreenClose','gameFullscreenError','gameWordFound','gameWordRevealed'];

// No counter id means no script, requests, analytics cookies or event queue.
// The personal game never enables this sender. A broken/blocked tag is optional.
export function metricaSender({enabled=false,counterId=0,host=globalThis}={}){
 if(!enabled||!Number.isSafeInteger(counterId)||counterId<=0)return ()=>{};
 let failed=false;
 if(typeof host.ym!=='function'){
  host.ym=function(...args){(host.ym.a??=[]).push(args);};host.ym.l=Date.now();
  const script=host.document.createElement('script');script.async=true;script.src=`https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;script.onerror=()=>{failed=true;};host.document.head.append(script);
 }
 try{host.ym(counterId,'init',{clickmap:false,trackLinks:false,accurateTrackBounce:true,webvisor:false});}catch{failed=true;}
 return (name,params)=>{if(failed)return;try{host.ym(counterId,'reachGoal',name,params);}catch{}};
}

export function createAnalytics({enabled=false,send=()=>{},context=()=>({}),now=()=>performance.now()}={}){
 let actions={},totals={},activeSince=null,activeMs=0,started=false,left=false,progress=0;
 const milestones=new Set();
 function elapsed(){return Math.round(activeMs+(activeSince===null?0:now()-activeSince));}
 function event(name,params={}){if(!enabled||!GAME_EVENTS.includes(name))return;try{send(name,{game:context(),event:{[name]:params}});}catch{}}
 function flush(){if(!enabled||!Object.keys(actions).length)return;event('gameActivity',{actions,progress,activeSeconds:Math.round(elapsed()/1000)});actions={};}
 function activity(action,count=1){if(!enabled||!Number.isFinite(count)||count<=0)return;actions[action]=(actions[action]||0)+count;totals[action]=(totals[action]||0)+count;}
 function play(value){if(!enabled)return;if(value&&activeSince===null)activeSince=now();else if(!value&&activeSince!==null){activeMs+=now()-activeSince;activeSince=null;}}
 function leave(reason){if(!enabled||!started||left)return;flush();event('gameLevelExit',{reason,progress,activeSeconds:Math.round(elapsed()/1000),actions:totals});left=true;}
 function levelStart(){if(!enabled)return;actions={};totals={};activeMs=0;activeSince=null;progress=0;milestones.clear();started=true;left=false;event('gameLevelStart');}
 function updateProgress(percent){
  if(!enabled)return;progress=Math.max(0,Math.min(100,Math.round(percent)));
  for(const milestone of [25,50,75])if(progress>=milestone&&!milestones.has(milestone)){milestones.add(milestone);event('gameProgress',{percent:milestone,activeSeconds:Math.round(elapsed()/1000)});}
 }
 function complete(){if(!enabled||left)return;progress=100;flush();event('gameLevelComplete',{activeSeconds:Math.round(elapsed()/1000),actions:totals});left=true;}
 return {event,activity,play,flush,leave,levelStart,updateProgress,complete};
}
