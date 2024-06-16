import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  private apiUrl = 'https://localhost:7127/api/ExchangeRates';

  constructor(private http: HttpClient) { }

  getCurrencyExchangeRates(currencyName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exchangeRates/${currencyName}`);

    
  }
}
