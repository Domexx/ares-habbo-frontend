import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutModule} from '../_layout/layout.module';
import {SharedModule} from '../_shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild(),
    LayoutModule,
    SharedModule
  ]
})
export class DashboardModule {
}
