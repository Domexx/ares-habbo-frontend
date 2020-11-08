import { ArticlesComponent } from './../_layout/component/article/articles/articles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { ArticleResolver } from './resolver/article/article.resolver';
import { ArticleCommentsResolver } from './resolver/article/article-comments.resolver';
import { ArticleArticlesResolver } from './resolver/article/articles.resolver';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    resolve: {
      articles: ArticlesResolver,
    },
  },
  {
    path: ':slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver,
      comments: ArticleCommentsResolver,
      articles: ArticleArticlesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
