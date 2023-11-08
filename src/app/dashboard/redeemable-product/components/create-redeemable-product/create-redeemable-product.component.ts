import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RedeemableProductService } from '../../services/redeemable-product.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-redeemable-product',
  templateUrl: './create-redeemable-product.component.html',
  styleUrls: [
    './create-redeemable-product.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class CreateRedeemableProductComponent implements OnInit {

  public formGroup: FormGroup;
  public showLoader = false;

  public categories: any = [];
  public categoriesJson: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private service: RedeemableProductService,
    public common: CommonService,
    private notif: NotifService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let patternNumeric = '^[0-9]*|[0-9]*.[0-9]*$';
    this.formGroup = this.formBuilder.group({
      category_id: new FormControl(''),
      category_name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      inventory: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$'),]),
      points: new FormControl(0, [Validators.required, Validators.pattern(patternNumeric),]),
      product_id: new FormControl(''),
      product_name: new FormControl('', Validators.required),
    });
    if (this.activateRouter.snapshot.queryParams['update']) {
      let docId = this.activateRouter.snapshot.queryParams['id'];
      let doc: any = JSON.parse(localStorage.getItem(docId));
      this.bindingData(docId);
    }

    this.formGroup.controls['category_id'].valueChanges.subscribe((event) => {
      this.setCategory(event);
    })

    this.getCategory();
  }

  getCategory() {
    this.showLoader = true;
    this.common.getData('redeemable-category').subscribe(
      response => {
        this.showLoader = false;
        this.categories = response['result'] || [];
        this.categories.forEach((object) => {
          this.categoriesJson[object.category_id] = object;
        })

        if (this.categories.length > 0) {
          this.formGroup.get('category_id').setValue(this.categories[0].category_id);
        }
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to get category.');
      }
    )
  }

  setCategory(id) {
    let category = this.categoriesJson[id];
    if (category) {
      this.formGroup.get('category_name').setValue(category.category_name);
    }
  }

  createData() {
    if (!this.formGroup.valid) {
      return;
    }

    this.showLoader = true;
    this.common.createData('redeemable-product', this.formGroup.value).subscribe(
      response => {
        this.showLoader = false;
        this.common.back();
        this.notif.success();
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to create product.');
      }
    );
  }

  bindingData(data) {
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key).setValue(data[key]);
    })
  }

}
