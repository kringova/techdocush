import test from 'node:test';
import assert from 'node:assert/strict';
import {createBenefits} from '../dist/engine/benefits.js';
import {createPlatform} from '../dist/platform/adapter.js';
import {createDoubleTap} from '../dist/engine/double-tap.js';

const memory=()=>{const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};};
test('benefits survive reload, grant once, and re-reading an explanation costs nothing',()=>{
 const storage=memory(),b=createBenefits(storage,'test');b.grantHints('view-1');b.grantHints('view-1');assert.equal(b.snapshot().hints,3);
 assert.ok(b.readHint('position-1'));assert.ok(b.readHint('position-1'));assert.equal(b.snapshot().hints,2);
 b.grantCandidates('puzzle-21','view-2');const next=createBenefits(storage,'test');assert.equal(next.snapshot().hints,2);assert.ok(next.hasCandidates('puzzle-21'));assert.ok(!next.hasCandidates('puzzle-22'));
 assert.ok(next.readHint('position-2'));assert.ok(next.readHint('position-3'));assert.ok(!next.readHint('position-4'));assert.ok(next.readHint('position-1'));
});
test('fourth error pauses; reload, duplicate rewards and finished attempts cannot bypass the round state',()=>{
 const storage=memory(),b=createBenefits(storage,'test');b.startAttempt('p','round-1');
 for(let n=1;n<=3;n++){b.mistake('p');assert.deepEqual(b.attempt('p'),{id:'round-1',errors:n,status:'playing'});}
 b.mistake('p');assert.equal(b.attempt('p').status,'paused');assert.equal(b.mistake('p'),false);
 const next=createBenefits(storage,'test');assert.equal(next.attempt('p').status,'paused');assert.ok(!next.revive('p','wrong-round','ad-1'));assert.ok(next.revive('p','round-1','ad-1'));assert.equal(next.attempt('p').errors,0);assert.ok(!next.revive('p','round-1','ad-1'));
 for(let n=0;n<4;n++)next.mistake('p');assert.ok(!next.revive('p','round-1','ad-1'));next.finish('p');assert.ok(!next.revive('p','round-1','ad-2'));next.startAttempt('p','round-2');assert.equal(next.attempt('p').errors,0);
});
test('failed persistence never invents a saved reward or spends a hint',()=>{
 const storage=memory(),b=createBenefits(storage,'test');b.grantHints('one');storage.setItem=()=>{throw Error('quota');};assert.throws(()=>b.readHint('p'));assert.equal(b.snapshot().hints,3);assert.throws(()=>b.grantHints('two'));assert.equal(b.snapshot().hints,3);
});
function fixture(){
 const events=[],handlers={};let callbacks;
 const sdk={features:{LoadingAPI:{ready:()=>events.push('ready')},GameplayAPI:{start:()=>events.push('start'),stop:()=>events.push('stop')}},on:(name,fn)=>{handlers[name]=fn;},adv:{showRewardedVideo:arg=>{callbacks=arg.callbacks;},showFullscreenAdv:arg=>{callbacks=arg.callbacks;}}};
 const host={YaGames:{init:async()=>sdk},setTimeout,clearTimeout};
 return {events,handlers,host,callbacks:()=>callbacks};
}
test('web profile never initializes the SDK or calls advertising',async()=>{
 let calls=0;const p=createPlatform({host:{YaGames:{init(){calls++;}}}});await p.init();p.ready();p.play(true);await p.rewarded(()=>calls++);await p.interstitial();assert.equal(calls,0);
});
test('ready follows interactive UI, gameplay stops for ads and platform pause; reward aliases grant once',async()=>{
 const f=fixture(),p=createPlatform({enabled:true,host:f.host});await p.init();p.play(true);assert.deepEqual(f.events,[]);p.ready();assert.deepEqual(f.events,['ready','start']);
 let grants=0;const ad=p.rewarded(()=>grants++);await new Promise(r=>setImmediate(r));assert.ok(p.blocked());assert.equal(f.events.at(-1),'stop');f.callbacks().onOpen();f.callbacks().onRewarded();f.callbacks().onReward();f.callbacks().onClose(true);assert.equal((await ad).rewarded,true);assert.equal(grants,1);assert.equal(f.events.at(-1),'start');
 f.handlers.game_api_pause();assert.ok(p.blocked());f.handlers.game_api_resume();assert.ok(!p.blocked());
});
test('closing early, ad error, unavailable SDK and late callbacks never grant a reward; retry works',async()=>{
 const f=fixture(),p=createPlatform({enabled:true,host:f.host});let grants=0;
 for(const ending of ['onClose','onError']){const ad=p.rewarded(()=>grants++);await new Promise(r=>setImmediate(r));const cb=f.callbacks();cb[ending](false);assert.equal((await ad).rewarded,false);cb.onRewarded();assert.equal(grants,0);assert.ok(!p.blocked());}
 const host={setTimeout,clearTimeout},retry=createPlatform({enabled:true,host});assert.equal((await retry.rewarded(()=>grants++)).rewarded,false);host.YaGames=f.host.YaGames;const ad=retry.rewarded(()=>grants++);await new Promise(r=>setImmediate(r));f.callbacks().onRewarded();f.callbacks().onClose();assert.equal((await ad).rewarded,true);assert.equal(grants,1);
});
test('double tap is shared by board and training: keyboard and other cells do not count',()=>{
 const g=createDoubleTap();assert.ok(!g.tap(1,0));assert.ok(g.tap(1,300));assert.ok(!g.tap(1,400));g.reset();assert.ok(!g.tap(1,500));assert.ok(!g.tap(2,550));assert.ok(!g.tap(2,600,0));g.reset();assert.ok(!g.tap(2,800));assert.ok(!g.tap(2,1300));assert.ok(g.tap(2,1400));
});
