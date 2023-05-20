export default class Popup {
  constructor(config, handlers={}){
    this._config = config;
    this._handlers = handlers;
    this._setElements();
    this._setEventListeners();
  }
  _setElements(){
    this._element  = document.querySelector(this._config.selector);
    this._buttonClose = this._selectElement('buttonClose');
    this._handleEscape = this._handleEscape.bind(this);
  }
  _selectElement(elementName){
    return this._element.querySelector(this._config[elementName]);
  }

  open(){
    this._element.classList.add(this._config.opened);
    if(this._handlers.open){
      this._handlers.open();
    }
    document.addEventListener('keydown', this._handleEscape);
  }
  close(){
    this._element.classList.remove(this._config.opened);
    document.removeEventListener('keydown', this._handleEscape) ;
  }
  _handleEscape(e){
    if(e.key === 'Escape') this.close();
  }
  _setEventListeners(){
    /* handleClickOverlay */
    this._element.addEventListener('mousedown', (e) => {
      if(e.target === this._element){
        this.close();
      }
    });
    /* close button */
    this._buttonClose.addEventListener('click', this.close.bind(this))
  }
}
