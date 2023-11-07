import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productBotApiUrl = Environment.productBotApiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  createData(product: any) {
    return this.httpClient.post(`${this.productBotApiUrl}/product`, product).pipe(
      map(response => {
        return response;
      })
    );
  }

  getData(pageNumber: number = 0, pageSize: number = 0) {
    return this.httpClient.get(`${this.productBotApiUrl}/product?page=${pageNumber}&limit=${pageSize}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteData(id: string) {
    return this.httpClient.delete(`${this.productBotApiUrl}/product/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getInventoryByProductID(id: string) {
    return this.httpClient.get(`${this.productBotApiUrl}/inventory/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  uploadInventory(id: string, data: FormData) {
    return this.httpClient.post(`${this.productBotApiUrl}/inventory-upload/${id}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  downloadInventory(id: string) {
    return this.httpClient.get(`${this.productBotApiUrl}/inventory-download/${id}`, {responseType: 'blob'}).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteInventory(id: string) {
    return this.httpClient.delete(`${this.productBotApiUrl}/inventory/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
}
