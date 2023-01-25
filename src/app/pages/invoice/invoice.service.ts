import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from './invoice';
import { environment } from '../../../environments/environment';
import { InvoicePage } from './invoicePage.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http:HttpClient) { }


  getInvoiceById(id:String):Observable<Invoice>{

    return this.http.get<Invoice>(environment.hostNameMsInvoice + "/" + id);

  }

  searchInvoice(startDate: any, endDate:any , page:number , size:number):Observable<InvoicePage>{

    return this.http.get<InvoicePage>(environment.hostNameMsInvoice + "/search?startDate="+startDate+"&endDate="+endDate+"&page="+page+"&size="+size);

  }

  addInvoice(invoice:Invoice):Observable<Invoice>{

    return this.http.post<Invoice>(environment.hostNameMsInvoice , invoice);

  }

  deleteInvoice(id:string){

    return this.http.delete(environment.hostNameMsInvoice + "/" + id);

  }


  updateInvoice(id:string , invoice:Invoice):Observable<Invoice>{

    return this.http.put<Invoice>(environment.hostNameMsInvoice + "/" + id , invoice);

  }


}
