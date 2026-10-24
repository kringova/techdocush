// The real board and onboarding exercise use the same gesture recognition.
export function createDoubleTap(){
 let last=null;
 return {
  reset(){last=null;},
  tap(cell,time,detail=1){const twice=detail!==0&&last?.cell===cell&&time-last.time<=450;last=twice?null:{cell,time};return twice;}
 };
}
