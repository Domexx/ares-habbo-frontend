import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../model/article';
import { ArticleService } from '../../service/article.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article | boolean> {
  constructor(private articleService: ArticleService, private router: Router) {}

  /**
   * Gets article by slug and pass the data to the component
   * @param route
   * @param state
   * @return Observable<Article | boolean>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article | boolean> {
    const slug = route.params.slug.split('-');
    slug.shift();

    return this.articleService
      .get(slug.join('-'))
      .pipe(catchError((err) => this.router.navigateByUrl('/404')));
  }
}
