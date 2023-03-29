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
const elementTemplate = document.querySelector('#templates').content.querySelector('.element');
const elements = document.querySelector('.elements');
/* модальные окна */
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupAddCard = document.querySelector('.popup_content_add-card');
const popupImage = document.querySelector('.popup_content_image');
/* формы*/
const formEditProfile = popupEditProfile.querySelector('#form-edit-profile');
const formAddCard = popupAddCard.querySelector('#form-add-card');
/* элементы image poppup*/
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
/* ввод данных */
const inputProfileTitle = formEditProfile.querySelector('#input-profile-title');
const inputProfileSubtitle = formEditProfile.querySelector('#input-profile-subtitle');
const inputCardName = formAddCard.querySelector('#input-card-name');
const inputCardSrc = formAddCard.querySelector('#input-card-src');
/* кнопки */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
/* данные профиля */
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const paramsValidation = {
  formSelector:        '.popup__form',
  inputSelector:       '.popup__text-input',
  submitButtonSelector:'.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass:     'popup__text-input_type_error',
  errorClass:          'popup__error_active'
}
