import { getDownloadToServer } from './network.js';
import { TIMEOUT_CLOSE_MESSAGE } from './settings.js';
import { setupFilters } from './filter.js';

const body = document.body;

const fragmentPictureTemplate = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const messageDataError = document.querySelector('#data-error').content.querySelector('.data-error');

/*
  #################################################################################
  ##########                 ЗАГРУЗКА ДАННЫХ С СЕРВЕРА                   ##########
  #################################################################################
*/

// Ошибка получения данных
const addMessageErrorData = () => {
  body.append(messageDataError); // в случае ошибки добавляем сообщение перед закрытием body
  setTimeout(() => { // запускаем таймер
    messageDataError.remove(); // удаляем сообщение
  }, TIMEOUT_CLOSE_MESSAGE); // через указанный промежутов времени
};

const arrayPhotoData = await getDownloadToServer(addMessageErrorData); // загружаем данные с сервера

/*
  #################################################################################
  ##########                     ОТРИСОВКА МИНИАТЮР                      ##########
  #################################################################################
*/

const viewMiniatures = (data) => {
  data.forEach(({ id, url, description, comments, likes }) => { // перебираем массив загруженных изображений
    const clonePictureTemplate = pictureTemplate.cloneNode(true); // клонируем шаблон для заполнения
    clonePictureTemplate.querySelector('.picture__img').src = url; // указываем путь до изображения
    clonePictureTemplate.querySelector('.picture__img').alt = description; // добавляем описание
    clonePictureTemplate.querySelector('.picture__comments').textContent = comments.length; //указываем кол-во комментариев
    clonePictureTemplate.querySelector('.picture__likes').textContent = likes; // указываем кол-во лайков
    clonePictureTemplate.dataset.id = id; // указываем ID
    fragmentPictureTemplate.append(clonePictureTemplate); // добавляем элемент во фрагмент
  });

  pictures.append(fragmentPictureTemplate); // вставляем фрагмент в контейнер изображений
  return pictures; // возвращаем контейнер изображений
};

if (arrayPhotoData) { // если массив с фотографиями не пустой
  viewMiniatures(arrayPhotoData); // выполняем их отрисовку
  setupFilters();
}

/*
  #################################################################################
  ##########                           ЭКСПОРТ                           ##########
  #################################################################################
*/

export { arrayPhotoData, viewMiniatures };
