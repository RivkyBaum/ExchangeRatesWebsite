import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ExchangeRatesService } from 'src/app/service/ExchangeRates.service';
interface Currency {
  name: string;
  code: string;
  icon:string
}
@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})

export class ExchangeRatesComponent implements OnInit{
  currencies?: any[];
  selectedCurrency?: Currency;
  exchangeRates: any[] = [];
  constructor(private exchangeRatesService: ExchangeRatesService) { }

  ngOnInit(): void {
    this.exchangeRatesService.getAllCurrencies().subscribe(
      (data)=>{
        console.log(data); 
        this.currencies=data;    
      },
      (error)=>{
          console.log(error);
          
      }
    )    
}
onCurrencySelect(): void {
  if(this.selectedCurrency){
    this.fetchExchangeRates(this.selectedCurrency.name);

  }
}
fetchExchangeRates(currencyName: string): void {
  this.exchangeRatesService.getCurrencyExchangeRates(currencyName)
    .subscribe(
      (data) => {
        console.log('Exchange rates:', data);
        this.exchangeRates = this.mapExchangeRates(data);
        console.log(this.exchangeRates);
        
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
}
//Mapping only the 5 currencies to array
mapExchangeRates(data: any): any[] {
  const filteredRates = [];
  const excludedCurrency = this.selectedCurrency?.code;

  for (const [currency, rate] of Object.entries(data.conversion_rates)) {
    if (currency !== excludedCurrency && ['USD', 'EUR', 'GBP', 'CNY', 'ILS'].includes(currency)) {
      filteredRates.push({
        currency,
        rate
      });
    }
  }
  return filteredRates;
}

}
