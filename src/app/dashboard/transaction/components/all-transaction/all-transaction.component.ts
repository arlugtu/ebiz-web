import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

export interface TRANSACTION {
  amount: Number;
  product_name: string;
  quantity: Number;
  status: string;
  trackId: string;
}

@Component({
  selector: 'app-all-transaction',
  templateUrl: './all-transaction.component.html',
  styleUrls: [
    './all-transaction.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class AllTransactionComponent implements OnInit, AfterViewInit, AfterViewChecked {

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
    private service: TransactionService,
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
    this.common.getData('transaction').subscribe(
      response => {
        this.showLoader = false;
        this.allData = response['result'] || [];
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to get transaction.');
      }
    );
  }

}
