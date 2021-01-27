import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../_shared/service/language.service';

@Component({
  selector: 'ares-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  flags = {
    en: 'icon--lang-en',
    de: 'icon--lang-de',
  };

  languages: string[];

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languages = this.translateService.getLangs();
  }

  switchLanguage(lang: string): void {
    this.languageService.language = lang;
  }

  get language() {
    return this.languageService.language;
  }

  flag(lang: string): string {
    return `<div class="${this.flags[lang]}"></div>`;
  }
}
