import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemableTransactionComponent } from './redeemable-transaction.component';
import { AllRedeemableTransactionComponent } from './components/all-redeemable-transaction/all-redeemable-transaction.component';
import { RedeemableTransactionRoutingModule } from './redeemable-transaction-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    RedeemableTransactionComponent,
    AllRedeemableTransactionComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RedeemableTransactionRoutingModule
  ]
})
export class RedeemableTransactionModule { }
