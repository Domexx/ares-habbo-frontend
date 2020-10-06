import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticleService} from '../service/article.service';
import {CommentPagination} from '../model/comment';

@Injectable({ providedIn: 'root' })
export class ArticleCommentsResolver implements Resolve<CommentPagination> {
  constructor(
    private articleService: ArticleService
  ) {}

  /**
   * Gets comment for article and pass the data to the component
   * @param route
   * @param state
   * @return Observable<CommentPagination>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CommentPagination> {
    return this.articleService.getComments(route.params.slug.split('-')[0]);
  }
}
