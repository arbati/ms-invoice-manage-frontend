import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Customer } from '../customers';
import { CustomersService } from '../customers.service';


@Component({
  selector: 'ngx-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  // id:number=null;
  // firstName:string="";
  // lastName:string="";
  // email:string="";
  // address:string="";
  // city:string="";
  // @ViewChild('customerForm') customerForm: NgForm;
  customerForm: FormGroup;

  constructor(private customerService: CustomersService, private formBuilder: FormBuilder, private nbToastr:NbToastrService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
   });
  }

  addCustomer():void{
    let newCustomer: Customer = {
      id: this.customerForm.get('id').value,
      firstName: this.customerForm.get('firstName').value,
      lastName: this.customerForm.get('lastName').value,
      email: this.customerForm.get('email').value,
      address: this.customerForm.get('address').value,
      city: this.customerForm.get('city').value,
    };
    this.customerService.add(newCustomer)
    .subscribe(
      res=>{
        this.nbToastr.success(`The customer : " ${newCustomer.firstName} " has been added successfully !`)
        this.customerForm.reset();
     },
     err=>{
      if(err.status === 400) {
        this.nbToastr.danger(`a Customer already exists with the id : ${newCustomer.id} !`)
      } else {
        this.nbToastr.danger("There is an Error while adding the customer !")
      }
     }
    )
  }
}
