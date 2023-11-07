import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotComponent } from './bot.component';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BotRoutingModule } from './bot-routing.module';
import { AllBotsComponent } from './components/all-bots/all-bots.component';
import { CreateBotComponent } from './components/create-bot/create-bot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
// @ts-ignore
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
// @ts-ignore
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// @ts-ignore
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { ViewBotDialogComponent } from './dialog/view-bot-dialog/view-bot-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { UploadImgComponent } from './dialog/upload-img/upload-img.component';
import { BotViewComponent } from './components/bot-view/bot-view.component';
import { SpicyImageUploadComponent } from './components/spicy-image-upload/spicy-image-upload.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateType, FilePondPluginImagePreview)

@NgModule({
  declarations: [
    BotComponent,
    AllBotsComponent,
    CreateBotComponent,
    ViewBotDialogComponent,
    UploadImgComponent,
    BotViewComponent,
    SpicyImageUploadComponent
  ],
  imports: [
    CommonModule,
    BotRoutingModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    HttpClientModule,
    FilePondModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    SlickCarouselModule
  ]
})
export class BotModule { }
