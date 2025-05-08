import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service";
import {UserResponseDto} from "../../../models/user-response-dto";
import {SharedModule} from "../../../_metronic/shared/shared.module";

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
              private readonly cdr: ChangeDetectorRef) {
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

  edit(id: number) {
    // this.aUser = this.apiService.getUser(id);
    // this.aUser.subscribe((user: IUserModel) => {
    //   this.userModel = user;
    // });
  }

  create() {
    // this.userModel = { id: 0, name: '', email: '', };
  }
}
