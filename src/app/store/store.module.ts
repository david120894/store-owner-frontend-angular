import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CrudModule} from 'src/app/modules/crud/crud.module';
import {SharedModule} from 'src/app/_metronic/shared/shared.module';
import {NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {CategoryComponent} from "../products/product/category/category.component";
import {StoreComponent} from "./store/store.component";
import {StoreModalComponent} from "./store-modal/store-modal.component";

@NgModule({
  declarations: [
    StoreComponent,
    StoreModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StoreComponent,
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
  ]
})
export class StoreModule {
}
