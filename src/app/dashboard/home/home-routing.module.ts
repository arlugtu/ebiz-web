import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeChartComponent } from './components/chart/chart.component';
import { AuthGuard } from 'src/app/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chart',
    pathMatch: 'full',
  },
  {
    path: 'chart',
    component: HomeChartComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
