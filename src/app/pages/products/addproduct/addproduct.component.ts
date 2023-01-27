import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { Product } from '../products';
import { ProductsService } from '../products.service';
import { FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {


  productForm: FormGroup;

  constructor(private productService: ProductsService,private fb: FormBuilder,private nbToastr:NbToastrService) { }

  validateImageUrl(control: FormControl) {
    if (!control.value) {
      return null;
    }
    if (!control.value.endsWith('.jpg') && !control.value.endsWith('.jpeg') && !control.value.endsWith('.png') && !control.value.endsWith('.gif')) {
      return { invalidImageUrl: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      designation: ['',Validators.required],
      photo: ['',Validators.compose([Validators.required, this.validateImageUrl])],
      price: [''],
      depositQuantity: [''],
      expirationDate: [''],
      shortDescription: [''],
   });
  }

  addProduct():void{
    let newProduct: Product = {
      id: this.productForm.get('id').value,
      designation: this.productForm.get('designation').value,
      shortDescription: this.productForm.get('shortDescription').value,
      depositQuantity: this.productForm.get('depositQuantity').value,
      expirationDate: this.productForm.get('expirationDate').value,
      price: this.productForm.get('price').value,
      photo: this.productForm.get('photo').value
    };
    this.productService.add(newProduct)
    .subscribe(
      res=>{
        this.nbToastr.success(`The product : " ${newProduct.designation} " has been added successfully !`)
        this.productForm.reset();
     },
     err=>{
      if(err.status === 400) {
        this.nbToastr.danger(`a Product already exists with the id : ${newProduct.id} !`)
      } else {
        this.nbToastr.danger("There is an Error while adding the product !")
      }
    }
    )
  }

}
