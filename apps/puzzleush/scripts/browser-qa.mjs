import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {generateSudoku,candidates} from '../dist/engine/sudoku.js';
import {NONOGRAMS} from '../dist/engine/nonogram.js';
import {STORAGE_KEY} from '../dist/engine/progress.js';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const url=process.env.BASE_URL||'http://127.0.0.1:4338',errors=[],checks=[];
const key=STORAGE_KEY;
await mkdir('test-results',{recursive:true});
const context=await browser.newContext({viewport:{width:1440,height:1100}});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(url,{waitUntil:'domcontentloaded'});await page.locator('.sudoku-cell').last().waitFor();
 assert.equal(await page.locator('.sudoku-cell').count(),81);checks.push('desktop renders 81 sudoku cells');
 await page.locator('#levels-button').click();assert.ok(!(await page.locator('[data-level="30"]').isDisabled()));await page.locator('#levels-dialog [data-close]').click();
 await page.locator('#candidates-button').click();assert.equal(await page.locator('.notes span').filter({hasText:/[1-9]/}).count(),candidates(generateSudoku(1).puzzle).flat().length);
 const before=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).sudoku.saves[1].board,key);
 await page.locator('#hint-button').click();assert.ok(await page.locator('#hint-detail').isHidden());await page.locator('#explain-button').click();assert.ok((await page.locator('#hint-detail').textContent()).length>40);
 const after=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).sudoku.saves[1].board,key);assert.deepEqual(after,before);await page.locator('#hint-dialog .secondary-button').click();checks.push('all candidates and explanatory hint without changing any number');
 const p=generateSudoku(1),empty=p.puzzle.findIndex(n=>!n);
 await page.locator(`[data-cell="${empty}"]`).click();await page.locator('#notes-button').click();await page.locator('[data-number="1"]').click();
 assert.ok(!(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).sudoku.saves[1].auto,key)));await page.locator('#undo-button').click();await page.locator('#notes-button').click();
 await page.locator(`[data-cell="${empty}"]`).click();await page.locator(`[data-number="${p.solution[empty]}"]`).click();
 await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.locator(`[data-cell="${empty}"]`).textContent(),String(p.solution[empty]));checks.push('manual marks, undo and saved digit survive reload');
 for(let i=0;i<81;i++)if(!p.puzzle[i]&&i!==empty){await page.locator(`[data-cell="${i}"]`).click();await page.locator(`[data-number="${p.solution[i]}"]`).click();}
 await page.locator('#complete-dialog[open]').waitFor();assert.match(await page.locator('#total-progress').textContent(),/^1 /);await page.locator('#next-level').click();assert.equal(await page.locator('#current-level').textContent(),'02');
 await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.locator('#current-level').textContent(),'02');checks.push('sudoku completion unlocks level 2 and persists progress');
 await page.locator('[data-game="nonogram"]').click();const ng=NONOGRAMS[0],white=ng.grid.flat().indexOf(0),black=ng.grid.flat().indexOf(1);
 await page.locator(`[data-pixel="${white}"]`).click({button:'right'});assert.ok(await page.locator(`[data-pixel="${white}"]`).evaluate(e=>e.classList.contains('crossed')));
 await page.locator('#nonogram-undo').click();assert.ok(!(await page.locator(`[data-pixel="${white}"]`).evaluate(e=>e.classList.contains('crossed'))));
 await page.locator(`[data-pixel="${black}"]`).click();assert.ok(await page.locator(`[data-pixel="${black}"]`).evaluate(e=>e.classList.contains('filled')));checks.push('left click fills, right click crosses, undo reverts');
 for(let i=0;i<ng.grid.flat().length;i++)if(ng.grid.flat()[i]&&i!==black)await page.locator(`[data-pixel="${i}"]`).click();
 await page.locator('#complete-dialog[open]').waitFor();await page.locator('#next-level').click();assert.equal(await page.locator('#current-level').textContent(),'02');
 await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.locator('#current-level').textContent(),'02');checks.push('nonogram completion unlocks next level and saves separately');
 await page.locator('[data-game="sudoku"]').click();await page.screenshot({path:'test-results/sudoku-desktop.png',fullPage:true});
 for(const width of [360,390,430]){
  const mobile=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const mp=await mobile.newPage();mp.on('pageerror',e=>errors.push(e.message));
  await mp.goto(url,{waitUntil:'domcontentloaded'});await mp.locator('.sudoku-cell').last().waitFor();
  assert.ok(await mp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`sudoku fits ${width}`);
  const board=await mp.locator('.sudoku-board').boundingBox();assert.ok(board.width<=width&&board.width>=width-45);
  await mp.locator('#candidates-button').tap();assert.equal(await mp.locator('.notes span').filter({hasText:/[1-9]/}).count(),candidates(generateSudoku(1).puzzle).flat().length);
  await mp.screenshot({path:`test-results/sudoku-${width}.png`,fullPage:true});
  await mp.locator('[data-game="nonogram"]').tap();await mp.locator('[data-paint="cross"]').tap();await mp.locator('[data-pixel="0"]').tap();assert.ok(await mp.locator('[data-pixel="0"]').evaluate(e=>e.classList.contains('crossed')));
  await mp.locator('#nonogram-undo').tap();assert.ok(!(await mp.locator('[data-pixel="0"]').evaluate(e=>e.classList.contains('crossed'))));
  await mp.locator('[data-paint="fill"]').tap();await mp.locator(`[data-pixel="${black}"]`).tap();assert.ok(await mp.locator(`[data-pixel="${black}"]`).evaluate(e=>e.classList.contains('filled')));
  await mp.reload({waitUntil:'domcontentloaded'});assert.ok(await mp.locator(`[data-pixel="${black}"]`).evaluate(e=>e.classList.contains('filled')));assert.ok(await mp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await mp.screenshot({path:`test-results/nonogram-${width}.png`,fullPage:true});
  await mp.locator('#levels-button').tap();await mp.locator('[data-level="30"]').tap();
  assert.equal(await mp.locator('.nonogram-cell').count(),400);assert.ok(await mp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const cell=await mp.locator('[data-pixel="0"]').boundingBox();assert.ok(cell.width>=30,`20x20 touch target ${width}: ${cell.width}`);
  await mp.screenshot({path:`test-results/nonogram-20x20-${width}.png`,fullPage:true});
  checks.push(`mobile ${width}: touch fill/cross, undo, saved state, both grid sizes fit`);await mobile.close();
 }
 assert.deepEqual(errors,[]);checks.push('no browser JavaScript errors');
 console.log(JSON.stringify({passed:true,checks},null,2));await writeFile('test-results/browser-qa.json',JSON.stringify({passed:true,at:new Date().toISOString(),url,checks},null,2));
}catch(e){await page.screenshot({path:'test-results/failure.png',fullPage:true}).catch(()=>{});throw e;}finally{await browser.close();}
