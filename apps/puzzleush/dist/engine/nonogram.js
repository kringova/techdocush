import {LARGE_ART} from './large-nonograms.js';
export function runs(line){const out=[];let n=0;for(const v of [...line,0]){if(v===1)n++;else if(n){out.push(n);n=0;}}return out.length?out:[0];}
const patternCache=new Map();
export function patterns(length,clues){
 const key=length+':'+clues.join(',');if(patternCache.has(key))return patternCache.get(key);
 if(clues.length===1&&clues[0]===0){const blank=[Array(length).fill(0)];patternCache.set(key,blank);return blank;}
 const out=[];
 function place(k,start,line){
  if(k===clues.length){out.push(line);return;}
  const after=clues.slice(k+1).reduce((s,n)=>s+n,0)+clues.length-k-1;
  for(let p=start;p<=length-clues[k]-after;p++){const next=[...line];for(let j=p;j<p+clues[k];j++)next[j]=1;place(k+1,p+clues[k]+1,next);}
 }
 place(0,0,Array(length).fill(0));patternCache.set(key,out);return out;
}
export function cluesFor(grid){const height=grid.length,width=grid[0].length;return {rows:grid.map(runs),cols:Array.from({length:width},(_,c)=>runs(grid.map(row=>row[c])))};}
export function logicalNonogram(grid){
 const h=grid.length,w=grid[0].length,{rows,cols}=cluesFor(grid);
 const state=Array.from({length:h},()=>Array(w).fill(-1));let steps=0;
 for(let pass=0;pass<h*w;pass++){
  let changed=false;
  for(const axis of ['row','col'])for(let i=0;i<(axis==='row'?h:w);i++){
   const line=axis==='row'?state[i]:state.map(row=>row[i]);
   const possible=patterns(line.length,(axis==='row'?rows:cols)[i]).filter(p=>line.every((v,j)=>v===-1||v===p[j]));
   if(!possible.length)return {solved:false,state,steps,contradiction:true};
   for(let j=0;j<line.length;j++)if(line[j]===-1&&possible.every(p=>p[j]===possible[0][j])){
    if(axis==='row')state[i][j]=possible[0][j];else state[j][i]=possible[0][j];changed=true;steps++;
   }
  }
  if(!changed)break;
 }
 return {solved:state.every((row,r)=>row.every((v,c)=>v===grid[r][c])),state,steps};
}
export function lineState(line,clue){
 const possible=patterns(line.length,clue).filter(p=>line.every((v,i)=>v===-1||v===p[i]));
 return {valid:possible.length>0,complete:runs(line.map(v=>v===1?1:0)).join()===clue.join(),possible};
}
export function nonogramSolved(state,grid){return state.length===grid.length*grid[0].length&&state.every((v,i)=>(v===1)===(grid[Math.floor(i/grid[0].length)][i%grid[0].length]===1));}

export function correctBlackLine(line,pattern){return line.every((v,i)=>(v===1)===(pattern[i]===1));}
export function autoCrossLines(cells,grid){
 const h=grid.length,w=grid[0].length,next=[...cells];
 for(let r=0;r<h;r++)if(correctBlackLine(next.slice(r*w,r*w+w),grid[r]))for(let c=0;c<w;c++)if(next[r*w+c]===-1)next[r*w+c]=0;
 for(let c=0;c<w;c++)if(correctBlackLine(Array.from({length:h},(_,r)=>next[r*w+c]),grid.map(row=>row[c])))for(let r=0;r<h;r++)if(next[r*w+c]===-1)next[r*w+c]=0;
 return next;
}

export function solveNonogram(grid,limit=2,maxNodes=5000){
 const h=grid.length,w=grid[0].length,{rows,cols}=cluesFor(grid);let count=0,solution=null,nodes=0,truncated=false;
 function search(input){
  if(++nodes>maxNodes){truncated=true;return;}
  const state=input.map(r=>[...r]);let best=null;
  for(let pass=0;pass<h*w;pass++){
   let changed=false;best=null;
   for(const axis of ['row','col'])for(let i=0;i<(axis==='row'?h:w);i++){
    const line=axis==='row'?state[i]:state.map(r=>r[i]);
    const possible=patterns(line.length,(axis==='row'?rows:cols)[i]).filter(p=>line.every((v,j)=>v===-1||v===p[j]));
    if(!possible.length)return;
    if(possible.length>1&&(!best||possible.length<best.possible.length))best={axis,i,possible};
    for(let j=0;j<line.length;j++)if(line[j]===-1&&possible.every(p=>p[j]===possible[0][j])){
     if(axis==='row')state[i][j]=possible[0][j];else state[j][i]=possible[0][j];changed=true;
    }
   }
   if(!changed)break;
  }
  if(state.every(r=>r.every(v=>v!==-1))){count++;solution??=state;return;}
  if(!best)return;
  for(const pattern of best.possible){
   const next=state.map(r=>[...r]);if(best.axis==='row')next[best.i]=[...pattern];else for(let r=0;r<h;r++)next[r][best.i]=pattern[r];
   search(next);if(count>=limit||truncated)return;
  }
 }
 search(Array.from({length:h},()=>Array(w).fill(-1)));return {count,solution,nodes,truncated};
}

const art=[
 ['Сердечко',['.#.#.','#####','#####','.###.','..#..']],
 ['Плюс',['..#..','..#..','#####','..#..','..#..']],
 ['Алмаз',['..#..','.###.','#####','.###.','..#..']],
 ['Стрелка',['..#..','...#.','#####','...#.','..#..']],
 ['Домик',['..#..','.###.','#####','##.##','#####']],
 ['Ёлочка',['..#..','.###.','#####','..#..','.###.']],
 ['Флажок',['####.','#..#.','####.','#....','#....']],
 ['Кубок',['#...#','#...#','#####','.###.','..#..']],
 ['Котик',['#...#','##.##','#####','#.#.#','.###.']],
 ['Зонтик',['..#..','.###.','#####','..#..','.##..']],
 ['Парус',['...#...','...##..','...###.','...####','###....','.#####.','..###..']],
 ['Корона',['#..#..#','##.#.##','#######','.#####.','.#####.','.......','.......']],
 ['Гриб',['..###..','.#####.','#######','#######','..###..','..###..','.#####.']],
 ['Ключ',['.###...','##.##..','##.##..','.####..','...##..','...###.','...##..']],
 ['Ракета',['...#...','..###..','..###..','..#.#..','.#####.','#######','..#.#..']],
 ['Планета',['.......','..###..','.#####.','#######','.#####.','..###..','.......']],
 ['Цветок',['..###..','..###..','#######','#######','..###..','...#...','..##...']],
 ['Рыбка',['..###..','.#####.','####.##','.#####.','..###..','...#...','..#.#..']],
 ['Чашка',['#####..','#...###','#...#.#','#...###','#####..','.###...','#######']],
 ['Письмо',['#######','##...##','#.#.#.#','#..#..#','#.....#','#.....#','#######']],
 ['Замок',['...####...','..######..','..##..##..','..##..##..','.########.','.########.','.###..###.','.###..###.','.########.','.########.']],
 ['Дерево',['....##....','..######..','.########.','##########','##########','.########.','..######..','....##....','....##....','...####...']],
 ['Кофе',['..#..#....','.#..#.....','..#..#....','..........','########..','#......###','#......#.#','##########','.######...','##########']],
 ['Маяк',['....##....','...####...','..######..','...####...','...#..#...','...####...','...####...','...#..#...','..######..','##########']],
 ['Космос',['...####...','..######..','.########.','##########','##########','.########.','..######..','...####...','.....#....','....###...']],
 ['Кактус',['....##....','....##..#.','.#..##..#.','.#..##..#.','.#######..','....##....','....##....','..######..','..######..','...####...']],
 ['Привидение',['...####...','..######..','.########.','.##.##.##.','.##.##.##.','.########.','.########.','..#######.','.##.##.##.','.#..##..#.']],
 ['Бабочка',['##......##','###....###','####..####','.########.','..######..','..######..','.########.','####..####','###....###','##......##']],
 ['Подарок',['..##..##..','..######..','...####...','##########','####..####','##########','####..####','####..####','####..####','##########']],
 ['Горный пейзаж',['.....#....','....###...','...#####..','..#######.','...#.#....','..#####...','.#######..','#########.','##########','##########']]
];
export const NONOGRAMS=[...art.slice(0,5),...art.slice(20),...LARGE_ART].map(([name,lines],i)=>{const grid=lines.map(s=>[...s].map(c=>c==='#'?1:0));return {level:i+1,name,grid,...cluesFor(grid)};});
