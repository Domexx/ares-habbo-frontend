import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NotFoundRoutingModule } from './not-found-routing.module';
import {NotFoundComponent} from './component/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    TranslateModule.forChild()
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
