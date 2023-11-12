import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { RedeemableCategoryService } from '../../services/redeemable-category.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

export interface REDEEMABLE_CATEGORY {
  category_id: string;
  category_name: string;
}

@Component({
  selector: 'app-all-redeemable-category',
  templateUrl: './all-redeemable-category.component.html',
  styleUrls: [
    './all-redeemable-category.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class AllRedeemableCategoryComponent implements OnInit, AfterViewInit, AfterViewChecked {

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
    private service: RedeemableCategoryService,
    public common: CommonService,
    private notif: NotifService,
    @Inject(DOCUMENT) document: Document,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked() {

  }

  getData() {
    this.showLoader = true;
    this.common.getData('redeemable-category').subscribe(
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
        this.notif.error('Unable to get category.');
      }
    );
  }

  deleteData(id) {
    this.common.deleteData('redeemable-category', id).subscribe(
      response => {
        this.getData();
      },
      error => {
        this.notif.error('Failed to delete category.');
      }
    )
  }

}
