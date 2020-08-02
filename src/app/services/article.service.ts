import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {API} from "../models/api";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }

  slide(count: number): Observable<API> {
    return this.apiService.get(`articles/slide/${count}`);
  }
}
