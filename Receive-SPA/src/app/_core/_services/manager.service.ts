import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { ReceiveInfomationModel } from '../_models/receiveInfomation-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<ReceiveInfomationModel[]>> {
    const paginatedResult: PaginatedResult<ReceiveInfomationModel[]> = new PaginatedResult<ReceiveInfomationModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<ReceiveInfomationModel[]>(this.baseUrl + 'manager/getReceives', { observe: 'response', params })
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
  getReceive(receiveID: string): Observable<ReceiveInfomationModel> {
    return this.http.get<ReceiveInfomationModel>(this.baseUrl + 'manager/getReceive/' + receiveID, {});
  }
}
