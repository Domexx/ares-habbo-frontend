import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import {LogoutComponent} from './component/logout.component';

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    LogoutRoutingModule
  ],
  exports: [
    LogoutComponent
  ]
})
export class LogoutModule { }
