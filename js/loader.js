import { isEscapeKey } from './utils.js';
import { getUploadToServer } from './network.js';
import { addMessageSuccess, addMessageError } from './sending-data.js';
import {
  currentScale,
  resetScale,
  removeEventZoomImgButton,
  getZoomImgButton,
} from './zoom.js';
import { removeEventEffects, getEventEffects } from './effects.js';
import { getValidateHashtags, getValidateDescription, getInterpritationError } from './validator.js';


const body = document.body;

const formImage = document.querySelector('.img-upload__form'); // форма загрузки изображения
const inputImgUpload = formImage.querySelector('.img-upload__input'); // поле загрузки изображения
const formImgUpload = formImage.querySelector('.img-upload__overlay'); // форма редактирования изображения
const scaleInput = formImage.querySelector('.scale__control--value'); // поле вывода текущего масштаба
const imagePreview = formImage.querySelector('.img-upload__preview img'); // просмотр изображения
const sliderContainer = formImage.querySelector('.img-upload__effect-level'); // контейнер для слайдера
const slider = formImage.querySelector('.effect-level__slider'); // слайдер
const effectLevelValue = formImage.querySelector('.effect-level__value'); // скрытое поле значения для эффекта слайдера
const effectImagePreviews = formImage.querySelectorAll('.effects__preview'); // контейнер для вывода превью изображения
const inputTextHashtags = formImage.querySelector('.text__hashtags'); // поле ввода хэштегов
const textDescription = formImage.querySelector('.text__description'); // поле ввода описания
const closeImgUpload = formImage.querySelector('.img-upload__cancel'); // кнопка закрытия формы
const uploadButton = formImage.querySelector('.img-upload__submit'); // кнопка отправки данных

const effectNoneInputRadio = document.querySelector('.effects__radio');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
/*
  #################################################################################
  ##########   ЛОКАЛЬНЫЕ УСТАНОВКИ  (переменные, константы, параметры)   ##########
  #################################################################################
*/

scaleInput.value = '100%'; // начальное значение в поле масштаба

/*
  #################################################################################
  ##########  УПРАВЛЕНИЕ НАЛОЖЕНИЕМ ЭФФЕКТОВ НА ЗАГРУЖЕННОЕ ИЗОБРАЖЕНИЕ  ##########
  #################################################################################
*/

// Создаем слайдер
noUiSlider.create(slider, {
  start: 0, // начальная позиция слайдера
  range: { min: 0, max: 100 }, //диапазон настроек слайдера
  connect: 'lower', // сторона с которой будет закрашиваться слайдер
  step: 1, // величина шага
});

/*
  #################################################################################
  ##########                 УПРАВЛЕНИЕ ВАЛИДАЦИЕЙ ФОРМЫ                 ##########
  #################################################################################
*/

// Pristine-валидатор
const pristine = new Pristine(formImage, {
  classTo: 'img-upload__field-wrapper', // блок которому применяется валидатор
  errorTextParent: 'img-upload__field-wrapper', // контейнер вывода сообщения об ошибке
  errorTextClass: 'img-upload__field-wrapper--error', // класс для сообщения об ошибке
});

// Добавляем валидатор хэштегов
pristine.addValidator(
  inputTextHashtags, // поле которое необходимо провалидировать
  getValidateHashtags, // функция валидатор
  getInterpritationError // вывод сообщения об ошибке
);

// Добавляем валидатор для описания изображения
pristine.addValidator(
  textDescription, // поле которое необходимо провалидировать
  getValidateDescription, // функция валидатор
  'Введите не более 140 символов!' // вывод сообщения об ошибке
);

/*
  #################################################################################
  ##########               ДОБАВЛЕНИЕ ИЗОБРАЖЕНИЯ НА САЙТ                ##########
  #################################################################################
*/

// Добавление изображения на сайт
const addPicture = () => {
  const file = inputImgUpload.files[0]; // получаем файл
  const clonePictureTemplate = pictureTemplate.cloneNode(true); // клинируем шаблон миниатюры
  const pictureImg = clonePictureTemplate.querySelector('.picture__img'); // находим нужный элемент

  pictureImg.src = URL.createObjectURL(file); // добавляем ссылку на изображение
  pictureImg.style.transform = `scale(${currentScale})`; // применяем масштаб
  pictureImg.style.filter = imagePreview.style.filter; // применяем фильтр

  pictures.append(clonePictureTemplate); // добавляем изображение
};

/*
  #################################################################################
  ##########                       ОТПРАВКА ФОРМЫ                        ##########
  #################################################################################
*/

// Отправка формы
formImage.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отмена действия по умолчанию

  if (pristine.validate()) { // валидация пройдена
    const formData = new FormData(evt.target); // формируем поля формы для отправки

    uploadButton.disabled = true; // деактивируем кнопку отправки формы
    getUploadToServer(formData, addMessageSuccess, addMessageError, closeModalFormImg); // отправляем данные
    addPicture(); // добавляем изображение на сайт
  }
});

/*
  #################################################################################
  ##########  УПРАВЛЕНИЕ ОТКРЫТИЕМ МОДАЛЬНОГО ОКНА ЗАГРУЗКИ ИЗОБРАЖЕНИЯ  ##########
  #################################################################################
*/

// Закрытие окна
function closeModalFormImg () {
  effectNoneInputRadio.checked = true;
  inputImgUpload.value = ''; // очищаем поле выбора изображения
  inputTextHashtags.value = ''; // очищаем поле хэштега
  textDescription.value = ''; // очищаем поле описания
  effectLevelValue.value = 0; // сбрасываем значение поля уровень эффекта
  imagePreview.src = ''; // очищаем путь до изображения
  imagePreview.style.removeProperty('transform'); // удаляем стиль изменения масштаба
  imagePreview.style.removeProperty('filter'); // удаляем стиль наложения эффекта
  scaleInput.value = '100%'; // начальное значение в поле масштаба
  resetScale(); // устанавливаем масштаб по умолчанию

  pristine.validate();

  formImgUpload.classList.add('hidden'); // скрываем форму
  body.classList.remove('modal-open'); // "разблокировываем" страницу

  closeImgUpload.removeEventListener('click', closeModalFormImg); // удаялем обработчик закрытия окна
  document.removeEventListener('keydown', onDocumentKeydown); // удаляем обработчик закрытия окна по Esc
  removeEventZoomImgButton(); // удаляем обработчик кнопок масштаба
  removeEventEffects(); // удаляем обработчики кнопок эффектов
}

// Закрытие формы при нажатии на Esc
function onDocumentKeydown (evt) {
  const activeElement = document.activeElement; // Активный элемент (текущий фокусированный элемент)
  const hashTagFocus = activeElement === inputTextHashtags; // проверяем, если фокус на поле хэштегов
  const textDescriptionFocus = activeElement === textDescription; // проверяем, если фокус на поле описания

  // Если ни одно из полей не активно и нажата клавиша Esc, закрываем форму загрузки изображения
  if (!(hashTagFocus || textDescriptionFocus) && isEscapeKey(evt)) {
    // evt.preventDefault(); // отменяем действие по умолчанию
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

  uploadButton.disabled = false;

  getZoomImgButton(); // добавляем обработчики на кнопки масштабирования
  getEventEffects(); // добавляем обработчики на кнопки эффектов
};

// Загрузка изображений в превью эффектов
const getLoadImageInFormToPreview = (event) => {
  const file = event.target.files[0]; // получаем первый файл
  if (file) { // если файл получен
    if (file.type.startsWith('image/')) { // если файл является изображением

      const reader = new FileReader(); // превращаем файл в строку формата base64 (data-url)

      imagePreview.src = ''; // удаляем предыдущую картинку
      effectImagePreviews.forEach((preview) => { // перебираем превью эффектов
        preview.style.backgroundImage = `url('${''}')`; // убираем изображение с каждого превью эффекта
      });

      reader.onload = function (evt) { // чтение полученного файла
        imagePreview.src = evt.target.result; // устанавливаем изображение для просмотра
        effectImagePreviews.forEach((preview) => { // перебираем превью эффектов
          preview.style.backgroundImage = `url('${evt.target.result}')`; // устанавливаем изображение каждому превью эффекта
        });
      };

      reader.readAsDataURL(file); // выполняем чтение файла как строку data-url

      return true; // удачно загрузили изображение
    }

    return false; // загрузка изображения неудалась
  }
};

// Добавляем обработчик событий на поле с выбранным изображением
const getUploadImageToForm = () => {
  inputImgUpload.addEventListener('change', (event) => {
    const loadImage = getLoadImageInFormToPreview(event); // загрузить изображение
    if (loadImage) { // проверяем что выбрано изображение
      openModalFormImg(); // открыть модальное окно
    }
  });
};

getUploadImageToForm();

/*
  #################################################################################
  ##########                           ЭКСПОРТ                           ##########
  #################################################################################
*/

export { onDocumentKeydown };
