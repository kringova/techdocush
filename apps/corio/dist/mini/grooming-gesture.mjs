// A care step requires deliberate travel inside one body region; time alone does nothing.
export const GROOM_RUB_DISTANCE=40;
export const GROOM_RUB_TIME=140;
export function beginGroomRub({x,y,time,zone=null}){return{zone,x,y,time,distance:0,progress:0};}
export function advanceGroomRub(previous,point){
 const {x,y,time,zone=null}=point;
 if(![x,y,time].every(Number.isFinite))return{rub:previous,ready:false,progress:0};
 if(zone===null||previous.zone!==zone)return{rub:beginGroomRub(point),ready:false,progress:0};
 const travel=Math.hypot(x-previous.x,y-previous.y);
 if(travel<1.5)return{rub:previous,ready:false,progress:previous.progress||0};
 const rub={...previous,x,y,distance:previous.distance+Math.min(travel,GROOM_RUB_DISTANCE*2)};
 const progress=Math.min(1,rub.distance/GROOM_RUB_DISTANCE,Math.max(0,(time-rub.time)/GROOM_RUB_TIME));
 rub.progress=progress;
 const ready=rub.distance>=GROOM_RUB_DISTANCE&&time-rub.time>=GROOM_RUB_TIME;
 return{rub:ready?beginGroomRub(point):rub,ready,progress:ready?1:progress};
}
