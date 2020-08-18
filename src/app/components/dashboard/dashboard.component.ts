import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from 'src/app/models/user/user';
import {UserService} from 'src/app/services/user.service';
import {TitleService} from 'src/app/services/title.service';
import {environment} from 'src/environments/environment';
import {Subscription} from 'rxjs';
import {Article} from '../../models/article/article';
import {ArticleService} from '../../services/article.service';
import {FriendService} from '../../services/friend.service';

@Component({
  selector: 'ares-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  look: string;

  articles: Article[];
  pinned: Article[];
  friends: User[];

  friendsPagination: { totalPages: number; nextPage: number; prevPage: number } = {
    totalPages: 1,
    nextPage: 1,
    prevPage: 1
  };

  articleSubscription: Subscription;
  pinnedSubscription: Subscription;
  friendsSubscription: Subscription;

  constructor(
    private userService: UserService,
    private titleService: TitleService,
    private articleService: ArticleService,
    private friendService: FriendService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.look = `${environment.app.imager}${this.user.look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;

    this.articles = [];
    this.pinned = [];
    this.friends = [];

    this.articleSubscription = this.articleService.slide().subscribe({
      next: (e) => this.articles = e
    });

    this.pinnedSubscription = this.articleService.pinned().subscribe({
      next: (e) => this.pinned = e
    });

    this.friendsSubscription = this.friendService.friends().subscribe({
      next: (e) => {
        this.friends = e.friends;
        this.friendsPagination = e.pagination;
      }
    });

    this.titleService.setTitle('Dashboard');
  }

  ngOnDestroy() {
    if (this.articleSubscription && !this.articleSubscription.unsubscribe) {
      this.articleSubscription.unsubscribe();
    }

    if (this.pinnedSubscription && !this.pinnedSubscription.unsubscribe) {
      this.pinnedSubscription.unsubscribe();
    }

    if (this.friendsSubscription && !this.friendsSubscription.unsubscribe) {
      this.friendsSubscription.unsubscribe();
    }
  }

}
