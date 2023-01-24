import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppinfosComponent } from './appinfos/appinfos.component';
import { CustomerinfoComponent } from './customerinfo/customerinfo.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { InvoiceinfoComponent } from './invoiceinfo/invoiceinfo.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    RouterModule
  ],
  declarations: [
    DashboardComponent,
    AppinfosComponent,
    CustomerinfoComponent,
    ProductinfoComponent,
    InvoiceinfoComponent,
  ],
})
export class DashboardModule { }
