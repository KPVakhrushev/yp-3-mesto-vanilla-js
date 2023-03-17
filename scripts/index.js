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
let profileEditButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupCloseButton   = document.querySelector('.popup__close');
let popupForm    = document.querySelector('.popup__edit-form');
let popupInputTitle    = document.querySelector('#popup__text-input_title');
let popupInputSubtitle = document.querySelector('#popup__text-input_subtitle');


function popupClose(){
  popup.classList.remove('popup_opened');
}
profileEditButton.addEventListener('click', function(){
  popup.classList.add('popup_opened');
  popupInputTitle.value = profileTitle.textContent;
  popupInputSubtitle.value = profileSubtitle.textContent;
});
popupCloseButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  popupClose();
});

function addCard(name, link){
  const template   = document.querySelector('#card').content;
  const newElement = template.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__image').src = link;
  newElement.querySelector('.element__title').textContent = name;
  document.querySelector('.elements').append(newElement);
  return newElement;
}

initialCards.forEach(card => addCard(card.name, card.link));
