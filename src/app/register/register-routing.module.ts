import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RedirectIfAuthenticatedGuard } from '../_guard/redirect-if-authenticated.guard';
import { RegisterLookResolver } from './resolver/looks.resolver';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [RedirectIfAuthenticatedGuard],
    resolve: {
      looks: RegisterLookResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
