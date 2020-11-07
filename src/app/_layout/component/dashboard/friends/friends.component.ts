import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../_shared/model/user/user';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { FriendService } from '../../../service/friend.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { FriendPagination } from '../../../../dashboard/model/friend';

@Component({
  selector: 'ares-layout-dashboard-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  animations: [
    trigger('fade', [
      state('0', style({ opacity: 1, display: 'block' })),
      state('1', style({ opacity: 0, display: 'none' })),

      transition('1 => 0', animate('450ms')),
      transition('0 => 1', animate('450ms')),
    ]),
  ],
})
export class FriendsComponent implements OnInit {
  state = true;

  friends$: User[];
  pagination$: FriendPagination;

  searchName: string;

  motto = this.translateService.instant('USER.EMPTY.MOTTO');

  @Input('friends')
  set friends(value: User[]) {
    this.friends$ = value;
  }

  @Input('pagination')
  set pagination(value: FriendPagination) {
    this.pagination$ = value;
  }

  constructor(
    private friendService: FriendService,
    private translateService: TranslateService
  ) {}

  /**
   * Initialize the child component
   */
  ngOnInit(): void {
    if (this.friends$ && this.friends$.length === 0) {
      for (let i = 0; i < 9; i++) {
        this.friends$.push(this.friendService.mannequin());
      }
    }
  }

  /**
   * Returns a full path image for the look
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

  /**
   * Handle box scrolling
   */
  onScroll(): void {
    // Check if the next page is null or if the current page is higher then the last page
    // and cancel all further actions
    if (
      !this.pagination$.next_page_url ||
      this.pagination$.current_page > this.pagination$.last_page
    ) {
      return;
    }

    this.state = false;

    const subscription = this.friendService
      .friends(++this.pagination$.current_page)
      .subscribe({
        next: (e) => {
          // Loop through all data and push the data into our array
          e.data.forEach((value) => {
            this.friends$.push(value.user);
          });

          // Set the new pagination data
          this.pagination$ = e;
        },
        complete: () => {
          this.state = true;
          subscription.unsubscribe();
        },
      });
  }
}
