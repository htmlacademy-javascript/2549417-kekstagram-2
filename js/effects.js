import { EFFECT_SETTINGS } from './settings.js';

const slider = document.querySelector('.effect-level__slider'); // слайдер
const sliderContainer = document.querySelector('.img-upload__effect-level'); // контейнер для слайдера
const imagePreview = document.querySelector('.img-upload__preview img'); // просмотр изображения
const effectLevelValue = document.querySelector('.effect-level__value'); // скрытое поле значения для эффекта слайдера
const effectRadioButtons = document.querySelectorAll('[name="effect"]'); // input эффектов

let settings = {}; // переменная для хранения настроек эффекта

/*
  #################################################################################
  ##########  УПРАВЛЕНИЕ НАЛОЖЕНИЕМ ЭФФЕКТОВ НА ЗАГРУЖЕННОЕ ИЗОБРАЖЕНИЕ  ##########
  #################################################################################
*/

// Наложение эффекта
const getEffectImage = (
  minRange,
  maxRange,
  stepRange,
  startRange,
  effectName
) => {
  slider.noUiSlider.off(); // удаляем предыдущий обработчик

  slider.noUiSlider.updateOptions({
    // обновляем установки слайдера
    start: startRange, // начальная позиция слайдера
    range: { min: minRange, max: maxRange }, //диапазон настроек слайдера
    step: stepRange, // величина шага
  });

  // Обработчик изменения позиции ползунка
  slider.noUiSlider.on('update', (values) => {
    const effectValue = values; // получаем текущее значение слайдера

    if (effectName === 'blur') {
      // проверяем не является ли выбранный фильтр "Фобос"
      imagePreview.style.filter = `${effectName}(${effectValue}px)`; // применяем эффект фильтрации (фобос)
      effectLevelValue.value = parseFloat(effectValue, 1); // записываем новое значение в скрытое поле
    } else if (effectName === 'invert') {
      // проверяем не является ли выбранный фильтр "Марвин"
      imagePreview.style.filter = `${effectName}(${effectValue})`; // применяем эффект фильтрации (марвин)
      effectLevelValue.value = effectValue * 100; // записываем новое значение в скрытое поле
    } else {
      imagePreview.style.filter = `${effectName}(${effectValue})`; // применяем эффект фильтрации (хром, сепия, зной)
      effectLevelValue.value = parseFloat(effectValue, 1); // записываем новое значение в скрытое поле
    }
  });
};

// Сброс эффектов
const noneEffect = () => {
  slider.noUiSlider.off(); // удаляем предыдущий обработчик
  imagePreview.style.removeProperty('filter'); // удаляем стиль наложения эффекта
  slider.setAttribute('disabled', true); // блокируем слайдер
  effectLevelValue.value = 0; // сбрасываем значение поля уровень эффекта

  slider.noUiSlider.updateOptions({
    // сбрасываем установки слайдера
    start: 0,
    range: { min: 0, max: 100 },
    step: 1,
  });

  sliderContainer.classList.add('hidden'); // скрываем слайдер
};

// Главная функция для применения выбранного эффекта
const onApplySelectedEffect = () => {
  let effectValue = document.activeElement.value; // получем значение активного элемента
  effectValue = effectValue !== 'none' ? effectValue.toUpperCase() : 'none'; // переводим название эффекта в верхний регистр, если это не "none"

  // Обработать выбранный эффект
  switch (
    effectValue // выбирает действие в зависисмости от выбранного эффекта
  ) {
    case 'none':
      noneEffect(); // функция сброса всех эффектов
      break;
    default:
      slider.removeAttribute('disabled'); // активируем слайдер
      sliderContainer.classList.remove('hidden'); // показываем контейнер со слайдером
      settings = EFFECT_SETTINGS[effectValue]; // получаем настройки выбранного эффекта
      if (settings) {
        getEffectImage(
          settings.min,
          settings.max,
          settings.step,
          settings.start,
          settings.filterType,
          effectValue
        ); // применяем эффект с выбранными настройками
      }
      break;
  }
};

// Добавляем обработчики эффектов на кнопки
const getEventEffects = () => {
  effectRadioButtons.forEach((button) => button.addEventListener('change', onApplySelectedEffect));
};

// Удаляем обработчики с кнопок эффектов
const removeEventEffects = () => {
  effectRadioButtons.forEach((button) => button.removeEventListener('change', onApplySelectedEffect));
};

export { removeEventEffects, getEventEffects };
