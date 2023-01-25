import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastRef, NbToastrService } from '@nebular/theme';
import { title } from 'process';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'ngx-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoiceService,private toastrService: NbToastrService, private nbToastrService: NbToastrService, private dialogService: NbDialogService) { }

  invoices!: Invoice[];
  searchStartDate: string = "2022-01-17";
  searchEndDate: string = new Date().toISOString().split('T')[0]

  last!: boolean;
  first!: boolean;
  number: number = 0;
  size: number = 10;
  totalPages!: number;
  totalElements!: number;
  pageSizeOptions: Array<number> = [5, 10, 20, 30];

  dialogRef: NbDialogRef<any>;

  ngOnInit(): void {
    this.searchInvoice();
  }


  searchInvoice() {

    console.log(this.searchStartDate);
    console.log(this.searchEndDate);

    this.invoiceService.searchInvoice(this.searchStartDate, this.searchEndDate, this.number, this.size).subscribe({
      next: data => {
        this.invoices = data.content;
        this.number = data.number;
        this.size = data.size;
        this.totalElements = data.totalElements;
        console.log(this.invoices);
      },
      error: error => {
        console.error(error);
      }
    });

  }


  confirmDelete(id: string, dialog: TemplateRef<any>) {
    console.log(id);
    this.invoiceService.deleteInvoice(id).subscribe({
      next: data => {
        this.searchInvoice();
        this.dialogRef.close();
        this.showToast("invoice has succefully deleted!","Delete",'danger');
      },
      error: error => { }
    });;
  }

  showToast(title:any , message:any, status:any){
        this.toastrService.show( message, title , {status});
   }


  getSearchStartDate(event: any) {
    this.searchStartDate = event.target.value;
  }

  getSearchEndDate(event: any) {
    this.searchEndDate = event.target.value;
  }


  refreshByDate() {
    this.searchInvoice();
  }


  searchByNumber(id: any) {
    this.invoices.length = 0;
    this.invoiceService.getInvoiceById(id).subscribe({
      next: data => {
        if (data.id != undefined) {
          this.invoices.push(data);
        }

        console.log(data);

      },
      error: error => {
        console.error(error);
      }
    });
  }

  gotoUpdate(id: string) {

  }

  pageChangeData(event: any): void {

    //console.log(event);
    this.size = event.pageSize;
    this.number = event.pageIndex;
    this.searchInvoice();
  }


  protected  open(dialog: TemplateRef<any>,id:any) {
     this.dialogRef = this.dialogService.open(dialog, {context: id}); 
  }

}
