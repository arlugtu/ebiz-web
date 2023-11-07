import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from 'src/app/guard/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) { }

  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
      console.log(response);
      let data: any = response;
      // this.tokenService.saveToken(this.loginForm.value.username, data.access_token);
      this.router.navigateByUrl('/dashboard/home');
    });
  }

}
