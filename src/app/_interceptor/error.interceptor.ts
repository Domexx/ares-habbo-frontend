import { environment } from '../../environments/environment';
import { ErrorService } from '../_service/error.service';
import { AuthService } from '../home/service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user.service';
import { AlertService } from '../_shared/service/alert.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorResponse } from '../_model/error/error-response.interface';

@Injectable()
/**
 * @class ErrorInterceptor
 */
export class ErrorInterceptor implements HttpInterceptor {
  isLoggingOut = false;

  /**
   * ErrorInterceptor constructor
   *
   * @param userService
   * @param authService
   * @param alertService
   * @param translateService
   * @param router
   * @param errorService
   */
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (environment.production) {
     return next.handle(request).pipe(
       map(response => {
         // Get error from response
         if (
           response instanceof HttpResponse &&
           response.url.includes(environment.app.endpoint) &&
           response.body.status === 'error'
         ) {
           const body: ErrorResponse = response.body;
           console.log(body);

           // Handle error
           this.errorService.handleCode(body.code);
         }

         return response;
       })
     );
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | any) => {
        if (
          !this.isLoggingOut &&
          err.status === 401 &&
          (this.userService.user || this.userService.token)
        ) {
          this.isLoggingOut = true;

          this.authService.logout().finally(() =>
            this.router.navigateByUrl('/').then(() => {
              this.alertService.error(
                this.translateService.instant('LOGOUT.ERROR')
              );
              this.isLoggingOut = false;
            })
          );
        }

        if (err.status === 404) {
          return throwError(err);
        }

        if (
          !this.isLoggingOut &&
          err instanceof HttpErrorResponse &&
          err.error.errors
        ) {
          err.error.errors.forEach((key) => {
            this.alertService.error(key.message);
          });
        } else if (!this.isLoggingOut && !err.error) {
          this.alertService.error(
            this.translateService.instant('UNKNOWN_ERROR')
          );
        }

        return throwError(err);
      })
    );
  }
}
