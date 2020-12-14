import { ArticlePagination } from '../model/article';
import { Injectable } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../model/article';
import { Comment, CommentPagination } from '../model/comment';
import { API } from 'src/app/_shared/model/api';

@Injectable({
  providedIn: 'root'
})
/**
 * @class ArticleService
 */
export class ArticleService {
  /**
   * ArticleService constructor
   * @param apiService
   */
  constructor(private apiService: ApiService) {
  }

  /**
   * Gets 3 articles for the dashboard slider
   *
   * @param page
   * @param results
   * @returns Observable<Article[]>
   */
  list(page: number = 1, results: number = 3): Observable<ArticlePagination> {
    return this.apiService
      .get(`articles/list/${page}/${results}`)
      .pipe(map((resp) => resp.data));
  }

  /**
   * Delete article
   *
   * @param id
   * @returns Observable<Article>
   */
  delete(id: number): Observable<Article> {
    return this.apiService
      .delete(`articles/${id}`)
      .pipe(map((resp: API) => resp.data.data));
  }

  /**
   * Gets a minimum of 3 (based on carousel indicators - change it
   * if you want more, but don't forget to customize the template)
   * pinned articles
   *
   * @param page
   * @param results
   * @returns Observable<Article[]>
   */
  pinned(page: number = 1, results: number = 3): Observable<Article[]> {
    return this.apiService
      .get(`articles/pinned/${page}/${results}`)
      .pipe(map((resp) => resp.data.data));
  }

  /**
   * Gets a article by id
   *
   * @param id
   * @returns Observable<Article>
   */
  get(id: number): Observable<Article> {
    return this.apiService.get(`articles/${id}`).pipe(map((resp) => resp.data));
  }

  /**
   * Search articles by term
   *
   * @param term
   * @param page
   * @param results
   * @returns Observable<ArticlePagination>
   */
  search(term: string, page = 1, results = 9): Observable<ArticlePagination> {
    return this.apiService
      .get(`community/search/articles/${term}/${page}/${results}`)
      .pipe(map((resp) => resp.data));
  }

  /**
   * Gets 8 comments
   *
   * @param id
   * @param page
   * @param results
   * @returns Observable<CommentPagination>
   */
  getComments(id: number, page: number = 1, results: number = 8): Observable<CommentPagination> {
    return this.apiService
      .get(`comments/${id}/list/${page}/${results}`, {}, false)
      .pipe(map((resp) => resp.data));
  }

  /**
   * Creates a comment for a article
   *
   * @param id
   * @param content
   * @returns Observable<Comment>
   */
  createComment(id: number, content: string): Observable<Comment> {
    return this.apiService
      .post(
        'comments/create',
        {
          article_id: id,
          content
        },
        false
      )
      .pipe(map((value) => value.data));
  }
}
