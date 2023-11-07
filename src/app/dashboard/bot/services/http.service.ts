import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = Environment.apiURL;
  constructor(
    private httpClient: HttpClient
  ) { }

  getVoices() {
    return this.httpClient.get(`${this.apiUrl}/bots/voices/`).pipe(
      map(response => {
        let res: any = response;
        return res.voices.filter(voice => voice.labels.gender == 'female');
      })
    );
  }

  createBot(bot: any) {
    return this.httpClient.post(this.apiUrl + '/bots/', bot).pipe(
      map(response => {
        return response;
      })
    );
  }

  getBotPagination(pageNumber: number, pageSize: number) {
    return this.httpClient.get(`${this.apiUrl}/bots/?page=${pageNumber}&limit=${pageSize}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getBotByUsername(botUsername: any) {
    return this.httpClient.get(`${this.apiUrl}/bots/${botUsername}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateBot(botUsername: any, bot: any) {
    return this.httpClient.put(`${this.apiUrl}/bots/${botUsername}`, bot).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateStripApiKey(botUsername: string, paymentKey: string, verifyStatus: string) {
    return this.httpClient.post(`${this.apiUrl}/bots/payment-provider/${botUsername}`, { payment_key: paymentKey, verify_status: verifyStatus }).pipe(
      map(response => {
        return response;
      })
    );
  }

  uploadSpicyBotImages(botUsername: any, imageData: any) {
    return this.httpClient.post(`${this.apiUrl}/bots/images/${botUsername}`, imageData).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAllSpicyImage(botUsername: any) {
    return this.httpClient.get(`${this.apiUrl}/bots/images/${botUsername}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  startBot(botUsername: string) {
    return this.httpClient.get(`${this.apiUrl}/bots/start/${botUsername}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  stopBot(botUsername: string) {
    return this.httpClient.get(`${this.apiUrl}/bots/stop/${botUsername}`).pipe(
      map(response => {
        return response;
      })
    );
  }
}
