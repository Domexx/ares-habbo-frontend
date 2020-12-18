import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import {LayoutModule} from '../_layout/layout.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    LayoutModule,
    TranslateModule
  ]
})
export class EmployeesModule { }
