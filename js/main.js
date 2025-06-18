const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Егор Вешников',
  'Анастасия Петрова',
  'Максим Есаулов',
  'Василий Аппаратов',
  'Александр Пальцев',
  'Татьяна Концова',
  'Наталья Максимова',
  'Вячеслав Аватаров',
  'Игорь Хороший',
  'Алина Случайнова'
];

const MIN_INDEX_AVATAR = 1;
const MAX_INDEX_AVATAR = 6;

const MIN_INDEX_LIKE = 15;
const MAX_INDEX_LIKE = 200;

const MIN_INDEX_COMMENT = 0;
const MAX_INDEX_COMMENT = 30;

const COUNT_OBJECTS = 25;


const generationUniqueRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min); // генерируем случайное число из диапазона
}

const getRandomMessage = (array) => {
  return array[generationUniqueRandomIndex(0, array.length - 1)]; // выбираеи случайным образом сообщение
}

const getRandomName = (array) => {
  return array[generationUniqueRandomIndex(0, array.length - 1)]; // выбираем случайным образом имя автора
}

// формируем комментарий
const createComment = () => {
  let id = 1;

  return () => {
    const comment = {
      'id': id,
      'avatar': `img/avatar-${generationUniqueRandomIndex(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
      'message': getRandomMessage(MESSAGES),
      'name': getRandomName(NAMES)
    }

    id++;
    return comment
  }
}

// формируем описание добавленного изображения
const createPhoto = () => {
  let id = 1;
  return () => {
    const photo = {
      'id': id,
      'url': `photos/${id}.jpg`,
      'description': `Описание фотографии № ${id}`,
      'likes': generationUniqueRandomIndex(MIN_INDEX_LIKE, MAX_INDEX_LIKE),
      'comments': Array.from({ length: generationUniqueRandomIndex(MIN_INDEX_COMMENT, MAX_INDEX_COMMENT) }, createComment()),
    }

    id++;
    return photo;
  }
}

console.log(Array.from({ length: COUNT_OBJECTS }, createPhoto()));