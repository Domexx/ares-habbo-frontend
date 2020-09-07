import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user/user';
import {UserService} from 'src/app/services/user.service';
import {TitleService} from 'src/app/services/title.service';
import {environment} from 'src/environments/environment';
import {Article} from '../../models/article/article';
import {ActivatedRoute} from '@angular/router';
import {Friend} from '../../models/friend/friend';
import {Guild} from '../../models/guild/guild';
import {Room} from '../../models/room/room';
import {Setting} from '../../models/setting';

@Component({
  selector: 'ares-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  look: string;

  articles: Article[];
  pinned: Article[];
  friends: Friend[];
  guild: { guild: Guild, member_count: number };
  room: Room;
  discord: Setting;

  friendsPagination: { totalPages: number; nextPage: number; prevPage: number } = {
    totalPages: 1,
    nextPage: 1,
    prevPage: 1
  };

  constructor(
    private userService: UserService,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.look = `${environment.app.imager}${this.user.look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;

    this.articles = this.route.snapshot.data.slider;
    this.pinned = this.route.snapshot.data.pinned;

    const friendsList = this.route.snapshot.data.friends.friends;
    let friendsArray: Friend[] = [];

    if (friendsList) {
      friendsArray = friendsList.map((value: Friend, index: number) => friendsList[index].friend);
    }

    this.friends = friendsArray;
    this.friendsPagination = this.route.snapshot.data.friends?.pagination ?? 0;

    this.guild = this.route.snapshot.data.guild;
    this.room = this.route.snapshot.data.room;
    this.discord = this.route.snapshot.data.discord;

    this.titleService.setTitle('Dashboard');
  }

}
