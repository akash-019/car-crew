import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private _http: HttpClient) { }
  //register
  submit(body: any) {
    return this._http.post('http://localhost:3000/register', body, {
      observe: 'body'
    });
  }
  //login
  login(body: any) {
    return this._http.post('http://localhost:3000/login', body, {
      observe: 'body'
    });
  }

  //forgot
  forgot(body: any) {
    return this._http.post('http://localhost:3000/forgot', body, {
      observe: 'body'
    });
  }


  //authenticate
  auth() {
    return this._http.get('http://localhost:3000/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  //adduser
  adduser(body) {
    return this._http.post('http://localhost:3000/Users/add', body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getuser
  getuser(body) {
    return this._http.get('http://localhost:3000/Users/' + body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getusers
  getusers() {
    return this._http.get('http://localhost:3000/Users/', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //edituser
  edituser(body, id) {
    return this._http.put('http://localhost:3000/Users/edit/' + id, body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //deleteuser  
  deleteuser(body) {
    return this._http.delete('http://localhost:3000/Users/delete/' + body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }





  //addservice
  addservice(body) {
    return this._http.post('http://localhost:3000/Services/add', body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getservice
  getservice(body) {
    return this._http.get('http://localhost:3000/Services/' + body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getservices
  getservices() {
    return this._http.get('http://localhost:3000/Services/', {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //editservice
  editservice(body, id) {
    return this._http.put('http://localhost:3000/Services/edit/' + id, body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //deleteservice  
  deleteservice(body) {
    return this._http.delete('http://localhost:3000/Services/delete/' + body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  servicebyid(body) {
    return this._http.get('http://localhost:3000/Services/servicebyid/' + body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  servicebyidrest(body) {
    return this._http.get('http://localhost:3000/Services/servicebyidrest/' + body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }




  //addservice
  addservicecategory(body) {
    return this._http.post('http://localhost:3000/ServiceCategories/add', body, {
      observe: 'body',
       params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getservice
  getservicecategory(body) {
    return this._http.get('http://localhost:3000/ServiceCategories/' + body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getservices
  getservicecategories() {
    return this._http.get('http://localhost:3000/ServiceCategories/', {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //editservice
  editservicecategory(body, id) {
    return this._http.put('http://localhost:3000/ServiceCategories/edit/' + id, body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //deleteservice  
  deleteservicecategory(body) {
    return this._http.delete('http://localhost:3000/ServiceCategories/delete/' + body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }





  //addbill
  addbill(body) {
    return this._http.post('http://localhost:3000/Bills/add', body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getservice
  getbill(body) {
    return this._http.get('http://localhost:3000/Bills/' + body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //getservices
  getbills() {
    return this._http.get('http://localhost:3000/Bills/', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //editservice
  editbill(body, id) {
    return this._http.put('http://localhost:3000/Bills/edit/' + id, body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  //deleteservice  
  deletebill(body) {
    return this._http.delete('http://localhost:3000/Bills/delete/' + body, {
      observe: 'body'
      , params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }


  //sendemail
  sendemail(body) {
    return this._http.get('http://localhost:3000/Bills/sendemail/' + body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
}
