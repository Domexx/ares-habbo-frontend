import { Member, MemberPagination } from '../../model/guild/member';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guild } from '../../model/guild/guild';
import { environment } from '../../../../environments/environment';
import { TitleService } from '../../../_service/title.service';
import { GuestbookPagination } from '../../../_shared/model/guestbook';

@Component({
  selector: 'ares-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss'],
})
export class GuildComponent implements OnInit {
  guild: Guild;
  members: Member[];
  memberPagination: MemberPagination;
  guestbook: GuestbookPagination;

  date = environment.app.components.community.guild.date;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {}

  /**
   * Initialize the Guild component
   */
  ngOnInit(): void {
    this.guild = this.route.snapshot.data.guild;
    this.memberPagination = this.route.snapshot.data.members;
    this.members = this.memberPagination.data;
    this.guestbook = this.route.snapshot.data.guestbook;

    this.titleService.setTitle(this.guild.name);
  }

  /**
   * Replaces the image with given placeholder when badge wasnt found
   *
   * @param e
   */
  error(e: any): void {
    e.target.src = '/assets/images/icons/ares64x64.png';
  }

  /**
   * Return guild badge path
   *
   * @return string
   */
  get badge(): string {
    return `${environment.app.badgeParts}${this.guild.badge}.png`;
  }
}
