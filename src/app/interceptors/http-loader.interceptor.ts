import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiService} from '../services/api.service';
import {HttpLoaderService} from '../services/http-loader.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  private blockedRequests: string[] = [
    this.apiService.url('friends/list/')
  ];

  constructor(
    private httpLoaderService: HttpLoaderService,
    private apiService: ApiService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.httpLoaderService.containsUrl(req.url)) {
      return next.handle(req);
    }

    this.httpLoaderService.loading = true;

    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              observer.next(event);
            }
          },
          err => {
            observer.error(err);
          },
          () => {
            observer.complete();
          });
      return () => {
        this.httpLoaderService.loading = false;
        subscription.unsubscribe();
      };
    });
  }
}
