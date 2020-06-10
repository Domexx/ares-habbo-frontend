import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages: string[];

  constructor(private translateService: TranslateService) {
    if (this.language === null || typeof this.language === 'undefined') {
      this.language = this.translateService.getBrowserCultureLang();
    }

    this.languages = this.translateService.getLangs();

    if (this.languages.indexOf(this.language) === -1) {
      this.language = environment.app.defaultLang;
    }
  }

  set language(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('ares-lang', lang);
  }

  get language(): string {
    return localStorage.getItem('ares-lang');
  }
}
