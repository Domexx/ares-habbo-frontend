import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbaRoutingModule } from './hobba-routing.module';
import { SettingsComponent } from './component/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    HobbaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class HobbaModule {}
