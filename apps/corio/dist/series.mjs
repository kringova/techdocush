export const SERIES=[
  {id:'boxes',title:'Кот и коробки',path:'boxes/',product:'corio_boxes_relax'},
  {id:'shelves',title:'По полочкам',path:'shelves/',product:'corio_shelves_relax'},
  {id:'tunnels',title:'Настенная трасса',path:'tunnels/',product:'corio_tunnels_relax'},
  {id:'food',title:'Что в миске?',path:'food/',product:'corio_food_relax'},
  {id:'pet',title:'Вечер с котом',path:'pet/',product:'corio_pet_relax'},
  {id:'grooming',title:'Чистые лапы',path:'grooming/',product:'corio_grooming_relax'},
  {id:'litter',title:'Пары в лотке',path:'litter/',product:'corio_litter_relax'},
  {id:'yarn',title:'Распутай клубок',path:'yarn/',product:'corio_yarn_relax'},
  {id:'search',title:'Куда пропало?',path:'search/',product:'corio_search_relax'}
];
export const PROFILE='web-prototype';
for(const host of typeof document==='undefined'?[]:document.querySelectorAll('[data-series]')){
  if(host.querySelector('.series-nav'))continue;
  const nav=document.createElement('nav');nav.className='series-nav';nav.setAttribute('aria-label','Другие игры corio');
  const home=document.createElement('a');home.href=new URL('./',import.meta.url).href;home.textContent='Все игры';nav.append(home);
  for(const game of SERIES){const link=document.createElement('a');link.href=new URL(game.path,import.meta.url).href;link.textContent=game.title;if(location.pathname.includes('/'+game.path))link.setAttribute('aria-current','page');nav.append(link);}
  host.append(nav);
}
