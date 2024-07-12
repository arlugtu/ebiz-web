import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemableCategoryComponent } from './redeemable-category.component';
import { AllRedeemableCategoryComponent } from './components/all-redeemable-category/all-redeemable-category.component';
import { RedeemableCategoryRoutingModule } from './redeemable-category-routing.module';
import { CreateRedeemableCategoryComponent } from './components/create-redeemable-category/create-redeemable-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    RedeemableCategoryComponent,
    AllRedeemableCategoryComponent,
    CreateRedeemableCategoryComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RedeemableCategoryRoutingModule
  ]
})
export class RedeemableCategoryModule { }
