import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeesComponent} from './employees.component';
import {EmployeesResolver} from './resolver/employees.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    resolve: {
      ranks: EmployeesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
