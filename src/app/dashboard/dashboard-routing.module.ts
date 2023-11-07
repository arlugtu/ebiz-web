import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { BotComponent } from './bot/bot.component';
import { UserComponent } from './user/user.component';
import { FinanceComponent } from './finance/finance.component';
import { AuthGuard } from '../guard/auth-guard';
import { ProductComponent } from './product/product.component';

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
  },
  {
    path: 'product',
    component: ProductComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./product/product.module').then(
        (module) => module.ProductModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
