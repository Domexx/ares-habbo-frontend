import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { User } from 'src/app/models/user/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  languages: string[];
  user: User;

  constructor(private translateService: TranslateService,
              public languageService: LanguageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.languages = this.translateService.getLangs();
  }

  switchLanguage(lang: string): void {
    this.languageService.language = lang;
  }

}
