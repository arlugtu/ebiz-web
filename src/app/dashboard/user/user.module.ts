import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { AllUserComponent } from './components/all-user/all-user.component';
import { ViewBotsByUserComponent } from './components/view-bots-by-user/view-bots-by-user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    AllUserComponent,
    ViewBotsByUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTooltipModule,
    FormsModule
  ]
})
export class UserModule { }
