import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {generateSudoku,emptyNotes} from '../dist/engine/sudoku.js';
import {createBenefits} from '../dist/engine/benefits.js';
import {sdkFixture} from './fixtures/yandex-sdk.mjs';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:4337',checks=[],errors=[];
await mkdir('test-results/sudoku-expansion',{recursive:true});
const progressKey=(y,v=4)=>y?`kletochki-yandex-sudoku-progress-v${v}`:`kletochki-progress-v${v}`;
const saved=(p,y=false)=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),progressKey(y));
const benefitsKey='kletochki-yandex-sudoku-benefits-v1';
function fixture(level=30,{almost=false,allDone=true}={}){
 const p=generateSudoku(level),board=[...p.solution];if(almost)board[board.findIndex((_,i)=>!p.puzzle[i])]=0;
 return {version:3,activeGame:'sudoku',sudoku:{level,completed:Object.fromEntries(Array.from({length:allDone?30:level-1},(_,i)=>[i+1,{at:'before',hints:1}])),saves:{[level]:{board,notes:emptyNotes(),exclusions:emptyNotes(),auto:false,won:!almost,hints:1}}},nonogram:{level:6,completed:{1:{at:'before'}},saves:{6:{cells:Array.from({length:100},(_,i)=>i===2?1:-1),won:false}}},wordsearch:{level:21,completed:{},saves:{21:{found:['ВРАЧ'],revealed:['УЧИТЕЛЬ'],initials:['У'],activeInitial:'У',won:false,hints:2}}},legacyCompleted:{sudoku:0,nonogram:0,wordsearch:0}};
}
async function open(y,{width=390,height=844,state=fixture()}={}){
 const context=await browser.newContext({viewport:{width,height},isMobile:width<800,hasTouch:width<800});
 await context.route('**/sdk.js',r=>r.fulfill({contentType:'application/javascript',body:sdkFixture}));await context.route('https://mc.yandex.ru/**',r=>r.abort());
 if(y)await context.route(`${origin}/build/yandex/sudoku/`,async r=>{const response=await r.fetch();await r.fulfill({response,body:(await response.text()).replace(/data-metrica="[0-9]+"/,'data-metrica="0"')});});
 const data=new Map(),storage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)},b=createBenefits(storage,benefitsKey),oldPuzzle=generateSudoku(state.sudoku.level).puzzle.join('');
 b.grantHints('prior-reward');b.grantCandidates(oldPuzzle,'prior-candidates');b.startAttempt(oldPuzzle,'prior-attempt');
 const balance=storage.getItem(benefitsKey),raw=JSON.stringify(state);
 await context.addInitScript(({key,raw,balance,benefitsKey})=>{if(!localStorage.getItem(key))localStorage.setItem(key,raw);if(!localStorage.getItem(benefitsKey))localStorage.setItem(benefitsKey,balance);localStorage.setItem('kletochki-yandex-sudoku-onboarding-v1','seen');},{key:progressKey(y,state.version),raw,balance,benefitsKey});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(`${origin}/${y?'build/yandex/sudoku/':'dist/'}`,{waitUntil:'networkidle'});return {page,context,raw,balance};
}
try{
 for(const y of [false,true]){
  const {page,context,raw,balance}=await open(y);const initial=await saved(page,y);assert.equal(initial.version,4);assert.equal(Object.keys(initial.sudoku.completed).length,30);assert.equal(await page.locator('#sudoku-count').textContent(),'30/130');assert.equal(await page.locator('#level-limit').textContent(),'/ 130');
  assert.deepEqual(initial.nonogram,fixture().nonogram);assert.deepEqual(initial.wordsearch,fixture().wordsearch);
  if(y)assert.equal(await page.evaluate(k=>localStorage.getItem(k),benefitsKey),balance);
  await page.locator('#levels-button').click();assert.equal(await page.locator('[data-level]:enabled').count(),130);assert.equal(await page.locator('.level-item.done').count(),30);await page.locator('#levels-dialog [data-close]').click();
  await page.getByRole('button',{name:'Эксперт',exact:true}).click();assert.equal(await page.locator('#current-level').textContent(),'81');assert.equal(await page.locator('#chapter-progress-label').textContent(),'10 из 60 · Эксперт');assert.ok(await page.locator('#level-dots i').count()<=15);
  if(y){await page.locator('#hint-button').click();assert.ok(await page.locator('#hint-dialog').isVisible());await page.locator('#hint-dialog [data-close]').last().click();assert.equal((await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),benefitsKey)).hints,2);await page.locator('#candidates-button').click();await page.locator('#reward-watch').click();await page.evaluate(()=>{__sdk.callbacks.onClose(false);});assert.equal((await saved(page,true)).sudoku.saves[81].auto,false);await page.locator('#reward-watch').click();await page.evaluate(()=>{__sdk.callbacks.onRewarded();__sdk.callbacks.onReward();__sdk.callbacks.onClose(true);});await page.waitForFunction(()=>!document.querySelector('#reward-dialog').open);assert.equal((await saved(page,true)).sudoku.saves[81].auto,true);}
  else await page.locator('#candidates-button').click();
  const p=generateSudoku(81),cell=p.puzzle.findIndex(n=>!n);await page.locator(`[data-cell="${cell}"]`).click();await page.locator(`[data-number="${p.solution[cell]}"]`).click();const changed=(await saved(page,y)).sudoku.saves[81].board;await page.reload({waitUntil:'networkidle'});assert.deepEqual((await saved(page,y)).sudoku.saves[81].board,changed);assert.equal(Object.keys((await saved(page,y)).sudoku.completed).length,30);
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),progressKey(y,3)),raw);
  // A stale open v3 tab may keep writing its old key without losing new work.
  await page.evaluate(k=>localStorage.setItem(k,JSON.stringify({version:3,stale:true})),progressKey(y,3));await page.reload({waitUntil:'networkidle'});assert.deepEqual((await saved(page,y)).sudoku.saves[81].board,changed);
  await page.locator('#levels-button').click();await page.locator('[data-level="130"]').click();await page.reload({waitUntil:'networkidle'});assert.equal((await saved(page,y)).sudoku.level,130);assert.equal(await page.locator('#current-level').textContent(),'130');
  if(!y){for(const g of ['nonogram','wordsearch']){await page.locator(`[data-game="${g}"]`).click();assert.equal(await page.locator('#level-limit').textContent(),'/ 30');await page.locator('#levels-button').click();assert.equal(await page.locator('[data-level]:enabled').count(),30);await page.locator('#levels-dialog [data-close]').click();}await page.locator('[data-game="sudoku"]').click();}
  await page.screenshot({path:`test-results/sudoku-expansion/${y?'yandex':'personal'}-130-mobile.png`,fullPage:true});checks.push(`${y?'Yandex':'personal'}: all 30 completed retained, 130 open, Expert resumes at81, old game snapshots and v3 backup preserved, new hints/input/candidates/reload work, stale v3 writes cannot overwrite v4`);await context.close();
 }
 for(const [level,count,expected] of [[30,30,81],[130,130,null]]){
  const {page,context}=await open(false,{state:{...fixture(level,{almost:true,allDone:false}),version:level>30?4:3}}),p=generateSudoku(level),cell=(await saved(page)).sudoku.saves[level].board.findIndex(n=>!n);
  await page.locator(`[data-cell="${cell}"]`).click();await page.locator(`[data-number="${p.solution[cell]}"]`).click();assert.ok(await page.locator('#complete-dialog').isVisible());assert.match(await page.locator('#complete-copy').textContent(),new RegExp(`${count} (из 130|уровней)`));await page.locator('#next-level').click();if(expected)assert.equal((await saved(page)).sudoku.level,expected);else assert.ok(await page.locator('#levels-dialog').isVisible());await context.close();
 }checks.push('winning old expert30 continues to new expert81; final130 celebrates all130 and returns to collection');
 for(const [width,height] of [[360,640],[390,844],[430,932],[844,390],[1280,720]]){const {page,context}=await open(true,{width,height});await page.locator('#levels-button').click();await page.locator('[data-level="130"]').click();const rect=await page.evaluate(()=>({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight,board:document.querySelector('.sudoku-board').getBoundingClientRect().height,bottom:document.querySelector('.game-bottom').getBoundingClientRect().bottom}));assert.ok(rect.w<=width+1&&rect.h<=height+1&&rect.board>=150&&rect.bottom<=height+1,JSON.stringify({width,height,rect}));await context.close();}checks.push('three-digit level130 and 60-expert group fit portrait360/390/430, landscape and desktop');
 assert.deepEqual(errors,[]);const report={passed:true,at:new Date().toISOString(),checks,scope:'Local SDK fixture; external analytics blocked; no actual Yandex ads or payments'};await writeFile('test-results/sudoku-expansion/qa.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
