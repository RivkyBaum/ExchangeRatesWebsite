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
  name?: string;
  code?: string;
  selectedCurrency?: Currency;
  exchangeRates: any[] = [];
  currenciesList = ['USD', 'EUR', 'GBP', 'CNY', 'ILS'];


  constructor(private exchangeRatesService: ExchangeRatesService) { }

  ngOnInit(): void {
   this.currencies = [
      { name: 'USD', code: 'USD', icon: PrimeIcons.DOLLAR },
      { name: 'EUR', code: 'EUR', icon: PrimeIcons.EURO },
      { name: 'GBP', code: 'GBP', icon: PrimeIcons.POUND },
      { name: 'CNY', code: 'CNY', icon: PrimeIcons.POUND },
      { name: 'ILS', code: 'ILS', icon: '₪' }
    ];
    
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
// mapExchangeRates(data: any, selectedCurrencyCode: string): any[] {
//   const currencies = ['USD', 'EUR', 'GBP', 'CNY', 'ILS'];
//   const mappedRates = [];

//   // הוספת מטבע הבסיס לכל איבר במפה
//   for (const currency of currencies) {
//     if (currency !== selectedCurrencyCode) {
//       mappedRates.push({
//         baseCurrency: data.base_code,
//         rates: {
//           [currency]: data.conversion_rates[currency]
//         }
//       });
//     }
//   }

//   return mappedRates;
// }
onCurrencySelect(): void {
  if(this.selectedCurrency){
    this.fetchExchangeRates(this.selectedCurrency.name);

  }
}

}
