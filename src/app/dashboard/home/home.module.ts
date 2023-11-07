import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeChartComponent } from './components/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    HomeComponent,
    HomeChartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgApexchartsModule
  ]
})
export class HomeModule { }
