import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './component/article/article.component';

import { LayoutModule } from '../_layout/layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { ArticlesComponent } from './component/articles.component';

@NgModule({
  declarations: [ArticleComponent, ArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    LayoutModule,
    RouterModule,
    SharedModule,
  ],
})
export class ArticlesModule {}
