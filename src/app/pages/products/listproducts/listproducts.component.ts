import { Component , OnInit } from '@angular/core';
import { Product } from '../products';
import { ProductsService } from '../products.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss']
})

export class ListproductsComponent implements OnInit {
  products: Product[];
  count:number=0
  isLoading:boolean = false;
  showData:boolean = false;
  responseCode:number = 2;
  p:number = 1;
  designationSearch: string;

  constructor(private productService:ProductsService,private nbToastr:NbToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.isLoading=true;
    this.productService.getAll()
    .subscribe(res=>{
      this.products=res;
      this.isLoading=false;
      this.showData= true;
      this.count=this.products.length;
    },err=>{
      this.responseCode=err.status;
      console.log(this.responseCode)
      this.isLoading=false;
    }
    )
  }
  getByDesignation(){
    if(!this.designationSearch){
      this.getProducts();
    } 
    this.productService.getByDesignation(this.designationSearch)
    .subscribe(res=>{
      this.products=res;
      this.count=this.products.length;
    },err=>{
      this.count=0;
      console.log(err.error)
    })
  };
  deleteProduct(id:number){
    if (confirm('Are you sure you want to delete this product?')){
      this.productService.delete(id)
      .subscribe(res=>{
        this.nbToastr.success(`The product has been deleted successfully !`)
        this.getProducts();
        console.log(res)
      })
    }
  }
}
