import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {UserService} from '../../../../_shared/service/user.service';

@Component({
  selector: 'ares-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  username: string;
  look: string;

  hotelName: string;
  imager: string;

  isCollapsed = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.hotelName = environment.app.hotelName;
    this.imager = environment.app.imager;

    this.username = this.userService.user.username;
    this.look = this.userService.user.look;
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
