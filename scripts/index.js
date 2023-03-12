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
