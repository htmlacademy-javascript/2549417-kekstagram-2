/*
  #############################################################
  ##########         ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ         ##########
  #############################################################
*/

const isEscapeKey = (evt) => evt.key === 'Escape'; // определение нажатой кнопки Esc

// очищает комментарии
const clearComments = (node) => {
  while (node.firstChild) { // если у ноды есть ребенок
    node.removeChild(node.firstChild); // мы его удаляем
  }
};

// Удаляем все элементы с указанным параметром
const clearNodes = (node) => {
  const removed = document.querySelectorAll(node); // находим все указанные элементы
  removed.forEach((remove) => { // промегаемся по каждому из них
    remove.remove(); // удаляем
  });
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

/*
  #############################################################
  ##########                 ЭКСПОРТ                 ##########
  #############################################################
*/

export { isEscapeKey, clearComments, clearNodes, debounce, throttle };
