import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  public formGroup: FormGroup;
  public showLoader = false;


  constructor(
    private formBuilder: FormBuilder,
    private service: CategoryService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      category_id: new FormControl(''),
      category_name: new FormControl('', Validators.required),
      subcategory: [],
    });
    if (this.activateRouter.snapshot.queryParams['update']) {
      let docId = this.activateRouter.snapshot.queryParams['id'];
      let doc: any = JSON.parse(localStorage.getItem(docId));
      this.bindingData(docId);
    }
  }

  createData() {
    if (!this.formGroup.valid) {
      return;
    }

    this.showLoader = true;
    this.service.createData(this.formGroup.value).subscribe(
      response => {
        this.showLoader = false;
        this.back();
        Swal.fire({
          title: 'Success',
          icon: 'success',
          background: '#0e1726',
        });
      }, error => {
        this.showLoader = false;
        Swal.fire({
          title: 'Error!',
          text: 'Unable to create category. Please try again later',
          icon: 'error',
          background: '#0e1726',
        });
      }
    );
  }

  bindingData(data) {
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key).setValue(data[key]);
    })
  }

  back() {
    window.history.back();
  }

}
