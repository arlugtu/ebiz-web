import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { PromotionService } from '../../services/promotion.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';

export interface PROMOTION {
  balance: Number;
  code: string;
  promotion_id: string;
  total_payout: Number;
  user_id: string;
}

@Component({
  selector: 'app-all-promotion',
  templateUrl: './all-promotion.component.html',
  styleUrls: [
    './all-promotion.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class AllPromotionComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public showLoader = false;
  public currentPage = 1;
  public pageSize = 10;
  public totalPageCount = 0;
  public totalRecordCount = 0;
  public hasNext = false;
  public hasPrevious = false;
  public allData: any = [];

  public settings: any = {};

  constructor(
    private router: Router,
    private service: PromotionService,
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
    this.showLoader = false;
    this.common.getData('promotion').subscribe(
      response => {
        this.getSettings();
        this.allData = response['result'] || [];
        this.showLoader = false;
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to get promotion.');
      }
    );
  }

  getSettings() {
    this.common.getData('promotion/settings').subscribe(
      response => {
        this.settings = response['result'] || {};
      },
      error => {
        this.notif.error('Unable to get settings.');
      }
    )
  }

  showModal(e) {
    let modal = new bootstrap.Modal(e, {});
    modal.show();
  }

  updateSettings() {
    this.showLoader = true;
    let data = {
      instructions: ($('#instructions').val().toString() || '').trim(),
      percentage: parseInt($('#percentage').val().toString()) || 0
    };

    this.common.createData('promotion/settings', data).subscribe(
      response => {
        this.showLoader = false;
        if (response['status'] == 200) {
          this.notif.success(response['message'] || '');
        } else {
          this.notif.error(response['message'] || '');
        }
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to update settings.');
      }
    )
  }

}
