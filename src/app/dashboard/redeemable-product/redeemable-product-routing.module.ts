import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth-guard';
import { AllRedeemableProductComponent } from './components/all-redeemable-product/all-redeemable-product.component';
import { CreateRedeemableProductComponent } from './components/create-redeemable-product/create-redeemable-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AllRedeemableProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateRedeemableProductComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemableProductRoutingModule { }
