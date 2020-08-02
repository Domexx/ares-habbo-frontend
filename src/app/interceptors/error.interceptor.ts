import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserService} from 'src/app/services/user.service';
import {AlertService} from '../services/alert.service';
import {environment} from "../../environments/environment";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | any) => {
        if (err.status === 404 && environment.production) {
          return;
        }

        if (err.status === 401 && this.userService.isAuthenticated) {
          this.userService.logout();
          location.reload();
        }

        if (err instanceof HttpErrorResponse) {
          err.error.errors.forEach(key => {
            this.alertService.error(key.message);
          });
        }

        return throwError(err);
      })
    );
  }
}
