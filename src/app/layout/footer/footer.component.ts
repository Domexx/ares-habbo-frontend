import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'ares-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  hotelName: string;
  languages: string[];

  constructor(
    private translateService: TranslateService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.hotelName = environment.app.hotelName;
    this.languages = this.translateService.getLangs();
  }

  switchLanguage(lang: string): void {
    this.languageService.language = lang;
  }

}
