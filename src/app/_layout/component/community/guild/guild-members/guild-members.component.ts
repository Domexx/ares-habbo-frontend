import { MemberPagination } from './../../../../../community/model/guild/member';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Member } from '../../../../../community/model/guild/member';
import { Subscription } from 'rxjs';
import { GuildService } from '../../../../../community/service/guild.service';
import { environment } from '../../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ares-layout-community-guild-members',
  templateUrl: './guild-members.component.html',
  styleUrls: ['./guild-members.component.scss'],
})
export class GuildMembersComponent {
  id$: number;
  memberPagination: MemberPagination;
  members$: Member[] = [];

  motto = this.translateService.instant('USER.EMPTY.MOTTO');
  membersSubscription: Subscription;

  @Input('id')
  set id(value: number) {
    this.id$ = value;
  }

  @Input('members')
  set members(value: Member[]) {
    this.members$ = value;
  }

  @Input('pagination')
  set pagination(value: MemberPagination) {
    this.memberPagination = value;
  }

  constructor(
    private guildService: GuildService,
    private translateService: TranslateService
  ) {}

  /**
   * Handle box scrolling
   */
  onScroll(): void {
    // Check if the next page is null or if the current page is higher then the last page
    // and cancel all further actions
    if (
      !this.memberPagination.next_page_url ||
      this.memberPagination.current_page > this.memberPagination.last_page
    ) {
      return;
    }

    this.membersSubscription = this.guildService
      .members(this.id$, ++this.memberPagination.current_page)
      .subscribe({
        next: (e) => {
          console.log(e);
          e.data.forEach((value) => {
            this.members$.push(value);
          });

          this.memberPagination = e;
        },
        complete: () => this.membersSubscription.unsubscribe(),
      });
  }

  /**
   * @TODO don't forget to add a comment here thx
   *
   * @param look
   * @return string
   */
  look(look: string): string {
    if (look === null) {
      return 'assets/images/habbo.gif';
    }

    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }
}
