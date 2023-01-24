import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Customer } from '../../customers/customers';
import { CustomersService } from '../../customers/customers.service';
import { Product } from '../../products/products';
import { ProductsService } from '../../products/products.service';
import { Invoice } from '../invoice';


@Component({
  selector: 'ngx-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.scss']
})
export class AddinvoiceComponent implements OnInit {
  

  invoice : Invoice = new Invoice();
  customer: Customer[]=[
    {
      id:1,
      firstName:"abdelkhalek",
      lastName:"rbati",
      email:"abdekhalek@gmail.com",
      address:"rond point mostakbal",
      city:"CasaBlanca",
    },
    {
      id:2,
      firstName:"ali",
      lastName:"karim",
      email:"ali@gmail.com",
      address:"hay rahma",
      city:"salé",
    },
    {
      id:3,
      firstName:"yassin",
      lastName:"chri",
      email:"yassin@gmail.com",
      address:"akkari",
      city:"rabat",
    },
    {
      id:4,
      firstName:"mustafa",
      lastName:"mounsif",
      email:"mustafa@gmail.com",
      address:"maarif",
      city:"CasaBlanca",
    }
  ]
  products: Product[]=[
    {
    id:1,
    designation:"HP Probook 5600 I5",
    price:5200,
    photo:"",
    depositQuantity:50,
    expirationDate:new Date(),
    shortDescription:"HP",
    },
    {
      id:2,
      designation:"HP Probook 5600 I5",
      price:5200,
      photo:"",
      depositQuantity:50,
      expirationDate:new Date(),
      shortDescription:"HP",
      },
      {
        id:3,
        designation:"DELL 600 I5",
        price:5200,
        photo:"",
        depositQuantity:50,
        expirationDate:new Date(),
        shortDescription:"HP",
        },
        {
          id:4,
          designation:"HP EliteBook 5600 I5",
          price:5200,
          photo:"",
          depositQuantity:50,
          expirationDate:new Date(),
          shortDescription:"HP",
          },
  ];  

  constructor(private fb:FormBuilder,
      private dialogService: NbDialogService,
      private productService: ProductsService,
      private customerService: CustomersService,
      )
       { }

  ngOnInit(): void {
   
  }

invoiceForm=this.fb.group({

})  

invoiceTemplateForm=this.fb.group({
  id:[,Validators.required],
  invoiceDate:[new Date(),Validators.required],
  discount:[,Validators.required],
  paymentType:['',Validators.required]
})

onSubmit(){

}
dialogRef:any;
openWindow(dialogInvoice: TemplateRef<any>) {
  this.dialogRef = this.dialogService.open(
    dialogInvoice,
    {
      context: {
        title: 'Ajouter Invoice',
      },
    },
  );
}

onSubmitinvoiceTemplateForm(){
  this.invoice.id = this.invoiceTemplateForm.get('id').value
  this.invoice.invoiceDate = this.invoiceTemplateForm.get('invoiceDate').value
  this.invoice.discount = this.invoiceTemplateForm.get('discount').value
  this.invoice.paymentType = this.invoiceTemplateForm.get('paymentType').value
  console.log(this.invoice);
  this.dialogRef.close();
}

openWindowCustomer(contentTemplate) {
  this.dialogService.open(
    contentTemplate,
    {
      context: {
        title: 'Ajouter Customer',
      },
    },
  );
}
customerSelect : Customer=new Customer();
selectCustomer(c){
  this.customerSelect = c;
  console.log(this.customerSelect);
}

dialogProduct:any;
openWindowProduct(contentTemplate) {
  this.dialogProduct = this.dialogService.open(
    contentTemplate,
    {
      context: {
        title: 'Ajouter Products',
      },
    },
  );
}

closeProductPopUp(){
  this.dialogProduct.close();
}

getAllProducts(){
  this.productService.getAll().subscribe(data=>{
    this.products = data;
  })
}


listSelectProducts:Product[] = [];
selectProduct(p){
  this.listSelectProducts.push(p);
  console.log(this.listSelectProducts);
}

}
