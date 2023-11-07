import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';

export interface PRODUCT {
  category_id: string;
  category_name: string;
  description: string;
  inventory: number;
  points: number;
  price: number;
  product_id: string;
  product_name: string;
  subcategory_id: string;
  subcategory_name: string;
}

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public showLoader = false;
  public currentPage = 1;
  public pageSize = 10;
  public totalPageCount = 0;
  public totalRecordCount = 0;
  public hasNext = false;
  public hasPrevious = false;
  public allData: any = [];

  public doc: any = {};
  public docId: string = '';
  public inventories: any = [];

  constructor(
    private router: Router,
    private service: ProductService,
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
          text: 'Unable to get products. Please Try Again Later',
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
          text: 'Failed to delete product.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    )
  }

  showModal(e, data) {
    this.doc = data;
    this.docId = data.product_id;
    this.getInventory(data.product_id);

    let modal = new bootstrap.Modal(e, {});
    modal.show();
  }

  getInventory(id=null) {
    this.service.getInventoryByProductID(id).subscribe(
      response => {
        this.inventories = response || [];
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Unable to get inventory. Please try again later.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    )
  }

  showFileUpload() {
    $('#fileUpload').click();
  }

  uploadFiles(event) {
    let files = event.target.files;
    if (files.length <= 0) {
      return;
    }

    let data = new FormData();
    [...Array(files.length).keys()].forEach((key) => {
      data.append('files', files[key]);
    })

    this.service.uploadInventory(this.docId, data).subscribe(
      response => {
        $('#fileUpload').val('');
        if (response['status'] == 200) {
          this.doc['inventory'] = this.doc.inventory + files.length;
          $(`#inventory-${this.docId}`).text(this.doc.inventory);

          this.getInventory(this.docId);
          Swal.fire({
            title: 'Success',
            icon: 'success',
            background: '#0e1726',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: response['message'] || '',
            icon: 'error',
            background: '#0e1726',
          });
        }
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Unable to upload inventory. Please try again later.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    )
  }

  downloadFile(id) {
    this.service.downloadInventory(id).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', 'test.txt');
        a.click();
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Unable to download inventory. Please try again later.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    )
  }

  deleteInventory(id) {
    this.service.deleteInventory(id).subscribe(
      response => {
        this.inventories = this.inventories.filter((object) => {
          return object.inventory_id != id;
        })

        if (response) {
          this.doc['inventory'] = this.doc.inventory - 1;
          $(`#inventory-${this.docId}`).text(this.doc.inventory);
        }
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete inventory.',
          icon: 'error',
          background: '#0e1726',
        });
      }
    )
  }

}
