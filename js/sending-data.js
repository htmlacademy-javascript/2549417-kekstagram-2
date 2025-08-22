import { isEscapeKey } from './utils.js';
import { onDocumentKeydown } from './loader.js';

const body = document.body;

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const buttonErrorMessage = errorMessage.querySelector('.error__button');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const buttonSuccessMessage = successMessage.querySelector('.success__button');

const formImage = document.querySelector('.img-upload__form'); // форма загрузки изображения
const uploadButton = formImage.querySelector('.img-upload__submit'); // кнопка отправки данных

/*
  #################################################################################
  ##########            УПРАВЛЕНИЕ ОТПРАВКОЙ ДАННЫХ НА СЕРВЕР            ##########
  #################################################################################
*/

// Закрываем окно сообщения по Esc
const closeMessageEsc = (evt) => {
  if (isEscapeKey(evt)) { // проверяем нажатую клавишу
    successMessage.remove(); // удаляем сообщение об успешной отправке
    errorMessage.remove(); // удаляем сообщение об ошибке при отправке
    document.addEventListener('keydown', onDocumentKeydown); // возвращаем обработчик закрытия формы по Esc
    uploadButton.disabled = false; // активируем кнопку отправки
  }
};

// Закрываем окно по клику мыши на свободном месте
const closeMessageClick = (evt) => {
  if (evt.target === successMessage) { // если открыто сообщение об успешной отправке
    successMessage.remove(); // удаляем сообщение об успешной отправке
  }
  if (evt.target === errorMessage) { // если открыто сообщение об ошибке
    errorMessage.remove(); // удаляем сообщение об успешной отправке
  }
  body.removeEventListener('click', closeMessageClick); // удаляем обработчик клика по свободному месту
  document.removeEventListener('keydown', closeMessageEsc); // удаляем обработчик закрытия окна по клавише ESC
  document.addEventListener('keydown', onDocumentKeydown); // возвращаем обработчик закрытия формы по ESC
};


// Ошибка отправки
const addMessageError = () => {
  body.append(errorMessage); // добавляем сообщение перед закрытием body
  body.addEventListener('click', closeMessageClick); // добавляем обработчик клика по свободному месту
  document.addEventListener('keydown', closeMessageEsc); // добавляем обработчик закрытия по ESC
  document.removeEventListener('keydown', onDocumentKeydown); // удаляем обработчик закрытия формы по ESC

  buttonErrorMessage.addEventListener('click', //обработчик кнопки
    () => {
      document.addEventListener('keydown', onDocumentKeydown); // возвращаем обработчик закрытия формы по ESC
      uploadButton.disabled = false; // активируем кнопку отправки
      errorMessage.remove(); //удаляем сообщение
    });
};

// Отправлено успешно
const addMessageSuccess = () => {
  body.append(successMessage); // добавляем сообщение перед закрытием body
  body.addEventListener('click', closeMessageClick); // добавляем обработчик клика по свободному месту
  document.addEventListener('keydown', closeMessageEsc); // добавляем обработчик закрытия по ESC

  buttonSuccessMessage.addEventListener('click', //обработчик кнопки
    () => {
      successMessage.remove(); //удаляем сообщение
    });
};

export { addMessageSuccess, addMessageError };
