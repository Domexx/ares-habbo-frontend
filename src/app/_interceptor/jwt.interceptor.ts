import { UserService } from 'src/app/_service/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.userService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
