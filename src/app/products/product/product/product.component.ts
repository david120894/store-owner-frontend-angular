import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../services/product.service";
import {ProductDto} from "../../../models/product.dto";
import {ProductModalComponent} from "../product-modal/product-modal.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  currentListProduct: Array<ProductDto> = []
  selectedProduct: ProductDto
  constructor(private readonly ngModal: NgbModal,
              private readonly cdr: ChangeDetectorRef,
              private readonly productService: ProductService,) {
  }
  ngOnInit() {
    this.getProduct()
  }
  getProduct() {
    this.productService.getProduct().subscribe({
      next: (response) => {
        this.currentListProduct = response.data
        this.cdr.detectChanges()
      },
      error: (err) => {

      }
    })
  }
  openModal(product?: ProductDto) {
    const modalRef = this.ngModal.open(ProductModalComponent,
      { size: 'lg', centered: true});
    modalRef.componentInstance.currentProduct = product
    modalRef.result.then((result) => {
      if (result=== 'success') {
        this.getProduct()
      }
    }, (reason) => {
      // Handle modal close
    })
  }
  onImageClick(product: ProductDto) {
    this.selectedProduct = product
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    if (fileInput) {
      fileInput.click()
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.productService.uploadImage(this.selectedProduct.id, file).subscribe(response => {
        this.getProduct()
      })
    }
  }


  delete(idProduct: number) {
    // this.productService.deleteProduct(idProduct).subscribe({
    //   next: (response) => {
    //     this.getProduct()
    //   },
    //   error: (err) => {
    //
    //   }
    // })
  }

}
