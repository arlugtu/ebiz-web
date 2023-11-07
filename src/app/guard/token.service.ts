import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(username, accessToken) {
    localStorage.setItem('honnies', accessToken);
    localStorage.setItem('username', username);
  }

  getTokenExpirationDate(accessToken): Date {
    if (accessToken.exp === undefined) {
      return null;
    } else {
      const date = new Date(0);
      date.setUTCSeconds(accessToken.exp);
      return date;
    }
  }

  isTokenExpired(): Boolean {
    const savedToken = this.getToken();
    if (savedToken) {
      const accessToken = jwt_decode(savedToken);
      const date = this.getTokenExpirationDate(accessToken);
      if (date === undefined) {
        return true;
      } else {
        return !(date.valueOf() > new Date().valueOf());
      }
    } else {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('honnies');
  }

  removeToken() {
    localStorage.removeItem('honnies');
    localStorage.removeItem('username');
  }
}
