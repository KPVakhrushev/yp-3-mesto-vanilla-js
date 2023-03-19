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
/* формы*/
const formEditProfile = document.querySelector('#form-edit-profile');
const formAddCard = document.querySelector('#form-add-card');
/* элементы image poppup*/
const popupImageImg = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
/* модальные окна */
const popupAddCard = formAddCard.closest('.popup');
const popupEditProfile = formEditProfile.closest('.popup');
const popupImage = popupImageImg.closest('.popup');
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

/* функции */
const addCard = function(name, link){
  const newElement = elementTemplate.cloneNode(true);
  const image = newElement.querySelector('.element__image');
  image.onerror = onErrorCardImage;
  image.src = link;
  image.alt = name;
  newElement.querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__like').addEventListener('click', event => likeCard(event.target));
  newElement.querySelector('.element__delete').addEventListener('click', event => removeCard(event.target));
  image.addEventListener('click', event => openPopupImage(event.target));
  document.querySelector('.elements').prepend(newElement);
};
const openPopup = function(popup){
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
const openPopupImage = function(image){
  popupImageImg.src = image.src;
  popupImageTitle.textContent = image.alt;
  openPopup(popupImage, true);
};

const closePopup = function(popup){
  popup.classList.remove('popup_opened');
};
const saveProfile = function(event){
  event.preventDefault();
  profileTitle.textContent = inputProfileTitle.value;
  profileSubtitle.textContent = inputProfileSubtitle.value;
  closePopup(popupEditProfile);
}
const saveCard = function(event){
  event.preventDefault();
  addCard(inputCardName.value, inputCardSrc.value);
  closePopup(popupAddCard);
};
const likeCard = function(button){
  button.classList.toggle('element__like_active');
};
const removeCard = function(card){
  card.closest('.element').remove();
};
const onErrorCardImage = function(event){
  event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
}

/* Обработка событий */
closeButtons.forEach(button => button.addEventListener('click', (event) => closePopup(event.target.closest('.popup')) ));
addButton.addEventListener('click', () => openPopupAddCard());
editButton.addEventListener('click', () => openPopupProfile());
formAddCard.addEventListener('submit', (event) => saveCard(event));
formEditProfile.addEventListener('submit', (event) => saveProfile(event));

initialCards.forEach(card => addCard(card.name, card.link));
