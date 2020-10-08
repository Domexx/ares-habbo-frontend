import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommunityRoutingModule} from './community-routing.module';
import {LayoutModule} from '../_layout/layout.module';

import {CommunityComponent} from './component/community.component';
import {GuildComponent} from './component/guild/guild.component';

@NgModule({
  declarations: [
    CommunityComponent,
    GuildComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    LayoutModule,
  ]
})
export class CommunityModule {
}
