import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Customer } from '../../customers/customers';
import { CustomersService } from '../../customers/customers.service';
import { Product } from '../../products/products';
import { ProductsService } from '../../products/products.service';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'ngx-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.scss']
})
export class AddinvoiceComponent implements OnInit {
  
  id:string;
  invoice : Invoice = new Invoice();
  customers: Customer[];
  products: Product[];
  invoiceTemplateForm:FormGroup;
  up:boolean=false;
  submitted = false;

  constructor(private fb:FormBuilder,
      private dialogService: NbDialogService,
      private productService: ProductsService,
      private customerService: CustomersService,
      private invoiceService: InvoiceService,
      private route: ActivatedRoute
      )
       { }

  ngOnInit(): void {

    this.invoiceTemplateForm=this.fb.group({
      id:[,Validators.required],
      invoiceDate:[new Date(),Validators.required],
      discount:[,Validators.required],
      paymentType:['',Validators.required],
    })

    this.getAllProducts();
    this.getAllCustomers();
    this.id = this.route.snapshot.params['id'];
    this.getInvoiceById();
    if(this.id){
      this.up = true;
    }else{
      this.up = false;
    }
  }



getInvoiceById(){
  this.invoiceService.getInvoiceById(this.id).subscribe( data =>{
    this.invoice = data ;
    this.customerSelect = this.invoice.customer;
    this.listSelectProducts = this.invoice.products;
    console.log(data);
  })
}


invoiceForm=this.fb.group({
  
})  


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
  this.submitted = true;
  if(this.invoiceTemplateForm.invalid){
    return;
  }
  this.invoice.id = this.invoiceTemplateForm.get('id').value
  this.invoice.invoiceDate = this.invoiceTemplateForm.get('invoiceDate').value
  this.invoice.discount = this.invoiceTemplateForm.get('discount').value
  this.invoice.paymentType = this.invoiceTemplateForm.get('paymentType').value
  console.log(this.invoice);
  this.dialogRef.close();
}

get f(){
  return this.invoiceTemplateForm.controls;
}

dialogCustomer:any;
openWindowCustomer(contentTemplate) {
  this.dialogCustomer = this.dialogService.open(
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

getAllCustomers(){
  this.customerService.getAll().subscribe(data=>{
    this.customers = data;
  })
}


listSelectProducts:Product[] = [];
selectProduct(p:any){
  this.listSelectProducts.push(p);
  console.log(this.listSelectProducts);
}

closeCustomersPopUp(){
  this.dialogCustomer.close();
}

onValidCustomer(){
  this.invoice.customer = this.customerSelect
  this.invoice.products = this.products
  this.invoiceService.addInvoice(this.invoice).subscribe(data=>{
    console.log(data);
  })
}


}
