import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup{
  _setElements(){
    super._setElements();
    this._form      = this._element.querySelector('form');
    this._inputList = this._form.querySelectorAll('input');
    this._buttonSave = this._selectElement('buttonSave');
    this._buttonSaveTitle = this._buttonSave.textContent;
  }

  _getInputValues(){
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _setEventListeners(){
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._handlers.submit(this._getInputValues());
    });

    super._setEventListeners();
  }
  close(){
    this._form.reset();
    super.close();
  }
  setData(data){
    this._inputList.forEach(input => {
      if(data[input.name]){
        input.value = data[input.name];
      }
    });
  }
  getForm(){
    return this._form;
  }
  blockFormUntilPromise(promise){
    this._buttonSave.textContent = this._config.awaitTitle;
    this._buttonSave.disabled = true;
    this._inputList.forEach(input=>input.disabled = true);
    promise.finally(()=>{
      this._buttonSave.textContent = this._buttonSaveTitle;
      this._buttonSave.disabled = false;
      this._inputList.forEach(input=>input.disabled = false);
    });
  }
}
