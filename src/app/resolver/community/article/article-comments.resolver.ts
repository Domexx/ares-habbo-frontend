import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticleService} from '../../../services/article.service';
import {CommentPagination} from '../../../models/article/comment';

@Injectable({ providedIn: 'root' })
export class CommunityArticleCommentsResolver implements Resolve<CommentPagination> {
  constructor(
    private articleService: ArticleService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CommentPagination> {
    return this.articleService.getComments(route.params.id);
  }
}
