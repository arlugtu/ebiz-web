import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private productBotApiUrl = Environment.productBotApiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  createData(url: string, data: any) {
    return this.httpClient.post(`${this.productBotApiUrl}/${url}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  getData(url: string, pageNumber: number = 0, pageSize: number = 0) {
    return this.httpClient.get(`${this.productBotApiUrl}/${url}?page=${pageNumber}&limit=${pageSize}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteData(url: string, id: string) {
    return this.httpClient.delete(`${this.productBotApiUrl}/${url}/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  uploadData(url: string, id: string, data: FormData) {
    return this.httpClient.post(`${this.productBotApiUrl}/${url}/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  downloadData(url: string, id: string) {
    return this.httpClient.get(`${this.productBotApiUrl}/${url}/${id}`, {responseType: 'blob'}).pipe(
      map(response => {
        return response;
      })
    );
  }

  toggleAccordion(id) {
    let element = document.getElementById(id);
    if (window.getComputedStyle(element).display == 'none') {
      element.classList.remove('hide-accordion-body');
      element.classList.add('show-accordion-body');
    } else {
      element.classList.add('hide-accordion-body');
      element.classList.remove('show-accordion-body');
    }
  }

  back() {
    window.history.back();
  }
}