import {Component, Input, OnInit} from '@angular/core';
import {StoreDto} from "../../models/store.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-store-modal',
  templateUrl: './store-modal.component.html',
  styleUrl: './store-modal.component.scss'
})
export class StoreModalComponent implements OnInit {
  @Input() currentStore: StoreDto
  // Add any component logic here if needed
  constructor(public readonly ngActiveModal: NgbActiveModal,
              private readonly storeService: StoreService) {
    // Initialization code can go here
  }
  storeForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(null,Validators.required),
    address: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    created: new FormControl(''),
  }) // Initialize the form group
  get store() {
    return this.storeForm.controls
  }
  ngOnInit() {
    if (this.currentStore) {
      this.initForm()
    }
  }
  initForm() {
    this.storeForm.patchValue(this.currentStore)
  }

  saveUpdateStore() {
    if (this.storeForm.valid) {
      const store: StoreDto = this.storeForm.value
      const text = this.currentStore ? 'Tienda Actualizado correctamente' : 'Tienda Creado correctamente'
      const objectStore = this.currentStore ? this.storeService.updateStore(this.currentStore.id, store) : this.storeService.createStore(store)
      objectStore.subscribe({
        next: (response) => {
          if (response.success) {
            this.ngActiveModal.close('success')
            console.log(text)
          }
        },
        error: (error) => {
          console.error(error.error)
        }
      })
    }
  }

}
