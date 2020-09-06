import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleComponent} from '../../components/articles/article/article.component';
import {ArticleResolver} from '../../resolver/articles/article/article.resolver';
import {ArticleCommentsResolver} from '../../resolver/articles/article/article-comments.resolver';
import {ArticleArticlesResolver} from '../../resolver/articles/article/articles.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver,
      comments: ArticleCommentsResolver,
      articles: ArticleArticlesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes, )],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
