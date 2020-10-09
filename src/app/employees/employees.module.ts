import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './component/employees.component';
import {LayoutModule} from '../_layout/layout.module';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    LayoutModule
  ]
})
export class EmployeesModule { }
