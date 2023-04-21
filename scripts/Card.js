import {openPopupImage} from './popup.js';
export default class Card{
  constructor(cardData, template){
    this._cardData = cardData
    this._element  = document.querySelector('#templates').content.querySelector(template).cloneNode('true');
    this._image    = this._element.querySelector('.element__image');
    this._likeButton   = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete')

    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._element.querySelector('.element__title').textContent = cardData.name;
    this._addListeners();
  }
  getElement(){
    return this._element;
  }
  like(){
    this._likeButton.classList.toggle('element__like_active');
  }
  remove(){
    this._element.closest('.element').remove();
  }
  _addListeners(){
    this._image.addEventListener('error', event=> this._handleImageError(event));
    this._likeButton.addEventListener('click', event => this.like());
    this._deleteButton.addEventListener('click', () => this.remove());
    this._image.addEventListener('click', event => openPopupImage(this._cardData));
  }

  _handleImageError = function(event){
    this._cardData.link= event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  }
}
