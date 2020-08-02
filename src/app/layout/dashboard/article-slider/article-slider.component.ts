import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SwiperConfigInterface, SwiperPaginationInterface} from "ngx-swiper-wrapper";
import {ArticleService} from "../../../services/article.service";
import {Subscription} from "rxjs";
import {Article} from "../../../models/article/article";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'ares-layout-dashboard-article-slider',
  templateUrl: './article-slider.component.html',
  styleUrls: ['./article-slider.component.scss'],
  providers: [ArticleService]
})
export class ArticleSliderComponent implements OnInit {
  imager = environment.app.imager;

  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  articles$: Article[];

  @Input('articles')
  set articles(items: Article[]) {
    this.articles$ = items;
  }

  ngOnInit(): void {
    this.articles$ = [];
    this.config.pagination = this.pagination;
  }

}
