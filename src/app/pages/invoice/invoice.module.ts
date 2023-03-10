import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { AddinvoiceComponent } from './addinvoice/addinvoice.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbDialogService, NbInputModule, NbPopoverModule, NbIconModule, NbToastrModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { DownloadinvoiceComponent } from './downloadinvoice/downloadinvoice.component';


@NgModule({
  declarations: [
    InvoiceComponent,
    ListInvoiceComponent,
    AddinvoiceComponent,
    DownloadinvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbPopoverModule,
    NbDialogModule,
    NbIconModule,
    NgxPaginationModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),

  ],
})
export class InvoiceModule { }
