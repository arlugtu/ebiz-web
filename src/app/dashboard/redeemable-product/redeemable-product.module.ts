import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemableProductComponent } from './redeemable-product.component';
import { AllRedeemableProductComponent } from './components/all-redeemable-product/all-redeemable-product.component';
import { RedeemableProductRoutingModule } from './redeemable-product-routing.module';
import { CreateRedeemableProductComponent } from './components/create-redeemable-product/create-redeemable-product.component';
import { UpdateRedeemableProductComponent } from './components/update-redeemable-product/update-redeemable-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    RedeemableProductComponent,
    AllRedeemableProductComponent,
    CreateRedeemableProductComponent,
    UpdateRedeemableProductComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RedeemableProductRoutingModule
  ]
})
export class RedeemableProductModule { }
