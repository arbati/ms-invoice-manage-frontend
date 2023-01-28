import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-downloadinvoice',
  templateUrl: './downloadinvoice.component.html',
  styleUrls: ['./downloadinvoice.component.scss']
})
export class DownloadinvoiceComponent implements OnInit {
  
  id:string;
  invoice:Invoice;
  subTotal:number=0;
  discount:number=20;
  reducedPrice:number=0;
  totalPrice:number=0;

  constructor(private invoiceService:InvoiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInvoiceById(this.id);
  }
  getInvoiceById(id:string){
    this.invoiceService.getInvoiceById(id)
    .subscribe(res=>{
      this.invoice=res;
      this.subTotal = this.invoice.products.reduce((acc, product) => acc + product.price, 0);
      this.reducedPrice = (this.subTotal * this.discount) / 100;
      this.totalPrice = this.subTotal - this.reducedPrice ;
    })
  }

  convertToPDF(){
  html2canvas(document.getElementById("DataToPdf")).then(canvas => {  
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var width = pdf.internal.pageSize.getWidth();
  var height = canvas.height * width / canvas.width;
  pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
  pdf.save(`Invoice_${this.invoice.id}.pdf`); // Generated PDF
  });
  }

}
