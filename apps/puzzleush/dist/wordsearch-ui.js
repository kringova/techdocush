import {wordPath} from './engine/wordsearch.js';

export function mountWordsearch({mount,puzzle,state,mode='drag',onSelect,onStatus,blocked=()=>false}){
 const controller=new AbortController(),signal=controller.signal,found=new Set(state.found.flatMap(w=>puzzle.placements[w]||[]));
 let gesture=null,anchor=null,focused=0;
 mount.innerHTML=`<div class="wordsearch-board" style="--word-size:${puzzle.size}" role="group" aria-label="Поиск слов: поле ${puzzle.size} на ${puzzle.size}">${puzzle.grid.map((letter,i)=>`<button class="word-cell ${found.has(i)?'word-found':''}" data-letter="${i}" aria-label="Строка ${Math.floor(i/puzzle.size)+1}, столбец ${i%puzzle.size+1}: ${letter}${found.has(i)?', найденное слово':''}" tabindex="${i===0?0:-1}">${letter}</button>`).join('')}</div>`;
 const board=mount.querySelector('.wordsearch-board');
 const point=e=>{const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-letter]');return target&&board.contains(target)?Number(target.dataset.letter):null;};
 function highlight(start,end){const path=wordPath(puzzle.size,start,end),set=new Set(path);board.querySelectorAll('[data-letter]').forEach(e=>{e.classList.toggle('word-selecting',set.has(Number(e.dataset.letter)));e.classList.toggle('word-anchor',Number(e.dataset.letter)===start);});return path;}
 function finish(start,end){const path=highlight(start,end);anchor=null;gesture=null;onSelect(path);}
 function tap(cell){
  if(anchor===null){anchor=cell;highlight(cell,cell);onStatus('Теперь выбери последнюю букву слова.');}
  else if(anchor===cell){anchor=null;highlight(-1,-1);onStatus('Выбери начало слова.');}
  else finish(anchor,cell);
 }
 board.addEventListener('pointerdown',e=>{
  if(blocked()||state.won||!e.isPrimary||e.button!==0)return;
  const target=e.target.closest('[data-letter]');if(!target)return;e.preventDefault();focused=Number(target.dataset.letter);target.focus({preventScroll:true});
  if(mode==='taps'){tap(focused);return;}
  gesture={start:focused,end:focused,pointer:e.pointerId};highlight(focused,focused);
 },{signal});
 document.addEventListener('pointermove',e=>{if(!gesture||blocked()||gesture.pointer!==e.pointerId)return;e.preventDefault();const cell=point(e);if(cell!==null){gesture.end=cell;highlight(gesture.start,cell);}},{signal,passive:false});
 document.addEventListener('pointerup',e=>{if(!gesture||gesture.pointer!==e.pointerId)return;if(blocked()){gesture=null;highlight(-1,-1);return;}const {start,end}=gesture;if(start===end){gesture=null;highlight(-1,-1);onStatus('Проведи от первой буквы к последней или выбери режим «Два касания».');return;}finish(start,end);},{signal});
 document.addEventListener('pointercancel',()=>{gesture=null;anchor=null;highlight(-1,-1);},{signal});
 board.addEventListener('keydown',e=>{
  if(blocked()||state.won||e.ctrlKey||e.metaKey||e.altKey)return;
  const cell=e.target.closest('[data-letter]');if(!cell)return;focused=Number(cell.dataset.letter);
  if(e.key==='Enter'||e.key===' '){e.preventDefault();tap(focused);return;}
  if(e.key==='Escape'){anchor=null;highlight(-1,-1);onStatus('Выделение снято.');return;}
  const offsets={ArrowLeft:-1,ArrowRight:1,ArrowUp:-puzzle.size,ArrowDown:puzzle.size};if(!(e.key in offsets))return;e.preventDefault();focused=Math.max(0,Math.min(puzzle.grid.length-1,focused+offsets[e.key]));
  board.querySelectorAll('[data-letter]').forEach(b=>{b.tabIndex=Number(b.dataset.letter)===focused?0:-1;});board.querySelector(`[data-letter="${focused}"]`).focus({preventScroll:true});if(anchor!==null)highlight(anchor,focused);
 },{signal});
 return {destroy:()=>controller.abort()};
}
