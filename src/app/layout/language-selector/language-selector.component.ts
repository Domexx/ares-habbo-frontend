import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';
import {environment} from '../../../environments/environment';

declare var $: any;

@Component({
  selector: 'ares-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages: string[];

  constructor(
    private translateService: TranslateService,
    public languageService: LanguageService
  ) { }


  ngOnInit(): void {
    $('.ares-language').selectpicker();
    this.languages = this.translateService.getLangs();
  }

  switchLanguage(lang: string): void {
    this.languageService.language = lang;
  }

}
