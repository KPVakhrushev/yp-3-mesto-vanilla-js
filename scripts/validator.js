export default class FromValidator{
  constructor (form, config){
    /**
     config sample:
     {
        formSelector: '.popup__form',
        inputSelector: '.popup__text-input',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__text-input_type_error',
        errorClass: 'popup__error_visible'
      }
     */
    this._config = config;
    this._form = form;
    this._submitButton = form.querySelector(config.submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(config.inputSelector));
    this._errorElements = {};
  }
  _addEventListeners(){
    this._form.addEventListener('input', () => {
      this._form.checkValidity()? this._enableSubmitButton(): this._disableSubmitButton()
    });
    this._form.addEventListener('reset', () =>{
      this._disableSubmitButton();
      this._inputs.forEach(input => this._hideError(input));
    });
    this._inputs.forEach(input=>{
      input.addEventListener('input',  () => {
        input.validity.valid ? this._hideError(input) : this._displayError(input, input.validationMessage)
      });
    });
  }
  _getErrorElement(input){
    if(!this._errorElements[input.name]){
      this._errorElements[input.name] = this._form.querySelector(`.${input.id}-error`);
    }
    return this._errorElements[input.name];
  }
  _displayError(input, errorMessage){
    input.classList.add(this._config.inputErrorClass);

    const errorElement = this._getErrorElement(input);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  _hideError(input){
    input.classList.remove(this._config.inputErrorClass);

    const errorElement = this._getErrorElement(input);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
  _disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _enableSubmitButton () {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  enableValidation(){
    this._addEventListeners();
  }
}
