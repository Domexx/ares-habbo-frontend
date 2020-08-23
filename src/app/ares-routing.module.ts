import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuicklinkStrategy} from 'ngx-quicklink';

import {LogoutComponent} from './components/logout/logout.component';
import {ActiveSessionGuard} from './guards/active-session.guard';
import {AuthGuard} from './guards/auth.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    canActivateChild: [ActiveSessionGuard]
  },
  {
    path: 'community',
    loadChildren: () => import('./modules/community/community.module').then(m => m.CommunityModule),
    canActivate: [AuthGuard],
    canActivateChild: [ActiveSessionGuard]
  },
  {
    path: 'client',
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard],
    canActivateChild: [ActiveSessionGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    onSameUrlNavigation: 'reload'
  })
  ],
  exports: [RouterModule]
})
export class AresRoutingModule {
}
