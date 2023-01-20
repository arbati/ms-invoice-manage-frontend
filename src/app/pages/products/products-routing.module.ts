import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ListproductsComponent } from './listproducts/listproducts.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    {
      path: 'list',
      component: ListproductsComponent,
    }  ,
    {
      path: 'add',
      component: AddproductComponent,
    },
    {
      path: 'edit/:id',
      component: EditproductComponent,
    },
  ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
