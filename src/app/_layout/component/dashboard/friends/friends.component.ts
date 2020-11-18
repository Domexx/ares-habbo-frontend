import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LookService } from '../../../../_service/look.service';
import { LookGestures } from '../../../../_shared/model/user/look';
import { User } from '../../../../_shared/model/user/user';
import { FriendPagination } from '../../../../dashboard/model/friend';
import { FriendService } from '../../../service/friend.service';

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

  /**
   * FriendsComponent constructor
   *
   * @param friendService
   * @param translateService
   * @param lookService
   */
  constructor(
    private friendService: FriendService,
    private translateService: TranslateService,
    private lookService: LookService
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
   * @param online
   * @return string
   */
  look(
    look: string,
    online: boolean = false
  ): string {
    return this.lookService.get({
      look,
      gesture: online ? LookGestures.STANDARD : LookGestures.EYE_BLINK
    });
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
            this.friends$.push(value);
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
