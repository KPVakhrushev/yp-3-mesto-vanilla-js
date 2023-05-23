import "./index.css";

import  {selectors, classConfigs} from '../utils/constants.js';

import FormValidator  from '../components/FormValidator.js';
import Card           from '../components/Card.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section        from '../components/Section.js';
import UserInfo       from '../components/UserInfo.js';
import Api            from '../components/Api.js';
import PopupWithDialog from "../components/PopupWithDialog";

/* вспомогательные функции  */
const awaitPopupSubmit = function (popup, promise){
  popup.blockFormUntilPromise( promise.then(()=>popup.close()).catch(errorHandler));
  return promise;
}
const errorHandler = function(error){
  console.log(error);
  alert('Что-то пошло не так');
}
const getConfig = function(path){
  let parts = path.match(/[A-Z][a-z]+/g);
  let name = '';
  const recur = () => {
    if(!parts.length) return {};
    name+= parts.shift();
    return Object.assign({}, classConfigs[name]?classConfigs[name]:{}, recur());
  }
  return recur();
}

const cardRenderer = function(cardData){
  const card =  new Card( cardData, Object.assign({userId: userInfo.getUserId()}, classConfigs.Card),{
    'click':  (data) => popups.image.open(data),
    'clickDelete': (card)=> {
      popups.confirm.setHandler('confirm', ()=>{
        api.deleteCard(card.getId()).then(()=>{
          card.delete();
          popups.confirm.close();
        }).catch(errorHandler)
      });
      popups.confirm.open();
    },
    'clickLike':  (card) => {
      (card.isLiked()? api.unlikeCard(card.getId()): api.likeCard(card.getId()))
        .then(res => card.setData( res ))
        .catch(errorHandler);
    }
  });
  return card.getElement()
}
/* Экземпляры классов */
let cardsSection   = new Section(selectors.cards, cardRenderer);
const api          = new Api(classConfigs.Api);
const userInfo     = new UserInfo(classConfigs.UserInfo, {
  'clickEdit':       ()=>popups.edit.open(),
  'clickEditAvatar': ()=>popups.avatar.open()
});
const popups       = {
  image: new PopupWithImage(getConfig('PopupImage')),
  add:   new PopupWithForm(getConfig('PopupFormAdd'), {
    'submit': (cardData) => awaitPopupSubmit(popups.add,  api.addCard(cardData).then(data=>cardsSection.addItem(cardRenderer(data) )))
  }),
  edit:  new PopupWithForm(getConfig('PopupFormEdit'), {
    'open': ()=> popups.edit.setData(userInfo.getUserInfo()),
    'submit': userData => awaitPopupSubmit(popups.edit, api.updateMe(userData).then(userData=>userInfo.setUserInfo(userData)))
  }),
  confirm:  new PopupWithDialog(getConfig('PopupDialog')),
  avatar:  new PopupWithForm(getConfig('PopupFormAvatar') , {
    'open': ()=> popups.avatar.setData(userInfo.getUserInfo()),
    'submit': data =>awaitPopupSubmit(popups.avatar,  api.updateMeAvatar(data).then(data=>userInfo.setUserInfo(data)) )
  })
}

const editFormValidator    = new FormValidator(popups.edit.getForm(), classConfigs.FormValidator);
const addFormValidator     = new FormValidator(popups.add.getForm(), classConfigs.FormValidator);
const avatarFormValidator  = new FormValidator(popups.avatar.getForm(), classConfigs.FormValidator);

/** Валидация форм */
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/* загрузка данных  */
Promise.all([api.getMe(), api.getCards()])
  .then(results=>{
    userInfo.setUserInfo(results[0])
    cardsSection.setItems(results[1]).render()
  })
  .catch(errorHandler);

/* кнопка создания новой карточки */
document.querySelector(selectors.buttonAdd).addEventListener('click', () => popups.add.open());

/* костыль для того, чтобы не появлялись попапы при открытии страницы. По-другому пока не научили */
document.querySelector('.popups').classList.remove('page__hidden');
