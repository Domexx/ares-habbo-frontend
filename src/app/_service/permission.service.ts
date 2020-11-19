import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PermissionPagination,
  PermissionType,
} from '../_model/permission';
import { API } from '../_shared/model/api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly permissionsSubject: BehaviorSubject<string[]>;
  public permissions$: Observable<string[]>;

  constructor(private apiService: ApiService) {
    this.permissionsSubject = new BehaviorSubject<string[]>(
      JSON.parse(localStorage.getItem('ares-permissions'))
    );
    this.permissions$ = this.permissionsSubject.asObservable();
  }

  /**
   * Get all permissions
   */
  get(): Observable<string[]> {
    return this.apiService
      .get('roles/user/permissions')
      .pipe(map((resp: API) => (this.permissions = resp.data)));
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
      .get(`roles/permissions/list/${page}/${result}`, true)
      .pipe(map((resp: API) => (this.permissions = resp.data.data)));
  }

  /**
   * Checks if the array contains the key
   *
   * @param key
   * @return boolean
   */
  has(key: string | PermissionType): boolean {
    return this.permissions.filter((value) => value === key).length !== 0;
  }

  /**
   * Set permissions
   */
  set permissions(value: string[]) {
    localStorage.setItem('ares-permissions', JSON.stringify(value));
    this.permissionsSubject.next(value);
  }

  /**
   * Get permissions
   */
  get permissions(): string[] {
    return this.permissionsSubject.value;
  }
}
