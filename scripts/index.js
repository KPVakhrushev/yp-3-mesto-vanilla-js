/* Обработка событий */
closeButtons.forEach(handleClickCloseButton);
addButton.addEventListener('click', () => openPopupAddCard());
editButton.addEventListener('click', () => openPopupProfile());
formAddCard.addEventListener('submit', (event) => saveCard(event));
formEditProfile.addEventListener('submit', (event) => saveProfile(event));
popups.forEach(handleClickOverlay);

/* Добавление начальных карточек */
initialCards.forEach(card=> renderCard(createCard(card)));

/* разрешить валидацию форм */
enableValidation(paramsValidation);

/* скрыть transition opacity при открытии страницы */
document.querySelector('.popups').classList.remove('page__hidden');
