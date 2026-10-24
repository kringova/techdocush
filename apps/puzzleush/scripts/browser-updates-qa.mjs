import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {generateSudoku,generateLegacySudoku,candidates,emptyNotes} from '../dist/engine/sudoku.js';
import {NONOGRAMS} from '../dist/engine/nonogram.js';
import {STORAGE_KEY,LEGACY_STORAGE_KEY} from '../dist/engine/progress.js';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const url=process.env.BASE_URL||'http://127.0.0.1:4339/play/',checks=[],errors=[];
await mkdir('test-results',{recursive:true});
async function pageFor(mobile=false,fixture=null){
 const context=await browser.newContext({viewport:{width:mobile?390:1440,height:844},isMobile:mobile,hasTouch:mobile});
 if(fixture)await context.addInitScript(({key,value})=>{if(!localStorage.getItem(key))localStorage.setItem(key,value);},fixture);
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));let error;
 for(let n=0;n<3;n++)try{await page.goto(url,{waitUntil:'domcontentloaded'});return {context,page};}catch(e){error=e;}
 throw error;
}
const saved=page=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),STORAGE_KEY);
try{
 const {context,page}=await pageFor();
 await page.getByRole('button',{name:'Эксперт',exact:true}).click();assert.equal(await page.locator('#current-level').textContent(),'21');assert.ok(await page.locator('.sudoku-cell.given').count()<=28);
 await page.locator('#levels-button').click();assert.equal(await page.locator('[data-level]:enabled').count(),130);await page.locator('[data-level="30"]').click();assert.equal(await page.locator('#current-level').textContent(),'30');
 await page.getByRole('button',{name:'Базовый',exact:true}).click();await page.locator('#candidates-button').click();
 const p=generateSudoku(1),cs=candidates(p.puzzle),single=cs.findIndex(a=>a.length===1),multi=cs.findIndex(a=>a.length>1),value=cs[single][0];
 await page.locator(`[data-cell="${single}"]`).dblclick();assert.equal(await page.locator(`[data-cell="${single}"]`).textContent(),String(value));
 await page.locator(`[data-cell="${single}"]`).dblclick();assert.equal(await page.locator(`[data-cell="${single}"]`).textContent(),String(value));await page.locator('#undo-button').click();assert.equal((await saved(page)).sudoku.saves[1].board[single],0);
 await page.locator(`[data-cell="${multi}"]`).dblclick();assert.equal((await saved(page)).sudoku.saves[1].board[multi],0);checks.push('immediate Expert and every level selectable; singleton double click, no erase, undo, multiple candidates untouched');
 await page.locator('[data-game="nonogram"]').click();await page.locator('[data-pixel="1"]').click();await page.locator('[data-pixel="3"]').click();
 assert.deepEqual((await saved(page)).nonogram.saves[1].cells.slice(0,5),[0,1,0,1,0]);await page.locator('#nonogram-undo').click();assert.deepEqual((await saved(page)).nonogram.saves[1].cells.slice(0,5),[-1,1,-1,-1,-1]);
 await page.locator('#restart-button').click();await page.locator('#confirm-restart').click();await page.locator('[data-pixel="5"]').click();await page.locator('[data-pixel="10"]').click();let cells=(await saved(page)).nonogram.saves[1].cells;for(const i of [0,15,20])assert.equal(cells[i],0);await page.locator('#nonogram-undo').click();cells=(await saved(page)).nonogram.saves[1].cells;for(const i of [0,10,15,20])assert.equal(cells[i],-1);checks.push('correct row and column auto crosses; complete action undone together');await context.close();

 const {context:mobile,page:mp}=await pageFor(true);await mp.locator('#candidates-button').tap();await mp.locator(`[data-cell="${single}"]`).tap();await mp.locator(`[data-cell="${single}"]`).tap();assert.equal((await saved(mp)).sudoku.saves[1].board[single],value);await mp.locator('#undo-button').tap();assert.equal((await saved(mp)).sudoku.saves[1].board[single],0);checks.push('mobile double tap fills single candidate and is undoable');
 await mp.locator('[data-game="nonogram"]').tap();await mp.locator('[data-chapter="3"]').tap();assert.equal(await mp.locator('.nonogram-cell').count(),400);const before=(await saved(mp)).nonogram.saves[26].cells;
 await mp.locator('[data-paint="move"]').tap();const vp=await mp.locator('.nonogram-viewport').boundingBox(),client=await mobile.newCDPSession(mp);const start={x:vp.x+vp.width-30,y:vp.y+vp.height-30};
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[start]});for(let n=1;n<=6;n++){await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x-n*22,y:start.y-n*22}]});await mp.waitForTimeout(25);}await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mp.waitForTimeout(300);
 const scrolled=await mp.locator('.nonogram-viewport').evaluate(e=>({left:e.scrollLeft,top:e.scrollTop}));assert.ok(scrolled.left>20&&scrolled.top>20,JSON.stringify(scrolled));assert.deepEqual((await saved(mp)).nonogram.saves[26].cells,before);
 await mp.locator('[data-paint="fill"]').tap();const afterMode=await mp.locator('.nonogram-viewport').evaluate(e=>({left:e.scrollLeft,top:e.scrollTop}));assert.ok(afterMode.left>=scrolled.left-3&&afterMode.top>=scrolled.top-3,JSON.stringify({scrolled,afterMode}));const flat=NONOGRAMS[25].grid.flat();const target=await mp.evaluate(pattern=>{
  const viewport=document.querySelector('.nonogram-viewport'),box=viewport.getBoundingClientRect(),style=getComputedStyle(document.querySelector('.nonogram-board')),cw=parseFloat(style.getPropertyValue('--clue-width')),ch=parseFloat(style.getPropertyValue('--clue-height'));
  for(const e of document.querySelectorAll('[data-pixel]')){const i=Number(e.dataset.pixel),r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;if(pattern[i]&&x>Math.max(box.left+cw+4,5)&&x<Math.min(box.right-5,innerWidth-5)&&y>Math.max(box.top+ch+4,5)&&y<Math.min(box.bottom-5,innerHeight-5)&&document.elementFromPoint(x,y)?.closest('[data-pixel]')===e)return {i,x,y};}
  return null;
 },flat);assert.ok(target);await mp.touchscreen.tap(target.x,target.y);assert.equal((await saved(mp)).nonogram.saves[26].cells[target.i],1);
 const afterPaint=await mp.locator('.nonogram-viewport').evaluate(e=>({left:e.scrollLeft,top:e.scrollTop}));assert.ok(Math.abs(afterPaint.left-afterMode.left)<=2&&Math.abs(afterPaint.top-afterMode.top)<=2,JSON.stringify({scrolled,afterMode,afterPaint,target}));await mp.locator('#nonogram-undo').tap();assert.deepEqual((await saved(mp)).nonogram.saves[26].cells,before);
 const viewBox=await mp.locator('.nonogram-viewport').boundingBox(),corner=await mp.locator('.nonogram-corner').boundingBox();assert.ok(Math.abs(corner.x-viewBox.x)<3&&Math.abs(corner.y-viewBox.y)<3);
 await mp.getByRole('button',{name:'Увеличить поле',exact:true}).tap();assert.ok((await mp.locator('[data-pixel="0"]').boundingBox()).width>=39);await mp.getByRole('button',{name:'Всё поле',exact:true}).tap();assert.ok(await mp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await mp.getByRole('button',{name:'Крупно',exact:true}).tap();
 await mp.screenshot({path:'test-results/large-nonogram-mobile.png',fullPage:true});checks.push('20x20 mobile: native pan, no accidental paint, viewport preserved after paint/undo, sticky clues, zoom and overview');await mobile.close();

 const legacyPuzzle=generateLegacySudoku(11),at=legacyPuzzle.puzzle.findIndex(n=>!n),board=[...legacyPuzzle.puzzle];board[at]=legacyPuzzle.solution[at];
 const legacy={version:1,activeGame:'nonogram',sudoku:{level:11,completed:{},saves:{11:{board,notes:emptyNotes(),exclusions:emptyNotes(),auto:false,won:false,hints:2}}},nonogram:{level:11,completed:Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,{at:'legacy'}])),saves:{11:{cells:Array(49).fill(-1),won:false}}}};const raw=JSON.stringify(legacy);
 const {context:old,page:op}=await pageFor(true,{key:LEGACY_STORAGE_KEY,value:raw});assert.equal(await op.locator('#current-level').textContent(),'06');assert.equal(await op.locator('.nonogram-cell').count(),100);assert.equal(await op.evaluate(k=>localStorage.getItem(k),LEGACY_STORAGE_KEY),raw);assert.equal((await saved(op)).legacyCompleted.nonogram,10);
 await op.locator('[data-game="sudoku"]').tap();assert.equal(await op.locator('#current-level').textContent(),'06');assert.equal((await saved(op)).sudoku.saves[6].board[at],board[at]);await op.getByRole('button',{name:'Эксперт',exact:true}).tap();await op.reload({waitUntil:'domcontentloaded'});assert.equal(await op.locator('#current-level').textContent(),'21');assert.equal(await op.evaluate(k=>localStorage.getItem(k),LEGACY_STORAGE_KEY),raw);checks.push('real v1 storage migration: old ten tiny puzzles resume at 10x10; partial sudoku preserved; original key byte-for-byte unchanged');await old.close();
 assert.deepEqual(errors,[]);const result={passed:true,at:new Date().toISOString(),url,checks};await writeFile('test-results/updates-qa.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
