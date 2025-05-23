import {Component, Input, OnInit} from '@angular/core';
import {ProductDto} from "../../../models/product.dto";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {CategoryDto} from "../../../models/category.dto";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {

  @Input() currentProduct: ProductDto
  currentListCategory: Array<CategoryDto> = []

  constructor(public readonly ngbActiveModal: NgbActiveModal,
              private readonly categoryService: CategoryService,
              private readonly productService: ProductService) {
  }

  productForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(null,Validators.required,),
    code: new FormControl(null,Validators.required),
    description: new FormControl(null,Validators.required),
    created: new FormControl(null),
    imageUrl: new FormControl(null),
    categoryDto: new FormControl(0,Validators.required)
  })
  get product() {
    return this.productForm.controls
  }
  ngOnInit() {
    this.getAllCategory()
  }

  getAllCategory() {
    this.categoryService.getCategory().subscribe({
      next: (response) => {
        this.currentListCategory = response.data
        this.productForm.get('categoryDto')?.setValue(response.data[0].id)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  save() {
    console.log('Formulario:', this.productForm.value);
    console.log('¿Es válido?', this.productForm.valid);
    if(this.productForm.invalid) {
      this.productForm.markAllAsTouched()
      return
    }
    const body: ProductDto = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      code: this.productForm.value.code,
      description: this.productForm.value.description,
      imageUrl: this.productForm.value.imageUrl,
      categoryDto: {
        id: this.productForm.value.categoryDto
      }
    }
    console.log('body:', body);
    this.productService.createProduct(body).subscribe({
      next: (response) => {
        this.currentProduct = response.data
        console.log('Producto creado:', this.currentProduct);
        this.ngbActiveModal.close('success')

      },
      error: (err) => {
        console.error(err)
      }
    })
    console.log('entro correcto')
  }

}
