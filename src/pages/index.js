console.log('dddddddddddddddddddd');
import "./index.css";

import  {selectors, classConfigs} from '../utils/constants.js';

import FormValidator  from '../components/FormValidator.js';
import Card           from '../components/Card.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section        from '../components/Section.js';
import UserInfo       from '../components/UserInfo.js';
import Api            from '../components/Api.js';

let cardForDelete;
/* вспомогательные функции  */
const errorHandler = function(error){
  console.log(" API ERROR ");
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
const prepareCardData = function(data){
  const currentUser = userInfo.getUserInfo();
  data.isLiked = data.likes.some(user=> user._id===currentUser._id);
  data.isOwner = currentUser._id === data.owner._id ;
  return data;
}
const cardRenderer = function(cardData){
  prepareCardData(cardData);
  const card =  new Card( cardData,  classConfigs.Card,{
    'click':  (data) => popups.image.open(data),
    'clickDelete': (card)=> {
      cardForDelete = card;
      popups.confirm.open();
    },
    'clickLike':  (card) => {
      const data = card.getData();
      (data.isLiked? api.unlikeCard(data._id): api.likeCard(data._id))
        .then(res => card.setData( prepareCardData(res)))
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
    'submit': (cardData) => api.addCard(cardData).then(data=>cardsSection.addItem( cardRenderer(data) )).catch(errorHandler)
  }),
  edit:  new PopupWithForm(getConfig('PopupFormEdit'), {
    'open': ()=> popups.edit.setData(userInfo.getUserInfo()),
    'submit': userData => api.updateMe(userData).then(userData=>userInfo.setUserInfo(userData)).catch(errorHandler)
  }),
  confirm:  new PopupWithForm(Object.assign(getConfig('PopupFormConfirm')), {
    'open': ()=> popups.edit.setData(userInfo.getUserInfo()),
    'submit': () => api.deleteCard(cardForDelete.getData()._id).then(()=>cardForDelete.delete()).catch(errorHandler)
  }),
  avatar:  new PopupWithForm(getConfig('PopupFormAvatar') , {
    'open': ()=> popups.avatar.setData(userInfo.getUserInfo()),
    'submit': data =>api.updateMeAvatar(data).then(data=>userInfo.setUserInfo(data)).catch(errorHandler)
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
