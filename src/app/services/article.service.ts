import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) { }

  slide(count: number) {
    return this.http.get<any>(`${environment.app.endpoint}/${this.languageService.language}/news/slide/${count}`);
  }
}
