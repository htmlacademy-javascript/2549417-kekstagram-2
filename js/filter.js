import { arrayPhotoData, viewMiniatures} from './miniatures';
import { clearNodes, throttle } from './utils.js';
import { TIMEOUT_REDRAW } from './settings.js';

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const filter = document.querySelector('.img-filters--inactive');

/*
  #################################################################################
  ##########                   ФИЛЬТРАЦИЯ ИЗОБРАЖЕНИЙ                    ##########
  #################################################################################
*/

// Обработчик смены фильтра
const applyFilter = (filterType) => {
  let filteredImages = [...arrayPhotoData]; // создаем изменяемый массив

  // функция для активации кнопки фильтра
  const activateButton = (btnActive, btnRandom, btnDiscussed) => {
    btnActive.classList.add('img-filters__button--active'); // добавляем класс активному фильтру
    btnRandom.classList.remove('img-filters__button--active'); // удаляем класс фильтра
    btnDiscussed.classList.remove('img-filters__button--active'); // удаляем класс фильтра

    btnActive.disabled = true; // блокируем кнопку фильтра
    btnRandom.disabled = false; // разблокировываем кнопку фильтра
    btnDiscussed.disabled = false; // разблокировываем кнопку фильтра
  };

  switch (filterType) { // выбираем фильтр
    case 'default': // фильт "По умолчанию"
      activateButton(defaultFilter, randomFilter, discussedFilter);
      clearNodes('.picture'); // очищаем содержимое страницы
      break; // выходим
    case 'random': // фильтр "Случайные"
      filteredImages.sort(() => Math.random() - 0.5); // случайный порядок
      filteredImages = filteredImages.slice(0, 10); // оставляем только 10 случайных изображений
      activateButton(randomFilter, defaultFilter, discussedFilter);
      clearNodes('.picture'); // очищаем содержимое страницы
      break; // выходим
    case 'discussed':
      filteredImages.sort((a, b) => b.comments.length - a.comments.length); // сортируем по количеству комментариев
      activateButton(discussedFilter, defaultFilter, randomFilter);
      clearNodes('.picture'); // очищаем содержимое страницы
      break; // выходим
  }

  setTimeout(() => { // таймер перерисовки изображений
    viewMiniatures(filteredImages); // перерисовка изображений
  }, TIMEOUT_REDRAW); // интервал перерисовки

};

// Инициализация фильтров
const setupFilters = () => {
  filter.classList.remove('img-filters--inactive'); // показываем блок фильтров
  defaultFilter.disabled = true; // деактивируем кнопку

  defaultFilter.addEventListener('click', throttle(() => applyFilter('default'), TIMEOUT_REDRAW)); // вешает обработчик фильтра "По умолчанию"
  randomFilter.addEventListener('click', throttle(() => applyFilter('random'), TIMEOUT_REDRAW)); // вешает обработчик фильтра "Случайные"
  discussedFilter.addEventListener('click', throttle(() => applyFilter('discussed'), TIMEOUT_REDRAW)); // вешает обработчик фильтра "Ожидаемые
};

/*
  #############################################################
  ##########                 ЭКСПОРТ                 ##########
  #############################################################
*/

export { setupFilters };
