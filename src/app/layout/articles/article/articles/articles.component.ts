import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../../models/article/article';
import {Router} from '@angular/router';

@Component({
  selector: 'ares-layout-article-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  articles$: Article[] = [];

  @Input('articles')
  set articles(value: Article[]) {
    this.articles$ = value;
  }

}
