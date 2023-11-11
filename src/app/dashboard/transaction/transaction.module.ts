import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { AllTransactionComponent } from './components/all-transaction/all-transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    TransactionComponent,
    AllTransactionComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TransactionRoutingModule
  ]
})
export class TransactionModule { }
