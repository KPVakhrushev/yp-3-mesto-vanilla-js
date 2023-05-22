export default class Card{
  constructor(cardData, config, handlers={}){
    this._config       = config;
    this._element      = document.querySelector(config.template).content.querySelector(config.selector).cloneNode('true');
    this._title        = this._selectElement('title');
    this._image        = this._selectElement('image');
    this._likeButton   = this._selectElement('buttonLike');
    this._deleteButton = this._selectElement('buttonDelete');
    this._handlers     = handlers;
    this.setData(cardData);
    this._addListeners();
  }
  _selectElement(elementName){
    return this._element.querySelector(this._config[elementName]);
  }
  _addListeners(){
    this._likeButton.addEventListener('click', () => this._handlers.clickLike(this));
    if(this._deleteButton)this._deleteButton.addEventListener('click', () => this._handlers.clickDelete(this));
    this._image.addEventListener('error', event=> this._handleImageError(event));
    this._image.addEventListener('click', event => this._handlers.click(this._cardData));
  }
  _handleImageError = function(event){
    this._cardData.link= event.target.src = this._config.noImageSrc;
  }

  setData(cardData){
    this._cardData = cardData
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._title.textContent = cardData.name;
    this._likeButton.textContent = cardData.likes.length;
    if(this._config.userId !== this._cardData.owner._id && this._deleteButton){
      this._deleteButton.remove();
    }
    this.isLiked()? this._likeButton.classList.add(this._config.likeActive): this._likeButton.classList.remove(this._config.likeActive);
  }
  isLiked(){
    return this._cardData.likes.some(user=> user._id===this._config.userId)
  }
  getData(){
    return this._cardData;
  }
  getElement(){
    return this._element;
  }
  delete(){
    this._element.remove();
  }
  getId(){
    return this._cardData._id;
  }
}
