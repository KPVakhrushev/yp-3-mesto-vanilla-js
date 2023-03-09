let profileEditButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupCloseButton   = document.querySelector('.popup__close');
let popupForm    = document.querySelector('.popup__container');
let popupInputTitle    = document.querySelector('.popup__text-input[name="title"]');
let popupInputSubtitle = document.querySelector('.popup__text-input[name="subtitle"]');

function popupClose(){
  popup.classList.remove('popup_opened');
}
function popupClear(){
  popupInputTitle.value = '';
  popupInputSubtitle.value = '';
}
profileEditButton.addEventListener('click', function(evt){
  evt.preventDefault();
  popup.classList.add('popup_opened');
  popupInputTitle.value = profileTitle.textContent;
  popupInputSubtitle.value = profileSubtitle.textContent;
});
popupCloseButton.addEventListener('click', function(evt){
  evt.preventDefault();
  popupClose();
});
popupForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  popupClose();
});
