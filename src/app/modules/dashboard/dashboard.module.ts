import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import {LayoutModule} from '../layout/layout.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild(),
    LayoutModule
  ]
})
export class DashboardModule { }
