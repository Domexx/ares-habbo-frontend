import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader, MissingTranslationHandler, 
        TranslateCompiler, TranslateParser, TranslateFakeCompiler, TranslateDefaultParser, TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { HomeModule } from './modules/home/home.module';

import { AppComponent } from './app.component';

import { TitleService } from './services/title.service';
import { MissingHandler } from './handlers/lang/missing.handler';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/lang/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      },
      useDefaultLang: true,
      defaultLanguage: 'en',
    }),
    HomeModule,
  ],
  providers: [
    TitleService,
    TranslatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
