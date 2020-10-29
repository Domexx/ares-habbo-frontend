import { Component, OnInit } from '@angular/core';
import {LookService} from '../../../_service/look.service';
import {UserService} from '../../../_service/user.service';
import {User} from '../../../_shared/model/user/user';

@Component({
  selector: 'ares-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;


  constructor(
    private lookService: LookService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  look(): string {
    return this.lookService.get({
      look: this.user.look,
      headOnly: true
    });
  }

}
