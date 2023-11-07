import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-view-bot-dialog',
  templateUrl: './view-bot-dialog.component.html',
  styleUrls: ['./view-bot-dialog.component.scss'],
})
export class ViewBotDialogComponent implements OnInit{
  public showLoader = true;
  public verifyStripeApiKeyFormGroup = new FormGroup({
    payment_key: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<ViewBotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
  ) {}

  ngOnInit(): void {
    this.showLoader = false;
  }

  verfyBot() {
    this.showLoader = true;
    this.httpService.updateStripApiKey(this.data.bot.bot_username, this.verifyStripeApiKeyFormGroup.value.payment_key, this.data.verifyStatus).subscribe(response => {
      this.dialogRef.close();
      this.showLoader = false;
    }, error => {
      this.showLoader = false;
    });
  }
}
