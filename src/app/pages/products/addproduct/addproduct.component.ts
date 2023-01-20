import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../products';
import { ProductsService } from '../products.service';
@Component({
  selector: 'ngx-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  id:number=null;
  designation:string="";
  shortDescription:string="";
  depositQuantity:number=null;
  expirationDate:Date=new Date("225-12-31");
  price:number=null;
  photo:string="";
  @ViewChild('productForm') productForm: NgForm;

  constructor(private productService: ProductsService) { }


  ngOnInit(): void {
  }

  addProduct():void{
    let newProduct:Product = {
      id: this.id,
      designation: this.designation,
      shortDescription: this.shortDescription,
      depositQuantity: this.depositQuantity,
      expirationDate: this.expirationDate,
      price: this.price,
      photo: this.photo
    }
    this.productService.add(newProduct)
    .subscribe(
      res=>{
        console.log("Product added successfully", res);
        this.productForm.reset();
     },
     err=>{
       console.log("Error adding product", err);
     }
    )
  }

}
