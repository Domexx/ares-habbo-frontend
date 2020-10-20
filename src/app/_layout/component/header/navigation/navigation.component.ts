import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {UserService} from '../../../../_service/user.service';
import {LookService} from '../../../../_service/look.service';
import {LookAction, LookDirection, LookGestures, LookSize} from '../../../../_shared/model/user/look';

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
    private userService: UserService,
    private lookService: LookService
  ) { }

  ngOnInit(): void {
    this.hotelName = environment.app.hotelName;
    this.imager = environment.app.imager;

    this.username = this.userService.user.username;
    this.look = this.lookService.get({
      url: this.userService.user.look,
      action: LookAction.DEFAULT,
      size: LookSize.DEFAULT,
      direction: LookDirection.SOUTH,
      headDirection: LookDirection.SOUTH_WEST,
      headOnly: true,
      gesture: LookGestures.SMILE
    });
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
