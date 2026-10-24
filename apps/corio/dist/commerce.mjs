export function createCommerce({profile='web-prototype',productId,getSDK=async()=>null,onPause=()=>{},onResume=()=>{}}={}){
  const prototype=profile==='web-prototype';let sdk=null,payments=null,product=null,purchased=false,known=false,initializing=null,buying=null,rewarding=null;
  async function restore(){
    if(prototype)return false;
    const purchases=await payments.getPurchases();if(!Array.isArray(purchases))throw Error('Invalid purchase list');
    purchased=purchases.some(p=>p.productID===productId);known=true;return purchased;
  }
  async function init(){
    if(prototype)return status();if(initializing)return initializing;
    initializing=(async()=>{
      sdk=await getSDK();if(!sdk)throw Error('Yandex SDK unavailable');
      payments=typeof sdk.getPayments==='function'?await sdk.getPayments({signed:false}):sdk.payments;
      if(!payments?.getPurchases)throw Error('Payments unavailable');
      await restore();const catalog=await payments.getCatalog();product=catalog.find(p=>p.id===productId)||null;return status();
    })();
    try{return await initializing;}finally{initializing=null;}
  }
  function status(){return{prototype,purchased,known,unlimited:prototype||purchased,product,productId};}
  async function purchase(){
    if(prototype)return{...status(),demo:true};if(buying)return buying;
    buying=(async()=>{
      await init();if(purchased)return status();if(!known||!product)throw Error('Purchase is not available');
      onPause('purchase');
      try{const result=await payments.purchase({id:productId});if(result.productID!==productId)throw Error('Unexpected purchased product');await restore();if(!purchased)throw Error('Purchase is pending verification');return status();}
      finally{onResume('purchase');}
    })();try{return await buying;}finally{buying=null;}
  }
  async function reward(){
    if(prototype)return{rewarded:true,demo:true};if(rewarding)return rewarding;
    rewarding=(async()=>{
      const api=sdk||await getSDK();if(!api?.adv?.showRewardedVideo)return{rewarded:false,reason:'unavailable'};
      onPause('reward');
      return new Promise(resolve=>{
        let earned=false,closed=false;
        const finish=reason=>{if(closed)return;closed=true;onResume('reward');resolve({rewarded:earned,reason});};
        try{api.adv.showRewardedVideo({callbacks:{onOpen(){},onRewarded(){if(!closed)earned=true;},onClose(){finish('closed');},onError(){finish('error');}}});}catch{finish('error');}
      });
    })();try{return await rewarding;}finally{rewarding=null;}
  }
  // Permanent access remains in the SDK purchase list: never consume this product.
  return{init,restore:async()=>{await init();return restore();},status,purchase,reward};
}
