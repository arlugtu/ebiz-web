import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBotsComponent } from './components/all-bots/all-bots.component';
import { BotViewComponent } from './components/bot-view/bot-view.component';
import { CreateBotComponent } from './components/create-bot/create-bot.component';
import { SpicyImageUploadComponent } from './components/spicy-image-upload/spicy-image-upload.component';
import { AuthGuard } from 'src/app/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AllBotsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateBotComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    component: BotViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'uploadImage',
    component: SpicyImageUploadComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotRoutingModule { }
