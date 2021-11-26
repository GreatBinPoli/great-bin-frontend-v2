import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() emailuser = new EventEmitter<string>();
  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private apps: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  handleLogin() {
    this.authenticationService
      .authenticationService(this.username, this.password)
      .subscribe(
        (result) => {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.apps.isLoggedIn = true;
          this.successMessage = 'Login Successful.';
          sessionStorage.setItem('key', this.username);
          this.router.navigate(['/home']);
        },
        () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
  }
}
