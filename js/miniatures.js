import { photos } from './utils';

const fragmentPictureTemplate = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const arrayPhotoTestData = photos();


const miniaturesView = () => {
  arrayPhotoTestData.forEach(({url, description, comments, likes}) => {
    const clonePictureTemplate = pictureTemplate.cloneNode(true);
    clonePictureTemplate.querySelector('.picture__img').src = url;
    clonePictureTemplate.querySelector('.picture__img').alt = description;
    clonePictureTemplate.querySelector('.picture__comments').textContent = comments.length;
    clonePictureTemplate.querySelector('.picture__likes').textContent = likes;
    fragmentPictureTemplate.append(clonePictureTemplate);
    pictures.append(fragmentPictureTemplate);
  });

  return pictures;
};

export { miniaturesView };
