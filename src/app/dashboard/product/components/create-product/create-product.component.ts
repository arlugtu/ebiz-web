import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: [
    './create-product.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class CreateProductComponent implements OnInit {

  public formGroup: FormGroup;
  public showLoader = false;

  public categories: any = [];
  public categoriesJson: any = {};
  public subcategories: any = [];
  public subcategoriesJson: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
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
      price: new FormControl(0, [Validators.required, Validators.pattern(patternNumeric),]),
      product_id: new FormControl(''),
      product_name: new FormControl('', Validators.required),
      subcategory_id: new FormControl(''),
      subcategory_name: new FormControl('', Validators.required),
    });
    if (this.activateRouter.snapshot.queryParams['update']) {
      let docId = this.activateRouter.snapshot.queryParams['id'];
      let doc: any = JSON.parse(localStorage.getItem(docId));
      this.bindingData(docId);
    }

    this.formGroup.controls['category_id'].valueChanges.subscribe((event) => {
      this.getSubcategory(event);
    })
    this.formGroup.controls['subcategory_id'].valueChanges.subscribe((event) => {
      this.setSubcategory(event);
    })

    this.getCategory();
  }

  getCategory() {
    this.showLoader = true;
    this.common.getData('category').subscribe(
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

  getSubcategory(id=null) {
    let category = this.categoriesJson[id];
    if (category) {
      this.formGroup.get('category_name').setValue(category.category_name);
    }

    this.common.getData(`subcategory/${id}`).subscribe(
      response => {
        this.subcategories = response || [];
        this.subcategories.forEach((object) => {
          this.subcategoriesJson[object.subcategory_id] = object;
        })

        if (this.subcategories.length > 0) {
          this.formGroup.get('subcategory_id').setValue(this.subcategories[0].subcategory_id);
        } else {
          this.formGroup.get('subcategory_name').setValue('');
        }
      },
      error => {
        this.notif.error('Unable to get subcategory.');
      }
    )
  }

  setSubcategory(id) {
    let subcategory = this.subcategoriesJson[id];
    if (subcategory) {
      this.formGroup.get('subcategory_name').setValue(subcategory.subcategory_name);
    }
  }

  createData() {
    if (!this.formGroup.valid) {
      return;
    }

    this.showLoader = true;
    this.common.createData('product', this.formGroup.value).subscribe(
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
