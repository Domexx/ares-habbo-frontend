import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SanitizerPipe} from './pipe/sanitizer.pipe';

import {UserService} from './service/user.service';
import {LanguageService} from './service/language.service';
import {ApiService} from './service/api.service';
import {AlertService} from './service/alert.service';
import {TitleService} from './service/title.service';
import {SettingService} from './service/setting.service';
import {NumberSuffixPipe} from './pipe/number-suffix.pipe';

@NgModule({
  declarations: [
    SanitizerPipe,
    NumberSuffixPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    LanguageService,
    ApiService,
    AlertService,
    TitleService,
    SettingService
  ],
  exports: [
    SanitizerPipe,
    NumberSuffixPipe
  ]
})
export class SharedModule {
}
