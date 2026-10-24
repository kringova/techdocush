// Offline authoring only. The game loads the reviewed catalogue, never searches
// for puzzles on a player's phone. Re-run with --write to replace that catalogue.
import {writeFile} from 'node:fs/promises';
import {logicalSolve} from '../dist/engine/sudoku.js';

function random(seed){let x=seed>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(a,rng){a=[...a];for(let i=a.length-1;i;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const box=i=>Math.floor(i/27)*3+Math.floor(i%9/3),FULL=0x3fe;
function search(input,{rng=null,limit=2}={}){
 const board=[...input],rows=Array(9).fill(0),cols=Array(9).fill(0),boxes=Array(9).fill(0);let count=0,solution=null;
 for(let i=0;i<81;i++)if(board[i]){const bit=1<<board[i],r=Math.floor(i/9),c=i%9,b=box(i);if((rows[r]|cols[c]|boxes[b])&bit)return {count:0};rows[r]|=bit;cols[c]|=bit;boxes[b]|=bit;}
 function visit(){
  let at=-1,choices=0,length=10;
  for(let i=0;i<81;i++)if(!board[i]){const mask=FULL&~(rows[Math.floor(i/9)]|cols[i%9]|boxes[box(i)]);let n=0;for(let m=mask;m;m&=m-1)n++;if(!n)return;if(n<length){at=i;choices=mask;length=n;if(n===1)break;}}
  if(at<0){count++;solution??=[...board];return;}
  const r=Math.floor(at/9),c=at%9,b=box(at),digits=[];for(let n=1;n<=9;n++)if(choices&(1<<n))digits.push(n);
  for(const n of rng?shuffle(digits,rng):digits){const bit=1<<n;board[at]=n;rows[r]|=bit;cols[c]|=bit;boxes[b]|=bit;visit();rows[r]^=bit;cols[c]^=bit;boxes[b]^=bit;board[at]=0;if(count>=limit)return;}
 }
 visit();return {count,solution};
}
const plans=[{difficulty:'medium',count:20,start:31,clues:34},{difficulty:'hard',count:30,start:51,clues:28},{difficulty:'expert',count:50,start:81,clues:25}];
const catalogue=[];let seed=20261025;
for(const plan of plans){
 const accepted=[];
 for(let tries=0;accepted.length<plan.count&&tries<20000;tries++){
  const candidateSeed=seed++,rng=random(candidateSeed),solution=search(Array(81).fill(0),{rng,limit:1}).solution,puzzle=[...solution],target=plan.clues+Math.floor(rng()*2);let clues=81;
  for(const i of shuffle(Array.from({length:81},(_,i)=>i),rng)){if(clues<=target)break;const n=puzzle[i];puzzle[i]=0;if(search(puzzle).count===1)clues--;else puzzle[i]=n;}
  const result=logicalSolve(puzzle);if(!result.solved)continue;
  const advanced=result.trace.filter(s=>s.eliminations),techniques=[...new Set(advanced.map(s=>s.technique))],hidden=result.trace.filter(s=>s.technique==='hidden-single').length;
  if(plan.difficulty==='medium'&&(advanced.length>1||hidden<3))continue;
  if(plan.difficulty==='hard'&&(advanced.length<1||advanced.length>3))continue;
  if(plan.difficulty==='expert'&&(advanced.length<4||techniques.length<2||!techniques.some(t=>['naked-pair','hidden-pair','x-wing'].includes(t))))continue;
  accepted.push({puzzle:puzzle.join(''),solution:solution.join(''),clues,advanced:advanced.length,techniques,hidden,seed:candidateSeed,difficulty:plan.difficulty});
  if(accepted.length%10===0)console.log(`${plan.difficulty}: ${accepted.length}/${plan.count}; seed ${candidateSeed}`);
 }
 if(accepted.length!==plan.count)throw Error(`Not enough ${plan.difficulty} puzzles`);
 accepted.sort((a,b)=>a.advanced-b.advanced||b.clues-a.clues||a.hidden-b.hidden);
 catalogue.push(...accepted.map((p,i)=>({level:plan.start+i,...p})));
}
const data='// Authored with scripts/generate-sudoku-pack.mjs; original levels 1–30 stay in place.\nexport const ADDITIONAL_SUDOKU = '+JSON.stringify(catalogue,null,2)+';\n';
if(process.argv.includes('--write'))await writeFile(new URL('../dist/engine/additional-sudoku.js',import.meta.url),data);
console.log(JSON.stringify({count:catalogue.length,seedsTried:seed-20261025,write:process.argv.includes('--write')}));
