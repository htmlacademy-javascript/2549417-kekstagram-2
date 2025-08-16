import { miniaturesView } from './miniatures';
import { initDelegatedEvents } from './gallery.js';
import { managementFormImgUpload } from './loader';

miniaturesView(); // создание миниатюр
initDelegatedEvents(); // открытие полноразмерного изображения
managementFormImgUpload(); // управление загрузкой выбранного изображения
