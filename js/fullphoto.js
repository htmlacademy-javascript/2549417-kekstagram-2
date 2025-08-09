import { arrayPhotoTestData } from './miniatures.js';
import { isEscapeKey, clearComments } from './utils.js';

const body = document.querySelector('body');
const fullImageForm = document.querySelector('.big-picture');
const fullImageFormClose = document.querySelector('.big-picture__cancel');
const fullPhoto = document.querySelector('.big-picture__img img');
const imageCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const commentShownCount = document.querySelector(
  '.social__comment-shown-count'
);
const commentTotalCount = document.querySelector(
  '.social__comment-total-count'
);
const listComments = document.querySelector('.social__comments');
const itemComment = document.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');

// Конструктор фрагмента для комментариев
const fragmentItemComment = document.createDocumentFragment();

// Количество комментариев за один запрос
const COMMENTS_PER_LOAD = 5;

// Треки текущего состояния
let currentIndex = null;
let loadedComments = 0;

// Контейнер для миниатюр
const picturesContainer = document.querySelector('.pictures');

// Загрузчик порций комментариев
const loadCommentBatch = (index) => {
  const commentsArray = arrayPhotoTestData[index].comments;

  if (loadedComments >= commentsArray.length) {
    commentsLoaderButton.classList.add('hidden');
    return;
  }

  const start = loadedComments;
  const end = Math.min(start + COMMENTS_PER_LOAD, commentsArray.length);

  commentsArray.slice(start, end).forEach(({ avatar, name, message }) => {
    const cloneItemComment = itemComment.cloneNode(true);
    cloneItemComment.querySelector('.social__picture').src = avatar;
    cloneItemComment.querySelector('.social__picture').alt = name;
    cloneItemComment.querySelector('.social__text').textContent = message;
    fragmentItemComment.append(cloneItemComment);
  });

  listComments.append(fragmentItemComment);

  loadedComments += end - start;
  commentShownCount.textContent = loadedComments;

  if (loadedComments >= commentsArray.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};


// Обработчик загрузки следующей партии комментариев
const onLoadMoreComments = () => {
  clearComments(listComments);
  loadCommentBatch(currentIndex);
};

// Функция закрытия увеличенного изображения
const closeFullImageForm = () => {
  fullImageForm.classList.add('hidden');
  body.classList.remove('modal-open');

  // Убираем обработчик загрузки комментариев
  commentsLoaderButton.removeEventListener('click', onLoadMoreComments);
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Обработчик нажатия Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullImageForm();
  }
}

// Загружает большое изображение и его метаданные
const loaderFullPhoto = ({ url, likes, comments, description }) => {
  fullPhoto.src = url;
  likesCount.textContent = likes;
  commentTotalCount.textContent = comments.length;
  imageCaption.textContent = description;
  commentShownCount.textContent = 0;

  commentsLoaderButton.addEventListener('click', onLoadMoreComments);
};

// Основная функция для открытия увеличенного изображения
const openFullImageForm = (index) => {
  fullImageForm.classList.remove('hidden');
  body.classList.add('modal-open');
  currentIndex = index;
  loadedComments = 0;

  clearComments(listComments);
  loaderFullPhoto(arrayPhotoTestData[index]);
  loadCommentBatch(index);

  fullImageFormClose.addEventListener('click', closeFullImageForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Главный обработчик событий для миниатюр
const onDelegateThumbnailClick = (event) => {
  const target = event.target.closest('.picture'); // Проверяем ближайший родитель ".picture"

  if (target) {
    const id = Number(target.dataset.id) - 1;
    openFullImageForm(id, target);
  }
};

// Основной запуск делегатора
const initDelegatedEvents = () => {
  picturesContainer.addEventListener('click', onDelegateThumbnailClick);
};

initDelegatedEvents();

export { initDelegatedEvents };
