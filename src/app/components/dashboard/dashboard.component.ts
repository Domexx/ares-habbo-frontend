import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from 'src/app/models/user/user';
import {UserService} from 'src/app/services/user.service';
import {TitleService} from 'src/app/services/title.service';
import {environment} from 'src/environments/environment';
import {Subscription} from "rxjs";
import {Article} from "../../models/article/article";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'ares-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  look: string;

  articles: Article[];
  articleSubscription: Subscription;

  constructor(
    private userService: UserService,
    private titleService: TitleService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.look = `${environment.app.imager}${this.user.look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;

    this.articles = [];

    this.articleSubscription = this.articleService.slide(3).subscribe({
      next: (e) => this.articles = e.data as Article[]
    });

    this.titleService.setTitle('Dashboard');
  }

  ngOnDestroy() {
    if (this.articleSubscription && !this.articleSubscription.unsubscribe) {
      this.articleSubscription.unsubscribe();
    }
  }

}
