/*
  ##############################################################
  ##########           ЗАГРУЗКА ИЗОБРАЖЕНИЯ           ##########
  ##############################################################
*/

const COMMENTS_PER_LOAD = 5; // количество комментариев за один запрос
const TIMEOUT_CLOSE_MESSAGE = 5000; // таймаут закрытия сообщения об ошибки (мс)

/*
  ##############################################################
  ##########        НАСТРОЙКИ ФОРМЫ ИЗОБРАЖЕНИЯ       ##########
  ##############################################################
*/

// Настройки масштабирования изображения
const MIN_CURRENT_SCALE = 0.25; // минимальное значение масштаба изображения
const MAX_CURRENT_SCALE = 1.0; // максимальное значение масштаба изображения
const SCALE_STEP = 0.25; // шаг масштабирования изображения

// Настройки для наложения эффектов изображения
const EFFECT_SETTINGS = {
  NONE: null, // эффект "Оригинальный"
  CHROME: { min: 0, max: 1, step: 0.1, start: 0, filterType: 'grayscale' }, // эффект "Хром"
  SEPIA: { min: 0, max: 1, step: 0.1, start: 0, filterType: 'sepia' }, // эффект "Сепия"
  MARVIN: { min: 0, max: 1, step: 0.1, start: 0, filterType: 'invert' }, // эффект "Марвин"
  PHOBOS: { min: 0, max: 3, step: 0.1, start: 0, filterType: 'blur' }, // эффект "Фобос"
  HEAT: { min: 1, max: 3, step: 0.1, start: 1, filterType: 'brightness' }, // эффект "Зной"
};

// Наятройка полей хэштега и описания изображения
const MAX_LENGTH_HASHTAG = 20; // максимальная длина хэштега
const MAX_COUNT_HASHTAG = 5; // максимальное количесвто хэштегов
const MAX_LENGTH_DESCRIPTION = 140; // максимальная длина описания

/*
  ##############################################################
  ##########              РАБОТА С СЕТЬЮ              ##########
  ##############################################################
*/

const URL_UPLOAD = 'https://31.javascript.htmlacademy.pro/kekstagram'; // загружаем данные на сайт
const URL_DOWNLOAD = 'https://31.javascript.htmlacademy.pro/kekstagram/data'; // выгружаем данные с сайта
const TIMEOUT_REDRAW = 500; // задержка перерисовки изображений (мс)

/*
  #############################################################
  ##########                 ЭКСПОРТ                 ##########
  #############################################################
*/

export {
  COMMENTS_PER_LOAD,
  TIMEOUT_CLOSE_MESSAGE,
  MIN_CURRENT_SCALE,
  MAX_CURRENT_SCALE,
  SCALE_STEP,
  EFFECT_SETTINGS,
  MAX_LENGTH_HASHTAG,
  MAX_COUNT_HASHTAG,
  MAX_LENGTH_DESCRIPTION,
  URL_UPLOAD,
  URL_DOWNLOAD,
  TIMEOUT_REDRAW
};
