import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../service/article.service';
import { ArticlePagination } from '../model/article';

@Injectable({ providedIn: 'root' })
export class ArticlesResolver implements Resolve<ArticlePagination> {
  constructor(private articleService: ArticleService) {}

  /**
   * Gets the latest 9 articles and pass the data to the component
   * @param route
   * @param state
   * @return Observable<Article[]>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArticlePagination> {
    return this.articleService.list(1, 9);
  }
}
