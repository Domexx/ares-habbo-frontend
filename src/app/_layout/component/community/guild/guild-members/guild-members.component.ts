import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pagination} from '../../../../../_shared/model/pagination';
import {Member} from '../../../../../community/model/guild/member';
import {Subscription} from 'rxjs';
import {GuildService} from '../../../../../community/service/guild.service';
import {environment} from '../../../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ares-layout-community-guild-members',
  templateUrl: './guild-members.component.html',
  styleUrls: ['./guild-members.component.scss']
})
export class GuildMembersComponent implements OnDestroy {
  id$: number;
  pagination$: Pagination;
  members$: Member[] = [];

  membersSubscription: Subscription;
  motto = this.translateService.instant('USER.EMPTY.MOTTO');

  @Input('id')
  set id(value: number) {
    this.id$ = value;
  }

  @Input('members')
  set members(value: Member[]) {
    this.members$ = value;
  }

  @Input('pagination')
  set pagination(value: Pagination) {
    this.pagination$ = value;
  }

  constructor(
    private guildService: GuildService,
    private translateService: TranslateService
  ) { }


  onScroll() {
    console.log(this.pagination$);
    if (!this.pagination$.nextPage) {
      return;
    }

    this.membersSubscription = this.guildService.members(this.id$, this.pagination$.nextPage).subscribe({
      next: (e) => {
        e.members.forEach(value => {
          this.members$.push(value);
        });

        this.pagination$ = e.pagination;
      }
    });

    console.log(this.pagination$);
  }

  look(look: string): string {
    if (look === null) {
      return 'assets/images/habbo.gif';
    }

    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

  ngOnDestroy() {
    if (this.membersSubscription && !this.membersSubscription.unsubscribe) {
      this.membersSubscription.unsubscribe();
    }
  }

}
