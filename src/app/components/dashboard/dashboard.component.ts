import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user/user';
import {UserService} from 'src/app/services/user.service';
import {TitleService} from 'src/app/services/title.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'ares-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  look: string;

  constructor(
    private userService: UserService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.look = `${environment.app.imager}${this.user.look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;

    this.titleService.setTitle('Dashboard');
  }

}
