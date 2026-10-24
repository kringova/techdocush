const host=document.querySelector('[data-music]');
if(host){
  const key='corio-ambient-v1';let volume=.24,wanted=false,started=false,token=0,gamePaused=false;
  try{const stored=JSON.parse(localStorage.getItem(key));if(Number.isFinite(stored?.volume)&&stored.volume>=0&&stored.volume<=.6)volume=stored.volume;wanted=stored?.enabled===true;}catch{}
  const audio=document.createElement('audio');audio.id='ambient-audio';audio.src=new URL('./assets/cozy-room-v1.mp3',import.meta.url).href;audio.preload='none';audio.loop=true;audio.volume=volume;document.body.append(audio);
  host.className='ambient-controls';
  const button=document.createElement('button');button.className='ambient-play';button.type='button';
  const title=document.createElement('span');title.textContent='♫ Музыка';const status=document.createElement('small');button.append(title,status);
  const label=document.createElement('label');label.textContent='Громкость';const slider=document.createElement('input');slider.type='range';slider.min='0';slider.max='60';slider.step='1';slider.value=Math.round(volume*100);slider.setAttribute('aria-label','Громкость фоновой музыки');label.append(slider);host.append(button,label);
  const save=()=>{try{localStorage.setItem(key,JSON.stringify({volume,enabled:wanted}));}catch{}};
  function update(){const playing=!audio.paused;button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',playing?'Остановить фоновую музыку':'Включить фоновую музыку');status.textContent=playing?'играет':wanted&&started?'пауза':'выкл';}
  function fade(target,milliseconds,done){const turn=++token,start=performance.now(),from=audio.volume;function tick(now){if(turn!==token)return;const amount=Math.max(0,Math.min(1,(now-start)/milliseconds));audio.volume=Math.max(0,Math.min(1,from+(target-from)*amount));if(amount<1)requestAnimationFrame(tick);else done?.();}requestAnimationFrame(tick);}
  async function play(){
    if(!wanted||document.hidden||gamePaused)return;
    const turn=++token;started=true;audio.volume=0;
    try{await audio.play();if(turn!==token)return;if(!wanted||document.hidden||gamePaused){audio.pause();return;}fade(volume,850);update();}catch{update();}
  }
  function suspend(){token++;audio.pause();audio.volume=volume;update();}
  button.addEventListener('click',()=>{if(!audio.paused){wanted=false;save();fade(0,400,()=>{audio.pause();audio.volume=volume;update();});}else{wanted=true;save();play();}});
  slider.addEventListener('input',()=>{volume=+slider.value/100;token++;audio.volume=volume;save();});
  audio.addEventListener('play',update);audio.addEventListener('pause',update);audio.addEventListener('error',()=>{status.textContent='не загрузилась';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();else if(started&&wanted)play();});
  window.addEventListener('blur',suspend);window.addEventListener('focus',()=>{if(started&&wanted)play();});
  window.addEventListener('corio:pause',()=>{gamePaused=true;suspend();});window.addEventListener('corio:resume',()=>{gamePaused=false;if(started&&wanted)play();});
  const restoreAfterAction=event=>{if(wanted&&!started&&!event.target.closest('.ambient-play'))play();};
  document.addEventListener('pointerdown',restoreAfterAction);document.addEventListener('keydown',restoreAfterAction);
  Object.defineProperty(window,'__corioMusic',{value:()=>({wanted,started,playing:!audio.paused,volume,mediaVolume:audio.volume,duration:audio.duration,loop:audio.loop,gamePaused})});
  update();
}
