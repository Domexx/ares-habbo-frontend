import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/_shared/model/user/user';
import {UserService} from 'src/app/_shared/service/user.service';
import {TitleService} from 'src/app/_shared/service/title.service';
import {environment} from 'src/environments/environment';
import {Article} from '../../article/model/article';
import {ActivatedRoute} from '@angular/router';
import {Friend} from '../model/friend';
import {Guild} from '../../community/model/guild/guild';
import {Room} from '../../community/model/room';
import {Setting} from '../../_shared/model/setting';
import {GuildService} from '../../community/service/guild.service';
import {RoomService} from '../../community/service/room.service';

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
    private route: ActivatedRoute,
    private guildService: GuildService,
    private roomService: RoomService
  ) {
  }

  /**
   * Initialize the Dashboard component
   */
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

    this.guild = (!this.route.snapshot.data.guild) ? this.guildService.fakeGuild() : this.route.snapshot.data.guild;
    this.room = (!this.route.snapshot.data.room) ? this.roomService.fakeRoom() : this.route.snapshot.data.room;
    this.discord = this.route.snapshot.data.discord;

    this.titleService.setTitle('Dashboard');
  }

}
