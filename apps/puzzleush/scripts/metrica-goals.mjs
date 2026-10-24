#!/usr/bin/env node
// Management API tooling only. Never copied to dist/ or a Yandex game archive.
import {readFile,realpath,open} from 'node:fs/promises';
import {constants} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {GAME_EVENTS} from '../dist/platform/analytics.js';

const APP=fileURLToPath(new URL('../',import.meta.url));
const REPO=path.resolve(APP,'../..');
const API='https://api-metrika.yandex.net/management/v1';
const IDENTIFIER=/^[A-Za-z][A-Za-z0-9_]{0,127}$/;
export class MetricaSyncError extends Error{
 constructor(code,message,{status=null,report=null}={}){super(message);this.name='MetricaSyncError';this.code=code;this.status=status;this.report=report;}
}
const fail=(code,message,options)=>new MetricaSyncError(code,message,options);
const identifier=goal=>goal.conditions[0].url;
const exact=(goal,id)=>goal?.type==='action'&&Array.isArray(goal.conditions)&&goal.conditions.length===1&&goal.conditions[0]?.type==='exact'&&goal.conditions[0]?.url===id;

export function desiredGoals(events,tsv){
 if(!Array.isArray(events)||!events.length||new Set(events).size!==events.length||events.some(id=>!IDENTIFIER.test(id)))throw fail('DEFINITION','Некорректный список игровых событий.');
 const labels=new Map();
 for(const line of tsv.replace(/^\uFEFF/,'').split(/\r?\n/).slice(1)){
  if(!line.trim())continue;const [name,id]=line.split('\t');
  if(!name?.trim()||!IDENTIFIER.test(id||'')||labels.has(id))throw fail('DEFINITION','Некорректная или повторная строка таблицы целей.');
  labels.set(id,name.trim());
 }
 return events.map(id=>{const name=labels.get(id);if(!name)throw fail('DEFINITION',`Нет подписи для события ${id}. Обнови docs/metrica-goals.tsv.`);return {name,type:'action',conditions:[{type:'exact',url:id}]};});
}

export function planGoals(wanted,existing){
 const missing=[],present=[],conflicts=[];
 for(const goal of wanted){
  const id=identifier(goal),matches=existing.filter(item=>exact(item,id));
  const wrong=existing.filter(item=>!exact(item,id)&&(item.name===goal.name||(item.type==='action'&&item.conditions?.some(c=>c?.url===id))));
  if(wrong.length)conflicts.push({identifier:id,ids:wrong.map(item=>item.id).filter(Number.isSafeInteger),reason:'Существующая цель с этим именем или идентификатором имеет другие условия.'});
  else if(matches.length)present.push({identifier:id,ids:matches.map(item=>item.id),duplicates:matches.length>1});
  else missing.push(goal);
 }
 return {missing,present,conflicts};
}

function validateWanted(wanted){
 if(!Array.isArray(wanted)||!wanted.length)throw fail('DEFINITION','Список целей пуст.');
 const ids=[];
 for(const goal of wanted){
  const id=goal?.conditions?.[0]?.url;
  if(!IDENTIFIER.test(id||'')||!exact(goal,id)||typeof goal.name!=='string'||!goal.name.trim()||goal.name.length>255)throw fail('DEFINITION','Некорректное определение цели.');
  ids.push(id);
 }
 if(new Set(ids).size!==ids.length)throw fail('DEFINITION','Идентификаторы целей повторяются.');
}

export function metricaClient({counterId,token,fetchImpl=globalThis.fetch,timeoutMs=15000}){
 if(!Number.isSafeInteger(counterId)||counterId<=0)throw fail('COUNTER','Номер счётчика должен быть положительным целым числом.');
 if(typeof token!=='string'||!token.trim()||token.length>8192||/[\r\n\x00]/.test(token))throw fail('AUTH','Нужен OAuth-токен Метрики с правами metrika:read и metrika:write.');
 const endpoint=`${API}/counter/${counterId}/goals`;
 async function request(method,goal){
  let response;
  try{response=await fetchImpl(endpoint,{method,headers:{Authorization:`OAuth ${token.trim()}`,'Content-Type':'application/json'},redirect:'error',signal:AbortSignal.timeout(timeoutMs),...(goal?{body:JSON.stringify({goal})}:{})});}
  catch{throw fail('NETWORK',`Не удалось получить подтверждённый ответ API (${method}).`);}
  if(!response.ok){
   const status=response.status;
   if(status===401)throw fail('AUTH','API не принял OAuth-токен. Нужна повторная авторизация.',{status});
   if(status===403)throw fail('ACCESS','Нет доступа к счётчику или прав metrika:read/write.',{status});
   throw fail('HTTP',`API вернул HTTP ${Number.isInteger(status)?status:'ошибку'}.`,{status});
  }
  try{return await response.json();}catch{throw fail('RESPONSE','API вернул ответ неизвестного формата.');}
 }
 return {
  async list(){
   const data=await request('GET');
   if(!data||!Array.isArray(data.goals)||data.goals.some(g=>!g||!Number.isSafeInteger(g.id)||g.id<=0||typeof g.name!=='string'||typeof g.type!=='string'))throw fail('RESPONSE','API не вернул корректный список целей.');
   return data.goals;
  },
  async create(goal){await request('POST',goal);}
 };
}

// POST is never retried automatically. If its result is uncertain, re-read the
// server and accept only an exact matching goal. A later run starts with GET.
export async function synchronizeGoals({wanted,client,apply=false,verificationReads=3,wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))}){
 validateWanted(wanted);
 if(!Number.isSafeInteger(verificationReads)||verificationReads<1||verificationReads>5)throw fail('OPTIONS','Некорректное число проверок результата.');
 const report={mode:apply?'apply':'dry-run',desired:wanted.length,present:[],missing:[],created:[],conflicts:[]};
 try{
  let existing=await client.list(),plan=planGoals(wanted,existing);
  report.present=plan.present;report.missing=plan.missing.map(identifier);report.conflicts=plan.conflicts;
  if(plan.conflicts.length)throw fail('CONFLICT','Найдены цели с несовпадающими условиями. Изменений не выполнено.');
  if(!apply)return report;
  for(const goal of plan.missing){
   const id=identifier(goal);
   existing=await client.list();const current=planGoals([goal],existing);
   if(current.conflicts.length){report.conflicts.push(...current.conflicts);throw fail('CONFLICT','Во время загрузки появилась цель с другими условиями. Синхронизация остановлена.');}
   if(current.present.length){report.present.push(...current.present);continue;}
   let postError=null;
   try{await client.create(goal);}catch(error){postError=error instanceof MetricaSyncError?error:fail('NETWORK','Результат создания цели неизвестен.');}
   let found=null;
   for(let n=0;n<verificationReads;n++){
    if(n)await wait(250*n);
    existing=await client.list();const verified=planGoals([goal],existing);
    if(verified.conflicts.length){report.conflicts.push(...verified.conflicts);throw fail('CONFLICT','После запроса обнаружены несовпадающие условия цели.');}
    if(verified.present.length){found=verified.present[0];break;}
   }
   if(!found){
    if(postError?.code==='AUTH'||postError?.code==='ACCESS')throw postError;
    throw fail('UNCONFIRMED',`Создание ${id} не подтверждено. Повторный POST не отправлялся; следующий запуск снова сверит список целей.`);
   }
   report.created.push({...found,confirmedAfterError:!!postError});
  }
  const final=planGoals(wanted,await client.list());report.present=final.present;report.missing=final.missing.map(identifier);report.conflicts=final.conflicts;
  if(final.missing.length||final.conflicts.length)throw fail('VERIFY','Итоговый список целей не совпал с ожидаемым.');
  return report;
 }catch(error){
  const safe=error instanceof MetricaSyncError?error:fail('UNEXPECTED','Синхронизация остановлена из-за непредвиденного ответа.');
  safe.report=report;throw safe;
 }
}

function parseArgs(args){
 const options={apply:false};
 for(let i=0;i<args.length;i++){
  const arg=args[i];
  if(arg==='--apply')options.apply=true;
  else if(arg==='--list-desired')options.listDesired=true;
  else if(arg==='--token-stdin')options.tokenStdin=true;
  else if(arg==='--prompt-token')options.promptToken=true;
  else if(arg==='--help'||arg==='-h')options.help=true;
  else if(arg==='--counter'||arg==='--token-file'){
   const value=args[++i];if(!value||value.startsWith('--'))throw fail('OPTIONS','После параметра требуется значение.');
   if(arg==='--counter'){if(!/^\d+$/.test(value))throw fail('COUNTER','Некорректный номер счётчика.');options.counterId=Number(value);}else options.tokenFile=value;
  }else throw fail('OPTIONS','Неизвестный параметр. Используй --help.');
 }
 return options;
}

async function privateFileToken(filename){
 try{
  const location=await realpath(filename),relative=path.relative(REPO,location);
  if(relative===''||(!relative.startsWith('..'+path.sep)&&relative!=='..'&&!path.isAbsolute(relative)))throw fail('TOKEN_FILE','Файл токена должен находиться вне репозитория.');
  const handle=await open(location,constants.O_RDONLY|(constants.O_NOFOLLOW||0));
  try{
   const info=await handle.stat();
   if(!info.isFile()||(info.mode&0o077)!==0||info.size>8192||(process.getuid&&info.uid!==process.getuid()))throw fail('TOKEN_FILE','Файл токена должен принадлежать текущему пользователю, иметь права 600 и размер до 8 КБ.');
   return (await handle.readFile('utf8')).trim();
  }finally{await handle.close();}
 }catch(error){if(error instanceof MetricaSyncError)throw error;throw fail('TOKEN_FILE','Не удалось безопасно прочитать файл токена.');}
}

async function stdinToken(input){
 if(input.isTTY)throw fail('TOKEN_INPUT','Для скрытого ввода в терминале используй --prompt-token.');
 let text='';for await(const chunk of input){text+=chunk;if(Buffer.byteLength(text)>8192)throw fail('TOKEN_INPUT','Входной токен слишком длинный.');}return text.trim();
}

async function promptToken(input,output){
 if(!input.isTTY||!input.setRawMode)throw fail('TOKEN_INPUT','Скрытый ввод доступен только в локальном интерактивном терминале.');
 return new Promise((resolve,reject)=>{
  let text='';const wasRaw=!!input.isRaw;
  function finish(error){input.off('data',receive);input.setRawMode(wasRaw);input.pause();output.write('\n');error?reject(error):resolve(text.trim());}
  function receive(data){for(const char of data.toString('utf8')){
   if(char==='\u0003')return finish(fail('CANCELLED','Ввод отменён.'));
   if(char==='\r'||char==='\n')return finish();
   if(char==='\u007f'||char==='\b'){text=text.slice(0,-1);continue;}
   if(char>=' '&&char!=='\u007f')text+=char;
   if(Buffer.byteLength(text)>8192)return finish(fail('TOKEN_INPUT','Токен слишком длинный.'));
  }}
  output.write('Вставь OAuth-токен (ввод скрыт), затем Enter: ');input.setRawMode(true);input.resume();input.on('data',receive);
 });
}

const HELP=`Цели Метрики: сверка и создание отсутствующих точных игровых целей.\n\nnode scripts/metrica-goals.mjs --list-desired\nnode scripts/metrica-goals.mjs --prompt-token                 # только сверка\nnode scripts/metrica-goals.mjs --prompt-token --apply         # создать недостающие\nnode scripts/metrica-goals.mjs --token-file /private/path --apply\n\nПо умолчанию dry-run. Номер берётся из yandex.config.json; --counter задаёт другой.\nOAuth можно передать через YANDEX_METRICA_TOKEN, --token-file, --token-stdin\nили скрытый --prompt-token. Токен не передавай аргументом или в чате.\n`;

export async function runCli({args=process.argv.slice(2),env=process.env,input=process.stdin,output=process.stdout,errorOutput=process.stderr,fetchImpl=globalThis.fetch}={}){
 try{
  const options=parseArgs(args);if(options.help){output.write(HELP);return 0;}
  const wanted=desiredGoals(GAME_EVENTS,await readFile(path.join(APP,'docs/metrica-goals.tsv'),'utf8'));
  if(options.listDesired){output.write(JSON.stringify({desired:wanted.length,goals:wanted},null,2)+'\n');return 0;}
  const modes=[options.tokenFile,options.tokenStdin,options.promptToken].filter(Boolean).length;if(modes>1)throw fail('OPTIONS','Выбери один способ ввода токена.');
  const config=JSON.parse(await readFile(path.join(APP,'yandex.config.json'),'utf8'));
  const counterId=options.counterId??config.metricaCounterId;
  let token=options.tokenFile?await privateFileToken(options.tokenFile):options.tokenStdin?await stdinToken(input):options.promptToken?await promptToken(input,errorOutput):env.YANDEX_METRICA_TOKEN;
  if(!token)throw fail('AUTH','Нужен OAuth-доступ Метрики. Используй --prompt-token, --token-file или YANDEX_METRICA_TOKEN.');
  const client=metricaClient({counterId,token,fetchImpl});token=null;
  const report=await synchronizeGoals({wanted,client,apply:options.apply});output.write(JSON.stringify({counterId,...report},null,2)+'\n');return 0;
 }catch(error){
  const safe=error instanceof MetricaSyncError?error:fail('UNEXPECTED','Не удалось выполнить синхронизацию.');
  errorOutput.write(JSON.stringify({error:safe.code,message:safe.message,...(safe.status?{status:safe.status}:{}),...(safe.report?{report:safe.report}:{})},null,2)+'\n');return 1;
 }
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))process.exitCode=await runCli();
