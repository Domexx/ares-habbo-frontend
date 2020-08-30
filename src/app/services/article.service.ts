import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Article} from "../models/article/article";
import {API} from '../models/api';
import {Comment} from '../models/article/comment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }

  slide(page: number = 1, results: number = 3): Observable<Article[]> {
    return this.apiService.get(`articles/list/${page}/${results}`).pipe(
      map(resp => resp.data)
    );
  }

  pinned(): Observable<Article[]> {
    return this.apiService.get('articles/pinned').pipe(
      map(resp => resp.data)
    );
  }

  get(id: number): Observable<Article> {
    return this.apiService.get(`articles/${id}`).pipe(
      map(resp => resp.data)
    );
  }
}
