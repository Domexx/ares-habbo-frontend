import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../model/article';
import {environment} from '../../../environments/environment';
import {TitleService} from '../../_shared/service/title.service';
import {Comment, CommentPagination} from '../model/comment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ares-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: Article;
  comments: Comment[];
  articles: Article[];

  commentsPagination: CommentPagination;

  imager = environment.app.imager;
  date = environment.app.components.article.date;
  time = environment.app.components.article.time;

  routerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.route.data.subscribe((data) => {
      this.article = data.article;
      this.articles = data.articles;

      const comments = data.comments;
      this.comments = comments.comments;
      this.commentsPagination = comments.pagination;

      this.titleService.setTitle(this.article.title);
    });
  }

  onComment(): void {
    this.article.comments++;
  }

  ngOnDestroy() {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe) {
      this.routerSubscription.unsubscribe();
    }
  }

}
