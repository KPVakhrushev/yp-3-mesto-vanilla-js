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
let openedPopup;

/* функции */
const createCard = function(cardData){
  const newElement = elementTemplate.cloneNode(true);
  const likeButton = newElement.querySelector('.element__like');
  const image = newElement.querySelector('.element__image');
  image.addEventListener('error', handleErrorCardImage);
  image.src = cardData.link;
  image.alt = cardData.name;
  newElement.querySelector('.element__title').textContent = cardData.name;

  likeButton.addEventListener('click', event => likeCard(likeButton));
  newElement.querySelector('.element__delete').addEventListener('click', () => removeCard(newElement));
  image.addEventListener('click', event => openPopupImage(cardData));
  return newElement;
};
const renderCard = function(card){
  elements.prepend(card);
}
const saveCard = function(event){
  event.preventDefault();
  const newCard = createCard({
    name: inputCardName.value,
    link: inputCardSrc.value
  });
  renderCard(newCard);
  closePopup(popupAddCard);
};
const likeCard = function(button){
  button.classList.toggle('element__like_active');
};
const removeCard = function(card){
  card.closest('.element').remove();
};
const handleErrorCardImage = function(event){
  /* TODO remove old listeners */
  const card = event.target.addEventListener('click', event => openPopupImage({
    name: event.target.alt,
    link: event.target.src
  }));

  event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
}

const openPopup = function(popup){
  openedPopup = popup;
  popup.classList.add('popup_opened');
};
const openPopupAddCard = function(){
  inputCardName.value = '';
  inputCardSrc.value = '';
  openPopup(popupAddCard);
}
const openPopupProfile = function (){
  inputProfileTitle.value = profileTitle.textContent;
  inputProfileSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
};
const openPopupImage = function(imageData){
  popupImageImg.src = imageData.link;
  popupImageTitle.textContent = imageData.name;
  popupImageImg.alt = imageData.name;
  openPopup(popupImage);
};
const closePopup = function(popup){
  popup.classList.remove('popup_opened');
  openedPopup = undefined;
};
const saveProfile = function(event){
  event.preventDefault();
  profileTitle.textContent = inputProfileTitle.value;
  profileSubtitle.textContent = inputProfileSubtitle.value;
  closePopup(popupEditProfile);
}
const handleClickCloseButton = function(button) {
  button.addEventListener('click', () => closePopup(openedPopup) )
}
const handleEscape = function(e){
  if(e.key === 'Escape' && openedPopup){
    closePopup(openedPopup);
  }
}
const handleClickOverlay = function(popup){
  popup.addEventListener('click', (e) => {
    if(e.target === popup){
      closePopup(popup)
    }
  })
}

/* Обработка событий */
closeButtons.forEach(handleClickCloseButton);
addButton.addEventListener('click', () => openPopupAddCard());
editButton.addEventListener('click', () => openPopupProfile());
formAddCard.addEventListener('submit', (event) => saveCard(event));
formEditProfile.addEventListener('submit', (event) => saveProfile(event));
popups.forEach(handleClickOverlay);
document.addEventListener('keydown',handleEscape) ;

/* Добавление начальных карточек */
initialCards.forEach(card=> renderCard(createCard(card)));


