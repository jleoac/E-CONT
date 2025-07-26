// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url: string = Global.url;

  constructor(private _http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', JSON.stringify(credentials), { headers });
  }
}
