import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './component/article/article.component';

import { LayoutModule } from '../_layout/layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { ArticlesComponent } from './component/articles.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchArticlePipe } from './pipe/search-article.pipe';
import { TranslateModule } from '@ngx-translate/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

@NgModule({
  declarations: [ArticleComponent, ArticlesComponent, SearchArticlePipe],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    LayoutModule,
    RouterModule,
    SharedModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FontAwesomeModule,
  ],
})
export class ArticlesModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch);
  }
}
