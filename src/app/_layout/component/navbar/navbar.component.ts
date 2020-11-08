import { Component, OnInit } from '@angular/core';
import { LookService } from '../../../_service/look.service';
import { UserService } from '../../../_service/user.service';
import { User } from '../../../_shared/model/user/user';

@Component({
  selector: 'ares-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user: User;
  public diamonds = 0;
  public duckets = 0;

  constructor(
    private lookService: LookService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;

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

  look(): string {
    return this.lookService.get({
      look: this.user.look,
      headOnly: true,
    });
  }
}
