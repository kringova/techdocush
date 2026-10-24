export function createPlatform({enabled=false,host=globalThis,onState=()=>{},onError=()=>{},onAdEvent=()=>{}}={}){
 let sdk=null,pending=null,uiReady=false,ready=false,wantsPlay=false,playing=false,adBusy=false;
 const pauses=new Set();
 function sync(){
  if(!sdk)return;
  if(uiReady&&!ready){sdk.features.LoadingAPI.ready();ready=true;}
  const next=ready&&wantsPlay&&!pauses.size;
  if(next!==playing){sdk.features.GameplayAPI?.[next?'start':'stop']();playing=next;}
 }
 function pause(reason,value){value?pauses.add(reason):pauses.delete(reason);sync();onState();}
 async function init(){
  if(!enabled)return null;if(sdk)return sdk;if(pending)return pending;
  pending=(async()=>{
   await Promise.resolve();
   let timer;
   try{
    if(!host.YaGames?.init)throw Error('SDK Яндекса не загрузился');
    sdk=await Promise.race([host.YaGames.init(),new Promise((_,reject)=>{timer=host.setTimeout(()=>reject(Error('SDK Яндекса не ответил')),12000);})]);
    if(!sdk?.features?.LoadingAPI?.ready)throw Error('SDK Яндекса не готов');
    // The initial release declares Russian only. Read platform locale and use
    // the declared language as fallback for every unsupported locale.
    const requested=sdk.environment?.i18n?.lang||'ru',language=['ru'].includes(requested)?requested:'ru';
    host.document?.documentElement?.setAttribute('lang',language);
    sdk.on?.('game_api_pause',()=>pause('platform',true));sdk.on?.('game_api_resume',()=>pause('platform',false));
    sync();return sdk;
   }catch(error){sdk=null;onError(error);return null;}
   finally{if(timer)host.clearTimeout(timer);pending=null;}
  })();return pending;
 }
 function adEvent(kind,stage,placement,params={}){try{onAdEvent(`game${kind==='rewarded'?'Rewarded':'Fullscreen'}${stage}`,{placement,...params});}catch{}}
 async function advertise(kind,grant=()=>{},placement='between_levels'){
  if(!enabled)return {rewarded:false,shown:false,reason:'web'};
  if(adBusy)return {rewarded:false,shown:false,reason:'busy'};
  adEvent(kind,'Request',placement);adBusy=true;pause('ad',true);
  const api=await init();
  if(!api?.adv){adEvent(kind,'Error',placement,{reason:'unavailable'});adBusy=false;pause('ad',false);return {rewarded:false,shown:false,reason:'unavailable'};}
  return new Promise(resolve=>{
   let closed=false,rewarded=false,shown=false,grantError=false;
   function finish(reason){if(closed)return;adEvent(kind,reason==='error'?'Error':'Close',placement,{shown,rewarded});closed=true;adBusy=false;pause('ad',false);resolve({rewarded,shown,reason:grantError?'storage':reason});}
   function reward(){if(closed||rewarded)return;try{grant();rewarded=true;adEvent(kind,'Earned',placement,{granted:true});}catch(error){grantError=true;onError(error);}}
   const callbacks={onOpen(){shown=true;adEvent(kind,'Open',placement);},onClose(wasShown){shown=shown||wasShown===true;finish('closed');},onError(){finish('error');}};
   if(kind==='rewarded'){callbacks.onRewarded=reward;callbacks.onReward=reward;}
   try{api.adv[kind==='rewarded'?'showRewardedVideo':'showFullscreenAdv']({callbacks});}catch{finish('error');}
  });
 }
 return {enabled,init,pause,ready(){uiReady=true;sync();},play(value){wantsPlay=value;sync();},blocked:()=>enabled&&(adBusy||pauses.has('platform')),rewarded:(grant,placement)=>advertise('rewarded',grant,placement),interstitial:()=>advertise('fullscreen')};
}
