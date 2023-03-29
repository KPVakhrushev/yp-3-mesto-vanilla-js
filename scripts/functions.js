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
  document.addEventListener('keydown',handleEscape) ;
  openedPopup = popup;
  popup.classList.add('popup_opened');
};
const openPopupAddCard = function(){
  formAddCard.reset();
  inputCardName.value = '';
  inputCardSrc.value = '';
  openPopup(popupAddCard);
}
const openPopupProfile = function (){
  formEditProfile.reset();
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
  document.removeEventListener('keydown',handleEscape) ;
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
  popup.addEventListener('mousedown', (e) => {
    if(e.target === popup){
      closePopup(popup)
    }
  })
}
