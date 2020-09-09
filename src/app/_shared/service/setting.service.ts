import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Setting} from '../model/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private apiService: ApiService) { }

  get(key: string): Observable<Setting> {
    return this.apiService.post(`settings/get`, {key})
      .pipe(
        map(value => value.data)
      );
  }
}
