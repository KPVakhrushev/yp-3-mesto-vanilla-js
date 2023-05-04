import "./index.css";

import  {initialCards, selectors, classConfigs} from '../utils/constants.js';

import FormValidator  from '../components/FormValidator.js';
import Card           from '../components/Card.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section        from '../components/Section.js';
import UserInfo       from '../components/UserInfo.js';

const userInfo = new UserInfo(classConfigs.UserInfo, {'edit': ()=>popups.edit.open()});

/** Попапы  */
const popups = {
  image: new PopupWithImage(Object.assign({},classConfigs.Popup, classConfigs.PopupImage )),
  add:   new PopupWithForm(Object.assign({},classConfigs.Popup, classConfigs.PopupAdd ), {
    'submit': (cardData) => {
      Elements.addItem( cardData );
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
const Elements = new Section( selectors.cards,  initialCards, cardData=> {
  return (new Card( cardData,  classConfigs.Card,{
    'click':  () => popups.image.open(cardData),
    'remove': (item)=> Elements.removeItem(item)
  } ) ).getElement()
});
Elements.render();

/* кнопка создания новой карточки */
document.querySelector(selectors.buttonAdd).addEventListener('click', () => popups.add.open());

/* костыль для того, чтобы не появлялись попапы при открытии страницы. По-другому пока не научили */
document.querySelector('.popups').classList.remove('page__hidden');
