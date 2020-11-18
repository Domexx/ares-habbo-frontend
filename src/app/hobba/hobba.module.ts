import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbaRoutingModule } from './hobba-routing.module';
import { SettingsComponent } from './component/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ArticlesComponent } from './component/articles/articles.component';
import { CreateComponent } from './component/articles/create/create.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

@NgModule({
  declarations: [SettingsComponent, ArticlesComponent, CreateComponent],
  imports: [
    CommonModule,
    HobbaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FontAwesomeModule,
    InfiniteScrollModule,
  ],
})
export class HobbaModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch);
  }
}
