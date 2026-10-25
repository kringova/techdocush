import {createDoubleTap} from '../engine/double-tap.js';

export function mountOnboarding({game,onOpen=()=>{},onClose=()=>{},track=()=>{}}){
 const key=`kletochki-yandex-${game}-onboarding-v1`,sudoku=game==='sudoku';
 const steps=sudoku?[
  ['Твоя сложность — с первого хода','Заполни строки, столбцы и блоки 3 × 3 цифрами 1–9 без повторов. Над полем можно сразу выбрать любую сложность, включая «Эксперт». Кнопка с номером уровня открывает все 130 задач. Проходить базовые по порядку не нужно.'],
  ['Одна пометка? Двойной тап','«Пометки» включают маленькие цифры: выбирай клетку и добавляй или убирай кандидатов. Если осталась одна допустимая пометка, дважды коснись клетки — или сделай двойной клик мышью. Число впишется; ход можно отменить. Когда во всех оставшихся пустых клетках по одной согласованной пометке, появится «Заполнить всё»: кнопка завершит поле с анимацией. Весь такой ход отменяется одним нажатием. Потренируйся ниже.'],
  ['Помощь, которая объясняет','«Все кандидаты» за просмотр рекламы открывают автоматические пометки для текущего уровня. Они обновляются после ввода чисел; повторный пересчёт бесплатный. Ручная правка выключает автообновление. Другой просмотр даёт 3 подсказки: сначала направление, затем объяснение, без подстановки цифры. Повторное чтение того же разбора бесплатно. Баланс сохраняется между уровнями.'],
  ['Три ошибки разрешены','Верные числа тёмные, неверные — красные. Первые три неверных ввода разрешены, четвёртый приостанавливает партию. Выбирай: реклама сохраняет поле и даёт ещё три ошибки; «Завершить партию» заканчивает попытку. Выбор клетки, пометки и стирание ошибки не расходуют. Отмена и перезагрузка потраченные попытки не возвращают.'],
  ['Можно остановиться и вернуться','«Отмена» возвращает последний ход, ластик стирает запись. На компьютере: 1–9 — число, N — пометки, стрелки — выбор клетки, Backspace — стереть, Ctrl/Cmd+Z — отмена. Поле и пройденные уровни сохраняются в этом браузере. Обучение всегда доступно по кнопке «Как играть» сверху.']
 ]:game==='wordsearch'?[
  ['Слова спрятаны в поле','В каждой теме спрятано несколько слов. Сначала видны тема и количество: попробуй отыскать слова самостоятельно. Найденное слово появится в списке и выделится на поле. В небольших полях слова идут по горизонтали и вертикали, в больших добавляются диагонали и обратные направления.'],
  ['Провести или два касания','Проведи пальцем или мышью от первой буквы слова к последней по прямой линии. Если так неудобно, включи «Два касания» и выбери первую и последнюю букву. На клавиатуре используй стрелки, Enter или пробел для начала и конца; Escape снимает выделение.'],
  ['Когда не знаешь, что искать','Подсказка раскрывает одно из ещё не найденных слов. Оно остаётся в списке с пометкой «искать», пока ты не отыщешь его на поле. В Яндекс-версии просмотр рекламы добавляет три подсказки, баланс сохраняется между уровнями. У раскрытого слова кнопка «Буква» подсвечивает все такие буквы на поле. Новая буква текущего уровня расходует одну подсказку, повторное включение бесплатно. Подсветку можно убрать. Повторное чтение раскрытого слова бесплатно.'],
  ['Любая тема доступна сразу','Всего 30 уровней с полями от 6 × 6 до 12 × 12. Размер и тему можно выбрать сразу. Найденные и раскрытые слова сохраняются в этом браузере. Отмена возвращает последнюю находку и сохраняет уже раскрытые подсказки. После победы реклама вызывается при переходе к следующей теме. Обучение можно открыть снова кнопкой «Как играть».']
 ]:[
  ['Числа превращаются в рисунок','Числа слева и сверху — длины закрашенных групп в строке или столбце. Например, «3 1» означает три клетки подряд, хотя бы одну пустую и ещё одну закрашенную. Порядок групп важен.'],
  ['Закраска, крестики и штрихи','Клик закрашивает, правая кнопка мыши ставит крестик. На телефоне выбери «Закрасить» или «Крестик» и касайся клеток или веди пальцем. Повторное действие снимает отметку. Когда строка или столбец закрашены верно, остальные клетки сами получают крестики. «Отмена» возвращает весь штрих вместе с ними. На клавиатуре: Enter/пробел — закраска, X — крестик.'],
  ['Любой размер уже открыт','Только пять рисунков 5 × 5, дальше 10 × 10, 15 × 15 и 20 × 20. Выбирай размер над полем и любой уровень по кнопке с номером. Всё поле с числами видно сразу, прокручивать его не нужно. + увеличивает клетки для точного ввода; «Всё поле» возвращает полный обзор. В увеличенном виде «Двигать» перемещает поле без закраски, числа у края остаются на виду.'],
  ['В своём темпе','Красные числа у края означают, что отметки уже не сходятся с группами. Их можно исправить или отменить. Поле и пройденные уровни сохраняются в этом браузере. Реклама появляется в паузе при переходе к следующему собранному рисунку. Обучение доступно по кнопке «Как играть» сверху.']
 ];
 const dialog=document.createElement('dialog');dialog.id='onboarding-dialog';dialog.className='onboarding-dialog';
 dialog.innerHTML='<div class="dialog-heading"><span class="eyebrow" id="tutorial-progress"></span><button class="text-button" id="tutorial-skip">Пропустить</button></div><h2 id="tutorial-title"></h2><p id="tutorial-copy"></p><div id="tutorial-practice" hidden><button id="tutorial-cell" aria-label="Тренировка: единственная пометка 7"><small>7</small></button><span id="tutorial-feedback" role="status">Дважды коснись клетки</span><button id="tutorial-reset" class="text-button" hidden>Попробовать ещё</button></div><div class="tutorial-actions"><button id="tutorial-back" class="secondary-button">Назад</button><button id="tutorial-next" class="primary-button">Дальше</button></div>';
 dialog.setAttribute('aria-labelledby','tutorial-title');document.body.append(dialog);
 const $=s=>dialog.querySelector(s),gesture=createDoubleTap();let step=0,outcome='skip';
 function render(){
  gesture.reset();$('#tutorial-progress').textContent=`ЗНАКОМСТВО · ${step+1} / ${steps.length}`;$('#tutorial-title').textContent=steps[step][0];$('#tutorial-copy').textContent=steps[step][1];$('#tutorial-practice').hidden=!(sudoku&&step===1);$('#tutorial-back').disabled=step===0;$('#tutorial-next').textContent=step===steps.length-1?'Начать играть':'Дальше';resetDemo();
 }
 function resetDemo(){gesture.reset();$('#tutorial-cell').innerHTML='<small>7</small>';$('#tutorial-cell').dataset.filled='false';$('#tutorial-feedback').textContent='Дважды коснись клетки';$('#tutorial-reset').hidden=true;}
 function open(){if(dialog.open)return;outcome='skip';step=0;track('gameTutorialStart',{game});render();onOpen();dialog.showModal();}
 function close(){dialog.close();}
 $('#tutorial-next').onclick=()=>{if(step===steps.length-1){outcome='complete';close();}else{step++;track('gameTutorialStep',{game,step:step+1});render();}};
 $('#tutorial-back').onclick=()=>{if(step){step--;render();}};$('#tutorial-skip').onclick=close;$('#tutorial-reset').onclick=resetDemo;
 $('#tutorial-cell').onclick=e=>{if(gesture.tap(0,performance.now(),e.detail)&&$('#tutorial-cell').dataset.filled!=='true'){track('gameTutorialDoubleTap',{game});$('#tutorial-cell').textContent='7';$('#tutorial-cell').dataset.filled='true';$('#tutorial-feedback').textContent='Получилось! Так же работает настоящее поле.';$('#tutorial-reset').hidden=false;}};
 dialog.addEventListener('close',()=>{track(outcome==='complete'?'gameTutorialComplete':'gameTutorialSkip',{game,step:step+1});try{localStorage.setItem(key,'seen');}catch{}onClose();});
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();});
 let seen=false;try{seen=localStorage.getItem(key)==='seen';}catch{}
 return {open,firstRun:()=>{if(!seen)open();}};
}
