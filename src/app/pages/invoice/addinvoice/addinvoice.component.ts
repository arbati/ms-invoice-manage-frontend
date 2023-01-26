import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  

  invoice : Invoice = new Invoice();
  customer: Customer[];
  products: Product[];

  constructor(private fb:FormBuilder,
      private dialogService: NbDialogService,
      private productService: ProductsService,
      private customerService: CustomersService,
      private invoiceService: InvoiceService
      )
       { }

  ngOnInit(): void {
    this.getAllProducts();
  }

invoiceForm=this.fb.group({

})  

invoiceTemplateForm=this.fb.group({
  id:[,Validators.required],
  invoiceDate:[new Date(),Validators.required],
  discount:[,Validators.required],
  paymentType:['',Validators.required],
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
    this.customer = data;
  })
}


listSelectProducts:Product[] = [];
selectProduct(p){
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
