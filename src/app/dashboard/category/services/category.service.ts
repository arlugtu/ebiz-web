import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private productBotApiUrl = Environment.productBotApiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  createData(data: any) {
    return this.httpClient.post(`${this.productBotApiUrl}/category`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  getData(pageNumber: number = 0, pageSize: number = 0) {
    return this.httpClient.get(`${this.productBotApiUrl}/category?page=${pageNumber}&limit=${pageSize}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteData(id: string) {
    return this.httpClient.delete(`${this.productBotApiUrl}/category/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  createSubcategory(data: any) {
    return this.httpClient.post(`${this.productBotApiUrl}/subcategory`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  getSubcategoryByCategoryID(id: string) {
    return this.httpClient.get(`${this.productBotApiUrl}/subcategory/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteSubcategory(id: string) {
    return this.httpClient.delete(`${this.productBotApiUrl}/subcategory/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
}
