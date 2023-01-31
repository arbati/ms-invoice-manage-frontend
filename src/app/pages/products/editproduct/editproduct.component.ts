import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  product:Product;
  id = null;
  designation:string="";
  shortDescription:string="";
  depositQuantity:number=null;
  expirationDate:Date=new Date("2225-12-31");
  price:number=null;
  photo:string="";
  @ViewChild('productForm') productForm: NgForm;


  constructor(private productService: ProductsService , private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct(this.id)
  }
  getProduct(id:number){
    this.productService.getById(this.id).subscribe(res=>{
      this.product = res;
      this.designation = res.designation;
      this.shortDescription = res.shortDescription;
      this.depositQuantity = res.depositQuantity;
      this.expirationDate = res.expirationDate;
      this.price = res.price;
      this.photo = res.photo;
    })
  }
  editProduct(){
    let updatedProduct:Product = {
      id: this.id,
      designation: this.designation,
      shortDescription: this.shortDescription,
      depositQuantity: this.depositQuantity,
      expirationDate: this.expirationDate,
      price: this.price,
      photo: this.photo
    }
    this.productService.update(this.id,updatedProduct).subscribe(
      res => {
        console.log("Updated");
        this.router.navigate(['/pages/products/list']);
      },
      error => {
        console.log(error)
      }
    )
  }

}
