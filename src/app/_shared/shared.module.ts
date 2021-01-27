import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SanitizerPipe} from './pipe/sanitizer.pipe';

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
    SettingService
  ],
  exports: [
    SanitizerPipe,
    NumberSuffixPipe
  ]
})
export class SharedModule {
}
