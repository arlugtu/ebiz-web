import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  public currentPage = 1;
  public pageSize = 10;
  public totalPageCount = 0;
  public totalRecordCount = 0;
  public haseNext = false;
  public hasPrevious = false;
  public showLoader = true;
  allUsers: any = [];
  teligramLink = 'https://t.me/';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers(1, 10);
  }

  verifyBox() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be delete this user!',
      icon: 'warning',
      background: '#0e1726',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Deactivated!',
          text: 'User has been Deactivated.',
          icon: 'success',
          background: '#0e1726',
        });
        // Add logic to perform the delete action here
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled!',
          text: 'User is safe :)',
          icon: 'error',
          background: '#0e1726',
        });
      }
    });
  }

  getAllUsers(pageNumber: number, pageSize: number) {
    this.showLoader = true;
    this.userService.GetAllUserData(pageNumber, pageSize).subscribe(response => {
      this.showLoader = false;
      console.log(response);
      this.allUsers = response;
      this.setpaginationDetails(this.allUsers);
    }, error => {
      this.showLoader = false;
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
    this.getAllUsers(pageNumber, pageSize);
  }
}
