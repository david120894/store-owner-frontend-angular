import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {CategoryDto} from "../../../models/category.dto";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {NgSelectComponent} from "@ng-select/ng-select";
import {StoreService} from "../../../services/store.service";
import {StoreDto} from "../../../models/store.dto";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgbTooltip,
    NgClass,
    NgSelectComponent
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent implements OnInit{

  @Input() category:CategoryDto
  currentListStore: Array<StoreDto>
  constructor(public readonly ngbActiveModal: NgbActiveModal,
              private readonly storeService:StoreService,
              private readonly categoryService:CategoryService) {
  }

  formGroupCategory: FormGroup = new FormGroup({
    id: new FormControl(0),
    categoryName : new FormControl(null,Validators.required),
    categoryDescription: new FormControl(null, Validators.required),
    created: new FormControl(null),
    store: new FormControl(null, Validators.required)
  })

  get categories() {
    return this.formGroupCategory.controls
  }

  ngOnInit() {
    this.getStore()
    if (this.category) {
      this.initCategory()
    }
  }

  getStore(){
    this.storeService.getStore().subscribe({
      next:(response)=> {
        this.currentListStore = response.data
        this.categories.store.setValue(this.currentListStore[0])
      }
    })
  }

  initCategory(){
    this.formGroupCategory.patchValue({
      id: this.category.id,
      categoryName: this.category.categoryName,
      categoryDescription: this.category.categoryDescription,
      created: this.category.created,
      store: this.category.store
    })
  }
  updateCategory(){
    const params: CategoryDto = {
      categoryName: this.categories.categoryName.value,
      categoryDescription:this.categories.categoryDescription.value,
      store: {
        id: this.categories.store.value.id
      }
    }

    this.categoryService.updateCategory(this.categories.id.value,params).subscribe({
      next:(response)=> {
        if (response.success) {
          this.ngbActiveModal.close('success')
        }
      }
    })
  }
  createCategory() {

    if (this.formGroupCategory.invalid) {
      this.formGroupCategory.markAllAsTouched()
      return
    }

    const params: CategoryDto = {
      categoryName: this.categories.categoryName.value,
      categoryDescription:this.categories.categoryDescription.value,
      store: {
        id: this.categories.store.value.id
      }
    }

    this.categoryService.createCategory(params).subscribe({
      next:(response)=> {
        if (response.success) {
          this.ngbActiveModal.close('success')
        }
      }
    })
  }
}
