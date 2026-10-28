import test from 'node:test';
import assert from 'node:assert/strict';
import {ACTION_EVENTS,createActionFeedback} from '../dist/action-feedback.mjs';

class Events{
 constructor(){this.listeners=new Map();}
 addEventListener(type,listener){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(listener);}
 removeEventListener(type,listener){this.listeners.get(type)?.delete(listener);}
 dispatchEvent(event){event.target??=this;for(const listener of [...(this.listeners.get(event.type)||[])])listener(event);return true;}
}
class Element extends Events{
 constructor(doc,tag='div'){super();this.ownerDocument=doc;this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.style={};this.attributes={};this.isConnected=false;this.parentNode=null;this.animations=[];}
 append(...children){for(const child of children){this.children.push(child);if(typeof child==='object'){child.parentNode=this;child.connected(this.isConnected);}}}
 connected(value){this.isConnected=value;for(const child of this.children)if(typeof child==='object')child.connected(value);}
 remove(){if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(child=>child!==this);this.parentNode=null;this.connected(false);}
 setAttribute(name,value){this.attributes[name]=String(value);if(name==='id')this.id=String(value);}
 getAttribute(name){return this.attributes[name]??null;}
 getBoundingClientRect(){return{left:30,top:40,width:40,height:40};}
 animate(frames,options){const animation={frames,options,playState:'running',finished:new Promise((resolve,reject)=>{this.resolveAnimation=resolve;this.rejectAnimation=reject;})};animation.cancel=()=>{if(animation.playState!=='running')return;animation.playState='idle';this.rejectAnimation(new Error('cancelled'));};animation.finish=()=>{animation.playState='finished';this.resolveAnimation();};this.animations.push(animation);return animation;}
}
class Param{
 constructor(value=0){this.value=value;this.calls=[];}
 setValueAtTime(value,time){this.value=value;this.calls.push(['set',value,time]);}
 linearRampToValueAtTime(value,time){this.value=value;this.calls.push(['linear',value,time]);}
 exponentialRampToValueAtTime(value,time){this.value=value;this.calls.push(['exponential',value,time]);}
}
function environment(initial={}){
 const doc=new Events(),win=new Events(),storage=new Map(Object.entries(initial)),observers=[];
 const env={time:0,contexts:[],resumeDelayed:false,sourceStarts:0,timers:new Map(),timerSerial:0};
 doc.defaultView=win;doc.hidden=false;doc.hasFocus=()=>true;doc.documentElement=new Element(doc,'html');doc.documentElement.connected(true);doc.body=new Element(doc,'body');doc.documentElement.append(doc.body);doc.music=new Element(doc);doc.music.dataset.music='';doc.body.append(doc.music);doc.openDialogs=[];
 doc.createElement=tag=>new Element(doc,tag);doc.querySelector=selector=>selector==='[data-music]'?doc.music:null;doc.querySelectorAll=selector=>selector==='dialog[open]'?doc.openDialogs:[];
 win.innerWidth=1280;win.innerHeight=900;win.performance={now:()=>env.time};win.localStorage={getItem:key=>storage.has(key)?storage.get(key):null,setItem:(key,value)=>storage.set(key,String(value))};win.CustomEvent=class{constructor(type,{detail}){this.type=type;this.detail=detail;}};
 win.setTimeout=fn=>{const id=++env.timerSerial;env.timers.set(id,fn);return id;};win.clearTimeout=id=>env.timers.delete(id);const media=new Events();media.matches=false;win.matchMedia=()=>media;
 win.MutationObserver=class{constructor(fn){this.fn=fn;this.active=true;observers.push(this);}observe(){}disconnect(){this.active=false;}};
 class Node{
  constructor(){this.connections=[];this.gain=new Param();this.frequency=new Param();this.Q=new Param();}
  connect(node){this.connections.push(node);}disconnect(){this.connections=[];}
 }
 class Source extends Node{
  constructor(context){super();this.context=context;this.ended=false;}
  start(...args){this.started=args;env.sourceStarts++;this.context.sources.push(this);}
  stop(time){if(time===undefined)this.finish();else this.stopAt=time;}
  finish(){if(this.ended)return;this.ended=true;this.onended?.();}
 }
 win.AudioContext=class{
  constructor(){this.state=env.resumeDelayed?'suspended':'running';this.sampleRate=1000;this.destination={};this.sources=[];this.gains=[];this.buffers=[];env.contexts.push(this);}
  get currentTime(){return env.time/1000;}
  createGain(){const node=new Node();this.gains.push(node);return node;}
  createBuffer(channels,length,rate){const data=new Float32Array(length),buffer={duration:length/rate,getChannelData:()=>data};this.buffers.push(buffer);return buffer;}
  createBufferSource(){return new Source(this);}createOscillator(){return new Source(this);}createBiquadFilter(){return new Node();}
  resume(){if(env.resumeDelayed)return new Promise(resolve=>{this.resumeNow=()=>{this.state='running';resolve();};});this.state='running';return Promise.resolve();}
  suspend(){this.state='suspended';return Promise.resolve();}close(){this.state='closed';return Promise.resolve();}
 };
 const scene=new Element(doc);doc.body.append(scene);
 env.doc=doc;env.win=win;env.storage=storage;env.scene=scene;env.media=media;env.flushMutations=()=>observers.filter(o=>o.active).forEach(o=>o.fn());
 env.gesture=(isTrusted=true)=>doc.dispatchEvent({type:'pointerdown',isTrusted,button:0,isPrimary:true,target:scene});
 env.advance=ms=>{env.time+=ms;for(const context of env.contexts)for(const source of context.sources)if(source.stopAt<=context.currentTime)source.finish();};
 env.find=key=>{const walk=node=>{if(typeof node!=='object')return null;if(Object.hasOwn(node.dataset,key))return node;for(const child of node.children){const found=walk(child);if(found)return found;}return null;};return walk(doc.music);};
 return env;
}

test('all nine game namespaces have finite registered outcomes, while selection, mistakes and cat reactions stay quiet',()=>{
 assert.deepEqual([...new Set(Object.keys(ACTION_EVENTS).map(name=>name.split('.')[0]))].sort(),['boxes','food','grooming','litter','pet','search','shelves','tunnels','yarn']);
 for(const name of ['boxes.win','shelves.win','tunnels.connected','food.hearts','grooming.finish','litter.win','yarn.win','search.win'])assert.ok(ACTION_EVENTS[name].sound,'A finite completion sound exists for '+name);
 for(const name of ['food.select','food.retch','food.wrong','pet.grumble','pet.queasy','search.miss','grooming.tool'])assert.equal(ACTION_EVENTS[name].sound,null,name+' must not synthesize a voice or error alarm');
 assert.ok(Object.isFrozen(ACTION_EVENTS));assert.ok(Object.isFrozen(ACTION_EVENTS['boxes.step']));
});
test('a script cannot unlock audio, and an old blocked event is never replayed after resume',async()=>{
 const e=environment();let paused=false;const feedback=createActionFeedback({gameId:'boxes',scene:e.scene,isBlocked:()=>paused});
 assert.equal(feedback.emit('boxes.step').sound,false);assert.equal(e.contexts.length,0);e.gesture(false);assert.equal(feedback.state().unlocked,false);
 paused=true;e.gesture();assert.equal(feedback.emit('boxes.push').reason,'blocked');assert.equal(e.sourceStarts,0);
 paused=false;e.win.dispatchEvent({type:'corio:resume'});await Promise.resolve();assert.equal(e.sourceStarts,0);assert.equal(feedback.state().pending,0);
 assert.equal(feedback.emit('boxes.step').sound,true);assert.equal(e.sourceStarts,1);feedback.dispose();
});
test('asynchronous context resume never queues the triggering action for later',async()=>{
 const e=environment();e.resumeDelayed=true;const feedback=createActionFeedback({gameId:'shelves',scene:e.scene});e.gesture();
 assert.equal(feedback.emit('shelves.place').reason,'not-ready');assert.equal(e.sourceStarts,0);
 feedback.cancel();e.contexts[0].resumeNow();await Promise.resolve();await Promise.resolve();assert.equal(e.sourceStarts,0);assert.equal(feedback.state().pending,0);
 assert.equal(feedback.emit('shelves.place').sound,true);feedback.dispose();
});
test('polyphony is bounded at four mono voices, repeated input is throttled and noise buffers are reused',()=>{
 const e=environment(),feedback=createActionFeedback({gameId:'boxes',scene:e.scene});e.gesture();
 assert.equal(feedback.emit('boxes.step').sound,true);assert.equal(feedback.emit('boxes.step').reason,'cooldown');
 for(const name of ['boxes.push','boxes.mat','boxes.unlock'])assert.equal(feedback.emit(name).sound,true);
 assert.equal(feedback.state().active,4);assert.equal(e.sourceStarts,4);assert.equal(feedback.emit('boxes.win').reason,'polyphony');
 e.advance(400);assert.equal(feedback.state().active,0);assert.equal(feedback.emit('boxes.push').sound,true);assert.equal(e.contexts[0].buffers.length,1);
 assert.ok(e.contexts[0].gains.slice(1).every(gain=>gain.gain.calls.filter(call=>call[0]==='linear').every(call=>Number.isFinite(call[1])&&call[1]>0&&call[1]<=.6)),'Material envelopes are finite and bounded; post-filter output is checked in OfflineAudioContext');
 assert.equal(e.contexts[0].gains[0].gain.value,.3);feedback.dispose();
});
test('settings persist per game and voice controls remain independent from effects and ambience',()=>{
 const e=environment(),feedback=createActionFeedback({gameId:'food',scene:e.scene});e.gesture();const ambient='{"volume":0.2,"layers":{"purr":true}}';e.storage.set('corio-ambient-mix-v1',ambient);
 let voiceStops=0;e.win.addEventListener('corio:action-feedback-cancel',()=>voiceStops++);
 const enabled=e.find('actionEffectsEnabled');enabled.checked=false;enabled.dispatchEvent({type:'change',isTrusted:true});assert.equal(voiceStops,0,'Muting effects must leave a playing independent cat voice alone');
 assert.deepEqual(JSON.parse(e.storage.get('corio-action-audio-v1:food')),{enabled:false,volume:.3});assert.equal(e.win.__corioActionVoice().enabled,true);
 const volume=e.find('actionVoiceVolume');volume.value='64';volume.dispatchEvent({type:'input',isTrusted:true});const voice=e.find('actionVoiceEnabled');voice.checked=false;voice.dispatchEvent({type:'change',isTrusted:true});
 assert.equal(e.find('catVoice'),voice,'The shared checkbox retains the legacy cat-voice selector');
 assert.deepEqual(e.win.__corioActionVoice(),{enabled:false,volume:.64});assert.equal(e.storage.get('corio-cat-voice-v1'),'off');assert.equal(e.storage.get('corio-ambient-mix-v1'),ambient);
 assert.equal(feedback.emit('food.cat').reason,'muted');feedback.cancel();assert.equal(voiceStops,1,'A real pause/cancel stops the voice owner too');feedback.dispose();enabled.checked=true;enabled.dispatchEvent({type:'change',isTrusted:true});assert.equal(JSON.parse(e.storage.get('corio-action-audio-v1:food')).enabled,false,'Detached settings do not keep writing after dispose');
 const shelves=createActionFeedback({gameId:'shelves',scene:e.scene});assert.equal(shelves.state().enabled,true);assert.equal(shelves.state().voice.enabled,false);shelves.dispose();
 const food=createActionFeedback({gameId:'food',scene:e.scene});assert.equal(food.state().enabled,false);assert.equal(food.state().volume,.3);food.dispose();
});
test('muted feedback remains local, never writes target transforms, and reduced motion omits movement',async()=>{
 const e=environment({'corio-action-audio-v1:search':'{"enabled":false,"volume":0.3}'}),feedback=createActionFeedback({gameId:'search',scene:e.scene});const target=new Element(e.doc,'g');target.setAttribute('transform','translate(100 20) rotate(8)');e.scene.append(target);
 assert.deepEqual(feedback.emit('search.found'),{sound:false,visual:false,reason:'muted'});e.advance(100);
 assert.equal(feedback.emit('search.found',{target}).visual,true);assert.equal(target.getAttribute('transform'),'translate(100 20) rotate(8)');assert.equal(feedback.state().activeVisuals,1);assert.equal(e.contexts.length,0);
 feedback.cancel();e.media.matches=true;e.advance(100);feedback.emit('search.hint',{point:{x:100,y:150}});const mark=e.doc.body.children.find(node=>node.className?.startsWith('corio-action-mark'));assert.ok(mark);assert.ok(mark.animations[0].frames.every(frame=>!Object.hasOwn(frame,'transform')));mark.animations[0].finish();await Promise.resolve();assert.equal(feedback.state().activeVisuals,0);feedback.dispose();
});
test('pause, settings, hidden, blur and platform pause cancel immediately; result modal allows a finite tail',async()=>{
 const e=environment(),feedback=createActionFeedback({gameId:'yarn',scene:e.scene});e.gesture();feedback.emit('yarn.win',{point:{x:80,y:90}});assert.equal(feedback.state().active,1);
 e.doc.openDialogs=[{id:'win'}];e.flushMutations();assert.equal(feedback.state().active,1,'Completion tail survives its result presentation');
 e.doc.openDialogs=[{id:'sound-settings'}];e.flushMutations();assert.equal(feedback.state().active,0);assert.equal(feedback.state().activeVisuals,0);assert.equal(feedback.emit('yarn.pick').reason,'blocked');e.doc.openDialogs=[];
 for(const event of ['corio:pause','corio:platform-pause','blur']){
  e.win.dispatchEvent({type:'corio:resume'});e.win.dispatchEvent({type:'corio:platform-resume'});e.win.dispatchEvent({type:'focus'});await Promise.resolve();await Promise.resolve();e.advance(800);e.gesture();feedback.emit('yarn.pick');assert.equal(feedback.state().active,1);e.win.dispatchEvent({type:event});assert.equal(feedback.state().active,0,event);
 }
 e.win.dispatchEvent({type:'focus'});e.gesture();e.advance(800);feedback.emit('yarn.release');e.doc.hidden=true;e.doc.dispatchEvent({type:'visibilitychange'});assert.equal(feedback.state().active,0);feedback.dispose();
});
test('silent events stay silent under material overrides; snapshots are readonly and dispose stops everything',()=>{
 const e=environment(),feedback=createActionFeedback({gameId:'food',scene:e.scene});e.gesture();
 for(const name of ['food.select','food.retch','food.wrong'])assert.equal(feedback.emit(name,{material:'wood',point:{x:80,y:80}}).sound,false);
 assert.equal(e.sourceStarts,0);assert.equal(feedback.emit('food.cat',{material:'bowl'}).sound,true);assert.equal(feedback.state().lastMaterial,'ceramic');assert.equal(feedback.emit('boxes.step').reason,'unknown');
 assert.throws(()=>{e.win.__corioFeedback=()=>({});},TypeError);const state=e.win.__corioFeedback();assert.ok(Object.isFrozen(state));assert.ok(Object.isFrozen(state.settings));assert.throws(()=>{state.settings.volume=1;},TypeError);
 feedback.dispose();assert.equal(feedback.state().active,0);assert.equal(feedback.state().activeVisuals,0);assert.equal(e.contexts[0].state,'closed');assert.equal(e.win.__corioFeedback,undefined);assert.equal(e.win.__corioActionVoice,undefined);assert.equal(feedback.emit('food.cat').reason,'disposed');
});
test('a reused boxes overlay allows its result tail but becomes a strict pause when the result marker clears',()=>{
 const e=environment(),feedback=createActionFeedback({gameId:'boxes',scene:e.scene});e.gesture();feedback.emit('boxes.win');assert.equal(feedback.state().active,1);
 const overlay={id:'overlay',dataset:{actionResult:'true'}};e.doc.openDialogs=[overlay];e.flushMutations();assert.equal(feedback.state().active,1);
 overlay.dataset.actionResult='false';e.flushMutations();assert.equal(feedback.state().active,0);assert.equal(feedback.emit('boxes.step').reason,'blocked');feedback.dispose();
});

test('legacy litter mute migrates read-only and an explicit new preference takes priority',()=>{
 const e=environment({'corio-litter-sfx-v1':'off'}),f=createActionFeedback({gameId:'litter',scene:e.scene});e.gesture();assert.equal(f.state().enabled,false);assert.equal(f.emit('litter.reveal').reason,'muted');const toggle=e.find('actionEffectsEnabled');toggle.checked=true;toggle.dispatchEvent({type:'change',isTrusted:true});assert.equal(e.storage.get('corio-litter-sfx-v1'),'off');assert.equal(JSON.parse(e.storage.get('corio-action-audio-v1:litter')).enabled,true);f.dispose();const restored=createActionFeedback({gameId:'litter',scene:e.scene});assert.equal(restored.state().enabled,true);restored.dispose();
});
