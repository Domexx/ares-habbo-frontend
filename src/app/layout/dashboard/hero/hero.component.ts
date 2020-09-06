import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../models/user/user';
import {UserService} from '../../../services/user.service';
import {environment} from '../../../../environments/environment';
import {ClientService} from '../../../services/client.service';
import {Subscription} from 'rxjs';
import {LanguageService} from '../../../services/language.service';

@Component({
  selector: 'ares-layout-dashboard-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  counterSubscription: Subscription;
  counter = 0;

  user: User;

  name = environment.app.hotelName;
  date = environment.app.components.dashboard.hero.date;
  time = environment.app.components.dashboard.hero.time;

  lastLogin: number;
  diamonds = 0;
  duckets = 0;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.lastLogin = this.user.last_login * 1000;
    this.diamonds = this.userService.user.currencies.filter(value => value.type === 5).shift().amount;
    this.duckets = this.userService.user.currencies.filter(value => value.type === 0).shift().amount;

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

  get locale(): string {
    return this.languageService.getCurrentCulture();
  }

}
