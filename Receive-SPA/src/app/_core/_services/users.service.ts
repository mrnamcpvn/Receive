import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserModel } from '../_models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<UserModel[]>> {
    const paginatedResult: PaginatedResult<UserModel[]> = new PaginatedResult<UserModel[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<UserModel[]>(this.baseUrl + 'user/getUsers', { observe: 'response', params })
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
}
