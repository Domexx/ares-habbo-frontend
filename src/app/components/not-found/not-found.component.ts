import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ares-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnDestroy {
  routerSubscription: Subscription;
  previousUrl: string;

  constructor(
    private location: Location,
    private router: Router
  ) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/404') {
          this.previousUrl = event.urlAfterRedirects;
        }
      }
    });
  }

  back(): void {
    if (this.previousUrl) {
      this.location.back();
    }

    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe) {
      this.routerSubscription.unsubscribe();
    }
  }
}
