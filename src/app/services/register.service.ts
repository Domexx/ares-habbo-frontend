import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LanguageService} from './language.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) { }

  register(type: string, value: string | object, register = false) {
    const body = {};

    if (typeof value === 'object' && value !== null && register) {
      return this.http.post<any>(`${environment.app.endpoint}/${this.languageService.language}/register`, value);
    }

    body[type] = value;

    return this.http.post<any>(`${environment.app.endpoint}/${this.languageService.language}/register/check`, body);
  }
}
