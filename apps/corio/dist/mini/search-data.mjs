import {searchLayout} from './search-layout.mjs?v=0.24.0';
const item=(id,name,x,y,size=56,angle=0)=>({id,name,x,y,size,angle});
export const SEARCH_SCENES={
  room:[item('yarn','Жёлтый клубок',660,443,66),item('brush','Щётка',105,338,62,-16),item('key','Ключ с колечком',330,335,57,15),item('cup','Чашка',440,327,54),item('sock','Полосатый носок',525,418,60,-16),item('glasses','Очки',570,270,64,-12),item('bell','Колокольчик',220,443,50,10),item('ribbon','Синий бант',400,460,58,-8),item('book','Книга с закладкой',140,265,60,8),item('ball','Полосатый мяч',720,350,56)],
  kitchen:[item('bowl','Кошачья миска',300,235,64),item('spoon','Ложка',410,242,58,70),item('towel','Полосатое полотенце',265,355,65),item('apple','Яблоко',670,350,55),item('mitt','Прихватка',500,380,60,-12),item('cup','Чашка',700,230,54),item('key','Ключ с колечком',95,460,54,25),item('fish','Игрушка-рыбка',450,475,66,-9),item('whisk','Венчик',600,355,57,75),item('sponge','Губка',200,245,52)],
  yard:[item('watering','Лейка',140,380,68),item('pinecone','Шишка',430,440,54,15),item('feather','Пёрышко',295,405,58,-25),item('key','Ключ с колечком',520,315,56,-10),item('flowerpot','Горшок с цветком',670,365,65),item('shovel','Садовый совок',210,340,65,-20),item('leaf','Жёлтый лист',560,455,55,25),item('glove','Садовая перчатка',455,315,56,-18),item('lantern','Фонарик',695,235,60),item('ribbon','Синий бант',365,465,55),item('ball','Полосатый мяч',605,410,56),item('bowl','Кошачья миска',75,435,64)]
};
// The original scene-specific prop designs are reused as colored cutouts and exact silhouettes.
for(const [scene,items] of Object.entries(SEARCH_SCENES))for(const item of items)item.source=scene+'/'+item.id;
SEARCH_SCENES.room.find(item=>item.id==='ball').source='yard/ball'; // source room ball is partly behind the cat
const extras={room:[['remote','Пульт','theme/remote'],['slipper','Домашний тапочек','theme/slipper'],['letter','Конверт','theme/letter']],kitchen:[['fork','Вилка','theme/fork'],['spatula','Кухонная лопатка','theme/spatula'],['lemon','Лимон','theme/lemon']],yard:[['pruner','Секатор','theme/pruner']]};
for(const [scene,items] of Object.entries(extras))for(const [id,name,source] of items)SEARCH_SCENES[scene].push({id,name,source});
const scenes=['room','kitchen','yard'];
const sceneNames={room:'Комната у лампы',kitchen:'Домашняя кухня',yard:'Тихий двор'};
export const SEARCH_LEVELS=Array.from({length:50},(_,index)=>{
  const scene=scenes[index%3],variant=Math.floor(index/3)%4;
  const clues=variant%2?'silhouettes':'words',lighting=variant>=2?'night':'normal';
  const count=5+Math.floor(index/10)*2;
  const pool=SEARCH_SCENES[scene].map(item=>item.id);let seed=7919+index*977;
  for(let at=pool.length-1;at>0;at--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const other=seed%(at+1);[pool[at],pool[other]]=[pool[other],pool[at]];}
  return{id:'search-50-v3-'+(index+1),name:sceneNames[scene],scene,clues,lighting,targets:pool.slice(0,count),layout:searchLayout(SEARCH_SCENES[scene],7919+index*977,scene)};
});
