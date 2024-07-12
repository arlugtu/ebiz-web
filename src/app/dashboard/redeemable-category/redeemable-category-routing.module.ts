import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth-guard';
import { AllRedeemableCategoryComponent } from './components/all-redeemable-category/all-redeemable-category.component';
import { CreateRedeemableCategoryComponent } from './components/create-redeemable-category/create-redeemable-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AllRedeemableCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateRedeemableCategoryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemableCategoryRoutingModule { }
