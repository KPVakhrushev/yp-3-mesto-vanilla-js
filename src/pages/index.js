import "./index.css";

import  {selectors, classConfigs} from '../utils/constants.js';

import FormValidator  from '../components/FormValidator.js';
import Card           from '../components/Card.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section        from '../components/Section.js';
import UserInfo       from '../components/UserInfo.js';
import Api            from '../components/Api.js';

const api = new Api(classConfigs.Api);
const errorHandler = function(error){
  debugger;
  console.log(error);
}
const cardRenderer = function(cardData){
  return (new Card( cardData,  classConfigs.Card,{
    'click':  (data) => popups.image.open(data)
  } ) ).getElement()
}
const userInfo = new UserInfo(classConfigs.UserInfo, {'edit': ()=>popups.edit.open()});

/* Попапы  */
const popups = {
  image: new PopupWithImage(Object.assign({},classConfigs.Popup, classConfigs.PopupImage )),
  add:   new PopupWithForm(Object.assign({},classConfigs.Popup, classConfigs.PopupAdd ), {
    'submit': (cardData) => {
      elements.addItem( cardRenderer(cardData) );
    }
  }),
  edit:  new PopupWithForm(Object.assign({},classConfigs.Popup, classConfigs.PopupEdit ), {
    'open': ()=> popups.edit.setData(userInfo.getUserInfo()),
    'submit': userData => userInfo.setUserInfo(userData)
  })
}

/** Валидация форм */
const editFormValidator = (new FormValidator(popups.edit.getForm(), classConfigs.FormValidator));
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(popups.add.getForm(), classConfigs.FormValidator);
addFormValidator.enableValidation();

/* генератор карточек */
api.getInitialCards()
  .then(cards => {
    const elements = new Section( selectors.cards,  cards, cardRenderer);
    elements.render();
  })
  .catch(errorHandler)

/* кнопка создания новой карточки */
document.querySelector(selectors.buttonAdd).addEventListener('click', () => popups.add.open());

/* костыль для того, чтобы не появлялись попапы при открытии страницы. По-другому пока не научили */
document.querySelector('.popups').classList.remove('page__hidden');
