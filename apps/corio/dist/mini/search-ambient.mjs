const curtain=new URL('../assets/search-room-curtain-alpha-v1.png',import.meta.url).href;
export function searchAmbient(scene){
  if(scene==='room')return `<div class="search-ambient room-breeze" data-ambient="curtain" aria-hidden="true"><svg class="curtain-rod" viewBox="0 0 1536 1024"><path d="M385 7H468" stroke="#173744" stroke-width="7" stroke-linecap="round"/></svg><svg class="curtain-cloth" viewBox="160 15 690 1505" preserveAspectRatio="none"><image href="${curtain}" width="1024" height="1536"/></svg></div>`;
  if(scene==='kitchen')return `<div class="search-ambient kitchen-steam" data-ambient="steam" aria-hidden="true">${[0,1,2].map(i=>`<svg class="steam-wisp wisp-${i}" viewBox="0 0 60 100"><path d="M30 97 C8 77 51 62 31 42 C14 26 23 13 31 4" fill="none" stroke="#f6e8c9" stroke-width="3.5" stroke-linecap="round"/></svg>`).join('')}</div>`;
  return `<div class="search-ambient yard-stars" data-ambient="stars" aria-hidden="true">${[[73.8,3.1],[82.6,5.3],[87.5,1.1],[65.1,1.9]].map(([x,y],i)=>`<svg class="star star-${i}" style="left:${x}%;top:${y}%" viewBox="0 0 20 20"><path d="m10 1 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" fill="#f3e9cb"/></svg>`).join('')}</div>`;
}
export function searchNight(){return '<div class="search-night" data-lamp-glow aria-hidden="true"></div>';}
