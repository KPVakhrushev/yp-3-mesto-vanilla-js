export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _get(url){
    return this._fetch('GET', url);
  }
  _fetch(method, url, headers={}, body=null){
    const data =  {
      method: method,
      headers: Object.assign({},this._headers, headers)
    }
    if(body && method==='POST'){
      data.body = body
    }
    return fetch(this._baseUrl+ '/' + url, data);
  }
  getInitialCards() {
    return this._get('cards').then(res=> {
      if(res.ok) return res.json();
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }


  // другие методы работы с API
}
