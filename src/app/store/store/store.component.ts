import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StoreDto} from "../../models/store.dto";
import {StoreService} from "../../services/store.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StoreModalComponent} from "../store-modal/store-modal.component";

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
          this.cdr.detectChanges()
        }
      },
      error:(error)=> {
        console.error(error.error)
      }
    })
  }
  delete(idStore: number) {
    this.storeService.deleteStore(idStore).subscribe({
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
