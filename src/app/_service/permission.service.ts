import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Permission,
  PermissionPagination,
  PermissionType,
} from '../_model/permission';
import { API } from '../_shared/model/api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly permissionsSubject: BehaviorSubject<Permission[]>;
  public permissions$: Observable<Permission[]>;

  constructor(private apiService: ApiService) {
    this.permissionsSubject = new BehaviorSubject<Permission[]>(
      JSON.parse(localStorage.getItem('ares-permissions'))
    );
    this.permissions$ = this.permissionsSubject.asObservable();
  }

  /**
   * List permissions
   *
   * @param page
   * @param result
   * @return Observable<PermissionPagination>
   */
  list(
    page: number = 1,
    result: number = 50
  ): Observable<PermissionPagination> {
    return this.apiService
      .get(`roles/permissions/list/${page}/${result}`, true, false)
      .pipe(
        map((resp: API) => {
          this.permissions = resp.data.data;
          return resp.data;
        })
      );
  }

  has(key: string | PermissionType): boolean {
    return this.permissions.filter((value) => value.name === key).length !== 0;
  }

  /**
   * Set permissions
   */
  set permissions(value: Permission[]) {
    localStorage.setItem('ares-permissions', JSON.stringify(value));
    this.permissionsSubject.next(value);
  }

  /**
   * Get permissions
   */
  get permissions(): Permission[] {
    return this.permissionsSubject.value;
  }
}
