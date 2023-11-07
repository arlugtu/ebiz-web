import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceRoutingModule } from './finance-routing.module';
import { PricePageComponent } from './components/price-page/price-page.component';
import { RouterModule } from '@angular/router';
import { FinanceComponent } from './finance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    PricePageComponent,
    FinanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FinanceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class FinanceModule { }
