import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Customer } from '../customers';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'ngx-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customer:Customer;
  id = null;
  firstName:string="";
  lastName:string="";
  email:string="";
  address:string="";
  city:string="";
  @ViewChild('customerForm') customerForm: NgForm;

  constructor(private customerService: CustomersService , private route: ActivatedRoute,private router:Router, private nbToastr:NbToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCustomer(this.id)
  }

  getCustomer(id:number){
    this.customerService.getById(this.id).subscribe(res=>{
      this.customer = res;
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.email = res.email;
      this.address = res.address;
      this.city = res.city;
    })
  }
  editCustomer(){
    let updatedCustomer: Customer = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      city: this.city
    }

    console.log(updatedCustomer);
    this.customerService.update(this.id,updatedCustomer).subscribe(
      res => {
        //console.log("Updated");
        this.nbToastr.success(`The customer : " ${updatedCustomer.firstName} " has been update successfully !`)
        this.router.navigate(['/pages/customers/list']);
      },
      error => {
        //console.log(error)
        this.nbToastr.danger("There is an Error while update the customer !")
      }
    )
  }
}