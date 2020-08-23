import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../models/user/user';
import {UserService} from '../../../services/user.service';
import {environment} from '../../../../environments/environment';
import {ClientService} from '../../../services/client.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ares-layout-dashboard-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  user: User;

  counter = 0;
  name = environment.app.hotelName;

  counterSubscription: Subscription;

  constructor(
    private userService: UserService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;

    this.counterSubscription = this.clientService.counter().subscribe({
      next: value => {
        this.counter = value;

        if (value > 1) {
          this.name = `${environment.app.hotelName}'s`;
        }
      }
    });
  }

  figure(): string {
    return `${environment.app.imager}${this.user.look}&size=l`;
  }

  ngOnDestroy() {
    if (this.counterSubscription && !this.counterSubscription.unsubscribe) {
      this.counterSubscription.unsubscribe();
    }
  }

}
