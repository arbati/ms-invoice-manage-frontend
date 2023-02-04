import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customers';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.hostName + "/MS-CUSTOMER/customers"

@Injectable({
  providedIn: 'root'
})

export class CustomersService {

  constructor(private http: HttpClient) { }
  getAll():Observable<Customer[]>{
    return this.http.get<Customer[]>(baseUrl);
  };
  getById(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${baseUrl}/id/${id}`);
  };
  add(data: Customer):Observable<Customer>{
    return this.http.post<Customer>(`${baseUrl}/save`,data)
  };
  update(id: number, data: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${baseUrl}/update`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/id/${id}`);
  }
  search(firstName:string):Observable<Customer[]>{
    return this.http.get<Customer[]>(`${baseUrl}/name/${firstName}`);
  };
  availableCustomers():Observable<number>{
    return this.http.get<number>(`${baseUrl}/available`);
  };
  unavailableCustomers():Observable<number>{
    return this.http.get<number>(`${baseUrl}/unavailable`);
  };
  count():Observable<number>{
    return this.http.get<number>(`${baseUrl}/count`);
  };
}
