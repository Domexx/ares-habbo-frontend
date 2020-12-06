import { environment } from '../../environments/environment';
import { AuthService } from '../home/service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user.service';
import { AlertService } from '../_shared/service/alert.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  isLoggingOut = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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

        if (!environment.production && err.status === 404) {
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
