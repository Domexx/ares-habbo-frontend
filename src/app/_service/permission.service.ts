import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionPagination } from '../_model/permission';
import { API } from '../_shared/model/api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private apiService: ApiService) {}

  /**
   * @param page
   * @param result
   * @return Observable<PermissionPagination>
   */
  list(
    page: number = 1,
    result: number = 10
  ): Observable<PermissionPagination> {
    return this.apiService
      .get(`roles/permissions/${page}/${result}`)
      .pipe(map((resp: API) => resp.data));
  }
}
