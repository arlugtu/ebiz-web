import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { RedeemableProductService } from '../../services/redeemable-product.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';

export interface REDEEMABLE_PRODUCT {
  category_id: string;
  category_name: string;
  description: string;
  inventory: number;
  points: number;
  product_id: string;
  product_name: string;
}

@Component({
  selector: 'app-all-product',
  templateUrl: './all-redeemable-product.component.html',
  styleUrls: [
    './all-redeemable-product.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class AllRedeemableProductComponent implements OnInit, AfterViewInit, AfterViewChecked {

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
    private service: RedeemableProductService,
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
    this.common.getData('redeemable-product').subscribe(
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
    this.common.deleteData('redeemable-product', id).subscribe(
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
    let params = {
      product_id: id
    };

    this.common.getData('redeemable-inventory', params).subscribe(
      response => {
        this.inventories = response['result'] || [];
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

    this.common.uploadData('redeemable-inventory/upload', this.docId, data).subscribe(
      response => {
        $('#fileUpload').val('');
        if (response['status'] == 200) {
          if (response['inventory'] != undefined) {
            $(`#inventory-${this.docId}`).text(response['inventory']);
          }

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

  downloadFile(id, filename) {
    this.common.downloadData('redeemable-inventory/download', id).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', filename);
        a.click();
      },
      error => {
        this.notif.error('Unable to download inventory.');
      }
    )
  }

  deleteInventory(id) {
    this.common.deleteData('redeemable-inventory', id).subscribe(
      response => {
        this.inventories = this.inventories.filter((object) => {
          return object.inventory_id != id;
        })

        if (response['status'] == 200 && response['inventory'] != undefined) {
          $(`#inventory-${this.docId}`).text(response['inventory']);
        }
      },
      error => {
        this.notif.error('Failed to delete inventory.');
      }
    )
  }

}
