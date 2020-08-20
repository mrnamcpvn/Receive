import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../_models/category';
import { Product } from '../_models/product';
import { Receive } from '../_models/receive';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { ReceiveInfomationModel } from '../_models/receiveInfomation-model';

@Injectable({
  providedIn: 'root'
})
export class ReceiveService {
  baseUrl = environment.apiUrl;
  receiveIdSource = new BehaviorSubject<string>('');
  currentReceiveID = this.receiveIdSource.asObservable();
  constructor(private http: HttpClient) { }

  // get All Category
  getAllCategory() : Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'receive/getCategorys', {});
  }
  // Get Product of CategoryID
  getProductByCatID(catID: any) : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'receive/getProducts/' + catID, {});
  }

  // Receive Register
  receiveRegister(receive: Receive): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'receive/receiveRegister/', receive, {});
  }

  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<ReceiveInfomationModel[]>> {
    const paginatedResult: PaginatedResult<ReceiveInfomationModel[]> = new PaginatedResult<ReceiveInfomationModel[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<ReceiveInfomationModel[]>(this.baseUrl + 'receive/getReceives', { observe: 'response', params })
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  changeReceiveID(receiveId: string) {
    this.receiveIdSource.next(receiveId);
  }
} 
