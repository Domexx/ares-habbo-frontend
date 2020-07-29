import {Component, OnInit, ViewChild} from '@angular/core';
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
  languageSelection: any;

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languages = this.translateService.getLangs();
    this.languageSelection = Array.of(this.languages);
  }

  switchLanguage(): void {
    this.languageService.language = this.languageSelection;
  }

  get language() {
    return this.languageService.language;
  }

}
