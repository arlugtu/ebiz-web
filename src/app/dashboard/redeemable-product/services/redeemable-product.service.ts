import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeemableProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

}
