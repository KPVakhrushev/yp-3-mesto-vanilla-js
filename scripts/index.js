const templates         = document.querySelector('#templates').content;
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle      = document.querySelector('.profile__title');
const profileSubtitle   = document.querySelector('.profile__subtitle');
const addButton         = document.querySelector('.profile__add-button');
const popup             = document.querySelector('.popup');
const popupCloseButton  = document.querySelector('.popup__close');
const popupForm         = document.querySelector('.popup__form');
const popupContainer    = document.querySelector('.popup__container');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const forms = {
  edit:{
    name: 'profile',
    action: '/save/profile/',
    title: 'Редактировать профиль',
    button: 'Сохранить',
    fields: {
      title: {
        placeholder: 'Введите ваше имя',
      },
      subtitle: {
        placeholder: 'Расскажите немного о себе',
      }
    },
    init: function (){
      forms.edit.fields.title.element.value    = profileTitle.textContent;
      forms.edit.fields.subtitle.element.value = profileSubtitle.textContent;
    },
    submit: function(event){
      event.preventDefault();
      const fields = forms.edit.fields;
      profileTitle.textContent    = fields.title.element.value;
      profileSubtitle.textContent = fields.subtitle.element.value;
      funcPopupClose();
    }
  },
  add:{
    name: 'addcard',
    action: '/add/card/',
    title: 'Новое место',
    button: 'Создать',
    fields: {
      name: {
        placeholder: 'Название'
      },
      src: {
        placeholder: 'Ссылка на картинку'
      }
    },
    init: () => {},
    submit: event => {
      event.preventDefault();
      funcAddCard(forms.add.fields.name.element.value, forms.add.fields.src.element.value);
      funcPopupClose();
    }
  }
}

const funcPopupClose     = function (){
  popup.classList.remove('popup_opened');
}
const funcCloneTemplate  = function (className, attrubutes=null){
  const newElement = templates.querySelector(className).cloneNode(true);
  if(attrubutes){
    for(const [name, value] of Object.entries(attrubutes)){
      newElement[name] = value;
    }
  }
  return newElement;
}
const funcAddCard        = function (name, link){
  newElement = funcCloneTemplate('.element');
  newElement.querySelector('.element__image').src = link;
  newElement.querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__like').addEventListener('click', event => event.target.classList.toggle('element__like_active') );
  document.querySelector('.elements').prepend(newElement);

  return newElement;
}
const functOpenForm      = function (formData){
  popup.classList.add('popup_opened');
  popupForm.name      = formData.name;
  popupForm.action    = formData.action;
  popupForm.innerHTML = '';

  popupForm.append(funcCloneTemplate('.popup__title', {textContent: formData.title}));
  let element;
  for(const [name, field] of Object.entries(formData.fields)){
    element = funcCloneTemplate('.popup__text-input', {name: name, placeholder: field.placeholder});
    popupForm.append(element);
    formData.fields[name].element = element;
  }
  const saveButton   = funcCloneTemplate('.popup__save-button', {textContent: formData.button, title: formData.button});
  saveButton.addEventListener('click', (event)=>formData.submit(event));
  popupForm.append(saveButton);
  formData.init();
}

profileEditButton.addEventListener('click', ()=>functOpenForm(forms.edit));
addButton.addEventListener('click', ()=>functOpenForm(forms.add));
popupCloseButton.addEventListener('click', funcPopupClose);
initialCards.forEach(card => funcAddCard(card.name, card.link));
