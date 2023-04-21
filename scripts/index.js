import FromValidator from './validator.js';
import Card from './card.js';
import  {openPopupAddCard, openPopupProfile, closePopup, handleClickCloseButton, handleClickOverlay} from './popup.js';


const saveProfile = function(event){
  event.preventDefault();
  profileTitle.textContent = inputProfileTitle.value;
  profileSubtitle.textContent = inputProfileSubtitle.value;
  closePopup(popupEditProfile);
}

const addCard = function(card){
  elements.prepend( (new Card(card, '.element')).getElement())
}
const createNewCard = function(event){
  event.preventDefault();
  addCard({
    name: inputCardName.value,
    link: inputCardSrc.value
  });
  closePopup(popupAddCard);
};

/* Обработка событий */
closeButtons.forEach(handleClickCloseButton);
addButton.addEventListener('click', () => openPopupAddCard());
editButton.addEventListener('click', () => openPopupProfile());
formAddCard.addEventListener('submit', (event) => createNewCard(event));
formEditProfile.addEventListener('submit', (event) => saveProfile(event));
popups.forEach(handleClickOverlay);

/* Добавление начальных карточек */
initialCards.forEach(card=> addCard(card));
(new FromValidator(formAddCard, paramsValidation)).enableValidation();
(new FromValidator(formEditProfile, paramsValidation)).enableValidation();

document.querySelector('.popups').classList.remove('page__hidden');
