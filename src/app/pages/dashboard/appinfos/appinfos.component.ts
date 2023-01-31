import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../Invoice/invoice.service';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'ngx-appinfos',
  templateUrl: './appinfos.component.html',
  styleUrls: ['./appinfos.component.scss']
})
export class AppinfosComponent implements OnInit {
  ProductCount:number=10;
  invoiceCount:number=20;
  CustomerCount:number=15;
  constructor(private productService:ProductsService, private invoiceService:InvoiceService) { }

  ngOnInit(): void {
    this.getProductsCount();
    this.getInvoiceCount();
  }

  // Method To get Product Count
  getProductsCount(){
    this.productService.count().subscribe(
      res=>{
        this.ProductCount=res;
      }
    )
  }
  // Method To get Invoice Count

 getInvoiceCount(){

  this.invoiceService.getInvoicesByTotal().subscribe({
    next: data => {
   this.invoiceCount = data.length;
      
    },
    error: error => {
      console.error(error);
    }
  });
}

  // Method To get Customer Count

}
