import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  languages: string[];

  constructor(private translateService: TranslateService,
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.languages = this.translateService.getLangs();
  }

  switchLanguage(lang: string): void {
    this.languageService.language = lang;
  }

}
