import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit, AfterViewInit {
  
  @ViewChild('myPond') myPond: any;
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop file here',
    acceptedFileTypes: 'image/jpeg, image/png',
  };

  spacyTagForm = new FormGroup({
    spacyTags: new FormControl('', Validators.required)
  });

  pondFiles = [];
  public showLoader = true;

  constructor(
    public dialogRef: MatDialogRef<UploadImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.showLoader = false;
  }

  pondHandleInit() {
  }

  pondHandleAddFile(event: any) {
    this.pondFiles.push(this.myPond.getFile().getFileEncodeBase64String());
  }

  uloadImages() {
    this.showLoader = true;
    let tags = this.spacyTagForm.value.spacyTags;
    const imageData = {
      emotion_images: [
        {
          keywords: tags.split(','),
          images: this.pondFiles
        }
      ]
    };
    this.httpService.uploadSpicyBotImages(this.data.botusername, imageData).subscribe(response => {
      this.dialogRef.close();
      this.showLoader = false;
    }, error => {
      this.showLoader = false;
    });   
  }
}
