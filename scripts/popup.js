let openedPopup;

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

const openPopup = function(popup){
  document.addEventListener('keydown',handleEscape) ;
  openedPopup = popup;
  popup.classList.add('popup_opened');
};
const openPopupAddCard = function(){
  formAddCard.reset();
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
  openedPopup = null;
};


export {openPopup, openPopupAddCard, openPopupProfile, openPopupImage, closePopup, handleClickCloseButton, handleClickOverlay}
