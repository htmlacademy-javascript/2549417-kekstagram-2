// генерируем случайное число из диапазона
const generationUniqueRandomIndex = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// выбираеи случайным образом сообщение
const getRandomMessage = (array) => array[ generationUniqueRandomIndex(0, array.length - 1) ];

// выбираем случайным образом имя автора
const getRandomName = (array) => array[ generationUniqueRandomIndex(0, array.length - 1) ];

export { generationUniqueRandomIndex, getRandomMessage, getRandomName };
