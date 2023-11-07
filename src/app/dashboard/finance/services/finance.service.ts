import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = Environment.apiURL;
  constructor(
    private httpClient: HttpClient
  ) { }

  GetAllUserCategories() {
    return this.httpClient.get(this.apiUrl + '/finance/').pipe(map(response => {
        return response;
      })
    );
  }
  updatePrice(category,amount) {
    return this.httpClient.put(`${this.apiUrl}/finance/${category}`,amount).pipe(map(response => {
        return response;
      })
    );
  }
}
