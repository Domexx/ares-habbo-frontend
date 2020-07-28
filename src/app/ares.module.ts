import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AresRoutingModule} from './ares-routing.module';

import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {HomeModule} from './modules/home/home.module';

import {AresComponent} from './ares.component';

import {TitleService} from './services/title.service';
import {environment} from 'src/environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from './modules/layout/layout.module';
import {LanguageService} from './services/language.service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';

import { LogoutComponent } from './components/logout/logout.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    AresComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AresRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    HomeModule,
    LayoutModule,
  ],
  providers: [
    TitleService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AresComponent]
})
export class AresModule {
  constructor(private translate: TranslateService,
              private languageService: LanguageService) {
    translate.addLangs(['en', 'de', 'tr']);
    translate.setDefaultLang(environment.app.defaultLang);

    if (translate.getLangs().indexOf(this.languageService.language) === -1) {
      this.languageService.language = environment.app.defaultLang;
    }

    translate.use(this.languageService.language);
  }
}