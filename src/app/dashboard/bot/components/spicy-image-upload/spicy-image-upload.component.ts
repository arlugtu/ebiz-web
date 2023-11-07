import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-spicy-image-upload',
  templateUrl: './spicy-image-upload.component.html',
  styleUrls: ['./spicy-image-upload.component.scss']
})
export class SpicyImageUploadComponent implements OnInit, AfterViewInit {
  @ViewChild('myPond') myPond: any;
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drag and drop or paste images here to upload',
    acceptedFileTypes: 'image/jpeg, image/png',
  };
  pondFiles = [];
  public showLoader = true;

  spacyTagForm = new FormGroup({
    spacyTags: new FormControl('', Validators.required)
  });

  constructor(
    private router: ActivatedRoute,
    private routers: Router,
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
    this.httpService.uploadSpicyBotImages(this.router.snapshot.queryParams['botUsername'], imageData).subscribe(response => {
      this.showLoader = false;
      // Swal.fire('Thank you...', 'Images Uploaded succesfully!', 'success')
      Swal.fire({
        title: 'Thank you...',
        text: 'Images Uploaded succesfully!',
        icon: 'success',
        background: '#0e1726',
      })
      this.routers.navigate(['dashboard/bot']);
    }, error => {
      this.showLoader = false;
    });   
  }
}
