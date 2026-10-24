import test from 'node:test';
import assert from 'node:assert/strict';
import {Writable,Readable} from 'node:stream';
import {desiredGoals,planGoals,metricaClient,synchronizeGoals,runCli,MetricaSyncError} from '../scripts/metrica-goals.mjs';

const goal=(event='gameLevelComplete',name='Уровень пройден')=>({name,type:'action',conditions:[{type:'exact',url:event}]});
const saved=(definition,id=1)=>({id,...structuredClone(definition)});
function service(initial=[],options={}){
 let goals=structuredClone(initial),posts=0,gets=0;
 const requests=[];
 async function fetchImpl(url,request){
  requests.push({url,method:request.method,redirect:request.redirect});
  assert.equal(url,'https://api-metrika.yandex.net/management/v1/counter/113771637/goals');assert.equal(request.headers.Authorization,'OAuth test-token');
  if(request.method==='GET'){gets++;return {ok:true,json:async()=>({goals:structuredClone(goals)})};}
  assert.equal(request.method,'POST');posts++;const definition=JSON.parse(request.body).goal;
  if(options.commit!==false)goals.push(saved(definition,goals.length+1));
  if(options.postError)throw Error('Echoed secret test-token');
  return {ok:true,json:async()=>({goal:saved(definition,goals.length)})};
 }
 return {client:metricaClient({counterId:113771637,token:'test-token',fetchImpl}),fetchImpl,requests,counts:()=>({posts,gets}),goals:()=>structuredClone(goals)};
}
const noWait=async()=>{};

test('goals follow current event IDs and labels, with exact matching and no duplicates',()=>{
 const result=desiredGoals(['gameOne','gameTwo'],'Название\tИдентификатор\tТип\nПервое\tgameOne\tЦель\nВторое\tgameTwo\tЦель\n');
 assert.deepEqual(result,[goal('gameOne','Первое'),goal('gameTwo','Второе')]);
 assert.throws(()=>desiredGoals(['gameMissing'],'Название\tID\nПервое\tgameOne'),{code:'DEFINITION'});
 assert.throws(()=>desiredGoals(['gameOne','gameOne'],'Название\tID\nПервое\tgameOne'),{code:'DEFINITION'});
});

test('dry run only reads and lists missing goals; unrelated goals are untouched',async()=>{
 const unrelated=saved({name:'Старая цель',type:'url',conditions:[{type:'contain',url:'/checkout'}]},20),s=service([unrelated]);
 const report=await synchronizeGoals({wanted:[goal()],client:s.client});assert.equal(report.mode,'dry-run');assert.deepEqual(report.missing,['gameLevelComplete']);assert.equal(s.counts().posts,0);assert.deepEqual(s.goals(),[unrelated]);
});

test('apply creates only missing goals and a repeat run creates nothing',async()=>{
 const one=goal(),two=goal('gameHintUsed','Подсказка'),s=service([saved(one,10)]);
 const report=await synchronizeGoals({wanted:[one,two],client:s.client,apply:true,wait:noWait});assert.equal(report.created.length,1);assert.equal(s.counts().posts,1);assert.ok(s.counts().gets>=4);assert.equal(report.missing.length,0);
 const again=await synchronizeGoals({wanted:[one,two],client:s.client,apply:true});assert.equal(again.created.length,0);assert.equal(s.counts().posts,1);assert.ok(s.requests.every(r=>r.redirect==='error'));
});

test('same name with wrong conditions aborts the entire batch before any creation',async()=>{
 const wrong=saved({...goal(),conditions:[{type:'contain',url:'gameLevelComplete'}]}),s=service([wrong]);
 await assert.rejects(synchronizeGoals({wanted:[goal('gameHintUsed','Подсказка'),goal()],client:s.client,apply:true}),{code:'CONFLICT'});assert.equal(s.counts().posts,0);assert.deepEqual(s.goals(),[wrong]);
});

test('an existing exact goal with another display name is reused without edits',async()=>{
 const previous=saved(goal('gameLevelComplete','Моё название'),18),s=service([previous]);
 const report=await synchronizeGoals({wanted:[goal()],client:s.client,apply:true});assert.deepEqual(report.present[0].ids,[18]);assert.equal(s.counts().posts,0);assert.equal(s.goals()[0].name,'Моё название');
});

test('a goal created concurrently after the first read is reused',async()=>{
 let reads=0,posts=0;const wanted=goal();const client={list:async()=>++reads===1?[]:[saved(wanted,42)],create:async()=>{posts++;}};
 const report=await synchronizeGoals({wanted:[wanted],client,apply:true});assert.equal(posts,0);assert.equal(report.created.length,0);assert.deepEqual(report.present[0].ids,[42]);
});

test('committed POST with a lost response is confirmed by GET and is not repeated',async()=>{
 const s=service([],{postError:true});const report=await synchronizeGoals({wanted:[goal()],client:s.client,apply:true,wait:noWait});assert.equal(s.counts().posts,1);assert.equal(report.created.length,1);assert.equal(report.created[0].confirmedAfterError,true);assert.equal(report.missing.length,0);
});

test('an unconfirmed POST stops without blind retry; error does not reveal the token',async()=>{
 const s=service([],{postError:true,commit:false});let caught;
 try{await synchronizeGoals({wanted:[goal()],client:s.client,apply:true,wait:noWait});}catch(e){caught=e;}
 assert.equal(caught.code,'UNCONFIRMED');assert.equal(s.counts().posts,1);assert.ok(s.counts().gets>=5);assert.ok(!JSON.stringify({message:caught.message,report:caught.report}).includes('test-token'));
});

test('successful creation is verified independently, including delayed visibility',async()=>{
 let reads=0,created=false,posts=0;
 const client={list:async()=>{reads++;return created&&reads>=4?[saved(goal(),8)]:[];},create:async()=>{posts++;created=true;}};
 const report=await synchronizeGoals({wanted:[goal()],client,apply:true,wait:noWait});assert.equal(posts,1);assert.equal(report.created.length,1);assert.ok(reads>=5);
});

test('HTTP authorization errors are actionable and never echo a server body',async()=>{
 let bodyRead=false;const client=metricaClient({counterId:113771637,token:'test-token',fetchImpl:async()=>({ok:false,status:403,json:async()=>{bodyRead=true;return {token:'test-token'};}})});
 await assert.rejects(client.list(),e=>e.code==='ACCESS'&&!e.message.includes('test-token'));assert.equal(bodyRead,false);
});

test('malformed desired data is rejected before any API access',async()=>{
 let calls=0;const client={list:async()=>{calls++;return [];}};
 await assert.rejects(synchronizeGoals({wanted:[{...goal(),conditions:[{type:'contain',url:'gameLevelComplete'}]}],client,apply:true}),{code:'DEFINITION'});assert.equal(calls,0);
});

test('CLI has a token-free offline plan and requires an explicit apply switch',async()=>{
 let output='',error='';const stdout=new Writable({write(c,e,done){output+=c.toString();done();}}),stderr=new Writable({write(c,e,done){error+=c.toString();done();}});
 const offline=await runCli({args:['--list-desired'],env:{},output:stdout,errorOutput:stderr,fetchImpl:()=>{throw Error('network forbidden');}});assert.equal(offline,0);assert.ok(JSON.parse(output).desired>=24);assert.equal(error,'');
 output='';const s=service();const exit=await runCli({args:['--counter','113771637'],env:{YANDEX_METRICA_TOKEN:'test-token'},output:stdout,errorOutput:stderr,fetchImpl:s.fetchImpl});assert.equal(exit,0);assert.equal(s.counts().posts,0);assert.equal(JSON.parse(output).mode,'dry-run');assert.ok(!output.includes('test-token'));
});

test('CLI accepts secret stdin and sanitizes unexpected errors',async()=>{
 let output='',error='';const stdout=new Writable({write(c,e,done){output+=c.toString();done();}}),stderr=new Writable({write(c,e,done){error+=c.toString();done();}});
 const exit=await runCli({args:['--token-stdin'],env:{},input:Readable.from(['test-token\n']),output:stdout,errorOutput:stderr,fetchImpl:async()=>{throw Error('test-token private echo');}});
 assert.equal(exit,1);assert.equal(output,'');assert.ok(!error.includes('test-token'));assert.equal(JSON.parse(error).error,'NETWORK');
});
