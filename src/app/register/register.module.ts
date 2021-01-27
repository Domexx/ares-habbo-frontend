import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterRoutingModule} from './register-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutModule} from '../_layout/layout.module';

import {RegisterComponent} from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    LayoutModule
  ],
})
export class RegisterModule {
}
