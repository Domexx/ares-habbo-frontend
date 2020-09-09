import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticleService} from '../../../article/service/article.service';
import {Article} from '../../../article/model/article';

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
