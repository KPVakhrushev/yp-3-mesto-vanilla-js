export default class Card{
  constructor(cardData, config, handlers={}){
    this._config       = config;
    this._element      = config.template.cloneNode('true');
    this._image        = this._selectElement('image');
    this._likeButton   = this._selectElement('buttonLike');
    this._deleteButton = this._selectElement('buttonDelete');
    this._handlers     = handlers;
    this._setData(cardData);
    this._addListeners();
  }
  _setData(cardData){
    this._cardData = cardData
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._selectElement('title').textContent = cardData.name;
  }
  _selectElement(elementName){
    return this._element.querySelector(this._config[elementName]);
  }
  _addListeners(){
    this._likeButton.addEventListener('click', event => this.like());
    this._deleteButton.addEventListener('click', () => this.remove());

    this._image.addEventListener('error', event=> this._handleImageError(event));
    if(this._handlers.click){
      this._image.addEventListener('click', event => this._handlers.click(event));
    }
  }
  _handleImageError = function(event){
    this._cardData.link= event.target.src = this._config.noImageSrc;
  }

  getElement(){
    return this._element;
  }
  like(){
    this._likeButton.classList.toggle(this._config.likeActive);
  }
  remove(){
    this._element.remove();
    if(this._handlers.remove){
      this._handlers.remove(this._cardData);
    }
  }
}
