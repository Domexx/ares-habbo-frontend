import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserService} from 'src/app/services/user.service';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | any) => {
        if (err.status === 401 && (this.userService.user || this.userService.token)) {
          this.userService.logout().finally(() => this.router.navigateByUrl('/')
            .then(() => this.alertService.error(this.translateService.instant('LOGOUT.ERROR'))));

          return;
        }

        if (err.status === 404) {
          return throwError(err);
        }

        if (err instanceof HttpErrorResponse && err.error.errors) {
          err.error.errors.forEach(key => {
            this.alertService.error(key.message);
          });
        } else if (!err.error) {
          this.alertService.error(this.translateService.instant('UNKNOWN_ERROR'));
        }

        return throwError(err);
      })
    );
  }
}
