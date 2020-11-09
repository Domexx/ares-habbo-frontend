import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesResolver } from '../articles/resolver/articles.resolver';
import { PermissionGuard } from '../_guard/permission.guard';
import { PermissionType } from '../_model/permission';
import { ArticlesComponent } from './component/articles/articles.component';
import { CreateComponent } from './component/articles/create/create.component';
import { SettingsComponent } from './component/settings/settings.component';
import { HobbaSettingsResolver } from './resolver/settings.resolver';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: PermissionType.SET_GLOBAL_SETTING,
    },
    resolve: {
      settings: HobbaSettingsResolver,
    },
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: PermissionType.DELETE_ARTICLE,
    },
    resolve: {
      articles: ArticlesResolver,
    },
  },
  {
    path: 'articles/create',
    canActivate: [PermissionGuard],
    data: {
      permission: PermissionType.CREATE_ARTICLE,
    },
    component: CreateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HobbaRoutingModule {}
