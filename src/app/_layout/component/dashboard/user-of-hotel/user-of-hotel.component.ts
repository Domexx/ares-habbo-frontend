import { LookService } from './../../../../_service/look.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/model/user/user';
import { LookSize } from 'src/app/_shared/model/user/look';

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

  constructor(private lookService: LookService) {}

  ngOnInit(): void {}

  /**
   * Returns the full image path
   *
   * @return string
   */
  get look(): string {
    return this.lookService.get({
      look: this.user$.look,
      size: LookSize.LARGE,
    });
  }
}
