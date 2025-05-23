import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CrudModule} from 'src/app/modules/crud/crud.module';
import {SharedModule} from 'src/app/_metronic/shared/shared.module';
import {NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";
import {NgSelectComponent} from "@ng-select/ng-select";
import {NotFoundComponent} from "../../modules/not-found/not-found.component";
import {ProductModalComponent} from "./product-modal/product-modal.component";


@NgModule({
  declarations: [ProductComponent, CategoryComponent,
  ProductModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ]),
    CrudModule,
    SharedModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SweetAlert2Module.forChild(),
    NgSelectComponent,
    NotFoundComponent,
  ]
})
export class ProductModule {
}
