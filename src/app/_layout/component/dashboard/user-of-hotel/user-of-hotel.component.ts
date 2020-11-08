import { UserService } from 'src/app/_service/user.service';
import { LookService } from './../../../../_service/look.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/model/user/user';
import { LookGestures, LookSize } from 'src/app/_shared/model/user/look';

@Component({
  selector: 'ares-layout-dashboard-user-of-hotel',
  templateUrl: './user-of-hotel.component.html',
  styleUrls: ['./user-of-hotel.component.scss'],
})
export class UserOfHotelComponent implements OnInit {
  user$: User;

  @Input('user')
  set user(value: User) {
    this.user$ = value;
  }

  constructor(
    private lookService: LookService,
    private userService: UserService
  ) {}

  /**
   * Initialize component
   */
  ngOnInit(): void {
    if (!this.user$) {
      this.user$ = this.userService.mannequin();
    }
  }

  /**
   * Returns the full image path
   *
   * @return string
   */
  get look(): string {
    return this.lookService.get({
      look: this.user$.look,
      size: LookSize.LARGE,
      gesture:
        this.user$.online === 0
          ? LookGestures.EYE_BLINK
          : LookGestures.STANDARD,
    });
  }
}
