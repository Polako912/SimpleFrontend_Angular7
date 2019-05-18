import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginComponent} from './login/login.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }
  postUser(login: LoginComponent) {
    return this.http.post<LoginComponent>('localhost:5000/api/login', login, httpOptions)
      .pipe();
  }
  firstClick() {
    return console.log('clicked');
  }
}
