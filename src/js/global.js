// ==== Глобальные скрипты ============================================================================================================================================

// === Анимации, данный скрипт лучше всего оставить подключённым. Без него не работают некоторые скрипты ==============================================================

fileInclude.include('./functions/_animation.js');

// ====================================================================================================================================================================


fileInclude.include('./functions/smoothScrollTo.js'); // Плавная прокрутка до элемента. ТРЕБУЕТ _animation.js
fileInclude.include('./functions/scrollDisabling.js'); // Полное отключение прокрутки у элемента.
fileInclude.include('./functions/spoilerCreator.js'); // Спойлеры и аккордионы. ТРЕБУЕТ _animation.js
fileInclude.include('./functions/sendingOnPage.js'); // Проверка и отправка формы без перезагрузки страницы.

// ====================================================================================================================================================================