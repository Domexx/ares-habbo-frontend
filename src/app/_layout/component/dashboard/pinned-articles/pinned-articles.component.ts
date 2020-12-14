import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LookService } from '../../../../_service/look.service';
import { LookDirection, LookSize } from '../../../../_shared/model/user/look';
import { Article } from '../../../../articles/model/article';

@Component({
  selector: 'ares-layout-dashboard-pinned-articles',
  templateUrl: './pinned-articles.component.html',
  styleUrls: ['./pinned-articles.component.scss']
})
/**
 * @class DashboardPinnedArticlesComponent
 */
export class DashboardPinnedArticlesComponent {
  imager = environment.app.imager;

  config = {
    deactivateLoop: false,
    indicators: true,
    fade: true
  };

  articles$: Article[];

  /**
   * DashboardPinnedArticlesComponent constructor
   *
   * @param lookService
   */
  constructor(private lookService: LookService) {
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
}
