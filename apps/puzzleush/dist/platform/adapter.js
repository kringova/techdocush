export function createPlatform({enabled=false,host=globalThis,onState=()=>{},onError=()=>{}}={}){
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
 async function advertise(kind,grant=()=>{}){
  if(!enabled)return {rewarded:false,shown:false,reason:'web'};
  if(adBusy)return {rewarded:false,shown:false,reason:'busy'};
  adBusy=true;pause('ad',true);
  const api=await init();
  if(!api?.adv){adBusy=false;pause('ad',false);return {rewarded:false,shown:false,reason:'unavailable'};}
  return new Promise(resolve=>{
   let closed=false,rewarded=false,shown=false,grantError=false;
   function finish(reason){if(closed)return;closed=true;adBusy=false;pause('ad',false);resolve({rewarded,shown,reason:grantError?'storage':reason});}
   function reward(){if(closed||rewarded)return;try{grant();rewarded=true;}catch(error){grantError=true;onError(error);}}
   const callbacks={onOpen(){shown=true;},onClose(wasShown){shown=shown||wasShown===true;finish('closed');},onError(){finish('error');}};
   if(kind==='rewarded'){callbacks.onRewarded=reward;callbacks.onReward=reward;}
   try{api.adv[kind==='rewarded'?'showRewardedVideo':'showFullscreenAdv']({callbacks});}catch{finish('error');}
  });
 }
 return {enabled,init,pause,ready(){uiReady=true;sync();},play(value){wantsPlay=value;sync();},blocked:()=>enabled&&(adBusy||pauses.has('platform')),rewarded:grant=>advertise('rewarded',grant),interstitial:()=>advertise('fullscreen')};
}
