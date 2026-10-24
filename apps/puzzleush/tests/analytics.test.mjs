import test from 'node:test';
import assert from 'node:assert/strict';
import {createAnalytics,metricaSender,GAME_EVENTS} from '../dist/platform/analytics.js';

test('frequent actions are batched, progress stages reported once; durations exclude menus and ads',()=>{
 const sent=[];let time=0;const a=createAnalytics({enabled:true,send:(...v)=>sent.push(v),now:()=>time,context:()=>({game:'nonogram',level:6})});a.levelStart();a.play(true);
 for(let i=0;i<50;i++)a.activity('fill');a.updateProgress(30);a.updateProgress(20);a.updateProgress(30);assert.equal(sent.filter(e=>e[0]==='gameProgress').length,1);assert.equal(sent.filter(e=>e[0]==='gameActivity').length,0);
 time=2000;a.play(false);time=12000;a.play(true);time=15000;a.flush();const batch=sent.find(e=>e[0]==='gameActivity')[1];assert.equal(batch.event.gameActivity.actions.fill,50);assert.equal(batch.event.gameActivity.activeSeconds,5);assert.deepEqual(batch.game,{game:'nonogram',level:6});
 a.activity('cross',3);a.complete();a.leave('pagehide');assert.equal(sent.filter(e=>e[0]==='gameLevelComplete').length,1);assert.equal(sent.filter(e=>e[0]==='gameLevelExit').length,0);const done=sent.find(e=>e[0]==='gameLevelComplete')[1].event.gameLevelComplete;assert.deepEqual(done.actions,{fill:50,cross:3});
});
test('missing id, personal profile and failed reporting never add a tag or interrupt gameplay',()=>{
 let scripts=0,calls=0;const host={document:{createElement:()=>({}),head:{append:()=>scripts++}},ym:()=>calls++};
 metricaSender({enabled:false,counterId:123,host})('gameLevelStart',{});metricaSender({enabled:true,counterId:0,host})('gameLevelStart',{});assert.equal(calls,0);assert.equal(scripts,0);
 const a=createAnalytics({enabled:true,send:()=>{throw Error('blocked');}});assert.doesNotThrow(()=>{a.levelStart();a.activity('fill');a.flush();a.complete();});
 const disabled=createAnalytics({send:()=>calls++});disabled.levelStart();disabled.activity('fill');disabled.flush();assert.equal(calls,0);
});
test('only declared goals are sent; tag uses chosen counter with session recording disabled',()=>{
 const calls=[],host={ym:(...v)=>calls.push(v)};const send=metricaSender({enabled:true,counterId:12345,host});const a=createAnalytics({enabled:true,send});a.event('arbitrary');a.event('gameHintUsed',{technique:'single'});assert.equal(calls.length,2);assert.equal(calls[0][2].webvisor,false);assert.equal(calls[1][0],12345);assert.equal(calls[1][1],'reachGoal');assert.equal(calls[1][2],'gameHintUsed');assert.equal(new Set(GAME_EVENTS).size,GAME_EVENTS.length);
});
