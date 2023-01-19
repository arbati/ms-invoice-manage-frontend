import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListproductsComponent } from './listproducts/listproducts.component';
import { AddproductComponent } from './addproduct/addproduct.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ListproductsComponent,
    AddproductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NbIconModule,
    NgxPaginationModule,
    FormsModule
    ]
})
export class ProductsModule { }
