import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { Product } from '../../products/products';
import { ProductsService } from '../../products/products.service';
import { Invoice } from '../invoice';


@Component({
  selector: 'ngx-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.scss']
})
export class AddinvoiceComponent implements OnInit {

  invoiceList : Invoice[] = [];
  products: Product[];

  constructor(private fb:FormBuilder,
      private windowService: NbWindowService,
      private productService:ProductsService) { }

  ngOnInit(): void {
  }

invoiceForm=this.fb.group({

})  

invoiceTemplateForm=this.fb.group({
  id:[,Validators.required],
  dateInvoice:[new Date(),Validators.required],
  discount:[,Validators.required],
  payement:['',Validators.required]
})

onSubmit(){

}

openWindow(contentTemplate) {
  this.windowService.open(
    contentTemplate,
    {
      title: 'Ajouter Invoice',
      context: {
        text: 'some text to pass into template',
      },
    },
  );
}

onSubmitinvoiceTemplateForm(){
  let invoice = new Invoice();
  invoice.id = this.invoiceTemplateForm.get('id').value
  invoice.invoiceDate = this.invoiceTemplateForm.get('dateInvoice').value
  invoice.discount = this.invoiceTemplateForm.get('discount').value
  invoice.paymentType = this.invoiceTemplateForm.get('payement').value
  console.log(invoice);
  this.invoiceList.push(invoice);
}

openWindowCustomer(contentTemplate) {
  this.windowService.open(
    contentTemplate,
    {
      title: 'Ajouter Customer',
      context: {
        text: 'some text to pass into template',
      },
    },
  );
}

openWindowProduct(contentTemplate) {
  this.windowService.open(
    contentTemplate,
    {
      title: 'Ajouter Products',
      context: {
        text: 'some text to pass into template',
      },
    },
  );
}

getAllProducts(){
  this.productService.getAll().subscribe(data=>{
    this.products = data;
  })
}


}
