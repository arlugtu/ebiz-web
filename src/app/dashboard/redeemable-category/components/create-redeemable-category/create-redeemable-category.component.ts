import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RedeemableCategoryService } from '../../services/redeemable-category.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redeemable-create-category',
  templateUrl: './create-redeemable-category.component.html',
  styleUrls: [
    './create-redeemable-category.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class CreateRedeemableCategoryComponent implements OnInit {

  public formGroup: FormGroup;
  public showLoader = false;


  constructor(
    private formBuilder: FormBuilder,
    private service: RedeemableCategoryService,
    public common: CommonService,
    private notif: NotifService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      category_id: new FormControl(''),
      category_name: new FormControl('', Validators.required),
    });
  }

  createData() {
    if (!this.formGroup.valid) {
      return;
    }

    this.showLoader = true;
    this.common.createData('redeemable-category', this.formGroup.value).subscribe(
      response => {
        this.showLoader = false;
        this.common.back();
        this.notif.success();
      }, error => {
        this.showLoader = false;
        this.notif.error('Unable to create category.');
      }
    );
  }

}
