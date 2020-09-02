import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../../models/article/article';
import {environment} from '../../../../environments/environment';
import {TitleService} from '../../../services/title.service';
import {Comment, CommentPagination} from '../../../models/article/comment';

@Component({
  selector: 'ares-community-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;
  comments: Comment[];
  commentsPagination: CommentPagination;

  imager = environment.app.imager;
  date = environment.app.components.article.date;
  time = environment.app.components.article.time;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.article = this.route.snapshot.data.article;

    const comments = this.route.snapshot.data.comments;
    this.comments = comments.comments;
    this.commentsPagination = comments.pagination;

    this.titleService.setTitle(this.article.title);
  }

}
