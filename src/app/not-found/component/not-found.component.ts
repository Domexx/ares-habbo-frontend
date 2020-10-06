import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'ares-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  previousUrl: string;

  constructor(
    private location: Location,
    private router: Router
  ) {
    const routerSubscription = this.router.events.subscribe({
      next: event => {
        // Stores the last visited page
        if (event instanceof NavigationEnd) {
          if (event.url !== '/404') {
            this.previousUrl = event.urlAfterRedirects;
          }
        }
      },
      complete: () => routerSubscription.unsubscribe()
    });
  }

  /**
   * Redirect the user to the previous url
   * or to the home component
   */
  back(): void {
    if (this.previousUrl) {
      this.location.back();
    }

    this.router.navigateByUrl('/');
  }
}
