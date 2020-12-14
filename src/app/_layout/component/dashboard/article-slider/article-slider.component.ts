import { Component, Input } from '@angular/core';
import { ArticleService } from '../../../../articles/service/article.service';
import { Article } from '../../../../articles/model/article';
import { environment } from '../../../../../environments/environment';
import { LanguageService } from '../../../../_shared/service/language.service';

@Component({
  selector: 'ares-layout-dashboard-article-slider',
  templateUrl: './article-slider.component.html',
  styleUrls: ['./article-slider.component.scss'],
  providers: [ArticleService],
})
/**
 * @class ArticleSliderComponent
 */
export class ArticleSliderComponent {
  imager = environment.app.imager;

  /**
   * @property
   */
  config = {
    deactivateLoop: false,
    indicators: true,
    fade: true
  };

  articles$: Article[];

  /**
   * Set articles
   *
   * @param items
   */
  @Input('articles')
  set articles(items: Article[]) {
    this.articles$ = items;
  }

  /**
   * ArticleSliderComponent constructor
   *
   * @param languageService
   */
  constructor(private languageService: LanguageService) {}

  /**
   * Get locale code
   *
   * @returns string
   */
  get locale(): string {
    return this.languageService.getCurrentCulture();
  }
}
