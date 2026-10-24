// Original pixel drawings. Shapes are authored here, not resized small puzzles.
function art(n,name,draw){
 const grid=Array.from({length:n},()=>Array(n).fill(0));
 const dot=(x,y,v=1)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&y>=0&&x<n&&y<n)grid[y][x]=v;};
 const rect=(x,y,w,h,v=1)=>{for(let r=y;r<y+h;r++)for(let c=x;c<x+w;c++)dot(c,r,v);};
 const line=(x,y,x2,y2,v=1)=>{const steps=Math.max(Math.abs(x2-x),Math.abs(y2-y));for(let i=0;i<=steps;i++)dot(x+(x2-x)*i/(steps||1),y+(y2-y)*i/(steps||1),v);};
 const ellipse=(cx,cy,rx,ry,v=1)=>{for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(((x-cx)/rx)**2+((y-cy)/ry)**2<=1)dot(x,y,v);};
 const poly=(points,v=1)=>{
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){let inside=false;for(let a=0,b=points.length-1;a<points.length;b=a++){
   const [ax,ay]=points[a],[bx,by]=points[b];if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)inside=!inside;
  }if(inside)dot(x,y,v);}
  points.forEach((p,i)=>line(...p,...points[(i+1)%points.length],v));
 };
 draw({dot,rect,line,ellipse,poly});return [name,grid.map(r=>r.map(v=>v?'#':'.').join(''))];
}
export const LARGE_ART=[
 art(15,'Сова',({ellipse,poly,rect,dot,line})=>{ellipse(7,8,6,6);poly([[2,5],[2,0],[6,5]]);poly([[8,5],[12,0],[12,5]]);ellipse(4,6,2,2,0);ellipse(10,6,2,2,0);dot(4,6);dot(10,6);poly([[6,8],[8,8],[7,10]],0);line(3,10,5,12,0);line(11,10,9,12,0);rect(3,14,3,1);rect(9,14,3,1);}),
 art(15,'Фотоаппарат',({rect,ellipse})=>{rect(1,4,13,9);rect(3,2,4,2);rect(10,3,3,1);ellipse(7,8,4,4,0);ellipse(7,8,3,3);ellipse(7,8,1,1,0);rect(11,5,2,1,0);}),
 art(15,'Кит',({ellipse,poly,dot,line})=>{ellipse(6,9,5,4);poly([[9,8],[13,7],[14,3],[11,4]]);poly([[11,6],[10,3],[8,3],[9,7]]);dot(3,8,0);line(1,10,4,11,0);line(5,4,5,1);line(5,2,3,0);line(5,2,7,0);dot(5,0);}),
 art(15,'Кактус в горшке',({rect,ellipse,line})=>{ellipse(7,4,2,3);rect(5,4,5,7);rect(2,4,2,5);rect(2,7,4,2);rect(11,3,2,5);rect(9,6,4,2);rect(3,10,9,2);rect(4,12,7,2);line(7,4,7,8,0);}),
 art(15,'Лисёнок',({ellipse,poly,dot})=>{ellipse(7,8,6,5);poly([[1,6],[1,0],[6,4]]);poly([[8,4],[13,0],[13,6]]);poly([[2,7],[6,10],[5,12]],0);poly([[12,7],[8,10],[9,12]],0);dot(4,6,0);dot(10,6,0);poly([[6,10],[8,10],[7,12]],0);}),
 art(15,'Чайник',({ellipse,rect,poly})=>{ellipse(11,8,3,4);ellipse(11,8,1,2,0);ellipse(6,9,5,4);poly([[2,8],[0,5],[0,10],[3,11]]);rect(3,4,7,1);rect(5,2,3,2);ellipse(6,9,2,2,0);}),
 art(15,'Лагерь в горах',({poly,line,rect})=>{poly([[0,9],[4,1],[9,9]]);poly([[6,9],[10,0],[14,9]]);poly([[3,4],[4,2],[5,4]],0);poly([[9,3],[10,1],[11,3]],0);poly([[3,13],[7,7],[11,13]]);poly([[6,13],[7,10],[8,13]],0);line(0,14,14,14);rect(12,10,1,3);poly([[10,11],[12,8],[14,11]]);rect(9,0,1,1);rect(3,1,1,1);}),
 art(15,'Наушники',({ellipse,rect})=>{ellipse(7,7,7,7);ellipse(7,7,5,5,0);rect(0,8,15,7,0);rect(0,6,4,7);rect(11,6,4,7);rect(1,8,2,3,0);rect(12,8,2,3,0);}),
 art(15,'Якорь',({ellipse,rect,line,poly})=>{ellipse(7,2,2,2);rect(7,2,1,1,0);rect(6,4,3,9);rect(3,5,9,2);line(1,8,3,11);line(3,11,7,14);line(7,14,11,11);line(11,11,13,8);poly([[0,8],[4,8],[1,11]]);poly([[10,8],[14,8],[13,11]]);rect(3,11,1,1,0);rect(10,11,1,1);}),
 art(15,'Робот',({rect,line})=>{rect(2,3,11,8);rect(7,0,1,3);rect(6,0,3,1);rect(4,5,2,2,0);rect(9,5,2,2,0);rect(5,9,5,1,0);rect(0,6,2,5);rect(13,6,2,5);rect(4,11,2,3);rect(9,11,2,3);line(2,14,5,14);line(9,14,12,14);}),
 art(20,'Крепость',({rect,poly,ellipse})=>{rect(2,4,4,14);rect(14,4,4,14);rect(6,9,8,9);for(const x of [2,4,14,16])rect(x,2,2,3);poly([[7,8],[10,4],[13,8]]);rect(8,13,4,5,0);ellipse(9.5,13,1.6,2,0);for(const x of [3,15])for(const y of [7,11])rect(x,y,2,2,0);rect(0,18,20,2);}),
 art(20,'Космический корабль',({poly,ellipse,rect,line})=>{poly([[7,5],[10,0],[13,5],[13,14],[7,14]]);ellipse(10,7,2,2,0);poly([[6,10],[2,16],[7,14]]);poly([[14,10],[18,16],[13,14]]);poly([[8,15],[10,19],[12,15]]);line(3,2,3,6);line(1,4,5,4);line(17,1,17,5);line(15,3,19,3);rect(8,11,5,1,0);}),
 art(20,'Букет',({ellipse,line,rect})=>{for(const [cx,cy] of [[5,5],[14,4],[10,9]]){ellipse(cx-2,cy,2,2);ellipse(cx+2,cy,2,2);ellipse(cx,cy-2,2,2);ellipse(cx,cy+2,2,2);ellipse(cx,cy,1,1,0);}line(5,9,9,16);line(14,8,10,16);line(10,12,10,16);rect(5,16,11,2);rect(6,18,9,2);}),
 art(20,'Парусник',({poly,line,rect})=>{line(10,0,10,15);poly([[8,2],[1,12],[8,12]]);poly([[12,4],[18,12],[12,12]]);poly([[2,14],[18,14],[15,17],[5,17]]);rect(6,15,2,1,0);rect(10,15,2,1,0);for(let x=0;x<20;x+=5){line(x,19,x+2,18);line(x+2,18,x+4,19);}}),
 art(20,'Вечерний город',({rect,poly})=>{rect(1,7,5,11);rect(8,3,5,15);rect(15,9,4,9);poly([[0,7],[3,3],[6,7]]);rect(9,1,3,2);for(const [x,ys] of [[2,[9,13]],[9,[5,9,13]],[16,[11,15]]])for(const y of ys)rect(x,y,2,2,0);rect(0,18,20,2);})
];
