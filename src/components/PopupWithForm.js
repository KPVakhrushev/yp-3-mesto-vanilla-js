import Popup from '../components/Popups.js';
/*
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
 */
export default class PopupWithForm extends Popup{
  constructor(config, handlers){
    super(config, handlers);
    this._form      = this._element.querySelector('form');
    this._inputList = this._form.querySelectorAll('input');
    this._setEventListeners();
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
    if(!this._form) return;

    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(this._handlers.submit)  this._handlers.submit(this._getInputValues());
      this.close();
    });

    super._setEventListeners();
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
