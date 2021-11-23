import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user = new User();
  submitted = false;
  msgError = '';
  constructor(private userService: UserService, private router: Router) {
    // this.getDuenos();
  }

  ngOnInit(): void {}
  saveUser(): void {
    const data = {
      active: true,
      email: this.user.email,
      password: this.user.password,
      roles: 'ROLE_USER',
      address: this.user.address,
      neighbourhood: this.user.neighbourhood,
      bags: this.user.bags,
      document_id: this.user.document_id,
      document_type: this.user.document_type,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      phone_number: this.user.phone_number,
    };
    console.log('que contiene', this.user.email);
    this.userService.create(data).subscribe(
      (data) => {
        this.submitted = true;
        console.log(data);
      },
      (error) => {
        this.msgError = error.message + ' \n ' + error.error.message;
        console.log(error);
      }
    );
  }
  vover() {
    this.router.navigate(['/login']);
  }
}
