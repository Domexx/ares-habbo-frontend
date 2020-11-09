import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbaRoutingModule } from './hobba-routing.module';
import { SettingsComponent } from './component/settings/settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    HobbaRoutingModule
  ]
})
export class HobbaModule { }
