export function fitFocusedScene(zoom=1){
  if(!document.body.classList.contains('focus-game'))return;
  const viewport=document.querySelector('.search-viewport'),svg=viewport?.querySelector('svg');
  if(!svg)return;
  const width=svg.viewBox.baseVal.width,height=svg.viewBox.baseVal.height;
  const scale=Math.min(viewport.clientWidth/width,viewport.clientHeight/height)*zoom;
  svg.style.width=(width*scale)+'px';svg.style.height=(height*scale)+'px';
  const painting=svg.closest('.search-painting');
  if(painting){painting.style.width=(width*scale)+'px';painting.style.height=(height*scale)+'px';painting.style.setProperty('--lamp-radius',(104*scale)+'px');}
  for(const target of svg.querySelectorAll('[data-find]')){
    const rect=target.querySelector('rect');if(!rect)continue;
    const original=['x','y','width','height'].map(name=>Number(rect.dataset[name]??(rect.dataset[name]=rect.getAttribute(name))));
    const w=Math.max(original[2],26/scale),h=Math.max(original[3],26/scale);
    rect.setAttribute('x',Math.max(0,Math.min(width-w,original[0]+original[2]/2-w/2)));
    rect.setAttribute('y',Math.max(0,Math.min(height-h,original[1]+original[3]/2-h/2)));
    rect.setAttribute('width',w);rect.setAttribute('height',h);
  }
}
export function setupFocusUI(){
  if(!document.body.classList.contains('focus-game'))return;
  for(const button of document.querySelectorAll('[data-open-panel]'))button.addEventListener('click',()=>document.getElementById(button.dataset.openPanel).showModal());
  for(const button of document.querySelectorAll('[data-close-panel]'))button.addEventListener('click',()=>button.closest('dialog').close());
  for(const dialog of document.querySelectorAll('[data-game-panel]'))dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  const modeHost=document.querySelector('[data-modes]'),label=document.getElementById('mode-label');
  const updateMode=()=>{if(label){const s=window.__corioModes();label.textContent=s.mode==='calm'?'Без лимита':`${s.remaining} ходов`;label.parentElement.classList.toggle('challenge-active',s.mode==='challenge');}};
  new MutationObserver(updateMode).observe(modeHost,{subtree:true,childList:true,characterData:true,attributes:true});updateMode();
  modeHost.addEventListener('click',event=>{if(event.target.closest('[data-mode]'))document.getElementById('mode-settings').close();});
  new ResizeObserver(()=>fitFocusedScene(window.__mini?.().selected||1)).observe(document.getElementById('scene'));
  document.addEventListener('contextmenu',event=>{if(event.target.closest('#scene'))event.preventDefault();});
}
