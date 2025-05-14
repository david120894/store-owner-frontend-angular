import {Component, Input, OnInit} from '@angular/core';
import {PersonDto} from "../../../models/person-dto";
import {NgbActiveModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service";
import {RolesService} from "../../../services/roles-service";
import {RolesDto} from "../../../models/roles-dto";
import {NgSelectComponent} from "@ng-select/ng-select";
import {UserDto} from "../../../models/user-dto";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgbTooltip,
    NgIf,
    NgSelectComponent
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  constructor(public readonly ngbActiveModal: NgbActiveModal,
              private readonly userService: UserService,
              private readonly rolesService: RolesService) {
  }

  showPassword = false

  @Input() person: PersonDto
  roles: Array<RolesDto>

  formGroupPerson: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    dni: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{8}$/)
    ]),
    address: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{9}$/)
    ]),
    email: new FormControl(null, Validators.required),
    roles: new FormControl(null, Validators.required),
  })

  get persons() {
    return this.formGroupPerson.controls
  }

  ngOnInit() {
    this.getRoles()
    if (this.person) {
      this.initPerson()
    }
  }

  getRoles() {
    this.rolesService.getRoles().subscribe({
      next: response => {
        if (response.success) {
          this.roles = response.data
          this.persons.roles.setValue([this.roles[0]])
        }
      }
    })
  }

  initPerson() {
    this.formGroupPerson.patchValue({
      id: this.person.id,
      firstName: this.person.firstName,
      lastName: this.person.lastName,
      dni: this.person.dni,
      address: this.person.address,
      city: this.person.city,
      phone: this.person.phone,
      email: this.person.email,
    })
  }

  createPerson() {
    const auxRoles=(this.persons.roles.value).map((element: RolesDto) =>
      element.name
    )
    const params: UserDto = {
      username: this.persons.username.value,
      password: this.persons.password.value,
      roles: auxRoles,
      person : {
        id: this.persons.id.value,
        firstName: this.persons.firstName.value,
        lastName: this.persons.lastName.value,
        dni: this.persons.dni.value,
        address: this.persons.address.value,
        phone: this.persons.phone.value,
        email: this.persons.email.value,
        city: this.persons.city.value,
      }
    }
    console.log(params)

    this.userService.createUser(params).subscribe({
      next: response => {
        if (response.success) {
          this.ngbActiveModal.close('success')
        }
      },
      error: error => {
        error.error(error.message)
      }
    })
  }

  updatePerson() {
    const currentBody: PersonDto = {
      id: this.persons.id.value,
      firstName: this.persons.firstName.value,
      lastName: this.persons.lastName.value,
      dni: this.persons.dni.value,
      address: this.persons.address.value,
      city: this.persons.city.value,
      phone: this.persons.phone.value,
      email: this.persons.email.value
    }
    this.userService.updateUser(this.persons.id.value, currentBody).subscribe({
      next: (response) => {
        this.ngbActiveModal.close('success')
      }
    })
  }
}
