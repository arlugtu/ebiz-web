import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    ProductComponent,
    AllProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
