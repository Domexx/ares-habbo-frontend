import { Injectable } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Setting, SettingsPagination } from '../model/setting';
import { API } from '../model/api';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private apiService: ApiService) {}

  /**
   * @param key
   * @return Observable<Setting>
   */
  get(key: string): Observable<Setting> {
    return this.apiService
      .post(`settings/get`, { key })
      .pipe(map((value) => value.data));
  }

  /**
   * @param page
   * @param results
   * @return Observable<SettingsPagination>
   */
  list(page: number = 1, results: number = 9): Observable<SettingsPagination> {
    return this.apiService
      .get('settings/list/1/9')
      .pipe(map((resp) => resp.data));
  }

  /**
   * @param key
   * @param value
   * @return Observable<API>
   */
  set(key: string, value: string): Observable<API> {
    return this.apiService.post('settings/set', { key, value });
  }
}
