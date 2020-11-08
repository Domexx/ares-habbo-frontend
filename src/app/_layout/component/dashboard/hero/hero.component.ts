import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../_shared/model/user/user';
import { UserService } from '../../../../_service/user.service';
import { environment } from '../../../../../environments/environment';
import { ClientService } from '../../../../client/service/client.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../../_shared/service/language.service';

@Component({
  selector: 'ares-layout-dashboard-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  counter = 0;

  user: User;

  name = environment.app.hotelName;
  date = environment.app.components.dashboard.hero.date;
  time = environment.app.components.dashboard.hero.time;

  lastLogin: number;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    this.lastLogin = this.user.last_login * 1000;

    const subscription: Subscription = this.clientService.counter().subscribe({
      next: (value) => {
        this.counter = value;

        if (value > 1) {
          this.name = `${environment.app.hotelName}'s`;
        }
      },

      complete: () => subscription.unsubscribe();
    });
  }

  figure(): string {
    return `${environment.app.imager}${this.user.look}&size=l`;
  }

  get locale(): string {
    return this.languageService.getCurrentCulture();
  }
}
