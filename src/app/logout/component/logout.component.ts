import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_shared/service/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../../_shared/service/alert.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ares-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    if (!this.userService.token || !this.userService.user) {
      this.router.navigateByUrl('/');
      return;
    }

    this.userService.logout().finally(() => this.router.navigateByUrl('/').then(() => this.alertService.success(this.translateService.instant('LOGOUT.SUCCESS'))));
  }


}
