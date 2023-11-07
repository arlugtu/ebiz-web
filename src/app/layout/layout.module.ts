import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    NavBarComponent,
    LeftSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [
    NavBarComponent,
    LeftSideBarComponent
  ]
})
export class LayoutModule { }
