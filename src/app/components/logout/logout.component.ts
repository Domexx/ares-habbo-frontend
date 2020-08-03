import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AlertService} from "../../services/alert.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ares-logout',
  template: ''
})
export class LogoutComponent implements OnInit, OnDestroy, AfterViewInit {
  logoutSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.logoutSubscription = this.userService.logout().subscribe();
  }

  ngAfterViewInit() {
    this.router.navigateByUrl('/').finally(() => this.alertService.success(this.translateService.instant('LOGOUT.SUCCESS')));
  }

  ngOnDestroy() {
    if (this.logoutSubscription && !this.logoutSubscription.unsubscribe) {
      this.logoutSubscription.unsubscribe();
    }
  }

}
