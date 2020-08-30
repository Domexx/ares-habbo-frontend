import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../../models/article/article';
import {environment} from '../../../../environments/environment';
import {TitleService} from '../../../services/title.service';

@Component({
  selector: 'ares-community-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;

  imager = environment.app.imager;
  date = environment.app.components.article.date;
  time = environment.app.components.article.time;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.article = this.route.snapshot.data.article;
    console.log(this.article);

    this.titleService.setTitle(this.article.title);
  }

}
