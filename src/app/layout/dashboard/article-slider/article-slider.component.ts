import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ArticleSliderComponent implements OnInit, OnDestroy {

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

  articleSubscription: Subscription;
  articles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.config.pagination = this.pagination;

    this.articleSubscription = this.articleService.slide(3).subscribe({
      next: (e) => this.articles = e.data as Article[],
      error: (e) => console.error(e)
    });
  }

  ngOnDestroy() {
    if (this.articleSubscription && !this.articleSubscription.unsubscribe) {
      this.articleSubscription.unsubscribe();
    }
  }

}
