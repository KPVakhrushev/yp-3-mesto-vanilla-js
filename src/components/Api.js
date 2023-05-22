export default class Api {
  constructor({baseUrl, authorization}) {
    this._baseUrl = baseUrl;
    this._headers = {
      'authorization': authorization
    };
  }
  _get(url){
    return this._fetch('GET', url);
  }
  _patchJson(url, data){
    return this._fetch('PATCH', url, { 'Content-Type': 'application/json'}, JSON.stringify(data));
  }
  _postJson(url, data){
    return this._fetch('POST', url, { 'Content-Type': 'application/json'}, JSON.stringify(data));
  }
  _delete(url){
    return this._fetch('DELETE', url);
  }
  _put(url){
    return this._fetch('PUT', url);
  }
  _fetch(method, url, headers={}, body=null){
    const data =  {
      method: method,
      headers: Object.assign({},this._headers, headers)
    }
    if(body){
      data.body = body
    }
    const fetchPromise = fetch(this._baseUrl+url, data).then( (result)=> result.ok?result : Promise.reject(result));
    return fetchPromise;
    //return (new Promise(resolve => setTimeout(resolve, 1000))).then(()=>fetchPromise);
  }
  getCards() {
    return this._get('/cards').then(res=> res.json() );
  }
  getMe(){
    return this._get('/users/me').then(res=> res.json() );
  }
  updateMe({name, about}){
    //return (new Promise(resolve => setTimeout(resolve, 1000))).then(()=>Promise.reject('test error'));
    return  this._patchJson('/users/me', {name: name, about:about}).then(res=> res.json() );
  }
  addCard({name, link}){
    return this._postJson('/cards', {name: name, link:link}).then(res=> res.json() );
  }
  deleteCard(id){
    return this._delete(`/cards/${id}`).catch(error=>this._errorHandler(error))
  }
  updateMeAvatar(avatarDataObject){
    return this._patchJson('/users/me/avatar', avatarDataObject).then(res=> res.json() );
  }
  likeCard(id){
    return this._put(`/cards/${id}/likes`).then(res=> res.json() );
  }
  unlikeCard(id){
    return this._delete(`/cards/${id}/likes`).then(res=> res.json() );
  }

}
