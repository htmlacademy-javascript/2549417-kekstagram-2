/*
  ###############################################################
  ##########       ГЕНЕРИРОВАНИЕ ТЕСТОВЫХ ДАННЫХ       ##########
  ###############################################################
*/

const MIN_INDEX_AVATAR = 1; // начальный индекс аватара
const MAX_INDEX_AVATAR = 6; // конечный индекс аватара

const MIN_INDEX_LIKE = 15; // минимальное количество лайков
const MAX_INDEX_LIKE = 200; // максимальное количество лайков

const MIN_INDEX_COMMENT = 0; // минимальное количество комментариев
const MAX_INDEX_COMMENT = 30; // максимальное количество комментариев

const COUNT_OBJECTS = 25; // количество формируемых объектов (миниатюр)

/*
  ##############################################################
  ##########           ЗАГРУЗКА ИЗОБРАЖЕНИЯ           ##########
  ##############################################################
*/

const COMMENTS_PER_LOAD = 5; // количество комментариев за один запрос

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
const MAX_LENGTH_HASHTAG = 10; // максимальная длина хэштега
const MAX_COUNT_HASHTAG = 5; // максимальное количесвто хэштегов
const MAX_LENGTH_DESCRIPTION = 140; // максимальная длина описания

/*
  #############################################################
  ##########                 ЭКСПОРТ                 ##########
  #############################################################
*/

export {
  MIN_INDEX_AVATAR,
  MAX_INDEX_AVATAR,
  MIN_INDEX_LIKE,
  MAX_INDEX_LIKE,
  MIN_INDEX_COMMENT,
  MAX_INDEX_COMMENT,
  COUNT_OBJECTS,
  COMMENTS_PER_LOAD,
  MIN_CURRENT_SCALE,
  MAX_CURRENT_SCALE,
  SCALE_STEP,
  EFFECT_SETTINGS,
  MAX_LENGTH_HASHTAG,
  MAX_COUNT_HASHTAG,
  MAX_LENGTH_DESCRIPTION
};
