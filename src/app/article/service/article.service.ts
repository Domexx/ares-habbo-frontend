import {Injectable} from '@angular/core';
import {ApiService} from '../../_service/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Article} from '../model/article';
import {Comment, CommentPagination} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) {
  }

  /**
   * Gets 3 articles for the dashboard slider
   * @param page
   * @param results
   * @return Observable<Article[]>
   */
  slide(page: number = 1, results: number = 3): Observable<Article[]> {
    return this.apiService.get(`articles/list/${page}/${results}`).pipe(
      map(resp => resp.data.data)
    );
  }

  /**
   * Gets the pinned articles
   * @return Observable<Article[]>
   */
  pinned(): Observable<Article[]> {
    return this.apiService.get('articles/pinned').pipe(
      map(resp => resp.data)
    );
  }

  /**
   * Gets a article by id
   * @param id
   * @return Observable<Article>
   */
  get(id: number): Observable<Article> {
    return this.apiService.get(`articles/${id}`).pipe(
      map(resp => resp.data)
    );
  }

  /**
   * Gets 8 comments
   * @param id
   * @param page
   * @param results
   * @return Observable<CommentPagination>
   */
  getComments(id: number, page: number = 1, results: number = 8): Observable<CommentPagination> {
    return this.apiService.get(`comments/${id}/list/${page}/${results}`, {}, false).pipe(
      map(resp => resp.data)
    );
  }

  /**
   * Creates a comment for a article
   * @param id
   * @param content
   * @return Observable<Comment>
   */
  createComment(id: number, content: string): Observable<Comment> {
    return this.apiService.post('comments/create', {
      article_id: id,
      content
    }, false).pipe(
      map(value => value.data)
    );
  }
}
