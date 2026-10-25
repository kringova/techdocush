import {createCommerce} from './commerce.mjs?v=0.14.0';
import {SERIES,PROFILE} from './series.mjs?v=0.14.0';

export function createModeController({gameId,host,getMoves,isWon,canUndo=()=>false,onUndo,onRestart,onBlock=()=>{},getSDK=async()=>null}){
  const productId=SERIES.find(g=>g.id===gameId).product,prototype=PROFILE==='web-prototype';
  let mode=prototype?'calm':'challenge',limit=10,bonus=0,attempt=0,busy=false;
  try{const saved=localStorage.getItem('corio-mode-'+gameId);if(saved==='challenge'||(saved==='calm'&&prototype))mode=saved;}catch{}
  const commerce=createCommerce({profile:PROFILE,productId,getSDK,onPause:()=>window.dispatchEvent(new Event('corio:platform-pause')),onResume:()=>window.dispatchEvent(new Event('corio:platform-resume'))});
  const tabs=document.createElement('div');tabs.className='mode-tabs';tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Режим игры');
  const calm=document.createElement('button'),challenge=document.createElement('button'),counter=document.createElement('span');
  calm.textContent='Без ограничений';calm.dataset.mode='calm';challenge.textContent='С лимитом ходов';challenge.dataset.mode='challenge';counter.className='mode-counter';counter.setAttribute('role','status');counter.setAttribute('aria-live','polite');
  tabs.append(calm,challenge,counter);host.className='mode-controls';host.append(tabs);
  const note=document.createElement('small');note.className='mode-note';note.textContent=prototype?'В прототипе оба режима открыты. Оплаты нет.':'Без ограничений — разовая покупка для этой игры.';host.append(note);
  const dialog=document.createElement('dialog');dialog.className='mode-dialog';dialog.id='mode-dialog';document.body.append(dialog);
  const remaining=()=>mode==='calm'?null:Math.max(0,limit+bonus-getMoves());
  const save=()=>{try{localStorage.setItem('corio-mode-'+gameId,mode);}catch{}};
  function update(){calm.setAttribute('aria-pressed',String(mode==='calm'));challenge.setAttribute('aria-pressed',String(mode==='challenge'));counter.textContent=mode==='calm'?'Ходов сколько угодно':`Осталось ходов: ${remaining()}`;}
  function close(){if(dialog.open)dialog.close();}
  async function choose(next){
    if(busy)return;
    if(next==='calm'&&!commerce.status().unlimited){await buyDialog();return;}
    mode=next;save();close();changed();
  }
  calm.addEventListener('click',()=>choose('calm'));challenge.addEventListener('click',()=>choose('challenge'));
  function button(text,action,kind='secondary'){const b=document.createElement('button');b.textContent=text;b.className=kind;b.addEventListener('click',action);return b;}
  function body(title,copy){dialog.replaceChildren();const h=document.createElement('h2');h.textContent=title;const p=document.createElement('p');p.textContent=copy;dialog.append(h,p);return p;}
  function showLimit(){
    if(dialog.open||busy||isWon())return;onBlock();
    const message=body('Ходы закончились','Расстановка осталась на месте. Можно вернуть ход, начать заново или добавить ещё пять.');
    const reward=button(prototype?'Добавить 5 ходов · тест':'Смотреть рекламу: +5 ходов',async()=>{
      if(busy)return;busy=true;reward.disabled=true;const currentAttempt=attempt;
      try{const result=await commerce.reward();if(result.rewarded&&currentAttempt===attempt){bonus+=5;close();update();}else message.textContent='Ходы не добавлены. Можно попробовать снова или вернуть ход.';}
      catch{message.textContent='Не удалось добавить ходы. Расстановка сохранена на экране.';}
      finally{busy=false;reward.disabled=false;}
    },'primary');
    const undo=button('↶ Вернуть ход',()=>{close();onUndo();changed();});undo.disabled=!canUndo();
    dialog.append(reward,undo,button('Начать заново',()=>{close();onRestart();}),button(prototype?'Без ограничений · тест':'Открыть режим без ограничений',()=>choose('calm')));
    if(prototype){const small=document.createElement('small');small.textContent='Тестовый показ механики: видео и оплаты здесь нет.';dialog.append(small);}
    dialog.showModal();
  }
  async function buyDialog(){
    if(prototype){choose('calm');return;}onBlock();body('Без ограничений','Проверяем доступ к постоянной покупке…');if(!dialog.open)dialog.showModal();busy=true;
    try{
      const state=await commerce.init();if(state.purchased){busy=false;choose('calm');return;}
      if(!state.product)throw Error('No product');
      body('Без ограничений','Разовая покупка открывает спокойный режим навсегда в этой игре.');
      const price=document.createElement('p');price.className='mode-price';price.append(document.createTextNode(state.product.priceValue+' '));
      if(typeof state.product.getPriceCurrencyImage==='function'){const image=document.createElement('img');image.src=state.product.getPriceCurrencyImage('small');image.alt=state.product.priceCurrencyCode;price.append(image);}else price.append(document.createTextNode(state.product.priceCurrencyCode));dialog.append(price);
      dialog.append(button('Купить',async()=>{if(busy)return;busy=true;try{const result=await commerce.purchase();if(result.purchased){busy=false;choose('calm');}}catch{body('Покупка не подтверждена','Доступ пока не изменился. Можно восстановить покупку или вернуться к игре.');dialog.append(button('Проверить покупку снова',async()=>{try{await commerce.init();if(commerce.status().purchased)choose('calm');}catch{}}));dialog.append(button('Вернуться',close));}finally{busy=false;}},'primary'),button('Вернуться',close));
    }catch{body('Покупки пока недоступны','Продолжай игру с лимитом. Проверить доступ можно позже.');dialog.append(button('Вернуться',close));}
    finally{busy=false;}
  }
  function changed(){update();if(mode==='challenge'&&remaining()===0&&!isWon())showLimit();}
  const controller={
    newAttempt(solutionMoves){attempt++;limit=Math.max(4,Math.ceil(solutionMoves*1.35)+2);bonus=0;close();update();},
    guard(){if(dialog.open)return false;if(mode==='challenge'&&remaining()===0){showLimit();return false;}return true;},
    changed,isModalOpen:()=>dialog.open,
    state:()=>({gameId,mode,limit,bonus,remaining:remaining(),moves:getMoves(),attempt,prototype,purchased:commerce.status().purchased,productId,busy}),
    refreshAccess:async()=>{await commerce.init();update();}
  };
  update();return controller;
}
