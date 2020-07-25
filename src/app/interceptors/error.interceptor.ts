import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {AlertService} from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private userService: UserService,
      private alertService: AlertService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && this.userService.isAuthenticated) {
                this.userService.logout();
                location.reload();
            }

            err.error.errors.forEach(key => {
              this.alertService.error(key.message);
            });

            return throwError(err);
          })
        );
    }
}
