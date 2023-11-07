import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-bots-by-user',
  templateUrl: './view-bots-by-user.component.html',
  styleUrls: ['./view-bots-by-user.component.scss']
})
export class ViewBotsByUserComponent implements OnInit {
  botsList:any = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private routers: Router,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.getBotsByUserId();
  }

  getBotsByUserId() {
    this.userService.getBotsByUserId(this.activateRoute.snapshot.queryParams['userId']).subscribe(response => {
      this.botsList = response;
    }, error => {
    });
  }

}
