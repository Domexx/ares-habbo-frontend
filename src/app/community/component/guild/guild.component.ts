import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Guild} from '../../model/guild/guild';
import {environment} from '../../../../environments/environment';
import {TitleService} from '../../../_service/title.service';
import {Pagination} from '../../../_shared/model/pagination';
import {Member} from '../../model/guild/member';
import {GuestbookPagination} from '../../../_shared/model/guestbook';

@Component({
  selector: 'ares-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit {
  guild: Guild;

  memberPagination: Pagination;
  members: Member[];

  guestbook: GuestbookPagination;

  membersLength = 0;

  date = environment.app.components.community.guild.date;
  badgeParts = environment.app.badgeParts;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {
  }

  /**
   * Initialize the Guild component
   */
  ngOnInit(): void {
    const guildData = this.route.snapshot.data.guild;

    this.guild = guildData.guild;
    this.membersLength = guildData.member_count;

    const membersData = this.route.snapshot.data.members;

    this.memberPagination = membersData.pagination;
    this.members = membersData.members;

    this.guestbook = this.route.snapshot.data.guestbook;

    this.titleService.setTitle(this.guild.name);
  }
}
