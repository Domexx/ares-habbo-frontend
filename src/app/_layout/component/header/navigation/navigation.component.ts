import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {UserService} from '../../../../_shared/service/user.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ares-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  username: string;
  look: string;

  hotelName: string;
  imager: string;

  isCollapsed = false;

  route: string;
  routerSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hotelName = environment.app.hotelName;
    this.imager = environment.app.imager;

    this.username = this.userService.user.username;
    this.look = this.userService.user.look;

    this.routerSubscription = this.router.events.subscribe(value => {
      if (value instanceof NavigationStart) {
        this.route = value.url;
      }
    });
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy() {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe) {
      this.routerSubscription.unsubscribe();
    }
  }

}
