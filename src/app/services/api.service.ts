import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LanguageService} from './language.service';
import {API} from '../models/api';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpLoaderService} from './http-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private languageService: LanguageService,
              private httpLoaderService: HttpLoaderService
  ) {
  }

  post(url: string, body: any = {}, options = {}, loader: boolean = true): Observable<API> {
    this.isLoadable(url, loader);
    return this.http.post<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, body, options);
  }

  get(url: string, options: {} = {}, loader: boolean = true): Observable<API> {
    this.isLoadable(url, loader);
    return this.http.get<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, options);
  }

  put(url: string, body: any = {}, options: {} = {}, loader: boolean = true): Observable<API> {
    this.isLoadable(url, loader);
    return this.http.put<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, body, options);
  }

  delete(url: string, options: {} = {}, loader: boolean = true): Observable<API> {
    this.isLoadable(url, loader);
    return this.http.delete<API>(`${environment.app.endpoint}/${this.languageService.language}/${url}`, options);
  }

  url(value: string) {
    return `${environment.app.endpoint}/${this.languageService.language}/${value}`;
  }

  isLoadable(url: string, loader: boolean): void {
    if (!loader) {
      this.httpLoaderService.push(this.url(url));
    }
  }

}
