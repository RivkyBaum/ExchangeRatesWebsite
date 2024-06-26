import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../Classes/Currency';
import { environment } from "src/environment";


@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  constructor(private http: HttpClient) { }

  getCurrencyExchangeRates(currencyName: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/exchangeRates/${currencyName}`); 
  }
  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<any>(`${environment.apiUrl}/AllCurrencies`);
  }
}
