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
  ],
})
export class ArticlesModule {}
