import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../_shared/service/language.service';

declare var $: any;

@Component({
  selector: 'ares-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent implements OnInit, AfterViewInit {
  flags = {
    en: 'icon--lang-en',
    de: 'icon--lang-de'
  };

  languages: string[];

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
    this.languages = this.translateService.getLangs();

    $('.language-selection').on('changed.bs.select', (e: any, clickedIndex: number) => {
      if (e.currentTarget[clickedIndex]) {
        const value = e.currentTarget[clickedIndex].id;
        this.switchLanguage(value);
      }
    });
  }

  ngAfterViewInit() {
    $('.language-selection').selectpicker('val', this.language);
    $('.language-selection').selectpicker('refresh');
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
