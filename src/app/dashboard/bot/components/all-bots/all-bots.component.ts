import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewBotDialogComponent } from '../../dialog/view-bot-dialog/view-bot-dialog.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-all-bots',
  templateUrl: './all-bots.component.html',
  styleUrls: ['./all-bots.component.scss']
})
export class AllBotsComponent implements OnInit, AfterViewInit {

  allBotData: any = [];
  formModal: any;
  public currentPage = 1;
  public pageSize = 10;
  public totalPageCount = 0;
  public totalRecordCount = 0;
  public haseNext = false;
  public hasPrevious = false;
  public showLoader = true;
  public teligramLink: string = 'https://t.me/';
  public isRunning: boolean = true;

  constructor(
    private router: Router,
    private httpService: HttpService,
    public viewBotDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllBotPagination(1, 10);
  }

  ngAfterViewInit(): void {
  }

  getAllBotPagination(pageNumber: number, pageSize: number) {
    this.showLoader = true;
    this.httpService.getBotPagination(pageNumber, pageSize).subscribe(response => {
      this.allBotData = response;
      this.setpaginationDetails(this.allBotData);
      this.showLoader = false;
    }, error => {
      this.showLoader = false;
    });
  }

  // navigate bot crete component
  botCreateOpen() {
    this.router.navigate(['dashboard/bot/create']);
  }

  editeBot(bots) {
    this.router.navigate(
      [`/dashboard/bot/create`],
      { queryParams: { bot_username: bots.bot_username } }
    );
  }

  openView(bots: any, verifyStatus: string) {
    const dialogRef = this.viewBotDialog.open(ViewBotDialogComponent, {
      minWidth: '60vw',
      data: {
        bot: bots,
        verifyStatus: verifyStatus,
        voice: {
          url: '',
          title: '',
          cover: ''
        }
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllBotPagination(this.currentPage, this.pageSize);
    });
  }

  setpaginationDetails(allBotData) {
    this.currentPage = allBotData.page;
    this.pageSize = allBotData.limit;
    this.totalRecordCount = allBotData.total;
    this.totalPageCount = Math.ceil(this.totalRecordCount / this.pageSize);

    if (this.currentPage == 1) {
      this.hasPrevious = false;
    } else {
      this.hasPrevious = true;
    }

    if (this.currentPage < this.totalPageCount) {
      this.haseNext = true;
    } else {
      this.haseNext = false;
    }

  }

  paginationButtonClick(pageNumber, pageSize) {
    this.getAllBotPagination(pageNumber, pageSize);
  }

  botAction(action: string, botUsername: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: this.isRunning ? 'Do you want to stop this bot?' : 'Do you want to stary this bot?',
      icon: 'warning',
      background: '#0e1726',
      showCancelButton: true,
      confirmButtonText: this.isRunning ? 'Yes, Stop' : 'Yes, Start',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if (action == 'start') {
          this.httpService.startBot(botUsername).subscribe(response => {
            this.isRunning = true;
            Swal.fire({
              title: 'Started!',
              text: 'Bot has been Started',
              icon: 'success',
              background: '#0e1726',
            });
          }, error => {
            this.isRunning = this.isRunning;
            Swal.fire({
              title: 'Unable to Start Bot!',
              text: ``,
              icon: 'error',
              background: '#0e1726',
            });
          });
        } else {
          this.httpService.stopBot(botUsername).subscribe(response => {
            this.isRunning = false;
            Swal.fire({
              title: 'Stopped!',
              text: 'Bot has been Stopped',
              icon: 'success',
              background: '#0e1726',
            });
          }, error => {
            this.isRunning = this.isRunning;
            Swal.fire({
              title: 'Unable to Stop Bot!',
              text: ``,
              icon: 'error',
              background: '#0e1726',
            });
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }

}
