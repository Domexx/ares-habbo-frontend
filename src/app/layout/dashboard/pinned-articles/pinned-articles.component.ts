import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {SwiperConfigInterface, SwiperPaginationInterface} from "ngx-swiper-wrapper";
import {Article} from "../../../models/article/article";

@Component({
  selector: 'ares-layout-dashboard-pinned-articles',
  templateUrl: './pinned-articles.component.html',
  styleUrls: ['./pinned-articles.component.scss']
})
export class PinnedArticlesComponent implements OnInit {
  imager = environment.app.imager;

  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    allowTouchMove: false
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
