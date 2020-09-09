import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './component/register.component';
import {RedirectIfAuthenthicatedGuard} from '../_guard/redirect-if-authenthicated.guard';
import {RegisterLookResolver} from './resolver/looks.resolver';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [RedirectIfAuthenthicatedGuard],
    resolve: {
      looks: RegisterLookResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
