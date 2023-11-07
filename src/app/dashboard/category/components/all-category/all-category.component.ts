import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

export interface CATEGORY {
  category_id: string;
  category_name: string;
}

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.scss']
})
export class AllCategoryComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public showLoader = false;
  public currentPage = 1;
  public pageSize = 10;
  public totalPageCount = 0;
  public totalRecordCount = 0;
  public hasNext = false;
  public hasPrevious = false;
  public allData: any = [];

  constructor(
    private router: Router,
    private service: CategoryService,
    @Inject(DOCUMENT) document: Document,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.getData();
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked() {

  }

  getData() {
    this.showLoader = false;
    this.service.getData().subscribe(
      response => {
        this.showLoader = false;
        this.allData = response['result'] || [];
        if (this.allData.length == 0) {
          let element = document.getElementById('allDataHeader');
          if (element) {
            element.textContent = 'No available data';
          }
        }
      },
      error => {
        this.showLoader = false;
        Swal.fire({
          title: 'Error!',
          text: 'Unable to get category. Please try again later.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    );
  }

  toggleAccordion(id) {
    let element = document.getElementById(id);
    if (window.getComputedStyle(element).display == 'none') {
      element.classList.remove('hide-accordion-body');
      element.classList.add('show-accordion-body');
    } else {
      element.classList.add('hide-accordion-body');
      element.classList.remove('show-accordion-body');
    }
  }

  deleteData(id) {
    this.service.deleteData(id).subscribe(
      response => {
        this.getData();
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete category.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    )
  }

  addSubcategory(data) {
    let subcategory = document.getElementById(`subcategory-${data.category_id}`);
    let _data = {
      category_id: data.category_id,
      subcategory_name: (subcategory['value'] || '').trim()
    };

    if (_data.subcategory_name) {
      this.service.createSubcategory(_data).subscribe(
        response => {
          this.showLoader = false;
          _data['subcategory_id'] = response['subcategory_id'];
          data['subcategory'] = data.subcategory || [];
          data['subcategory'].push(_data);
          subcategory['value'] = '';
          Swal.fire({
            title: 'Success',
            icon: 'success',
            background: '#0e1726',
          });
        },
        error => {
          this.showLoader = false;
          Swal.fire({
            title: 'Error!',
            text: 'Unable to create subcategory. Please try again later.',
            icon: 'error',
            background: '#0e1726',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a subcategory name.',
        icon: 'error',
        background: '#0e1726',
      });
    }
  }

  deleteSubcategory(data, id) {
    this.service.deleteSubcategory(id).subscribe(
      response => {
        data['subcategory'] = data.subcategory.filter((object) => {
          return object.subcategory_id != id;
        })
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete subcategory.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    )
  }

}
