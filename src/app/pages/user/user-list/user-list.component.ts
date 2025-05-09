import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service";
import {UserResponseDto} from "../../../models/user-response-dto";
import {SharedModule} from "../../../_metronic/shared/shared.module";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {PersonDto} from "../../../models/person-dto";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  userList: Array<UserResponseDto>

  constructor(private userService: UserService,
              private readonly cdr: ChangeDetectorRef,
              private readonly ngModal: NgbModal) {
  }

  ngOnInit() {
    this.getUserList()
  }

  getUserList() {
    this.userService.getUser().subscribe({
        next: data => {
          if (data.success) {
            this.userList = data.data
            this.cdr.detectChanges()
          }
        },
      error: err => {
        console.log(err.error)
      }
      }
    )
  }

  delete(id: number) {
    /*this.apiService.deleteUser(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });*/
  }

  openModal(currentPerson?: PersonDto) {
    const modalRef = this.ngModal.open(EditUserComponent,
      {
        centered: true,
        fullscreen:"lg",
        size: "lg"
      }
    )
    modalRef.componentInstance.person = currentPerson
    modalRef.result.then(response =>{
      if (response==='success') {
        this.getUserList()
        this.cdr.detectChanges()
      }
    })
  }

  create() {
    // this.userModel = { id: 0, name: '', email: '', };
  }

}
