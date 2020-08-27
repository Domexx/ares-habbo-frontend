import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {HttpLoaderService} from '../services/http-loader.service';
import {NavigationStart} from '@angular/router';
import {finalize, map} from 'rxjs/operators';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  private requests = [];

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
