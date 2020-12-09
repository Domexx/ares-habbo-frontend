import { Component, OnInit } from '@angular/core';
import { LookService } from '../../../_service/look.service';
import { UserService } from '../../../_service/user.service';
import { User } from '../../../_shared/model/user/user';
import { environment } from '../../../../environments/environment';
import { ClientService } from '../../../client/service/client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ares-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;

  diamonds = 0;
  duckets = 0;

  name = environment.app.hotelName;
  counter = 0;

  constructor(
    private lookService: LookService,
    private userService: UserService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;

    const subscription: Subscription = this.clientService.counter().subscribe({
      next: (value) => {
        this.counter = value;

        if (value > 1) {
          this.name = `${environment.app.hotelName}'s`;
        }
      },

      complete: () => subscription.unsubscribe(),
    });

    if (this.user.currencies) {
      const diamonds = this.userService.user.currencies
        .filter((value) => value.type === 5)
        .shift();

      if (diamonds) {
        this.diamonds = diamonds.amount;
      }

      const duckets = this.userService.user.currencies
        .filter((value) => value.type === 0)
        .shift();

      if (duckets) {
        this.duckets = duckets.amount;
      }
    }
  }

  look(): string {
    return this.lookService.get({
      look: this.user.look,
      headOnly: true,
    });
  }
}
