import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  userSet!: User[];
  searchTerm!: string;
  constructor(private userService: UserService) {
    this.getUser();
  }

  ngOnInit(): void {
    this.refreshList();
  }

  getUser() {
    this.userService.getAll().subscribe(
      (data) => {
        this.userSet = data;
        console.log('otra cosa que quiero saber', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(documento: number): void {
    this.userService.delete(documento).subscribe(
      (data) => {
        alert("El usuario con documeto "+documento+" fue eliminado con exito")
        this.refreshList();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.getUser();
  }
}
