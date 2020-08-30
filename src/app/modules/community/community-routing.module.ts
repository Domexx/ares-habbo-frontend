import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityComponent} from '../../components/community/community.component';
import {GroupComponent} from '../../components/community/group/group.component';
import {ArticleComponent} from '../../components/community/article/article.component';
import {CommunityArticleResolver} from '../../resolver/community/article.resolver';

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
      article: CommunityArticleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
