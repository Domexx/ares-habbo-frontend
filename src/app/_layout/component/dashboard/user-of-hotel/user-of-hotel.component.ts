import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/model/user/user';

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

  constructor() {}

  ngOnInit(): void {}
}
