import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { AllCategoryComponent } from './components/all-category/all-category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    CategoryComponent,
    AllCategoryComponent,
    CreateCategoryComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
