import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { ArticleResolver } from './resolver/article.resolver';
import { ArticleCommentsResolver } from './resolver/article-comments.resolver';
import { ArticleArticlesResolver } from './resolver/articles.resolver';

const routes: Routes = [
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
