import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'great-bin-frontend2';
  isLoggedIn = false;
  visible = false;
  correo!:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('ngOnInit ->' + this.isLoggedIn);
    this.correo='pollo@gmail.com'
  }

  handleLogout() {
    this.authenticationService.logout();
  }
  abrirmenu() {
    this.visible = !this.visible;
  }
}
