/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../_shared/service/language.service';
import { API, APIPagination } from '../_shared/model/api';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpLoaderService } from './http-loader.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
    private httpLoaderService: HttpLoaderService
  ) {}

  /**
   * Sends a POST request
   *
   * @param url
   * @param body
   * @param options
   * @param loader
   * @return Observable<API>
   */
  post(
    url: string,
    body: any = {},
    options = {},
    loader: boolean = true,
    error: boolean = true
  ): Observable<API> {
    this.isLoadable(url, loader);
    this.isErrorable(url, error);

    return this.http.post<API>(
      `${environment.app.endpoint}/${this.languageService.language}/${url}`,
      body,
      options
    );
  }

  /**
   * Sends a GET request
   * @param url
   * @param options
   * @param loader
   * @return Observable<API>
   */
  get(
    url: string,
    options: {} = {},
    loader: boolean = true,
    error: boolean = true
  ): Observable<API | APIPagination> {
    this.isLoadable(url, loader);
    this.isErrorable(url, error);

    return this.http.get<API>(
      `${environment.app.endpoint}/${this.languageService.language}/${url}`,
      options
    );
  }

  /**
   * Sends a PUT request
   * @param url
   * @param body
   * @param options
   * @param loader
   * @return Observable<API>
   */
  put(
    url: string,
    body: any = {},
    options: {} = {},
    loader: boolean = true,
    error: boolean = true
  ): Observable<API> {
    this.isLoadable(url, loader);
    this.isErrorable(url, error);

    return this.http.put<API>(
      `${environment.app.endpoint}/${this.languageService.language}/${url}`,
      body,
      options
    );
  }

  /**
   * Sends a DELETE request
   * @param url
   * @param options
   * @param loader
   * @return Observable<API>
   */
  delete(
    url: string,
    options: {} = {},
    loader: boolean = true,
    error: boolean = true
  ): Observable<API> {
    this.isLoadable(url, loader);
    this.isErrorable(url, error);

    return this.http.delete<API>(
      `${environment.app.endpoint}/${this.languageService.language}/${url}`,
      options
    );
  }

  /**
   * Appends the parameter to the pre-configured API URL
   * @param value
   * @return string
   */
  url(value: string): string {
    return `${environment.app.endpoint}/${this.languageService.language}/${value}`;
  }

  /**
   * Checks if the route is loadable
   * @param url
   * @param loader
   */
  isLoadable(path: string, loader: boolean): void {
    const url = this.url(path);

    if (!loader && !this.httpLoaderService.containsBlockedUrl(url)) {
      this.httpLoaderService.pushBlocked(url);
    }
  }

  isErrorable(path: string, error: boolean): void {
    const url = this.url(path);

    if (!error && !this.httpLoaderService.containsBlockedUrl(url)) {
      this.httpLoaderService.pushBlocked(url);
    }
  }
}
