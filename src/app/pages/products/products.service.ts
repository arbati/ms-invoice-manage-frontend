import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './products';

const baseUrl = "http://localhost:8080/MS-PRODUCT/sapi/v1/product"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(baseUrl);
  };
  add(data: Product):Observable<Product>{
    return this.http.post<Product>(baseUrl,data)
  };
  update(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${baseUrl}/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  getByDesignation(designation:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${baseUrl}/search/${designation}`);
  };
}
