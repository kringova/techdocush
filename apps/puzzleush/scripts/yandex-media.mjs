import {createRequire} from 'node:module';
import {mkdir,writeFile,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {generateSudoku,candidates,emptyNotes} from '../dist/engine/sudoku.js';
import {generateWordsearch} from '../dist/engine/wordsearch.js';
import {NONOGRAMS} from '../dist/engine/nonogram.js';
import {sdkFixture} from './fixtures/yandex-sdk.mjs';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:4337',out=path.resolve('build/yandex-media');await mkdir(out,{recursive:true});
const fresh=g=>({version:4,activeGame:g,sudoku:{level:1,completed:{},saves:{}},nonogram:{level:1,completed:{},saves:{}},wordsearch:{level:1,completed:{},saves:{}},legacyCompleted:{sudoku:0,nonogram:0}});
function fixture(g,level){
 const state=fresh(g);state[g].level=level;
 if(g==='sudoku'){
  const p=generateSudoku(level),board=[...p.puzzle];let n=0;for(let i=0;i<81;i++)if(!board[i]&&n++<9)board[i]=p.solution[i];
  state.sudoku.saves[level]={board,notes:candidates(board),exclusions:emptyNotes(),auto:true,won:false,hints:0};
 }else if(g==='wordsearch'){const p=generateWordsearch(level);state.wordsearch={level,completed:{},saves:{[level]:{found:p.words.slice(0,2),revealed:[p.words.find(w=>w[0]==='У')||p.words[2]],won:false,hints:1}}};
 }else{const p=NONOGRAMS[level-1];let n=0;state.nonogram.saves[level]={cells:p.grid.flat().map(v=>v===1&&n++<Math.floor(p.grid.flat().filter(Boolean).length*.45)?1:-1),won:false};}
 return state;
}
async function pageFor(g,width,height,{scale=1,level=1,video=false}={}){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:scale,isMobile:width<800,hasTouch:width<800,...(video?{recordVideo:{dir:path.join(out,g,'raw-video'),size:{width,height}}}:{})});
 const state=fixture(g,level),puzzle=generateSudoku(level).puzzle.join('');
 await context.addInitScript(({g,state,puzzle})=>{localStorage.setItem(`kletochki-yandex-${g}-onboarding-v1`,'seen');if(!localStorage.getItem(`kletochki-yandex-${g}-progress-v4`)){localStorage.setItem(`kletochki-yandex-${g}-progress-v4`,JSON.stringify(state));if(g==='sudoku'||g==='wordsearch')localStorage.setItem(`kletochki-yandex-${g}-benefits-v1`,JSON.stringify({version:1,hints:3,candidates:{[puzzle]:true},readHints:{},attempts:{},receipts:[]}));}},{g,state,puzzle});
 await context.route('**/sdk.js',r=>r.fulfill({contentType:'application/javascript',body:sdkFixture}));
 await context.route('https://mc.yandex.ru/**',r=>r.abort());
 await context.route(`${origin}/build/yandex/${g}/`,async route=>{const response=await route.fetch();const body=(await response.text()).replace(/data-metrica="[0-9]+"/,'data-metrica="0"');await route.fulfill({response,body});});
 const page=await context.newPage();await page.goto(`${origin}/build/yandex/${g}/`,{waitUntil:'networkidle'});await page.waitForSelector('.sudoku-board,.nonogram-board,.wordsearch-board');await page.evaluate(()=>document.fonts.ready);return {page,context};
}
function art(g,size){
 const gap=size/60,pad=size*.1,cell=(size-2*pad-gap*2)/3;
 if(g==='wordsearch')return Array.from('ЛЕСРОМАКТ').map((letter,i)=>{const x=pad+(i%3)*(cell+gap),y=pad+Math.floor(i/3)*(cell+gap);return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="3" fill="${i<3?'#cbdcba':'#edf0e5'}" stroke="#9eac91"/><text x="${x+cell/2}" y="${y+cell*.71}" text-anchor="middle" font-family="Golos Text" font-size="${cell*.57}" fill="#303b31">${letter}</text>`;}).join('');
 if(g==='sudoku')return `<rect x="${pad}" y="${pad}" width="${size-2*pad}" height="${size-2*pad}" rx="${size*.025}" fill="#fafaf6" stroke="#4b5c43" stroke-width="${size*.012}"/>`+Array.from({length:9},(_,i)=>{const x=pad+(i%3)*(cell+gap),y=pad+Math.floor(i/3)*(cell+gap);return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${[1,3,8].includes(i)?'#dfe7d4':'#f5f5ee'}" stroke="#c9d0c1" stroke-width="1"/>${[0,2,3,5,7].includes(i)?`<text x="${x+cell/2}" y="${y+cell*.72}" text-anchor="middle" font-family="Golos Text" font-size="${cell*.67}" fill="#303b31">${[8,0,3,1,0,7,0,5,0][i]}</text>`:''}`;}).join('');
 const grid=NONOGRAMS[0].grid,n=5,c=(size-2*pad)/n;return grid.flat().map((v,i)=>`<rect x="${pad+(i%n)*c}" y="${pad+Math.floor(i/n)*c}" width="${c-2}" height="${c-2}" rx="${size*.01}" fill="${v?'#4b5c43':'#e3e8da'}"/>`).join('');
}
try{
 for(const g of ['sudoku','nonogram','wordsearch'].filter(g=>!process.env.ONLY_GAME||g===process.env.ONLY_GAME)){
  const dir=path.join(out,g);await mkdir(dir,{recursive:true});
  const context=await browser.newContext();await context.route('**/media-canvas',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body></body></html>'}));const page=await context.newPage();await page.goto(origin+'/media-canvas');
  const css=`@font-face{font-family:'Golos Text';font-weight:400 900;src:url('${origin}/dist/fonts/golos-text.ttf')}@font-face{font-family:Literata;font-weight:200 900;src:url('${origin}/dist/fonts/literata.ttf')}*{box-sizing:border-box}body{margin:0;background:#f5f3ed;color:#303b31;font-family:'Golos Text',sans-serif}svg{display:block} `;
  await page.setViewportSize({width:512,height:512});await page.setContent(`<style>${css}</style><svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="72" fill="#f5f3ed"/>${art(g,512)}</svg>`);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(dir,'icon-512.png')});
  await page.setViewportSize({width:800,height:470});await page.setContent(`<style>${css}.cover{height:470px;padding:45px;display:flex;align-items:center;gap:24px;background:radial-gradient(#b3ad9928 .7px,transparent .7px);background-size:5px 5px}.copy{flex:1}.brand{color:#536348;font-size:14px;letter-spacing:3px;margin-bottom:22px}h1{font:500 43px/1.25 Literata,serif;letter-spacing:-1.8px;margin:0 0 22px}p{font-size:15px;line-height:1.8;color:#78806d;margin:0}.picture{width:280px;flex-shrink:0;transform:rotate(-5deg)}</style><div class="cover"><div class="copy"><div class="brand">КЛЕТОЧКИ.</div><h1>${g==='sudoku'?'Судоку<br>с объяснениями':g==='wordsearch'?'Поиск<br>слов':'Японские<br>кроссворды'}</h1><p>${g==='sudoku'?'130 задач — от базовых до экспертов.<br>Пометки и понятные подсказки.':g==='wordsearch'?'Слова спрятаны в буквенном поле.<br>Подсказка раскроет, что искать.':'30 рисунков от 5 × 5 до 20 × 20.<br>Одна клеточка за другой.'}</p></div><svg class="picture" viewBox="0 0 280 280">${art(g,280)}</svg></div>`);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(dir,'cover-800x470.png')});await context.close();
  if(process.env.ASSETS_ONLY)continue;
  for(const [kind,width,height,scale] of [['mobile',360,640,2],['desktop',1280,720,1]])for(let i=1;i<=2;i++){
   const {page,context}=await pageFor(g,width,height,{scale,level:g==='sudoku'?(i===1?1:21):g==='wordsearch'?(i===1?1:21):(i===1?6:26)});
   if(g==='nonogram'&&i===2)await page.locator('[data-zoom="fit"]').click();
   if(g==='wordsearch'&&i===2){await page.locator('[data-initial-word]').first().click();await page.waitForFunction(()=>getComputedStyle(document.querySelector('#toast')).opacity==='0');}
   await page.screenshot({path:path.join(dir,`${kind}-${i}.png`)});await context.close();
  }
  const {page:demo,context:dc}=await pageFor(g,390,844);await demo.locator('#help-button').click();if(g==='sudoku')await demo.locator('#tutorial-next').click();await demo.screenshot({path:path.join(dir,'onboarding-preview.png')});await dc.close();
  const {page:video,context:vc}=await pageFor(g,1280,720,{video:true,level:g==='sudoku'?1:6});const videoPathPromise=video.video().path();await video.waitForTimeout(1000);
  if(g==='sudoku'){
   const state=fixture(g,1).sudoku.saves[1],p=generateSudoku(1),blanks=state.board.flatMap((n,i)=>n?[]:[i]).slice(0,8);
   for(const i of blanks){await video.locator(`[data-cell="${i}"]`).click();await video.locator(`[data-number="${p.solution[i]}"]`).click();await video.waitForTimeout(330);}
   await video.locator('#hint-button').click();await video.locator('#explain-button').click();await video.waitForTimeout(2000);
  }else if(g==='wordsearch'){
   const p=generateWordsearch(6);for(const word of p.words.slice(2,5)){const path=p.placements[word],a=await video.locator(`[data-letter="${path[0]}"]`).boundingBox(),b=await video.locator(`[data-letter="${path.at(-1)}"]`).boundingBox();await video.mouse.move(a.x+a.width/2,a.y+a.height/2);await video.mouse.down();await video.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:10});await video.mouse.up();await video.waitForTimeout(650);}await video.locator('#wordsearch-hint').click();await video.waitForTimeout(800);await video.locator('#word-initial-dialog-button').click();await video.waitForTimeout(1400);
  }else{
   const cells=fixture(g,6).nonogram.saves[6].cells,blanks=NONOGRAMS[5].grid.flat().flatMap((n,i)=>n&&cells[i]!==1?[i]:[]).slice(0,14);
   for(const i of blanks){await video.locator(`[data-pixel="${i}"]`).click();await video.waitForTimeout(230);}await video.waitForTimeout(1700);
  }
  await vc.close();const raw=await videoPathPromise;
  execFileSync(process.env.FFMPEG||'ffmpeg',['-y','-i',raw,'-t','27','-vf','scale=1280:720,setsar=1','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-an',path.join(dir,'gameplay-16x9.mp4')],{stdio:'ignore'});
  await rm(path.join(dir,'raw-video'),{recursive:true,force:true});console.log(`${g}: icon, cover, 4 screenshots, onboarding preview, MP4`);
 }
 await writeFile(path.join(out,'README.txt'),'Материалы Клеточек 1.4.2. Скриншоты и видео сняты с реального интерфейса общих сборок. Ответы SDK при локальной съёмке тестовые, настоящая реклама не записана и не проверена. mobile-*.png 720×1280; desktop-*.png 1280×720; icon 512×512; cover 800×470. onboarding-preview — дополнительный предпросмотр, не скриншот геймплея для каталога.\n');
}finally{await browser.close();}
