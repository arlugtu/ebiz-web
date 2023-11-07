import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth-guard';
import { AllCategoryComponent } from './components/all-category/all-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AllCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateCategoryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
