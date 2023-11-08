import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { RedeemableCategoryComponent } from './redeemable-category/redeemable-category.component';
import { RedeemableProductComponent } from './redeemable-product/redeemable-product.component';
import { BotComponent } from './bot/bot.component';
import { UserComponent } from './user/user.component';
import { FinanceComponent } from './finance/finance.component';
import { AuthGuard } from '../guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  {
    path: 'category',
    component: CategoryComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./category/category.module').then(
        (module) => module.CategoryModule
      ),
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then(
        (module) => module.HomeModule
      ),
  },
  {
    path: 'product',
    component: ProductComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./product/product.module').then(
        (module) => module.ProductModule
      ),
  },
  {
    path: 'redeemable-category',
    component: RedeemableCategoryComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./redeemable-category/redeemable-category.module').then(
        (module) => module.RedeemableCategoryModule
      ),
  },
  {
    path: 'redeemable-product',
    component: RedeemableProductComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./redeemable-product/redeemable-product.module').then(
        (module) => module.RedeemableProductModule
      ),
  },
  {
    path: 'user',
    component: UserComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user/user.module').then(
        (module) => module.UserModule
      ),
  },
  {
    path: 'bot',
    component: BotComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./bot/bot.module').then(
        (module) => module.BotModule
      ),
  },
  {
    path: 'finance',
    component: FinanceComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./finance/finance.module').then(
        (module) => module.FinanceModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
