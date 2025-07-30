import {
  MESSAGES,
  NAMES } from './data.js';

import {
  MIN_INDEX_AVATAR,
  MAX_INDEX_AVATAR,
  MIN_INDEX_LIKE,
  MAX_INDEX_LIKE,
  MIN_INDEX_COMMENT,
  MAX_INDEX_COMMENT,
  COUNT_OBJECTS} from './settings.js';

import {
  generationUniqueRandomIndex,
  getRandomMessage,
  getRandomName,
} from './random.js';

// определение нажатой кнопки Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// очищает комментарии
const clearComments = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};


// формируем комментарий
const createComment = () => {
  let id = 0;

  return () => {
    const comment = {
      id: ++id,
      avatar: `img/avatar-${generationUniqueRandomIndex(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
      message: getRandomMessage(MESSAGES),
      name: getRandomName(NAMES),
    };

    return comment;
  };
};

// формируем описание добавленного изображения
const createPhoto = () => {
  let id = 0;

  return () => {
    const photo = {
      'id': ++id,
      'url': `photos/${id}.jpg`,
      'description': `Описание фотографии № ${id}`,
      'likes': generationUniqueRandomIndex(MIN_INDEX_LIKE, MAX_INDEX_LIKE),
      'comments': Array.from({ length: generationUniqueRandomIndex(MIN_INDEX_COMMENT, MAX_INDEX_COMMENT) }, createComment()),
    };

    return photo;
  };
};

const photos = () => Array.from({ length: COUNT_OBJECTS }, createPhoto());

export { photos, isEscapeKey, clearComments };