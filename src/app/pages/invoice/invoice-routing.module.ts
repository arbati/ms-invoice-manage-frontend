import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddinvoiceComponent } from './addinvoice/addinvoice.component';
import { DownloadinvoiceComponent } from './downloadinvoice/downloadinvoice.component';
import { InvoiceComponent } from './invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';

const routes: Routes = [{
  path: '',
  component: InvoiceComponent,
  children: [
    {
      path: 'list',
      component: ListInvoiceComponent,
    },
    {
      path: 'add',
      component: AddinvoiceComponent,
    },
    {
      path: ':id',
      component: DownloadinvoiceComponent,
    },
    {
      path:"setting/:id",
      component: AddinvoiceComponent
    },
    {
      path:"download/:id",
      component: DownloadinvoiceComponent
    }
  ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
