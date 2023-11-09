import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
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
  styleUrls: [
    './all-product.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
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
    public common: CommonService,
    private notif: NotifService,
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
    this.common.getData('product').subscribe(
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
        this.notif.error('Unable to get product.');
      }
    );
  }

  deleteData(id) {
    this.common.deleteData('product', id).subscribe(
      response => {
        this.getData();
      },
      error => {
        this.notif.error('Failed to delete product.');
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
    this.common.getData(`inventory/${id}`).subscribe(
      response => {
        this.inventories = response || [];
      },
      error => {
        this.notif.error('Unable to get inventory.');
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

    this.common.uploadData('inventory-upload', this.docId, data).subscribe(
      response => {
        $('#fileUpload').val('');
        if (response['status'] == 200) {
          $(`#inventory-${this.docId}`).text(response['inventory'] || 0);

          this.getInventory(this.docId);
          this.notif.success();
        } else {
          this.notif.error(response['message'] || '');
        }
      },
      error => {
        this.notif.error('Unable to upload inventory.');
      }
    )
  }

  downloadFile(id) {
    this.common.downloadData('inventory-download', id).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', 'test.txt');
        a.click();
      },
      error => {
        this.notif.error('Unable to download inventory.');
      }
    )
  }

  deleteInventory(id) {
    this.common.deleteData('inventory', id).subscribe(
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
        this.notif.error('Failed to delete inventory.');
      }
    )
  }

}
