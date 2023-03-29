const enableValidation = (Config) => {
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
  const forms = Array.from(document.querySelectorAll(Config.formSelector));
  forms.forEach(form=>setFormValidator(form, Config.inputSelector, Config.submitButtonSelector, Config.inactiveButtonClass, Config.inputErrorClass, Config.errorClass));
};
const setFormValidator = function(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass){
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  inputs.forEach(input=>setInputValidator(form, input, inputErrorClass, errorClass));
  const button = form.querySelector(submitButtonSelector);
  form.addEventListener('input', () => form.checkValidity()? enableSubmitButton(button,inactiveButtonClass): disableSubmitButton(button,inactiveButtonClass));
  form.addEventListener('reset', () =>{
    disableSubmitButton(button,inactiveButtonClass);
    inputs.forEach(input => hideInputError(input, getErrorElementForInput(form, input), inputErrorClass, errorClass));
  });
}
const setInputValidator = function(form, input, inputErrorClass, errorClass){
  const errorElement = getErrorElementForInput(form, input);
  input.addEventListener('input',  () => input.validity.valid ? hideInputError(input, errorElement, inputErrorClass, errorClass) : displayInputError(input, errorElement, input.validationMessage, inputErrorClass, errorClass) );

}
const getErrorElementForInput = function(form, input){
  return form.querySelector(`.${input.id}-error`);
}
const displayInputError = function(inputElement, errorElement, errorMessage, inputErrorClass, errorClass){
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
}
const hideInputError = function(inputElement, errorElement, inputErrorClass, errorClass){
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

const disableSubmitButton = function(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}
const enableSubmitButton  = function(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}
