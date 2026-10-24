export const STORAGE_KEY='kletochki-progress-v2';
export const LEGACY_STORAGE_KEY='kletochki-progress-v1';
export const SUDOKU_CHAPTERS=[
 {start:1,end:5,label:'Базовый'},
 {start:6,end:10,label:'Средний'},
 {start:11,end:20,label:'Сложный'},
 {start:21,end:30,label:'Эксперт'}
];
export const NONOGRAM_CHAPTERS=[
 {start:1,end:5,label:'5 × 5'},
 {start:6,end:15,label:'10 × 10'},
 {start:16,end:25,label:'15 × 15'},
 {start:26,end:30,label:'20 × 20'}
];
export function chapterFor(game,level){
 const chapters=game==='sudoku'?SUDOKU_CHAPTERS:NONOGRAM_CHAPTERS;
 const index=chapters.findIndex(c=>level>=c.start&&level<=c.end);
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
