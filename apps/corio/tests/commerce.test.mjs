import test from 'node:test';
import assert from 'node:assert/strict';
import {createCommerce} from '../dist/commerce.mjs';
test('web prototype never initializes Yandex, charges money or pretends to own a purchase',async()=>{
  let calls=0;const service=createCommerce({productId:'boxes',getSDK:async()=>{calls++;throw Error();}});
  assert.equal((await service.init()).unlimited,true);assert.equal((await service.purchase()).purchased,false);assert.deepEqual(await service.reward(),{rewarded:true,demo:true});assert.equal(calls,0);
});
test('permanent per-game access restores from SDK and is never consumed',async()=>{
  const purchases=[];let consumed=0,charged=0;
  const payments={async getPurchases(){return purchases;},async getCatalog(){return[{id:'boxes',price:'10 X',priceValue:'10',priceCurrencyCode:'X'}];},async purchase({id}){charged++;const p={productID:id,purchaseToken:'verified'};purchases.push(p);return p;},async consumePurchase(){consumed++;}};
  const sdk={getPayments:async()=>payments};const service=createCommerce({profile:'yandex',productId:'boxes',getSDK:async()=>sdk});
  assert.equal((await service.init()).purchased,false);assert.equal((await service.purchase()).unlimited,true);await service.purchase();assert.equal(charged,1);assert.equal(consumed,0);
  const restored=createCommerce({profile:'yandex',productId:'boxes',getSDK:async()=>sdk});assert.equal((await restored.init()).purchased,true);
  const other=createCommerce({profile:'yandex',productId:'shelves',getSDK:async()=>sdk});assert.equal((await other.init()).purchased,false);
});
test('cancelled or unverified payments do not grant access',async()=>{
  const base={getPurchases:async()=>[],getCatalog:async()=>[{id:'boxes'}],purchase:async()=>{throw Error('cancelled');}};
  const service=createCommerce({profile:'yandex',productId:'boxes',getSDK:async()=>({getPayments:async()=>base})});await assert.rejects(service.purchase());assert.equal(service.status().purchased,false);
});
test('reward requires onRewarded, rejects late callbacks and shares a pending request',async()=>{
  let callbacks,calls=0,pauses=0,resumes=0;const sdk={adv:{showRewardedVideo(args){calls++;callbacks=args.callbacks;}}};
  const service=createCommerce({profile:'yandex',productId:'boxes',getSDK:async()=>sdk,onPause(){pauses++;},onResume(){resumes++;}});
  const first=service.reward();await Promise.resolve();callbacks.onClose();assert.equal((await first).rewarded,false);callbacks.onRewarded();
  const second=service.reward(),duplicate=service.reward();await Promise.resolve();callbacks.onRewarded();callbacks.onRewarded();callbacks.onClose();assert.equal((await second).rewarded,true);assert.equal((await duplicate).rewarded,true);assert.equal(calls,2);assert.equal(pauses,2);assert.equal(resumes,2);
  const third=service.reward();await Promise.resolve();callbacks.onError();assert.equal((await third).rewarded,false);
});
