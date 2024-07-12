import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { AllPromotionComponent } from './components/all-promotion/all-promotion.component';
import { PromotionRoutingModule } from './promotion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    PromotionComponent,
    AllPromotionComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PromotionRoutingModule
  ]
})
export class PromotionModule { }
