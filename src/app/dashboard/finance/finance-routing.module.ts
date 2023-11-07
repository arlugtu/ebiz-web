import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricePageComponent } from './components/price-page/price-page.component';
import { AuthGuard } from 'src/app/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'price',
    pathMatch: 'full',
  },
  {
    path: 'price',
    component: PricePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
