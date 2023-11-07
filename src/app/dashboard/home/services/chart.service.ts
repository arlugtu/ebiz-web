import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl = Environment.apiURL;
  constructor(
    private httpClient: HttpClient
  ) { }

  getChartData() {
    return this.httpClient.get(this.apiUrl + '/chart/').pipe(
      map(response => {
        return response;
      })
    );
  }

  getRevenue(startDate: string, endDatae: string) {
    return this.httpClient.get(`${this.apiUrl}/chart/revenue?start_date=${startDate}&end_date=${endDatae}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getTimeRevenue(startDate: string, endDatae: string) {
    return this.httpClient.get(`${this.apiUrl}/chart/timely-revenue?start_date=${startDate}&end_date=${endDatae}`).pipe(
      map(response => {
        return response;
      })
    );
  }
}
