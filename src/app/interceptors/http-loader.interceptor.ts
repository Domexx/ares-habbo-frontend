import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {HttpLoaderService} from "../services/http-loader.service";

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: HttpLoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.loading = true;

    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.remove(req);
              observer.next(event);
            }
          },
          err => {
            this.remove(req);
            observer.error(err);
          },
          () => {
            this.remove(req);
            observer.complete();
          });
      return () => {
        this.remove(req);
        subscription.unsubscribe();
      };
    });
  }

  remove(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);

    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    this.loaderService.loading = this.requests.length > 0;
  }
}
