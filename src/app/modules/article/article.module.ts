import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import {ArticleComponent} from '../../components/article/article.component';
import {LayoutModule} from '../layout/layout.module';
import {SanitizerPipe} from '../../pipes/sanitizer.pipe';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ArticleComponent,
    SanitizerPipe
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    LayoutModule,
    RouterModule
  ]
})
export class ArticleModule { }
