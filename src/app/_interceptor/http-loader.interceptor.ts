import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpLoaderService } from '../_service/http-loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private httpLoaderService: HttpLoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.httpLoaderService.has(req.url)) {
      return next.handle(req);
    }

    this.totalRequests++;

    if (!this.httpLoaderService.loading) {
      this.httpLoaderService.loading = true;
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;

        if (this.totalRequests === 0) {
          this.httpLoaderService.loading = false;
        }
      })
    );
  }
}
