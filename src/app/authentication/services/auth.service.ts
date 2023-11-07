import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userManagementURL = Environment.userManagementURL;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.httpClient.post(`${this.userManagementURL}/token`, { username: username, password: password }).pipe(
      map(response => {
        return response;
      })
    );
  }
}
