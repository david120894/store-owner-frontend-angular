import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {CategoryDto} from "../../../models/category.dto";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryModalComponent} from "../category-modal/category-modal.component";
import {StoreService} from "../../../services/store.service";
import {StoreDto} from "../../../models/store.dto";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  currentListCategory: Array<CategoryDto> = []
  currentListStore: Array<StoreDto>
  selectedStore: StoreDto
  constructor(private readonly cdr: ChangeDetectorRef,
    private readonly ngModal:NgbModal,
    private readonly categoryService: CategoryService,
              private readonly storeService: StoreService,) {
  }

  storeForm: FormGroup = new FormGroup({
    store: new FormControl(null),
  })
  ngOnInit() {
    this.getStore()
    // this.getCategory()
  }

  onCategorySelected(store: StoreDto) {
    this.selectedStore = store
    this.getCategory(this.selectedStore?.id)
  }

  getStore() {
    this.storeService.getStore().subscribe({
      next :(response)  => {
        this.currentListStore=response.data
        this.storeForm.get('store')?.setValue(this.currentListStore[3])
        this.onCategorySelected(this.currentListStore[3])
      },
      error:(err) => {

      }
    })
  }

  getCategory(idStore?:number) {
    if (!idStore) return
    this.categoryService.getCategoryByStoreId(idStore).subscribe({
      next :(response)  => {
        this.currentListCategory=response.data
        this.cdr.detectChanges()
      },
      error:(err) => {

      }
    })
  }

  delete(id?: number) {}
  openModal(category?: CategoryDto) {
    const modalRef = this.ngModal.open(CategoryModalComponent,{
      size:'lg',
      centered: true,
    })
    modalRef.componentInstance.category = category
    modalRef.closed.subscribe(response => {
      if (response==="success") {
        this.getCategory()
      }
    })
  }
}
