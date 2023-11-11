import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: [
    './update-product.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class UpdateProductComponent implements OnInit {

  public formGroup: FormGroup;
  public showLoader = false;

  private docId: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
    public common: CommonService,
    private notif: NotifService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let patternNumeric = '^[0-9]*|[0-9]*.[0-9]*$';
    this.formGroup = this.formBuilder.group({
      category_id: new FormControl(''),
      category_name: new FormControl({value: '', disabled: true}, Validators.required),
      description: new FormControl('', Validators.required),
      inventory: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$'),]),
      points: new FormControl(0, [Validators.required, Validators.pattern(patternNumeric),]),
      price: new FormControl(0, [Validators.required, Validators.pattern(patternNumeric),]),
      product_id: new FormControl(''),
      product_name: new FormControl('', Validators.required),
      subcategory_id: new FormControl(''),
      subcategory_name: new FormControl({value: '', disabled: true}, Validators.required),
    });

    this.route.paramMap.forEach((params: ParamMap) => {
      this.docId = params.get('id');
    })

    this.getData();
  }

  getData() {
    this.showLoader = true;
    let params = {
      id: this.docId
    };

    this.common.getData('product', params).subscribe(
      response => {
        this.showLoader = false;
        this.bindingData(response['result'][0]);
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to get product.');
      }
    )
  }

  updateData() {
    if (!this.formGroup.valid) {
      return;
    }

    this.showLoader = true;
    this.common.updateData('product', this.docId, this.formGroup.value).subscribe(
      response => {
        this.showLoader = false;
        this.common.back();
        this.notif.success();
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to update product.');
      }
    );
  }

  bindingData(data) {
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key).setValue(data[key]);
    })
  }

}
