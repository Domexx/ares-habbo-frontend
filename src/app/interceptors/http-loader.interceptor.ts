import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpLoaderService} from '../services/http-loader.service';
import {NavigationStart} from '@angular/router';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(
    private httpLoaderService: HttpLoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.httpLoaderService.containsUrl(req.url)) {
      return next.handle(req);
    }

    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          e => {
            if (e instanceof NavigationStart) {
              // FULL PAGE RELOAD
            }

            if (e instanceof HttpResponse) {
              this.httpLoaderService.loading = true;
              observer.next(e);
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
