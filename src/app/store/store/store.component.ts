import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StoreDto} from "../../models/store.dto";
import {StoreService} from "../../services/store.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreModalComponent} from "../store-modal/store-modal.component";
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit  {
  // Add any component logic here if needed
  currentListStore: StoreDto[] = []
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly ngModal: NgbModal,
    private readonly storeService: StoreService) {
    // Initialization code can go here
  }

  storeForm: FormGroup = new FormGroup({
    storeArray : new FormArray([])
  })
  get arrayStore() {
    return this.storeForm.get('storeArray') as FormArray
  }
  ngOnInit() {
    this.getStoreList()
  }

  openModal(store?  : StoreDto) {
    const modalRef = this.ngModal.open(StoreModalComponent, {
      size: 'lg',
      backdrop: 'static',
      centered: true,
      keyboard: true,
    })
      modalRef.componentInstance.currentStore = store
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.arrayStore.clear()
        this.getStoreList()
      }
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason)
    })
  }
  getStoreList() {
    this.storeService.getStore().subscribe({
      next:(response) => {
        if (response.success) {
          this.currentListStore = response.data
          this.initFormArrayStore(this.currentListStore)
          this.cdr.detectChanges()
        }
      },
      error:(error)=> {
        console.error(error.error)
      }
    })
  }
  initFormArrayStore(storeList: StoreDto[]) {
    storeList.forEach((store:StoreDto)=> {
      const form = new FormGroup({
        id:new FormControl(store.id),
        name: new FormControl(store.name),
        address: new FormControl(store.address),
        description: new FormControl(store.description),
        phone: new FormControl(store.phone),
        created: new FormControl(store.created),
        status: new FormControl()
      })
      this.arrayStore.push(form)
    })
  }
  changeStatus(store: AbstractControl) {
    const aux = store.get('status')?.value
    console.log(aux)
  }
  delete(idStore?: number) {
    this.storeService.deleteStore(idStore as number).subscribe({
      next:(response) =>{
        if (response.success) {
          this.getStoreList()
          console.log('Store delete successfully')
        }
      },
      error:(err)=>{
        console.error(err.error)
      }
    })
  }

}
