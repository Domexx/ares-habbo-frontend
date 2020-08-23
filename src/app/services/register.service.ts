import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {API} from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apiService: ApiService) { }

  register(value: object): Observable<API> {
    return this.apiService.post('register', value);
  }

  looks(): Observable<API> {
    return this.apiService.get('register/looks');
  }
}
