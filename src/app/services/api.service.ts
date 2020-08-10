import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {API} from "../models/api";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private languageService: LanguageService) {
  }

  post(url: string, body: any = {}, options = {}): Observable<API> {
    return this.http.post<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, body, options);
  }

  get(url: string, options: {} = {}): Observable<API> {
    return this.http.get<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, options);
  }

  put(url: string, body: any = {}, options: {} = {}): Observable<API> {
    return this.http.put<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, body, options);
  }

  delete(url: string, options: {} = {}): Observable<API> {
    return this.http.delete<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, options);
  }

  url(value: string) {
    return `${environment.app.endpoint}/${this.languageService.language}/${value}`;
  }

}
