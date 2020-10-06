import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticleService} from '../../../article/service/article.service';
import {Article} from '../../../article/model/article';

@Injectable({ providedIn: 'root' })
export class ArticleSliderResolver implements Resolve<Article[]> {
  constructor(private articleService: ArticleService) {}

  /**
   * Gets the latest 3 articles and pass the data to the component
   * @param route
   * @param state
   * @return Observable<Article[]>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article[]> {
    return this.articleService.slide();
  }
}
