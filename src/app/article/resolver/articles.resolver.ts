import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticleService} from '../service/article.service';
import {Article} from '../model/article';

@Injectable({ providedIn: 'root' })
export class ArticleArticlesResolver implements Resolve<Article[]> {
  constructor(private articleService: ArticleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article[]> {
    return this.articleService.slide(1, 5);
  }
}
