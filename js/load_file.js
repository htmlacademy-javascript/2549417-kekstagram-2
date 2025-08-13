import { isEscapeKey } from './utils.js';
import {
  MAX_LENGTH_HASHTAG,
  MAX_COUNT_HASHTAG,
  MAX_LENGTH_DESCRIPTION
} from './settings.js';

const body = document.body;

const formImage = document.querySelector('.img-upload__form'); // форма загрузки изображения
const inputImgUpload = formImage.querySelector('.img-upload__input'); // поле загрузки изображения
const formImgUpload = formImage.querySelector('.img-upload__overlay'); // фрпма редактирования изображения
const imagePreview = formImage.querySelector('.img-upload__preview').querySelector('img'); // просмотр изображения
const sliderContainer = formImage.querySelector('.img-upload__effect-level'); // контейнер для слайдера
const slider = formImage.querySelector('.effect-level__slider'); // слайдер
const effectLevelValue = formImage.querySelector('.effect-level__value'); // скрытое поле значения для эффекта слайдера
const effectImagePreviews = formImage.querySelectorAll('.effects__preview'); // контейнер для вывода превью изображения
const inputTextHashtags = formImage.querySelector('.text__hashtags'); // поле ввода хэштегов
const textDescription = formImage.querySelector('.text__description'); // поле ввода описания
const closeImgUpload = formImage.querySelector('.img-upload__cancel'); // кнопка закрытия формы


/*
  #################################################################################
  ##########                 УПРАВЛЕНИЕ ВАЛИДАЦИЕЙ ФОРМЫ                 ##########
  #################################################################################
*/

let messageError = ''; // ошибка при валидации хэштега

// Проверка хэштегов
const validateHashTags2 = (value) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i; // шаблон хэштега
  const hashtagsString = value.trim(); // чистим строку от пробелов
  const hashtags = hashtagsString.split(/\s+/).filter(Boolean); // разбиваем на отдельные хэштеги, пропускаем пустые

  for (const tag of hashtags) { // перебираем массив хэштегов
    if (!hashtagRegex.test(tag)) { // проверяем каждый хэштег на соответствие шаблону
      messageError = 'tag'; // записываем ошибку, найден некорректный хэштег
      return false; // валидация не пройдена
    }

    if (tag.length > MAX_LENGTH_HASHTAG) {
      messageError = 'maxLengthTag';
      return false;
    }
  }

  // Формируем массив уникальных хэштегов
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase())); // проверяем уникальность хэштегов приводя их к нижнему регистру

  if (uniqueHashtags.size !== hashtags.length) { // если массив уникальных хэштегов неравен массиву хэштегов
    messageError = 'doubleTag'; // записываем ошибку, встречаются повторяющиеся хэштеги
    return false; // валидация не пройдена
  }

  if (hashtags.length > MAX_COUNT_HASHTAG) { // если массив хэштегов содержит более 5 хэштегов
    messageError = 'maxCountTag'; // записываем ошибку, больше 5 хэштегов недопустимо
    return false; // валидация не пройдена
  }

  return true; // валидация пройдена успешно
};

// Проверка описания
const validateDescriptionInput = (value) => value.length <= MAX_LENGTH_DESCRIPTION; // длина комментария должна быть не более 140 исмволов

// Интерприторатор ошибки валидации
const interpritatorError = () => {
  switch (messageError) { // выбираем сообщение об ошибки в зависимости от возвращенной ошибки при калидации поля хэштег
    case 'tag': return 'Хэштег должен начинаться с "#" и не содержать спецсимволы. Формат: #Hashtag'; //  Формат: #hashtag. Не менее 2 и не более 20 символов.
    case 'doubleTag': return 'Встречаются повторяющиеся хэштеги!';
    case 'maxCountTag': return `Не более ${ MAX_COUNT_HASHTAG } хэштегов!`;
    case 'maxLengthTag': return `Хэштег должен быть не ${ MAX_LENGTH_HASHTAG } символов!`;
  }
};

// Pristine-валидатор
const pristine = new Pristine(formImage, {
  classTo: 'img-upload__field-wrapper', // блок которому применяется валидатор
  errorTextParent: 'img-upload__field-wrapper', // контейнер вывода сообщения об ошибке
  errorTextClass: 'img-upload__field-wrapper--error', // класс для сообщения об ошибке
});

// Добавляем валидатор хэштегов
pristine.addValidator(
  inputTextHashtags, // поле которое необходимо провалидировать
  validateHashTags2, // функция валидатор
  interpritatorError // вывод ошибки
);

// Добавляем валидатор для описания изображения
pristine.addValidator(
  textDescription, // поле которое необходимо провалидировать
  validateDescriptionInput, // функция валидатор
  'Введите не более 140 символов!' // вывод ошибки
);

// Отправка формы
formImage.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отмена действия по умолчанию
  const isValid = pristine.validate(); // проверка форма на валидность
  if (isValid) { // валидация пройдена
    formImage.submit(); // отправка формы
  }
});

/*
  #################################################################################
  ##########  УПРАВЛЕНИЕ ОТКРЫТИЕМ МОДАЛЬНОГО ОКНА ЗАГРУЗКИ ИЗОБРАЖЕНИЯ  ##########
  #################################################################################
*/

// Закрытие окна
const closeModalFormImg = () => {
  formImgUpload.classList.add('hidden'); // скрываем форму
  body.classList.remove('modal-open'); // "разблокировываем" страницу

  closeImgUpload.removeEventListener('click', closeModalFormImg); // удаялем обработчик закрытия окна
  document.removeEventListener('keydown', onDocumentKeydown); // удаляем обработчик закрытия окна по Esc

  inputImgUpload.value = ''; // очищаем поле выбора изображения
  inputTextHashtags.value = ''; // очищаем поле хэштега
  textDescription.value = ''; // очищаем поле описания
  effectLevelValue.value = 0; // сбрасываем значение поля уровень эффекта
  imagePreview.src = ''; // очищаем путь до изображения
  imagePreview.style.removeProperty('transform'); // удаляем стиль изменения масштаба
  imagePreview.style.removeProperty('filter'); // удаляем стиль наложения эффекта
};

// Закрытие формы при нажатии на Esc
function onDocumentKeydown (evt) {
  const activeElement = document.activeElement; // Активный элемент (текущий фокусированный элемент)
  const hashTagFocus = activeElement === inputTextHashtags; // проверяем, если фокус на поле хэштегов
  const textDescriptionFocus = activeElement === textDescription; // проверяем, если фокус на поле описания

  // Если ни одно из полей не активно и нажата клавиша Esc, закрываем форму загрузки изображения
  if (!(hashTagFocus || textDescriptionFocus) && isEscapeKey(evt)) {
    evt.preventDefault(); // отменяем действие по умолчанию
    closeModalFormImg(); // закрываем форму
  }
}

// Открытие окна
const openModalFormImg = () => {
  formImgUpload.classList.remove('hidden'); // показываем форму с изображением
  body.classList.add('modal-open'); // блокируем страницу
  closeImgUpload.addEventListener('click', closeModalFormImg); // добавялем обработчик закрытия формы

  slider.setAttribute('disabled', true); // блокируем слайдер
  sliderContainer.classList.add('hidden'); // скрываем слайдер вместе с контейнером
  document.addEventListener('keydown', onDocumentKeydown);
};

// Загрузка изображений в превью эффектов
const loadImageInFormToPreview = (event) => {
  const file = event.target.files[0]; // получаем первый файл
  if (file) { // если файл получен
    if (file.type.startsWith('image/')) { // если файл является изображением
      const reader = new FileReader(); // превращаем файл в строку формата base64 (data-url)

      reader.onload = function (evt) { // чтение полученного файла
        imagePreview.src = evt.target.result; // устанавливаем изображение для просмотра
        effectImagePreviews.forEach((preview) => { // перебираем превью эффектов
          preview.style.backgroundImage = `url('${evt.target.result}')`; // устанавливаем изображение каждому превью эффекта
        });
      };

      reader.readAsDataURL(file); // выполняем чтение файла как строку data-url

      return true;
    }

    return false;
  }
};

// Добавляем обработчик событий на поле с выбранным изображением
const managementFormImgUpload = () => {
  inputImgUpload.addEventListener('change', (event) => {
    const loadImage = loadImageInFormToPreview(event); // загрузить изображение
    if (loadImage) { // проверяем что выбрано изображение
      openModalFormImg(); // открыть модальное окно
    }
  });
};

managementFormImgUpload();

/*
  #################################################################################
  ##########                           ЭКСПОРТ                           ##########
  #################################################################################
*/

export { managementFormImgUpload };
