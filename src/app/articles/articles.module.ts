import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './component/article.component';

import { LayoutModule } from '../_layout/layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    LayoutModule,
    RouterModule,
    SharedModule,
  ],
})
export class ArticlesModule {}
