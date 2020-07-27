import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ares-logout',
  template: ''
})
export class LogoutComponent implements OnInit, OnDestroy {
  logoutSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.logoutSubscription = this.userService.logout().subscribe();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    if (this.logoutSubscription && !this.logoutSubscription.unsubscribe) {
      this.logoutSubscription.unsubscribe();
    }
  }

}
