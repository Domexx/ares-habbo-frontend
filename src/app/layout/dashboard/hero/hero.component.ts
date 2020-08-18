import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user/user';
import {UserService} from '../../../services/user.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ares-layout-dashboard-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  figure(): string {
    return `${environment.app.imager}${this.user.look}&size=l`;
  }

}
