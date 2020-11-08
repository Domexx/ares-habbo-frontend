import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home.component';
import { RedirectIfAuthenticatedGuard } from 'src/app/_guard/redirect-if-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RedirectIfAuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
