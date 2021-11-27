import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Bag } from '../../model/bag';
import { UserService } from '../../services/user.service';
import { BagService } from '../../services/bag.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-bag',
  templateUrl: './list-bag.component.html',
  styleUrls: ['./list-bag.component.css'],
})
export class ListBagComponent implements OnInit {
  user = new User();
  bag = new Bag();
  bagSet!: Bag[];
  submitted = false;
  msgError = '';
  closeModal!: string;
  currentBag: any;
  currentIndex = -1;
  email: any;
  documento = 11111;
  currentUser!: User;
  constructor(
    private userService: UserService,
    private bagService: BagService,
    private modalService: NgbModal
  ) {
    this.retriUser();
  }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModals(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }
  triggerModal(ID: any) {
    this.modalService
      .open(ID, { ariaLabelledBy: 'modal-basic-sms' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  saveBag(): void {
    const data = {
      type: this.bag.type,
    };

    this.bagService.create(data, this.currentUser.document_id).subscribe(
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

  getBag() {
    this.bagService.getAll(this.currentUser.document_id).subscribe(
      (data) => {
        this.bagSet = data;
        console.log('otra cosa que quiero saber', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setActiveBag(bag: Bag, index: number): void {
    this.currentBag = bag;
    this.currentIndex = index;
    this.refreshList();
  }
  refreshList(): void {
    this.getBag();
  }
  enviar() {}
  mostrar() {
    this.getBag();
  }
}
