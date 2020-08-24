import {Component, Input, OnInit} from '@angular/core';
import {SwiperConfigInterface, SwiperPaginationInterface} from 'ngx-swiper-wrapper';
import {ArticleService} from '../../../services/article.service';
import {Article} from '../../../models/article/article';
import {environment} from '../../../../environments/environment';
import {LanguageService} from '../../../services/language.service';

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
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    allowTouchMove: true,
    loop: true,
    autoplay: true,
    speed: 500
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

  constructor(
    private languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
    this.config.pagination = this.pagination;
    this.config.loopedSlides = this.articles$.length;
  }

  get locale(): string {
    return this.languageService.getCurrentCulture();
  }

}
