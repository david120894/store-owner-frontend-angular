import {Component, Input, OnInit} from '@angular/core';
import {PersonDto} from "../../../models/person-dto";
import {NgbActiveModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service";
import {Person} from "../../../modules/auth/models/person.model";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    NgClass,
    JsonPipe,
    ReactiveFormsModule,
    NgbTooltip,
    NgIf
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{

  constructor(public readonly ngbActiveModal:NgbActiveModal,
              private readonly userService: UserService) {
  }

  @Input() person:PersonDto

  formGroupPerson: FormGroup = new FormGroup({
    id: new FormControl(null),
    lastName: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    dni: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
  })

  get persons() {
    return this.formGroupPerson.controls
  }
  ngOnInit() {
    if (this.person) {
      this.initPerson()
    }
  }

  initPerson() {
    this.formGroupPerson.setValue(this.person)
  }
  createPerson(){}

  updatePerson() {
    const body: PersonDto = this.formGroupPerson.value
    console.log(this.persons.id.value)
    this.userService.updateUser(this.persons.id.value,body).subscribe({
      next:(response) => {
        this.ngbActiveModal.close('success')
      }
    })


  }

}
