import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from '../../components/register/register.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {LayoutModule} from "../layout/layout.module";

@NgModule({
  declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        FormsModule,
        LayoutModule
    ],
})
export class RegisterModule { }
