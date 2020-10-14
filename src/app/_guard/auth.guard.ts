import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../_service/user.service';
import {AlertService} from '../_shared/service/alert.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.user && !this.userService.token) {
      this.router.navigateByUrl('/', {queryParams: {returnUrl: state.url}})
        .then(() => this.alertService.error(this.translateService.instant('SESSION')));
      return false;
    }

    return true;
  }

}
