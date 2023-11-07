import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/guard/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public isDropDownShow = false;

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

  }

  showDropDown() {
    if (this.isDropDownShow) {
      this.isDropDownShow = false;
    } else {
      this.isDropDownShow = true;
    }
  }

  logOut() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('/authentication/login');
  }

}
