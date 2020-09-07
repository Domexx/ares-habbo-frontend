import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CommunityComponent} from '../../components/community/community.component';
import { GroupsComponent } from '../../components/community/groups/groups.component';
import { GuildComponent } from '../../components/community/guild/guild.component';
import {LayoutModule} from '../layout/layout.module';


@NgModule({
  declarations: [
    CommunityComponent,
    GroupsComponent,
    GuildComponent
  ],
  imports: [
      CommonModule,
      CommunityRoutingModule,
      LayoutModule,
  ]
})
export class CommunityModule { }
