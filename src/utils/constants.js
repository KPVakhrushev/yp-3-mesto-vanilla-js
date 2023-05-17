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
  },

  Api: {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      'authorization': 'aaeb6289-65cb-4609-9c4e-f2ae0dcd32fb',
      'Content-Type': 'application/json'
    }
  }}



export {selectors, classConfigs}
