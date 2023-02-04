import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'ngx-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {

  customers: Customer[];
  customersAll: Customer[];
  count:number=0
  isLoading:boolean = false;
  showData:boolean = false;
  responseCode:number = 2;
  p:number = 1;
  nameSearch: string;

  constructor(private customerService:CustomersService) { }

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers(){
    this.isLoading=true;
    this.customerService.getAll()
    .subscribe(res=>{
      this.customers=res;
      this.isLoading=false;
      this.showData= true;
      this.count=this.customers.length;
    },err=>{
      this.responseCode=err.status;
      console.log(this.responseCode)
      this.isLoading=false;
    }
    )
  }

  deleteCustomer(id:number){
    if (confirm('Are you sure you want to delete this customer?')){
      this.customerService.delete(id)
      .subscribe(res=>{
        this.getCustomers();
        console.log(res)
      })
    }
  }

  search(event:any){
    let filter = event.target?.value;
    if(filter != null && filter != ''){
      this.customers = this.customers.filter(c => c.firstName.includes(filter));
    }else{
      this.customers = this.customersAll;
    }
  }

  // search(){
  //   if(!this.nameSearch){
  //     this.getCustomers();
  //   } 
  //   this.customerService.search(this.nameSearch)
  //   .subscribe((res: any)=>{
  //     this.customers=res;
  //     this.count=this.customers.length;
  //   },(err: { error: any; })=>{
  //     this.count=0;
  //     console.log(err.error)
  //   })
  // };
}