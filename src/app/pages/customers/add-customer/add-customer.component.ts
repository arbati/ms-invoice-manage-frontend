import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../customers';
import { CustomersService } from '../customers.service';


@Component({
  selector: 'ngx-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  id:number=null;
  firstName:string="";
  lastName:string="";
  email:string="";
  address:string="";
  city:string="";
  @ViewChild('customerForm') customerForm: NgForm;

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {
  }

  addCustomer():void{
    let newCustomer:Customer = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      city: this.city,
    }
    this.customerService.add(newCustomer)
    .subscribe(
      res=>{
        console.log("Customer added successfully", res);
        this.customerForm.reset();
     },
     err=>{
       console.log("Error adding customer", err);
     }
    )
  }
}
