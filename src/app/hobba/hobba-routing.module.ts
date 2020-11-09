import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesResolver } from '../articles/resolver/articles.resolver';
import { ArticlesComponent } from './component/articles/articles.component';
import { CreateComponent } from './component/articles/create/create.component';
import { SettingsComponent } from './component/settings/settings.component';
import { HobbaSettingsResolver } from './resolver/settings.resolver';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    resolve: {
      settings: HobbaSettingsResolver,
    },
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    resolve: {
      articles: ArticlesResolver,
    },
  },
  {
    path: 'articles/create',
    component: CreateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HobbaRoutingModule {}
