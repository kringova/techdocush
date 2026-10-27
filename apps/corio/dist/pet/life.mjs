// One short blink at a time; nothing polls or runs a JavaScript animation loop.
export function createPetLife({scene,blocked}){
 let timer=null,end=null,epoch=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function stop(){clearTimeout(timer);clearTimeout(end);timer=end=null;epoch++;scene.classList.remove('pet-blinking','pet-greeting');scene.classList.add('pet-still');}
 function schedule(){if(timer||blocked()||document.hidden||reduced.matches)return;const token=epoch;timer=setTimeout(()=>{timer=null;if(token!==epoch||blocked()||document.hidden)return;scene.classList.add('pet-blinking');end=setTimeout(()=>{scene.classList.remove('pet-blinking');end=null;schedule();},220);},8000+Math.random()*4000);}
 function sync(){if(blocked()||document.hidden||reduced.matches)stop();else schedule();scene.classList.toggle('pet-still',blocked()||document.hidden||reduced.matches);}
 function greet(){if(blocked())return;scene.classList.remove('pet-blinking');scene.classList.add('pet-greeting');clearTimeout(end);end=setTimeout(()=>{scene.classList.remove('pet-greeting');end=null;sync();},650);}
 document.addEventListener('visibilitychange',sync);window.addEventListener('blur',stop);window.addEventListener('focus',sync);reduced.addEventListener('change',sync);
 return{sync,greet,stop};
}
