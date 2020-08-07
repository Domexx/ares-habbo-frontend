import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Article} from "../models/article/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }

  slide(count: number): Observable<Article[]> {
    return this.apiService.get(`articles/list/${count}`).pipe(
      map(resp => resp.data)
    );
  }

  pinned(): Observable<Article[]> {
    return this.apiService.get('articles/pinned').pipe(
      map(resp => resp.data)
    );
  }
}
