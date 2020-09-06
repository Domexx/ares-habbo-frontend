import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Article} from '../../../models/article/article';
import {ArticleService} from '../../../services/article.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article | boolean> {
  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article | boolean> {
    const slug = route.params.slug.split('-');
    slug.shift();

    return this.articleService.get(slug).pipe(
      catchError(err => this.router.navigateByUrl('/404'))
    );
  }
}
