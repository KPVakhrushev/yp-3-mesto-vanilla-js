const Template = {
  templates: document.querySelector('#templates').content,
  clone: selector => Template.templates.querySelector(selector).cloneNode(true)
}
const Popup = {
  content: null,
  element:  document.querySelector('.popup'),
  closeButton: document.querySelector('.popup__close'),
  container: document.querySelector('.popup__container'),
  open: content => {
    Popup.element.classList.add('popup_opened');
    Popup.container.append(content);
    Popup.content = content;
  },
  close: () => {
    Popup.element.classList.remove('popup_opened');
    Popup.content.remove();
  },
  init: () => {
    Popup.closeButton.addEventListener('click', Popup.close);
  }
}
const Profile = {
  form: Template.clone('.popup__form_action_edit'),
  editButton: document.querySelector('.profile__edit-button'),
  title: document.querySelector('.profile__title'),
  subtitle: document.querySelector('.profile__subtitle'),
  inputTitle: null,
  inputSubtitle: null,
  initFormFields: function(){
    Profile.inputTitle.value    = Profile.title.textContent;
    Profile.inputSubtitle.value = Profile.subtitle.textContent;
  },
  open: function(){
    Profile.initFormFields();
    Popup.open(Profile.form);
  },
  init: function(){
    Profile.inputTitle = Profile.form.querySelector('#input-profile-title'),
    Profile.inputSubtitle = Profile.form.querySelector('#input-profile-subtitle'),
    Profile.initFormFields();
    Profile.form.addEventListener('submit', (event)=>Profile.save(event));
    Profile.editButton.addEventListener('click', ()=>Profile.open(Profile.form));
  },
  save: function(event){
    event.preventDefault();
    Profile.title.textContent    = Profile.inputTitle.value;
    Profile.subtitle.textContent = Profile.inputSubtitle.value;
    Popup.close();
  }
}
const Cards = {
  form: Template.clone('.popup__form_action_add'),
  addButton: document.querySelector('.profile__add-button'),
  inputName: null,
  inputSrc: null,
  initial: [
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
  ],
  add: (name, link) => {
    newElement = Template.clone('.element');
    newElement.querySelector('.element__image').src = link;
    newElement.querySelector('.element__title').textContent = name;
    newElement.querySelector('.element__like').addEventListener('click',   event => Cards.like(event.target) );
    newElement.querySelector('.element__delete').addEventListener('click', event => Cards.remove(event.target) );
    document.querySelector('.elements').prepend(newElement);
  },
  save: (event) => {
    event.preventDefault();
    Cards.add(Cards.inputName.value, Cards.inputSrc.value);
    Popup.close();
  },
  init: () => {
    Cards.inputName = Cards.form.querySelector('#input-add-name');
    Cards.inputSrc = Cards.form.querySelector('#input-add-src');
    Cards.initial.forEach(card => Cards.add(card.name, card.link));
    Cards.form.addEventListener('submit', (event)=>Cards.save(event));
    Cards.addButton.addEventListener('click', ()=>Popup.open(Cards.form));
  },
  like: (button) => {
    button.classList.toggle('element__like_active');
  },
  remove: (card) => {
    card.closest('.element').remove();
  }
}

Popup.init();
Profile.init();
Cards.init();
