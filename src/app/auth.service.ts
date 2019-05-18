import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { JwtResponse } from './models/JwtResponse';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  AUTH_SERVER = 'https://localhost:5001/api';
  authSubject  =  new  BehaviorSubject(false);
  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/registeruser`, user).pipe(
      tap((res: JwtResponse ) => {

        if (res.user) {
          localStorage.set('ACCESS_TOKEN', res.user.access_token);
          localStorage.set('EXPIRES_IN', res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }
  signIn(user: User): Observable<JwtResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER}/loginuser`, user).pipe(
      tap(async (res: JwtResponse) => {

        if (res.user) {
          localStorage.setItem('ACCESS_TOKEN', res.user.access_token);
          localStorage.setItem('EXPIRES_IN', String(res.user.expires_in));
          this.authSubject.next(true);
        }
      })
    );
  }
  public signOut() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    this.authSubject.next(false);
  }
  isAuthenticated() {
    return  this.authSubject.asObservable();
  }
  public login(userInfo: User) {
    localStorage.setItem('ACCESS_TOKEN', 'access_token');
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
