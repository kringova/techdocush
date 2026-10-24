const item=(id,name,x,y,size=56,angle=0)=>({id,name,x,y,size,angle});
export const SEARCH_SCENES={
  room:[item('yarn','Жёлтый клубок',660,443,66),item('brush','Щётка',105,338,62,-16),item('key','Ключ с колечком',330,335,57,15),item('cup','Чашка',440,327,54),item('sock','Полосатый носок',525,418,60,-16),item('glasses','Очки',570,270,64,-12),item('bell','Колокольчик',220,443,50,10),item('ribbon','Синий бант',400,460,58,-8),item('book','Книга с закладкой',140,265,60,8),item('ball','Полосатый мяч',720,350,56)],
  kitchen:[item('bowl','Кошачья миска',300,235,64),item('spoon','Ложка',410,242,58,70),item('towel','Полосатое полотенце',265,355,65),item('apple','Яблоко',670,350,55),item('mitt','Прихватка',500,380,60,-12),item('cup','Чашка',700,230,54),item('key','Ключ с колечком',95,460,54,25),item('fish','Игрушка-рыбка',450,475,66,-9),item('whisk','Венчик',600,355,57,75),item('sponge','Губка',200,245,52)],
  yard:[item('watering','Лейка',140,380,68),item('pinecone','Шишка',430,440,54,15),item('feather','Пёрышко',295,405,58,-25),item('key','Ключ с колечком',520,315,56,-10),item('flowerpot','Горшок с цветком',670,365,65),item('shovel','Садовый совок',210,340,65,-20),item('leaf','Жёлтый лист',560,455,55,25),item('glove','Садовая перчатка',455,315,56,-18),item('lantern','Фонарик',695,235,60),item('ribbon','Синий бант',365,465,55),item('ball','Полосатый мяч',605,410,56),item('bowl','Кошачья миска',75,435,64)]
};
export const SEARCH_LEVELS=[
  {name:'Комната у лампы',scene:'room',targets:['yarn','brush','key','cup']},
  {name:'На кухонном столе',scene:'kitchen',targets:['bowl','spoon','towel','apple','sponge']},
  {name:'Тихий двор',scene:'yard',targets:['watering','pinecone','feather','key','flowerpot']},
  {name:'Новые находки в комнате',scene:'room',targets:['sock','glasses','bell','ribbon','book','ball']},
  {name:'Перед ужином',scene:'kitchen',targets:['mitt','cup','key','fish','whisk','bowl']}
];
