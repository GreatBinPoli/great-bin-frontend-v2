import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Bag } from '../../model/bag';
import { SMS } from '../../model/sms';
import { UserService } from '../../services/user.service';
import { BagService } from '../../services/bag.service';
import { SMSService } from '../../services/sms.service';
import { WasteService } from '../../services/waste.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Waste, Recycling } from 'src/app/model/waste';

@Component({
  selector: 'app-list-bag',
  templateUrl: './list-bag.component.html',
  styleUrls: ['./list-bag.component.css'],
})
export class ListBagComponent implements OnInit {
  user = new User();
  bag = new Bag();
  sms = new SMS();
  recycling = new Recycling();
  water = new Waste();
  bagSet!: Bag[];
  waterSet!: Waste[];

  submitted = false;
  msgError = '';
  closeModal!: string;
  currentBag: any;
  currentwaster: any;
  currentIndex = -1;
  email: any;
  documento = 11111;
  currentUser!: User;
  constructor(
    private userService: UserService,
    private bagService: BagService,
    private sMSService: SMSService,
    private wasteService: WasteService,
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
  triggerModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-re' })
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
        const data2 = {
          phone_number: '+57' + this.currentUser.phone_number,
          body:
            ' Hola ' +
            this.currentUser.first_name +
            ', has agregado una nueva basura de tipo ' +
            this.bag.type +
            ' Recuerda que el día del recolección es los viernes.',
        };
        this.sMSService.EnviarSMS(data2).subscribe((data) => {
          console.log(data);
        });
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

    this.wasteService
      .getAll(this.currentUser.document_id, this.currentIndex)
      .subscribe(
        (data) => {
          this.waterSet = data;

          console.log('otra cosa que quiero saber', data);
          console.log('jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.waterSet);
        },
        (error) => {
          console.log(error);
        }
      );
      
    this.refreshList();
  }
  refreshList(): void {
    this.getBag();
  }

  mostrar() {
    this.getBag();
    this.wastersave();
  }
   wastersave(): void {
    const data = {
      name: this.water.name,
      description: this.water.description,
      Recycling: {
        code: this.recycling.code,
        recycling: this.recycling.recycling,
      },
    };

    this.wasteService
      .create(data, this.currentUser.document_id, 1)
      .subscribe(
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

 
}
