import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import {ArticleSliderResolver} from '../../resolver/dashboard/articles/article-slider.resolver';
import {PinnedArticlesResolver} from '../../resolver/dashboard/articles/pinned.resolver';
import {DashboardFriendResolver} from '../../resolver/dashboard/friends.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      slider: ArticleSliderResolver,
      pinned: PinnedArticlesResolver,
      friends: DashboardFriendResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
