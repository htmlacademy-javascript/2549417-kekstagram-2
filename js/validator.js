import {
  MAX_LENGTH_HASHTAG,
  MAX_COUNT_HASHTAG,
  MAX_LENGTH_DESCRIPTION,
} from './settings.js';

let messageError = ''; // ошибка при валидации хэштега

/*
  #################################################################################
  ##########                 УПРАВЛЕНИЕ ВАЛИДАЦИЕЙ ФОРМЫ                 ##########
  #################################################################################
*/

// Проверка хэштегов
const getValidateHashtags = (value) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i; // шаблон хэштега
  const hashtagsString = value.trim(); // чистим строку от пробелов
  const hashtags = hashtagsString.split(/\s+/).filter(Boolean); // разбиваем на отдельные хэштеги, пропускаем пустые

  for (const tag of hashtags) {
    // перебираем массив хэштегов
    if (tag.length > MAX_LENGTH_HASHTAG) {
      messageError = 'maxLengthTag';
      return false;
    }

    if (!hashtagRegex.test(tag)) {
      // проверяем каждый хэштег на соответствие шаблону
      messageError = 'tag'; // записываем ошибку, найден некорректный хэштег
      return false; // валидация не пройдена
    }
  }

  // Формируем массив уникальных хэштегов
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase())); // проверяем уникальность хэштегов приводя их к нижнему регистру

  if (uniqueHashtags.size !== hashtags.length) {
    // если массив уникальных хэштегов неравен массиву хэштегов
    messageError = 'doubleTag'; // записываем ошибку, встречаются повторяющиеся хэштеги
    return false; // валидация не пройдена
  }

  if (hashtags.length > MAX_COUNT_HASHTAG) {
    // если массив хэштегов содержит более 5 хэштегов
    messageError = 'maxCountTag'; // записываем ошибку, больше 5 хэштегов недопустимо
    return false; // валидация не пройдена
  }

  return true; // валидация пройдена успешно
};

// Проверка описания
const getValidateDescription = (value) =>
  value.length <= MAX_LENGTH_DESCRIPTION; // длина комментария должна быть не более 140 исмволов

// Интерприторатор ошибки валидации
const getInterpritationError = () => {
  switch (
    messageError // выбираем сообщение об ошибки в зависимости от возвращенной ошибки при калидации поля хэштег
  ) {
    case 'tag':
      return 'Хэштег должен начинаться с "#" и не содержать спецсимволы. Формат: #Hashtag'; //  Формат: #hashtag. Не менее 2 и не более 20 символов.
    case 'doubleTag':
      return 'Встречаются повторяющиеся хэштеги!';
    case 'maxCountTag':
      return `Не более ${MAX_COUNT_HASHTAG} хэштегов!`;
    case 'maxLengthTag':
      return `Хэштег должен быть не ${MAX_LENGTH_HASHTAG} символов!`;
  }
};

export { getValidateHashtags, getValidateDescription, getInterpritationError };
