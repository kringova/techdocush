import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {generateSudoku,emptyNotes} from '../dist/engine/sudoku.js';
import {generateWordsearch} from '../dist/engine/wordsearch.js';
import {sdkFixture} from './fixtures/yandex-sdk.mjs';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:4337',checks=[],errors=[];
await mkdir('test-results/yandex-banner',{recursive:true});
const sizes=[[1280,720,320,0],[960,600,240,0],[390,844,0,96],[320,568,0,96],[844,390,0,72],[640,360,0,60]];
const shell=game=>`<!doctype html><html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#e7e7e2}iframe{position:absolute;left:0;top:0;border:0;width:calc(100% - var(--ad-w,0px));height:calc(100% - var(--ad-h,0px))}aside{position:absolute;right:0;bottom:0;background:#e7e7e2;color:#74786e;font:12px/1.5 system-ui;box-sizing:border-box;display:flex;align-items:center;justify-content:center;text-align:center;padding:8px;width:var(--ad-w,100%);height:var(--ad-h,100%)}aside[hidden]{display:none}</style><iframe id="game" title="QA game" src="${origin}/build/yandex/${game}/"></iframe><aside hidden>Область портала для баннера<br>Проверка размеров, не настоящий показ</aside></html>`;
try{
 for(const game of ['sudoku','nonogram','wordsearch'])for(const [width,height,adWidth,adHeight] of sizes){
  const context=await browser.newContext({viewport:{width,height},isMobile:width<900,hasTouch:width<900});
  await context.route('**/sdk.js',r=>r.fulfill({contentType:'application/javascript',body:sdkFixture}));
  await context.route('https://mc.yandex.ru/**',r=>r.abort());
  await context.route(origin+'/__qa/banner-shell.html',r=>r.fulfill({contentType:'text/html',body:shell(game)}));
  await context.route(`${origin}/build/yandex/${game}/`,async r=>{const response=await r.fetch();await r.fulfill({response,body:(await response.text()).replace(/data-metrica="[0-9]+"/,'data-metrica="0"')});});
  const sudoku=generateSudoku(130),word=generateWordsearch(30);
  const state={version:4,activeGame:game,sudoku:{level:130,completed:{},saves:{130:{board:sudoku.puzzle,notes:sudoku.puzzle.map((n,i)=>n?[]:[sudoku.solution[i]]),exclusions:emptyNotes(),auto:false,won:false,hints:0}}},nonogram:{level:26,completed:{},saves:{}},wordsearch:{level:30,completed:{},saves:{30:{found:word.words.slice(0,2),revealed:word.words.slice(2,-1),initials:[word.words[2][0]],activeInitial:word.words[2][0],won:false,hints:4}}},legacyCompleted:{sudoku:0,nonogram:0,wordsearch:0}};
  await context.addInitScript(({game,state})=>{localStorage.setItem(`kletochki-yandex-${game}-onboarding-v1`,'seen');if(!localStorage.getItem(`kletochki-yandex-${game}-progress-v4`))localStorage.setItem(`kletochki-yandex-${game}-progress-v4`,JSON.stringify(state));},{game,state});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/__qa/banner-shell.html');
  const frame=await (await page.locator('#game').elementHandle()).contentFrame();await frame.waitForSelector('.sudoku-board,.nonogram-board,.wordsearch-board');await frame.evaluate(()=>document.fonts.ready);
  const key=`kletochki-yandex-${game}-progress-v4`;
  const before=await frame.evaluate(k=>localStorage.getItem(k),key);
  for(const visible of [false,true,false]){
   await page.evaluate(({visible,w,h})=>{document.documentElement.style.setProperty('--ad-w',`${visible?w:0}px`);document.documentElement.style.setProperty('--ad-h',`${visible?h:0}px`);const slot=document.querySelector('aside');slot.hidden=!visible;slot.style.width=w?`${w}px`:'100%';slot.style.height=h?`${h}px`:'100%';},{visible,w:adWidth,h:adHeight});
   await frame.waitForFunction(()=>{const mount=document.querySelector('#board-mount'),board=document.querySelector('.sudoku-board,.nonogram-viewport,.wordsearch-board');return mount.clientHeight>0&&board.getBoundingClientRect().bottom<=mount.getBoundingClientRect().bottom+1;});
   await frame.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
   const geometry=await frame.evaluate(()=>{
    const b=document.querySelector('.sudoku-board,.nonogram-viewport,.wordsearch-board').getBoundingClientRect();
    const outside=[...document.querySelectorAll('.page-shell button')].filter(e=>e.getClientRects().length&&!e.closest('.word-list')).filter(e=>{const r=e.getBoundingClientRect();return r.x<-.5||r.y<-.5||r.right>innerWidth+.5||r.bottom>innerHeight+.5;}).map(e=>e.id||e.textContent.trim());
    return {width:innerWidth,height:innerHeight,rootWidth:document.documentElement.scrollWidth,rootHeight:document.documentElement.scrollHeight,scrollX,scrollY,board:{x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom},outside,headingFont:parseFloat(getComputedStyle(document.querySelector('#game-title')).fontSize),oldHeaderVisible:!!document.querySelector('.site-header').getClientRects().length};
   });
   checks.push({game,parent:[width,height],banner:visible?[adWidth,adHeight]:null,...geometry});
   assert.ok(!geometry.outside.length&&geometry.board.height>=150&&geometry.rootWidth<=geometry.width+1&&geometry.rootHeight<=geometry.height+1&&!geometry.scrollX&&!geometry.scrollY,JSON.stringify(checks.at(-1)));
   assert.ok(geometry.headingFont<=22&&!geometry.oldHeaderVisible);
   assert.equal(await frame.evaluate(k=>localStorage.getItem(k),key),before);
   if(visible&&((width===1280&&height===720)||(width===390&&height===844)))await page.screenshot({path:`test-results/yandex-banner/${game}-${width===390?'mobile':'desktop'}.png`});
  }
  await page.evaluate(({w,h})=>{document.documentElement.style.setProperty('--ad-w',`${w}px`);document.documentElement.style.setProperty('--ad-h',`${h}px`);},{w:adWidth,h:adHeight});
  await frame.locator('#levels-button').click();assert.ok(await frame.locator('#levels-dialog').isVisible());await frame.locator('#levels-dialog [data-close]').click();
  await frame.locator('#help-button').click();assert.ok(await frame.locator('#onboarding-dialog').isVisible());await frame.locator('#tutorial-skip').click();
  assert.deepEqual(await frame.evaluate(()=>__sdk.ads),[]);
  if(game==='nonogram')assert.ok(await frame.locator('.nonogram-viewport').evaluate(v=>v.scrollWidth-v.clientWidth<=1&&v.scrollHeight-v.clientHeight<=1));
  await context.close();
 }
 assert.deepEqual(errors,[]);const report={passed:true,at:new Date().toISOString(),scope:'Portal-size simulation only; no actual Yandex banner requests or impressions',checks,errors};await writeFile('test-results/yandex-banner/qa.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:true,states:checks.length,errors}));
}finally{await browser.close();}
