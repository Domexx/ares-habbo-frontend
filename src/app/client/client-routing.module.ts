import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './component/client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
