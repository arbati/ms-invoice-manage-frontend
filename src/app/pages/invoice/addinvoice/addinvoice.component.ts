import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
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
  allProducts: Product[];
  products: Product[];
  listSelectProducts:any[]=[];
  action:boolean = true;
  invoiceForm=this.fb.group({
  }) 
  //invoiceTemplateForm:FormGroup;

  constructor(private fb:FormBuilder,
      private dialogService: NbDialogService,
      private productService: ProductsService,
      private customerService: CustomersService,
      private invoiceService: InvoiceService,
      private route: ActivatedRoute,
      private toastrService: NbToastrService
      )
       { }

  ngOnInit(): void {


    this.getAllProducts();
    this.getAllCustomers();
    this.id = this.route.snapshot.params['id'];
     
      if(this.id != null || this.id != undefined){
        this.getInvoiceById()
      }
  }

  invoiceTemplateForm = this.fb.group({
    id:[,Validators.required],
    invoiceDate:[new Date(),Validators.required],
    discount:[,Validators.required],
    paymentType:['',Validators.required],
  })

getInvoiceById(){
  this.invoiceService.getInvoiceById(this.id).subscribe( data =>{
    this.invoice = data ;
    this.invoiceTemplateForm.get('id').setValue(this.invoice.id);
    this.invoiceTemplateForm.get('invoiceDate').setValue(this.invoice.invoiceDate);
    this.invoiceTemplateForm.get('discount').setValue(this.invoice.discount);
    this.invoiceTemplateForm.get('paymentType').setValue(this.invoice.paymentType);
    this.customerSelect = this.invoice.customer;
    this.listSelectProducts = this.invoice.products;
    this.action=false;
  })
}


showToast(title:any , message:any, status:any){
  this.toastrService.show( message, title , {status});
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
    this.allProducts=data;
    this.products = data;
  })
}

getAllCustomers(){
  this.customerService.getAll().subscribe(data=>{
    this.customers = data;
  })
}


selectProduct(p:any){

  if(this.listSelectProducts.includes(p)){
    this.listSelectProducts = this.listSelectProducts.filter(s=>s!=p);
    p.depositQuantity+=1;
  }else{
    p.depositQuantity=1;
  }

  this.listSelectProducts.push(p);
  this.showToast("the product has succefully selected!","Select product",'primary');
}


deleteProductSelected(prd:any){
  if(this.listSelectProducts.includes(prd)){
    this.listSelectProducts = this.listSelectProducts.filter(s=>s!=prd);
  }
}


closeCustomersPopUp(){
  this.dialogCustomer.close();
}

onValidCustomer(){
  this.invoice.customer = this.customerSelect
  this.invoice.products = this.products

  if(this.action==true){
    this.invoiceService.addInvoice(this.invoice).subscribe(data=>{
      this.showToast("invoice has succefully saved!","Save new invoice",'primary');
    });
  }else{
    this.invoiceService.updateInvoice(this.id,this.invoice).subscribe(data=>{
      this.showToast("invoice has succefully updated!","Update invoice",'success');
    });
  }

  
}


}
