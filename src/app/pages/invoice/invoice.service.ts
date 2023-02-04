import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceTotal } from './invoice';
import { environment } from '../../../environments/environment';
import { InvoicePage } from './invoicePage.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
 
  baseUrl:string= environment.hostName + "/MS-INVOICE/v1/invoice";

  constructor(private http:HttpClient) { }


  getInvoiceById(id:String):Observable<Invoice>{

    return this.http.get<Invoice>(this.baseUrl + "/" + id);

  }

  searchInvoice(startDate: any, endDate:any , page:number , size:number):Observable<InvoicePage>{

    return this.http.get<InvoicePage>(this.baseUrl + "/search?startDate="+startDate+"&endDate="+endDate+"&page="+page+"&size="+size);

  }

  addInvoice(invoice:Invoice):Observable<Invoice>{

    return this.http.post<Invoice>(this.baseUrl , invoice);

  }

  deleteInvoice(id:string){

    return this.http.delete(this.baseUrl + "/" + id);

  }


  updateInvoice(id:string , invoice:Invoice):Observable<Invoice>{

    return this.http.put<Invoice>(this.baseUrl + "/" + id , invoice);

  }


  getInvoicesByMonthTotal():Observable<Map<number,number>>{

    return this.http.get<Map<number,number>>(this.baseUrl+"/invoiceMonthTotal");
    
  }

  getInvoicesByTotal():Observable<Array<InvoiceTotal>>{

    return this.http.get<Array<InvoiceTotal>>(this.baseUrl+"/invoiceTotal");
    
  }

}
