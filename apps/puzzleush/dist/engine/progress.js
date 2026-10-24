export const STORAGE_KEY='kletochki-progress-v4';
export const V3_STORAGE_KEY='kletochki-progress-v3';
export const V2_STORAGE_KEY='kletochki-progress-v2';
export const LEGACY_STORAGE_KEY='kletochki-progress-v1';
export {WORDSEARCH_CHAPTERS} from './wordsearch.js';
import {WORDSEARCH_CHAPTERS} from './wordsearch.js';
const span=(start,end)=>Array.from({length:end-start+1},(_,i)=>start+i);
export const SUDOKU_CHAPTERS=[
 {start:1,end:5,label:'Базовый'},
 {start:6,end:10,label:'Средний',levels:[...span(6,10),...span(31,50)]},
 {start:11,end:20,label:'Сложный',levels:[...span(11,20),...span(51,80)]},
 {start:21,end:30,label:'Эксперт',levels:[...span(21,30),...span(81,130)]}
];
export const NONOGRAM_CHAPTERS=[
 {start:1,end:5,label:'5 × 5'},
 {start:6,end:15,label:'10 × 10'},
 {start:16,end:25,label:'15 × 15'},
 {start:26,end:30,label:'20 × 20'}
];
export const chaptersFor=game=>game==='sudoku'?SUDOKU_CHAPTERS:game==='wordsearch'?WORDSEARCH_CHAPTERS:NONOGRAM_CHAPTERS;
export const chapterLevels=chapter=>chapter.levels?[...chapter.levels]:span(chapter.start,chapter.end);
export const levelOrder=game=>chaptersFor(game).flatMap(chapterLevels);
export const levelCount=game=>levelOrder(game).length;
export function nextLevelFor(game,level,completed={}){const order=levelOrder(game);return order.slice(order.indexOf(level)+1).find(n=>!completed[n])??null;}
export function chapterFor(game,level){
 const chapters=chaptersFor(game);
 const index=chapters.findIndex(c=>chapterLevels(c).includes(level));
 return {...chapters[index<0?0:index],index:index<0?0:index};
}
const SUDOKU_MAP=new Map([...Array.from({length:5},(_,i)=>[i+1,i+1]),...Array.from({length:5},(_,i)=>[i+11,i+6]),...Array.from({length:10},(_,i)=>[i+21,i+11])]);
const NONOGRAM_MAP=new Map([...Array.from({length:5},(_,i)=>[i+1,i+1]),...Array.from({length:10},(_,i)=>[i+21,i+6])]);
const keys=o=>Object.keys(o||{}).filter(k=>Number.isInteger(Number(k))&&Number(k)>=1&&Number(k)<=30);
function migrateGame(old,map){
 if(!old||!Number.isInteger(old.level)||old.level<1||old.level>30)throw Error('Invalid legacy level');
 const completed={},saves={};
 for(const k of keys(old.completed)){const next=map.get(Number(k));if(next)completed[next]=structuredClone(old.completed[k]);}
 for(const k of keys(old.saves)){const next=map.get(Number(k));if(next)saves[next]=structuredClone(old.saves[k]);}
 const mapped=map.get(old.level);let level=1;while(level<30&&completed[level])level++;
 if(mapped&&saves[mapped]&&!saves[mapped].won)level=mapped;
 return {level,completed,saves};
}
// The caller writes the result only to v2. The original v1 key is never removed
// or overwritten, including fields belonging to the removed easy puzzles.
export function migrateProgressV1(old){
 if(!old||old.version!==1)throw Error('Unsupported legacy progress');
 return {version:2,activeGame:old.activeGame==='nonogram'?'nonogram':'sudoku',sudoku:migrateGame(old.sudoku,SUDOKU_MAP),nonogram:migrateGame(old.nonogram,NONOGRAM_MAP),legacyCompleted:{sudoku:keys(old.sudoku.completed).length,nonogram:keys(old.nonogram.completed).length}};
}
// Adding the third game uses a new key, so an older open tab cannot overwrite
// word-search progress. v1 and v2 remain byte-for-byte recovery copies.
export function migrateProgressV2(old){
 if(!old||old.version!==2)throw Error('Unsupported progress version');
 const next=structuredClone(old);next.version=3;next.wordsearch??={level:1,completed:{},saves:{}};next.legacyCompleted??={sudoku:0,nonogram:0};next.legacyCompleted.wordsearch??=0;return next;
}
// A separate v4 key isolates the larger catalogue from already-open v3 tabs.
// Existing puzzle ids, states, found words and paid benefits stay unchanged.
export function migrateProgressV3(old){
 if(!old||old.version!==3)throw Error('Unsupported progress version');
 const next=structuredClone(old);next.version=4;return next;
}
