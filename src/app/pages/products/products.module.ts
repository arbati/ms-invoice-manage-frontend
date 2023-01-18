import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListproductsComponent } from './listproducts/listproducts.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ListproductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
    ]
})
export class ProductsModule { }
