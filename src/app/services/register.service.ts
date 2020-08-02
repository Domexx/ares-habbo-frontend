import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {API} from "../models/api";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apiService: ApiService) { }

  register(type: string, value: string | object, register = false): Observable<API> {
    const body = {};

    if (typeof value === 'object' && value !== null && register) {
      return this.apiService.post('register', value);
    }

    body[type] = value;

    return this.apiService.post('register/check', body);
  }
}
