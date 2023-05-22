/**
Класс UserInfo отвечает за управление отображением информации о пользователе на странице
 */
export default class UserInfo {
  /**Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе. */
  constructor( config, handlers ){
    this._element    = document.querySelector(config.selector);
    this._config     = config;
    this._handlers   = handlers;
    this._title      = this._selectElement('title');
    this._subtitle   = this._selectElement('subtitle');
    this._buttonEdit = this._selectElement('buttonEdit');
    this._avatar     = this._selectElement('avatar');
    this._buttonEditAvatar= this._selectElement('buttonEditAvatar');

    this._setEventListeners();
  }
  _selectElement(elementName){
    return this._element.querySelector(this._config[elementName]);
  }
  _setEventListeners(){
    if(this._handlers.clickEdit){
      this._buttonEdit.addEventListener('click', this._handlers.clickEdit);
    }
    if(this._handlers.clickEditAvatar){
      this._buttonEditAvatar.addEventListener('click', this._handlers.clickEditAvatar);
    }
  }
  /** Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.  */
  setUserInfo(info){
    this._user = info;
    this._title.textContent = info.name;
    this._subtitle.textContent = info.about;
    this._avatar.src = info.avatar;
    return info;
  }
  /**публичный метод getUserInfo, возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии. */

  getUserInfo(){
    return this._user;
  }
  getUserId(){
    return this._user._id;
  }
}
