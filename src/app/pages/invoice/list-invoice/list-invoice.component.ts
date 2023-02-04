import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastRef, NbToastrService } from '@nebular/theme';
import { PaginationInstance } from 'ngx-pagination';
import { title } from 'process';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'ngx-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoiceService,private toastrService: NbToastrService, private nbToastrService: NbToastrService, private dialogService: NbDialogService,private router:Router) { }

  invoices!: Invoice[];
  searchStartDate: string = "2022-01-17";
  searchEndDate: string = new Date().toISOString().split('T')[0]


  number: number = 1;
  size: number = 10;
  totalElements:number=3;
  pageSizeOptions: Array<number>=[5,10,20,30]

  public config: PaginationInstance = {
    id: 'pgInvoice',
    itemsPerPage: this.size,
    currentPage: this.number,
    totalItems: this.totalElements
 };

  dialogRef: NbDialogRef<any>;

  ngOnInit(): void {
    this.searchInvoice();
  }


  searchInvoice() {

    this.invoiceService.searchInvoice(this.searchStartDate, this.searchEndDate, this.number-1, this.size).subscribe({
      next: data => {
        this.invoices = data.content;
        //this.number = data.number+1;
        //this.size = data.size;
        this.totalElements = data.totalElements;
      },
      error: error => {
        console.error(error);
      }
    });

  }


  confirmDelete(id: string, dialog: TemplateRef<any>) {
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
   // console.log(this.searchStartDate);
  }

  getSearchEndDate(event: any) {
    this.searchEndDate = event.target.value;
    //console.log(this.searchEndDate );

  }


  refreshByDate() {
    this.searchInvoice();
  }


  searchByNumber(id: any) {
    this.invoices.length = 0;
    
    if(id==undefined || id==""){
      this.searchInvoice();
    }else{
      this.invoiceService.getInvoiceById(id).subscribe({
        next: data => {
          if (data.id != undefined) {
            this.invoices.push(data);
          }
  
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  gotoUpdate(id: string) {

  }

  pageChangeData(number: number){
    this.config.currentPage = number;
    this.number = number;
   
  }


  protected  open(dialog: TemplateRef<any>,id:any) {
     this.dialogRef = this.dialogService.open(dialog, {context: id}); 
  }

  editInvoice(id: string){
    console.log(id);
      this.router.navigate(['/pages/invoice/add',{id}]);
  }
}
