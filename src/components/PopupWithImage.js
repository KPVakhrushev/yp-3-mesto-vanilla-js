import Popup from '../components/Popups.js';
/*
Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.
В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
export default class PopupWithImage extends Popup{
  constructor(config, handleres){
    super(config, handleres);
    this._image = this._selectElement('image');
    this._title = this._selectElement('imageTitle');
  }
  open({link, name}){
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;

    super.open();
  }
}
