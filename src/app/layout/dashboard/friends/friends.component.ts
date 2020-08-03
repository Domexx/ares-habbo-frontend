import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user/user";

@Component({
  selector: 'ares-layout-dashboard-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friends$: User[];

  @Input('friends')
  set friends(value: User[]) {
    this.friends$ = value;
  }

  constructor() { }

  ngOnInit(): void {
    this.friends$ = [];
  }

}
