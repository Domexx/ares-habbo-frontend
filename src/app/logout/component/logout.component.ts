import { AuthService } from './../../_service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../../_shared/service/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ares-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  /**
   * Redirects the user to the home component, if there is no token or any user data provided
   * or sends a post requests to blacklist the JWT token
   */
  ngOnInit(): void {
    if (!this.userService.token || !this.userService.user) {
      this.router.navigateByUrl('/');
      return;
    }

    this.authService
      .logout()
      .finally(() =>
        this.router
          .navigateByUrl('/')
          .then(() =>
            this.alertService.success(
              this.translateService.instant('LOGOUT.SUCCESS')
            )
          )
      );
  }
}
