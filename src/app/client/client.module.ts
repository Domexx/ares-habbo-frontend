import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './component/client.component';
import {LayoutModule} from '../_layout/layout.module';

@NgModule({
  declarations: [ClientComponent],
  exports: [
    ClientComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    LayoutModule
  ]
})
export class ClientModule {
}
