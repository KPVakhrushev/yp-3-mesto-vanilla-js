import Popup from '../components/Popup.js';
/*
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
 */
export default class PopupWithForm extends Popup{
  _setElements(){
    super._setElements();
    this._form      = this._element.querySelector('form');
    this._inputList = this._form.querySelectorAll('input');
    this._buttonSave = this._selectElement('buttonSave');
    this._buttonSaveTitle = this._buttonSave.textContent;
  }
  /* приватный метод _getInputValues, который собирает данные всех полей формы.*/
  _getInputValues(){
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  /* Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.*/
  _setEventListeners(){
    if(!this._form) return; /* _setEventListeners  вызывается из конструктора родителя в тот момент когда _form еще не существует, поэтому тут условие, а в конце конструктора повторный вызов _setEventListeners  */

    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._buttonSave.textContent = this._config.awaitTitle;
      this._buttonSave.disabled = true;
      this._handlers.submit(this._getInputValues()).then(()=>{
        this._buttonSave.disabled = false;
        this.close();
      });
    });

    super._setEventListeners();
  }
  open(){
    this._buttonSave.textContent = this._buttonSaveTitle;
    super.open();
  }
  /* Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.*/
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
}
