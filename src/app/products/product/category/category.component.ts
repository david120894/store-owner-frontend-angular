import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {CategoryDto} from "../../../models/category.dto";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryModalComponent} from "../category-modal/category-modal.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  currentListCategory: Array<CategoryDto>
  constructor(private readonly cdr: ChangeDetectorRef,
    private readonly ngModal:NgbModal,
    private readonly categoryService: CategoryService) {
  }
  ngOnInit() {
    this.getCategory()
  }

  getCategory() {
    this.categoryService.getCategory().subscribe({
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
