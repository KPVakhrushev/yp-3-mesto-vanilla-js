/*
Класс Section отвечает за отрисовку элементов на странице
У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
*/

export default class Section {
  /*
  Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
  Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  */
  constructor(selector, renderer){
    this._items     = [];
    this._renderer  = renderer;
    this._selector  = selector;
    this._container = document.querySelector(selector);
  }
  setItems(items){
    this._items = items;
    return this;
  }
  render(){
    this._container.innerHTML = '';
    this._items.forEach(item => this._container.append(this._renderer(item)));
  }
  addItem(element){
    this._container.prepend(element);
  }
  removeItem(item){
    this._items = this._items.filter(_item=> !(_item === item));
  }
}
