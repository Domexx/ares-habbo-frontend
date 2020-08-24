import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticleService} from '../../../services/article.service';
import {Article} from '../../../models/article/article';

@Injectable({ providedIn: 'root' })
export class PinnedArticlesResolver implements Resolve<Article[]> {
  constructor(private articleService: ArticleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article[]> {
    return this.articleService.pinned();
  }
}
