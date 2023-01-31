import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { FormsModule } from '@angular/forms';
import { NbIconModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CustomersComponent,
    ListCustomersComponent,
    AddCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    NbIconModule,
    NgxPaginationModule,
  ]
})
export class CustomersModule { }
