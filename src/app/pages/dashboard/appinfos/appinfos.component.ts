import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'ngx-appinfos',
  templateUrl: './appinfos.component.html',
  styleUrls: ['./appinfos.component.scss']
})
export class AppinfosComponent implements OnInit {
  ProductCount:number=0;
  InvoiceCount:number=0;
  CustomerCount:number=0;
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.getProductsCount();
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

  // Method To get Customer Count

}
