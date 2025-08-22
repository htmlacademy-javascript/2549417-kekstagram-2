import {
  MIN_CURRENT_SCALE,
  MAX_CURRENT_SCALE,
  SCALE_STEP
} from './settings.js';

const imagePreview = document.querySelector('.img-upload__preview img'); // просмотр изображения
const scaleInput = document.querySelector('.scale__control--value'); // поле вывода текущего масштаба
const zoomInBtn = document.querySelector('.scale__control--bigger'); // кнопка увеличения масштаба
const zoomOutBtn = document.querySelector('.scale__control--smaller'); // кнопка уменьшения масштаба

let currentScale = 1.0; // значение по умолчанию для масштабирования

/*
  #################################################################################
  ##########        УПРАВЛЕНИЕ МАСШТАБОМ ЗАГРУЖЕННОГО ИЗОБРАЖЕНИЯ        ##########
  #################################################################################
*/

// Сброс масштаба
const resetScale = () => {
  currentScale = 1.0;
};

// Обновление информации о текущем масштабе
const getUpdateImageScale = () => {
  imagePreview.style.transform = `scale(${currentScale})`; // применяем масштаб к изображению через CSS
  scaleInput.value = `${Math.round(currentScale * 100)}%`; // обновляем значение в поле формы
};

// Функция для увеличения масштаба
const applyScalePlus = () => {
  currentScale =
    currentScale >= MIN_CURRENT_SCALE && currentScale < MAX_CURRENT_SCALE // проверяем находимся ли мы в пределах диапазона
      ? Math.min(currentScale + SCALE_STEP, MAX_CURRENT_SCALE) // если да, то увеличиваем значение и контролируем выход из диапазона
      : currentScale; // если вне диапазона остается текущее максимальное значение

  getUpdateImageScale(); // обновляем масштаб
};

// Функция для уменьшения масштаба
const applyScaleMinus = () => {
  currentScale =
    currentScale > MIN_CURRENT_SCALE && currentScale <= MAX_CURRENT_SCALE // проверяем находимся ли мы в пределах диапазона
      ? Math.min(currentScale - SCALE_STEP, MAX_CURRENT_SCALE) // если да, то уменьшаем значение и контролируем выход из диапазона
      : currentScale; // если вне диапазона остается текущее минимальное значение
  getUpdateImageScale(); // обновляем масштаб
};

// Добавляем обработчики событий на кнопки масштаба
const getZoomImgButton = () => {
  zoomInBtn.addEventListener('click', applyScalePlus); // увеличиваем масштаб
  zoomOutBtn.addEventListener('click', applyScaleMinus); // уменьшаем масштаб
};

// Удаляет обработчики событий на кнопках масштаба
const removeEventZoomImgButton = () => {
  zoomInBtn.removeEventListener('click', applyScalePlus); // увеличиваем масштаб
  zoomOutBtn.removeEventListener('click', applyScaleMinus); // уменьшаем масштаб
};

export { currentScale, resetScale, removeEventZoomImgButton, getZoomImgButton };
