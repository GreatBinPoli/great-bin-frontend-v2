import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user!: String;
  email: any;
  currentUser: any;
  submitted = false;
  msgError = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retriUser();
  }
  retriUser(): void {
    this.email = sessionStorage.getItem('key');
    this.userService.buscaremail(this.email).subscribe(
      (data) => {
        this.currentUser = data;
        this.submitted = true;
        console.log(data);
      },
      (error) => {
        this.msgError = error.message + ' \n ' + error.error.message;
        console.log(error);
      }
    );
  }

  updateUser(): void {
    this.userService
      .update(this.currentUser.document_id, this.currentUser)
      .subscribe(
        (data) => {
          alert('datos actualizados corectamente');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
