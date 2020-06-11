import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { RedirectIfAuthenthicatedGuard } from 'src/app/guards/redirect-if-authenthicated.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RedirectIfAuthenthicatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
