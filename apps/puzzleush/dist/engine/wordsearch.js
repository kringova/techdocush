export const WORDSEARCH_CHAPTERS=[{start:1,end:5,label:'6 × 6'},{start:6,end:10,label:'8 × 8'},{start:11,end:20,label:'10 × 10'},{start:21,end:30,label:'12 × 12'}];
const themes=[
 ['В лесу','ЛЕС ЛИСА ВОЛК СОВА МХИ ГРИБ ПЕНЬ КУСТ ДУБ ЕЛЬ'],
 ['В саду','САД РОЗА МАК ЛИЛИЯ ПИОН ЛУК УКРОП МЯТА ИРИС СЛИВА'],
 ['На кухне','СУП СЫР СОК ХЛЕБ РИС ЧАЙ МЕД МУКА СОЛЬ МАСЛО'],
 ['Дома','ДОМ ОКНО СТОЛ СТУЛ ДВЕРЬ ПОЛКА ЛАМПА ДИВАН КОВЕР КРЕСЛО'],
 ['В небе','ЛУНА ЗВЕЗДА СОЛНЦЕ КОСМОС КОМЕТА МАРС ВЕНЕРА ЗЕМЛЯ УРАН САТУРН'],
 ['Погода','ДОЖДЬ СНЕГ ВЕТЕР ГРОЗА ТУМАН РАДУГА МОРОЗ ТЕПЛО ВЬЮГА ОБЛАКО'],
 ['У моря','ВОЛНА ПЕСОК ЧАЙКА БЕРЕГ МАЯК КОРАБЛЬ ЯКОРЬ РАКУШКА КРАБ МЕДУЗА'],
 ['Фрукты','ЯБЛОКО ГРУША БАНАН ЛИМОН СЛИВА ВИШНЯ ПЕРСИК КИВИ МАНГО ДЫНЯ'],
 ['Животные','КОШКА СОБАКА КОРОВА ЛОШАДЬ ТИГР ЗЕБРА ЖИРАФ ПАНДА БОБР БАРСУК'],
 ['Птицы','СОРОКА ВОРОНА СИНИЦА ГОЛУБЬ ВОРОБЕЙ ЛАСТОЧКА ЛЕБЕДЬ АИСТ ДЯТЕЛ СКВОРЕЦ'],
 ['На прогулке','ДОРОЖКА СКАМЕЙКА ФОНТАН ПЛОЩАДЬ АЛЛЕЯ КАЧЕЛИ КЛУМБА БЕСЕДКА ВЕЛОСИПЕД ЛЕСТНИЦА'],
 ['Музыка','МЕЛОДИЯ ГИТАРА СКРИПКА ПИАНИНО БАРАБАН ФЛЕЙТА ТРУБА АРФА КОНЦЕРТ ПЕСНЯ'],
 ['Цвета','КРАСНЫЙ СИНИЙ ЗЕЛЕНЫЙ ЖЕЛТЫЙ БЕЛЫЙ ЧЕРНЫЙ РОЗОВЫЙ СЕРЫЙ РЫЖИЙ ГОЛУБОЙ'],
 ['Овощи','МОРКОВЬ КАПУСТА КАРТОФЕЛЬ ПОМИДОР ОГУРЕЦ КАБАЧОК ТЫКВА СВЕКЛА РЕДИСКА БАКЛАЖАН'],
 ['В дороге','АВТОБУС ПОЕЗД САМОЛЕТ ТРАМВАЙ ТРОЛЛЕЙБУС МЕТРО ТАКСИ БИЛЕТ ВОКЗАЛ ПЕРРОН'],
 ['Школа','ТЕТРАДЬ УЧЕБНИК ЛИНЕЙКА КАРАНДАШ ПЕНАЛ УРОК ЗВОНОК ПАРТА ДНЕВНИК ДОСКА'],
 ['Ремесло','ИГОЛКА НИТКА НОЖНИЦЫ ТКАНЬ ПРЯЖА СПИЦЫ КРЮЧОК ПЯЛЬЦЫ УЗОР ВЫШИВКА'],
 ['Спорт','ФУТБОЛ ТЕННИС ПЛАВАНИЕ БЕГ ЛЫЖИ КОНЬКИ ХОККЕЙ ГИМНАСТИКА ШАХМАТЫ ВОЛЕЙБОЛ'],
 ['Реки и озёра','РЕКА ОЗЕРО РУЧЕЙ ВОДОПАД ИСТОК УСТЬЕ ПЛОТИНА КАМЫШ ЛИЛИЯ КУВШИНКА'],
 ['Времена года','ЗИМА ВЕСНА ЛЕТО ОСЕНЬ ЯНВАРЬ АПРЕЛЬ АВГУСТ ОКТЯБРЬ ЛИСТОПАД КАПЕЛЬ'],
 ['Профессии','УЧИТЕЛЬ ВРАЧ ПОВАР ПЕКАРЬ ПИЛОТ МОРЯК ИНЖЕНЕР ХУДОЖНИК МУЗЫКАНТ ПИСАТЕЛЬ'],
 ['Путешествие','ЧЕМОДАН РЮКЗАК КОМПАС ПАЛАТКА МАРШРУТ ПРИВАЛ КАРТА БАГАЖ СУВЕНИР ЭКСКУРСИЯ'],
 ['В пекарне','БУЛОЧКА ПИРОГ ПЕЧЕНЬЕ КЕКС БАТОН КРУАССАН ПРЯНИК ВАТРУШКА РОГАЛИК КОВРИЖКА'],
 ['Сказочный лес','ДРАКОН ЕДИНОРОГ РУСАЛКА ВОЛШЕБНИК ФЕЯ ЗАМОК КОРОЛЕВА ГНОМ ВЕЛИКАН ПРИНЦЕССА'],
 ['В горах','ВЕРШИНА СКЛОН ПЕРЕВАЛ УЩЕЛЬЕ СКАЛА ЛЕДНИК ПЕЩЕРА ЛАВИНА ТРОПА ПОДНОЖИЕ'],
 ['Деревья','БЕРЕЗА ОСИНА РЯБИНА ТОПОЛЬ КАШТАН ЛИПА ЯСЕНЬ КЕДР ЛИСТВЕННИЦА ПИХТА'],
 ['Насекомые','БАБОЧКА СТРЕКОЗА МУРАВЕЙ КУЗНЕЧИК СВЕТЛЯЧОК ПЧЕЛА ШМЕЛЬ КОМАР ЖУК ОСА'],
 ['В мастерской','МОЛОТОК ОТВЕРТКА ПИЛА РУБАНОК СВЕРЛО ГВОЗДЬ ДРЕЛЬ ТИСКИ УГОЛЬНИК СТАМЕСКА'],
 ['Уютный вечер','ПЛЕД ПОДУШКА КНИГА СВЕЧА КАМИН КРЕСЛО ТЕПЛО ТИШИНА МУЗЫКА УЛЫБКА'],
 ['Мир открытий','ТЕЛЕСКОП МИКРОСКОП ПЛАНЕТА МОЛЕКУЛА КРИСТАЛЛ МАГНИТ ОРБИТА СПУТНИК ЭНЕРГИЯ ПРИРОДА']
];
const DIRECTIONS=[[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]];
const alphabet='АААБВВГДДЕЕЕЕЖЗИИИККЛЛММНННОООООППРРРСССТТТУУФХЦЧШЩЫЬЭЮЯ';
const cache=new Map();
function random(seed){let x=seed>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
const shuffled=(a,rng)=>a.map(v=>[rng(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
export function wordPath(size,start,end){
 if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<0||start>=size*size||end>=size*size)return [];
 const r=Math.floor(start/size),c=start%size,dr=Math.floor(end/size)-r,dc=end%size-c;
 if(dr&&dc&&Math.abs(dr)!==Math.abs(dc))return [];
 const length=Math.max(Math.abs(dr),Math.abs(dc));return Array.from({length:length+1},(_,k)=>(r+k*Math.sign(dr))*size+c+k*Math.sign(dc));
}
export function occurrences(grid,size,word){
 const found=new Map();
 for(let r=0;r<size;r++)for(let c=0;c<size;c++)for(const [dr,dc] of DIRECTIONS){
  const er=r+dr*(word.length-1),ec=c+dc*(word.length-1);if(er<0||ec<0||er>=size||ec>=size)continue;
  const path=Array.from({length:word.length},(_,k)=>(r+k*dr)*size+c+k*dc);
  if(path.every((i,k)=>grid[i]===word[k]))found.set([path[0],path.at(-1)].sort((a,b)=>a-b).join(':'),path);
 }
 return [...found.values()];
}
export function generateWordsearch(level=1){
 if(!Number.isInteger(level)||level<1||level>30)throw Error('Unknown wordsearch level');
 if(cache.has(level))return structuredClone(cache.get(level));
 const size=level<=5?6:level<=10?8:level<=20?10:12,count=level<=5?4:level<=10?6:level<=20?8:10;
 const [theme,pool]=themes[level-1],rng=random(20261024+level*1031),words=[];
 for(const word of shuffled(pool.split(' ').filter(w=>w.length<=size),rng))if(!words.some(w=>w.includes(word)||word.includes(w))&&words.length<count)words.push(word);
 if(words.length!==count)throw Error(`Not enough words for ${theme}`);
 const directions=DIRECTIONS.slice(0,level<=5?2:level<=10?4:8);
 for(let attempt=0;attempt<1000;attempt++){
  const grid=Array(size*size).fill(null),placements={};let valid=true;
  for(const word of [...words].sort((a,b)=>b.length-a.length)){
   const options=[];
   for(let r=0;r<size;r++)for(let c=0;c<size;c++)for(const [dr,dc] of directions){
    const er=r+dr*(word.length-1),ec=c+dc*(word.length-1);if(er<0||ec<0||er>=size||ec>=size)continue;
    const cells=Array.from({length:word.length},(_,k)=>(r+k*dr)*size+c+k*dc);
    if(cells.every((i,k)=>!grid[i]||grid[i]===word[k]))options.push({cells,score:cells.filter(i=>grid[i]).length+rng()*.9});
   }
   if(!options.length){valid=false;break;}options.sort((a,b)=>b.score-a.score);const cells=options[0].cells;
   for(let k=0;k<word.length;k++)grid[cells[k]]=word[k];placements[word]=cells;
  }
  if(!valid)continue;
  for(let i=0;i<grid.length;i++)grid[i]??=alphabet[Math.floor(rng()*alphabet.length)];
  if(!words.every(word=>occurrences(grid,size,word).length===1))continue;
  const result={level,size,theme,words,grid,placements,directions:level<=5?'По горизонтали и вертикали':level<=10?'По горизонтали, вертикали и диагонали':'Во всех восьми направлениях'};cache.set(level,result);return structuredClone(result);
 }
 throw Error(`Unable to generate unique wordsearch ${level}`);
}
export function selectedWord(puzzle,path){
 if(!Array.isArray(path)||path.length<3)return null;
 const expected=wordPath(puzzle.size,path[0],path.at(-1));if(expected.length!==path.length||expected.some((v,i)=>path[i]!==v))return null;
 const text=path.map(i=>puzzle.grid[i]).join(''),reverse=[...text].reverse().join('');
 return puzzle.words.find(word=>word===text||word===reverse)||null;
}
export const revealWord=(puzzle,state)=>puzzle.words.find(word=>!state.found.includes(word)&&!state.revealed.includes(word))||null;
export const wordsearchSolved=(puzzle,state)=>puzzle.words.every(word=>state.found.includes(word));
