import Popup from '../components/Popup.js';

export default class PopupWithDialog extends Popup{
  _setElements(){
    super._setElements();
    this._buttons = this._element.querySelectorAll('button');
  }
  _setEventListeners(){
    /*
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._buttonSave.textContent = this._config.awaitTitle;
      this._buttonSave.disabled = true;
      this._handlers.submit(this._getInputValues()).then(()=>{
        this._buttonSave.disabled = false;
        this.close();
      });
    });
    */
    this._buttons.forEach(button => {
      if(button.name) button.addEventListener('click', (e)=>{
        if(this._handlers[button.name]) this._handlers[button.name]();
      });
    });
    super._setEventListeners();
  }
}
