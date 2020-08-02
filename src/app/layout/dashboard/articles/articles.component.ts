import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../models/article/article";

@Component({
  selector: 'ares-layout-dashboard-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles$: Article[];

  @Input('articles')
  set articles(items: Article[]) {
    this.articles$ = items;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
