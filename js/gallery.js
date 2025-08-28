import { arrayPhotoData } from './miniatures.js';
import { isEscapeKey, clearComments } from './utils.js';
import { COMMENTS_PER_LOAD } from './settings.js';


const body = document.querySelector('body');
const fullImageForm = document.querySelector('.big-picture');
const fullPhoto = document.querySelector('.big-picture__img img');
const imageCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const commentShownCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const listComments = document.querySelector('.social__comments');
const itemComment = document.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');
const picturesContainer = document.querySelector('.pictures'); // Контейнер для миниатюр
const fullImageFormClose = document.querySelector('.big-picture__cancel');

const fragmentItemComment = document.createDocumentFragment(); // Конструктор фрагмента для комментариев

/*
  #################################################################################
  ##########   ЛОКАЛЬНЫЕ УСТАНОВКИ  (переменные, константы, параметры)   ##########
  #################################################################################
*/

let currentIndex = null; // текущий индекс
let loadedComments = 0; // количество загруженных комментариев

/*
  #################################################################################
  ##########              УПРАВЛЕНИЕ ЗАГРУЗКОЙ КОММЕНТАРИЕВ              ##########
  #################################################################################
*/

// Загрузчик порций комментариев
const getLoadCommentBatch = (index) => {
  const commentsArray = arrayPhotoData[index].comments; //получаем комментарии выбранного изображения

  if (loadedComments >= commentsArray.length) { // если загруженных комментариеы больше или равно имеющимся
    commentsLoaderButton.classList.add('hidden'); // скрываем "кнопку" загрузки очередной партии
    return; // завершаем работу
  }

  const start = loadedComments; // начальное значение комментариев
  const end = Math.min(start + COMMENTS_PER_LOAD, commentsArray.length); // конечное значение комментариев

  commentsArray.slice(start, end).forEach(({ avatar, name, message }) => { // отрезаем кусок от всех комментариев изображения и проходимся циклов деструктурируя их
    const cloneItemComment = itemComment.cloneNode(true); // клонируем шаблон для вставки комментария
    cloneItemComment.querySelector('.social__picture').src = avatar; // указываем аватарку
    cloneItemComment.querySelector('.social__picture').alt = name; // указываем имя
    cloneItemComment.querySelector('.social__text').textContent = message; // вставляем сообщение
    fragmentItemComment.append(cloneItemComment); // добавляем сформированный комментарий во фрагмент
  });

  listComments.append(fragmentItemComment); // добавляем фрагмент на страницу

  loadedComments += end - start; // увеличиваем кол-во загруженных комментариев
  commentShownCount.textContent = loadedComments; // меняем счетчик загруженных комментариев

  if (loadedComments >= commentsArray.length) { // если загруженных комментариеы больше или равно имеющимся
    commentsLoaderButton.classList.add('hidden'); // скрываем "кнопку" загрузки очередной партии
  } else {
    commentsLoaderButton.classList.remove('hidden'); // иначе показываем "кнопку" загрузки очередной партии
  }
};

// Обработчик загрузки следующей партии комментариев
const onLoadMoreComments = () => {
  // clearComments(listComments); // очищаем загруженные комментарии (для вывода порции по 5 штук)
  getLoadCommentBatch(currentIndex); // загружаем следующие
};

/*
  #################################################################################
  ##########         ЗАКРЫВАЕМ ОКНО ПОЛНОРАЗМЕРНОГО ИЗОБРАЖЕНИЯ          ##########
  #################################################################################
*/

// Функция закрытия увеличенного изображения
const onCloseFullImageForm = () => {
  fullImageForm.classList.add('hidden'); // скрываем окно изображения
  body.classList.remove('modal-open'); // "размораживаем" основное окно

  fullPhoto.src = ''; // убираем изображение
  fullPhoto.style = ''; // очищаем примененные стили
  likesCount.textContent = 0; // убираем количество лайков
  imageCaption.textContent = ''; // убираем описание изображения
  commentShownCount.textContent = 0; // обнуляем счетчик кол-ва показанных комментариев
  commentTotalCount.textContent = 0; // обнуляем общее кол-во комментариев
  commentsLoaderButton.classList.add('hidden'); // скрываем кнопку загрузки комментариев

  // Убираем обработчик загрузки комментариев
  commentsLoaderButton.removeEventListener('click', onLoadMoreComments); // убираем обработчик загрузчи следующих комментариев
  document.removeEventListener('keydown', onDocumentKeydown); // убираем обработчик закрытия формы по ESC
};

// Обработчик нажатия Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) { // если нажата клавиша ESC
    evt.preventDefault(); // отменяем действие по умолчанию
    onCloseFullImageForm(); // закрываем форму полноразмерного просмотра изображения
  }
}

/*
  #################################################################################
  ##########         ОТКРЫВАЕМ ОКНО ПОЛНОРАЗМЕРНОГО ИЗОБРАЖЕНИЯ          ##########
  #################################################################################
*/

// Загружает большое изображение и его метаданные
const getLoadFullPhoto = ({ url, likes, comments, description }) => {
  fullPhoto.src = url; // указываем место расположения изображения
  fullPhoto.alt = 'Изображение';
  likesCount.textContent = likes; // указываем кол-во лайков
  commentTotalCount.textContent = comments.length; // указываем кол-во комментариев
  imageCaption.textContent = description; // указываем описание изображения
  commentShownCount.textContent = 0; // обнуляем счетчик кол-ва показанных комментариев

  commentsLoaderButton.addEventListener('click', onLoadMoreComments); // добавляем обработчик следующих комментариев
};

// Загружает большое изображение самостоятельно добавленное на сайт
const getLoadFullPhotoSelfAdded = (url, filter) => {
  fullPhoto.src = url; // указываем место расположения изображения
  fullPhoto.alt = 'Изображение';
  fullPhoto.style.filter = filter; // применяем фильтер

  likesCount.textContent = 0; // обнуляем  кол-во лайков
  commentTotalCount.textContent = 0; // обнуляем кол-во комментариев
  imageCaption.textContent = ''; // сбрасываем описание изображения
  commentShownCount.textContent = 0; // обнуляем счетчик кол-ва показанных комментариев

  clearComments(listComments); // очищаем загруженные комментарии
  commentsLoaderButton.classList.add('hidden'); // скрываем "кнопку" загрузки очередной партии

  commentsLoaderButton.addEventListener('click', onLoadMoreComments); // добавляем обработчик следующих комментариев
};

// Основная функция для открытия увеличенного изображения
const getOpenFullImageForm = (index) => {
  fullImageForm.classList.remove('hidden'); // показываем окно полноразмерного просмотра изображения
  body.classList.add('modal-open'); // "замораживаем" основное окно
  currentIndex = index; // текущий индекс
  loadedComments = 0; // загруженные комментарии

  clearComments(listComments); // очищаем загруженные комментарии
  getLoadFullPhoto(arrayPhotoData[index]); // заполняем данными выбранного изображения
  getLoadCommentBatch(index); // загружаем первую порцию комментариев

  fullImageFormClose.addEventListener('click', onCloseFullImageForm); // добавляем обработчик закрытия окна по кнопке
  document.addEventListener('keydown', onDocumentKeydown); // добавляем обработчик закрытия окна по ESC
};

/*
  #################################################################################
  ##########                       ДЕЛЕГИРОВАНИЕ                         ##########
  #################################################################################
*/

// Главный обработчик событий для миниатюр
const onDelegateThumbnailClick = (event) => {
  const target = event.target.closest('.picture'); // Проверяем ближайший родитель ".picture"

  if (target) {
    // если родитель найден
    const id = Number(target.dataset.id); // получаем его ID

    if (!id) {
      // если id отсутствует
      const src = document.activeElement.querySelector('.picture__img').src; // получаем путь до изображения
      const filter = document.activeElement.querySelector('.picture__img').style.filter; // получаем данные о примененом эффекте

      getLoadFullPhotoSelfAdded(src, filter); // готовим форму и загружаем изображение

      fullImageForm.classList.remove('hidden'); // показываем окно полноразмерного просмотра изображения
      body.classList.add('modal-open'); // "замораживаем" основное окно

      fullImageFormClose.addEventListener('click', onCloseFullImageForm); // добавляем обработчик закрытия окна по кнопке
      document.addEventListener('keydown', onDocumentKeydown); // добавляем обработчик закрытия окна по ESC
    } else {
      // если id найден
      getOpenFullImageForm(id, target); // открываем окно с данными выбранного изображения
    }
  }
};

// Основной запуск делегатора
const initDelegatedEvents = () => {
  picturesContainer.addEventListener('click', onDelegateThumbnailClick); // вышаем обработчик на контейнер изображений
};

initDelegatedEvents(); // запускаем
