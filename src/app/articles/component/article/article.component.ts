import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../model/article';
import { environment } from '../../../../environments/environment';
import { TitleService } from '../../../_service/title.service';
import { CommentPagination } from '../../model/comment';
import { Subscription } from 'rxjs';
import { LookService } from '../../../_service/look.service';
import { LookSize } from '../../../_shared/model/user/look';

@Component({
  selector: 'ares-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: Article;
  comments: Comment[] = [];
  commentsPagination: CommentPagination;
  articles: Article[];

  imager = environment.app.imager;
  date = environment.app.components.article.date;
  time = environment.app.components.article.time;

  routerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private lookService: LookService
  ) {
  }

  /**
   * Initialize Article component
   */
  ngOnInit(): void {
    this.routerSubscription = this.route.data.subscribe((data) => {
      this.article = data.article;
      this.articles = data.articles;

      this.comments = data.comments.data;
      this.commentsPagination = data.comments;

      this.titleService.setTitle(this.article.title);
    });
  }

  /**
   * Add up the comments length
   */
  onComment(): void {
    this.article.comments++;
  }

  look(): string {
    return this.lookService.get({
      look: this.article.user.look,
      size: LookSize.SMALL
    });
  }

  /**
   * Unsubscribes from subscriptions
   */
  ngOnDestroy() {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe) {
      this.routerSubscription.unsubscribe();
    }
  }
}
