import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../_models/category';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ReceiveService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // get All Category
  getAllCategory() : Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'receive/getCategorys', {});
  }
  // Get Product of CategoryID
  getProductByCatID(catID: any) : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'receive/getProducts/' + catID, {});
  }
} 
