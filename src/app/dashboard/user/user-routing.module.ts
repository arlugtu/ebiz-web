import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUserComponent } from './components/all-user/all-user.component';
import { ViewBotsByUserComponent } from './components/view-bots-by-user/view-bots-by-user.component';
import { AuthGuard } from 'src/app/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AllUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-list',
    component: ViewBotsByUserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
