import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRatesComponent } from './Components/exchange-rates/exchange-rates.component';
const routes: Routes = [
  { path: '', redirectTo: 'ExchageRates', pathMatch: 'full' },
  { path: 'ExchageRates', component: ExchangeRatesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
