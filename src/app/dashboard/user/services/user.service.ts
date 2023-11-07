import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = Environment.apiURL;
  constructor(
    private httpClient: HttpClient
  ) { }

  GetAllUserData(pageNumber: number, pageSize: number) {
    return this.httpClient.get(`${this.apiUrl}/users/?page=${pageNumber}&limit=${pageSize}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getBotsByUserId(userId) {
    return this.httpClient.get(`${this.apiUrl}/users/${userId}`).pipe(
      map(response => {
        return response;
      })
    );
  }
}
