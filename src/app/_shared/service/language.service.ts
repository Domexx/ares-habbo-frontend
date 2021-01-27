import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject: BehaviorSubject<string>;
  public currentLang: Observable<string>;

  constructor(private translateService: TranslateService) {
    if (!localStorage.getItem('ares-lang')) {
      localStorage.setItem('ares-lang', this.translateService.getBrowserLang());
    }

    this.currentLangSubject = new BehaviorSubject<string>(localStorage.getItem('ares-lang'));
    this.currentLang = this.currentLangSubject.asObservable();
  }

  set language(lang: string) {
    this.currentLangSubject.next(lang);
    this.translateService.use(lang);
    localStorage.setItem('ares-lang', lang);
  }

  get language(): string {
    return this.currentLangSubject.value;
  }

  getCurrentCulture(): string {
    switch (this.language) {
      case 'en':
        return 'en-US';
      case 'de':
          return 'de-DE';
    }
  }
}
