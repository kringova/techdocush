// Scale the clues and every cell together; fitting must never hide the last row.
export function fitNonogram({size,clueWidth,clueHeight,width,height,cell=32}){
 const naturalWidth=clueWidth+size*cell,naturalHeight=clueHeight+size*cell;
 const scale=Math.min(1,Math.max(0,width-2)/naturalWidth,Math.max(0,height-2)/naturalHeight);
 return {width:naturalWidth*scale,height:naturalHeight*scale,clueWidth:clueWidth*scale,clueHeight:clueHeight*scale,scale,cell:cell*scale};
}
