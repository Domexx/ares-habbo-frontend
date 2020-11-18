import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/model/user/user';
import { UserService } from 'src/app/_service/user.service';
import { TitleService } from 'src/app/_service/title.service';
import { Article } from '../../articles/model/article';
import { ActivatedRoute } from '@angular/router';
import { Friend, FriendPagination } from '../model/friend';
import { Guild } from '../../community/model/guild/guild';
import { Room } from '../../community/model/room';
import { Setting } from '../../_shared/model/setting';
import { GuildService } from '../../community/service/guild.service';
import { RoomService } from '../../community/service/room.service';
import { LookService } from '../../_service/look.service';

@Component({
  selector: 'ares-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User;
  look: string;

  articles: Article[];
  pinned: Article[];
  friends: User[];
  guild: Guild;
  room: Room;
  discord: Setting;

  friendsPagination: FriendPagination;

  userOfTheHotel: User;

  constructor(
    private userService: UserService,
    private titleService: TitleService,
    private route: ActivatedRoute,
    private guildService: GuildService,
    private roomService: RoomService,
    private lookService: LookService
  ) {}

  /**
   * Initialize the Dashboard component
   */
  ngOnInit(): void {
    this.user = this.userService.user;
    this.look = this.lookService.get({
      look: this.user.look,
    });

    this.articles = this.route.snapshot.data.slider;
    this.pinned = this.route.snapshot.data.pinned;

    const friendsList = this.route.snapshot.data.friends.data;
    let friendsArray: User[] = [];

    if (friendsList) {
      friendsArray = friendsList.map(
        (value: Friend, index: number) => friendsList[index]
      );
    }

    this.friends = friendsArray;
    this.friendsPagination = this.route.snapshot.data.friends;

    this.guild = !this.route.snapshot.data.guild
      ? this.guildService.fakeGuild()
      : this.route.snapshot.data.guild;
    this.room = !this.route.snapshot.data.room
      ? this.roomService.fakeRoom()
      : this.route.snapshot.data.room;
    this.discord = this.route.snapshot.data.discord;
    this.userOfTheHotel = this.route.snapshot.data.userOfHotel;

    this.titleService.setTitle('Dashboard');
  }
}
