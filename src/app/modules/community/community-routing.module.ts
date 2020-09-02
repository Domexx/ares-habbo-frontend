import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityComponent} from '../../components/community/community.component';
import {GroupComponent} from '../../components/community/group/group.component';
import {ArticleComponent} from '../../components/community/article/article.component';
import {CommunityArticleResolver} from '../../resolver/community/article/article.resolver';
import {CommunityArticleCommentsResolver} from '../../resolver/community/article/article-comments.resolver';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
  },
  {
    path: 'group/:id',
    component: GroupComponent
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
    resolve: {
      article: CommunityArticleResolver,
      comments: CommunityArticleCommentsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
