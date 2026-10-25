import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {generateSudoku,emptyNotes} from '../dist/engine/sudoku.js';
import {sdkFixture} from './fixtures/yandex-sdk.mjs';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:4337',checks=[],errors=[];
await mkdir('test-results/sudoku-finish',{recursive:true});
const key=y=>y?'kletochki-yandex-sudoku-progress-v4':'kletochki-progress-v4',benefitKey='kletochki-yandex-sudoku-benefits-v1';
const read=(page,y)=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(y));
function fixture(ready=false,full=false){
 const puzzle=generateSudoku(1),blanks=puzzle.puzzle.flatMap((n,i)=>n?[]:[i]).filter((_,i)=>full||i<3),board=[...puzzle.solution],notes=emptyNotes();
 for(const i of blanks){board[i]=0;notes[i]=[puzzle.solution[i]];}if(!ready)notes[blanks.at(-1)]=[];
 const data={version:4,activeGame:'sudoku',sudoku:{level:1,completed:{},saves:{1:{board,notes,exclusions:emptyNotes(),auto:false,won:false,hints:0}}},nonogram:{level:1,completed:{},saves:{}},wordsearch:{level:1,completed:{},saves:{}},legacyCompleted:{sudoku:0,nonogram:0,wordsearch:0}};
 return {data,puzzle,blanks};
}
async function open(y,{ready=false,reduced=false,paused=false,full=false}={}){
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:reduced?'reduce':'no-preference'}),f=fixture(ready,full);
 await context.route('**/sdk.js',r=>r.fulfill({contentType:'application/javascript',body:sdkFixture}));await context.route('https://mc.yandex.ru/**',r=>r.abort());
 if(y)await context.route(`${origin}/build/yandex/sudoku/`,async r=>{const response=await r.fetch();await r.fulfill({response,body:(await response.text()).replace(/data-metrica="[0-9]+"/,'data-metrica="0"')});});
 const benefits={version:1,hints:3,candidates:{},readHints:{},receipts:[],attempts:paused?{[f.puzzle.puzzle.join('')]:{id:'paused',errors:4,status:'paused'}}:{}};
 await context.addInitScript(({key,data,benefitKey,benefits})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(data));if(!localStorage.getItem(benefitKey))localStorage.setItem(benefitKey,JSON.stringify(benefits));localStorage.setItem('kletochki-yandex-sudoku-onboarding-v1','seen');},{key:key(y),data:f.data,benefitKey,benefits});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(`${origin}/${y?'build/yandex/sudoku/':'dist/'}`,{waitUntil:'networkidle'});return {page,context,...f};
}
try{
 for(const y of [false,true]){
  const {page,context,puzzle,blanks}=await open(y),cell=blanks.at(-1),value=puzzle.solution[cell],wrong=value%9+1;
  assert.equal(await page.locator('#finish-notes-button').isVisible(),false);await page.locator('#notes-button').tap();await page.locator(`[data-cell="${cell}"]`).tap();await page.locator(`[data-number="${wrong}"]`).tap();assert.equal(await page.locator('#finish-notes-button').isVisible(),false);assert.match(await page.locator('#board-status').textContent(),/пометках есть противоречие/);
  await page.locator(`[data-number="${value}"]`).tap();assert.equal(await page.locator('#finish-notes-button').isVisible(),false);await page.locator(`[data-number="${wrong}"]`).tap();assert.equal(await page.locator('#finish-notes-button').isVisible(),true);assert.equal(await page.locator('#candidates-button').isVisible(),false);
  const before=(await read(page,y)).sudoku.saves[1];await page.screenshot({path:`test-results/sudoku-finish/${y?'yandex':'personal'}-ready.png`,fullPage:true});await page.locator('#finish-notes-button').tap();assert.deepEqual((await read(page,y)).sudoku.saves[1].board,puzzle.solution);assert.equal(await page.locator('.finish-cell').count(),3);assert.equal(await page.locator('.finish-sparkles').count(),1);assert.equal(await page.locator('#complete-dialog').isVisible(),false);
  await page.waitForTimeout(1300);assert.equal(await page.locator('#complete-dialog').isVisible(),false);assert.equal(await page.locator('.finish-celebration').count(),1);await page.locator('#undo-button').tap();assert.deepEqual((await read(page,y)).sudoku.saves[1],before);await page.waitForTimeout(3400);assert.equal(await page.locator('#complete-dialog').isVisible(),false);assert.equal(await page.locator('.finish-sparkles').count(),0);
  await page.locator('#finish-notes-button').tap();await page.waitForSelector('#complete-dialog[open]');assert.equal((await read(page,y)).sudoku.saves[1].won,true);assert.ok((await read(page,y)).sudoku.completed[1]);assert.equal(await page.locator('.sudoku-cell.conflict').count(),0);await page.locator('#complete-dialog [data-close]').tap();await page.locator('#undo-button').tap();assert.deepEqual((await read(page,y)).sudoku.saves[1],before);
  await page.locator('#finish-notes-button').tap();await page.locator('#levels-button').tap();await page.locator('[data-level="2"]').tap();await page.waitForTimeout(3400);assert.equal(await page.locator('#complete-dialog').isVisible(),false);assert.equal((await read(page,y)).sudoku.level,2);await page.reload({waitUntil:'networkidle'});assert.deepEqual((await read(page,y)).sudoku.saves[1].board,puzzle.solution);assert.equal(await page.locator('.finish-cell').count(),0);
  if(y){const benefit=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),benefitKey);assert.equal(benefit.hints,3);assert.equal(benefit.attempts[puzzle.puzzle.join('')].errors,0);assert.deepEqual(await page.evaluate(()=>__sdk.ads),[]);}
  checks.push(`${y?'Yandex':'personal'}: hidden with a missing or multiple note, contradictory notes rejected; all remaining singles enable finish; one undo restores exact notes/board; wave finishes before win dialog; level switch/reload cancel stale effects; no ad, hint or mistake charge`);await context.close();
 }
 const full=await open(true,{ready:true,full:true});await full.page.locator('#finish-notes-button').tap();assert.equal(await full.page.locator('.finish-cell').count(),full.blanks.length);await full.page.waitForTimeout(1100);await full.page.screenshot({path:'test-results/sudoku-finish/finish-wave.png'});await full.page.waitForSelector('#complete-dialog[open]');assert.deepEqual((await read(full.page,true)).sudoku.saves[1].board,full.puzzle.solution);await full.context.close();checks.push('full remaining field animates and completes from literal notes');
 for(const y of [false,true]){const {page,context,puzzle}=await open(y,{ready:true,reduced:true});await page.locator('#finish-notes-button').tap();assert.ok(await page.locator('#complete-dialog').isVisible());assert.equal(await page.locator('.finish-cell').count(),0);assert.deepEqual((await read(page,y)).sudoku.saves[1].board,puzzle.solution);await context.close();}checks.push('reduced-motion completes immediately without animated effects');
 const {page,context}=await open(true,{ready:true,paused:true});const before=(await read(page,true)).sudoku.saves[1];assert.equal(await page.locator('#finish-notes-button').isDisabled(),true);await page.evaluate(()=>document.querySelector('#finish-notes-button').dispatchEvent(new MouseEvent('click',{bubbles:true})));assert.deepEqual((await read(page,true)).sudoku.saves[1],before);assert.deepEqual(await page.evaluate(()=>__sdk.ads),[]);await context.close();checks.push('paused Yandex attempt cannot be completed through the button');
 assert.deepEqual(errors,[]);const result={passed:true,at:new Date().toISOString(),checks,scope:'SDK callback fixture and blocked analytics; no live Yandex ads'};await writeFile('test-results/sudoku-finish/qa.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
