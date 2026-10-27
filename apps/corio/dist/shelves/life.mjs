import {createCatIdle} from '../mini/cat-idle.mjs?v=0.23.0';
const frame=new URL('../assets/shelves-cat-blink-frame-v1.png',import.meta.url).href;
export function shelfCatEyes(){
  return `<svg class="shelf-cat-detail" viewBox="0 0 1536 1024" aria-hidden="true"><defs><clipPath id="shelf-eye-mask"><polygon points="653,684 658,675 670,671 683,675 691,682 690,691 679,696 664,694 654,689"/><polygon points="695,677 700,670 709,670 716,678 718,688 711,695 699,689"/></clipPath></defs><image data-cat-layer="eyes" opacity="0" href="${frame}" width="1536" height="1024" clip-path="url(#shelf-eye-mask)"/></svg>`;
}
export function createShelfLife(options){
  const idle=createCatIdle({...options,parts:['eyes']});
  Object.defineProperty(window,'__corioShelfCat',{value:idle.snapshot});
  return idle;
}
