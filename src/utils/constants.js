const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const selectors = {
  cards:            '.elements',
  buttonAdd:        '.profile__add-button',
};
const classConfigs = {
  Card: {
    selector:     '.element',
    template:     '#templates',
    image:        '.element__image',
    buttonLike:   '.element__like',
    buttonDelete: '.element__delete',
    title:        '.element__title',
    likeActive:   'element__like_active',
    noImageSrc:   'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
  },
  Popup:{
    opened:      'popup_opened',
    buttonClose: '.popup__close-button'
  },
  PopupEdit:{
    selector:    '.popup_content_edit-profile',
  },
  PopupAdd:{
    selector:    '.popup_content_add-card',
  },
  PopupImage:{
    selector:    '.popup_content_image',
    image:       '.popup__image',
    imageTitle:  '.popup__image-title',
  },
  UserInfo:{
    selector:   '.profile',
    title:      '.profile__title',
    subtitle:   '.profile__subtitle',
    buttonEdit: '.profile__edit-button'
  },
  FormValidator:{
    formSelector:        '.popup__form',
    inputSelector:       '.popup__text-input',
    submitButtonSelector:'.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass:     'popup__text-input_type_error',
    errorClass:          'popup__error_active'
  }
}

export {initialCards, selectors, classConfigs}
