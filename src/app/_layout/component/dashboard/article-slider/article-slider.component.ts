import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LookService } from '../../../../_service/look.service';
import { LookDirection, LookSize } from '../../../../_shared/model/user/look';
import { LanguageService } from '../../../../_shared/service/language.service';
import { Article } from '../../../../articles/model/article';

@Component({
  selector: 'ares-layout-dashboard-article-slider',
  templateUrl: './article-slider.component.html',
  styleUrls: ['./article-slider.component.scss']
})
/**
 * @class ArticleSliderComponent
 */
export class ArticleSliderComponent {
  imager = environment.app.imager;

  config = {
    deactivateLoop: false,
    indicators: true,
    fade: true
  };

  articles$: Article[];

  /**
   * ArticleSliderComponent constructor
   *
   * @param languageService
   * @param lookService
   */
  constructor(
    private languageService: LanguageService,
    private lookService: LookService
  ) {}

  /**
   * Generate look url by given look string
   *
   * @param look
   * @returns string
   */
  figure(look: string): string {
    return this.lookService.get({
      look,
      direction: LookDirection.SOUTH,
      headDirection: LookDirection.SOUTH,
      size: LookSize.SMALL
    });
  }

  /**
   * Get locale code
   *
   * @returns string
   */
  get locale(): string {
    return this.languageService.getCurrentCulture();
  }

  /**
   * Set articles
   *
   * @param items
   */
  @Input('articles')
  set articles(items: Article[]) {
    this.articles$ = items;
  }
}
