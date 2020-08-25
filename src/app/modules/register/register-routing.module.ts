import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from '../../components/register/register.component';
import {RedirectIfAuthenthicatedGuard} from '../../guards/redirect-if-authenthicated.guard';
import {RegisterLookResolver} from '../../resolver/register/looks.resolver';

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
