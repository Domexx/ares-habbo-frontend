import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CommunityComponent} from '../../components/community/community.component';
import { GroupsComponent } from '../../components/community/groups/groups.component';
import { GroupComponent } from '../../components/community/group/group.component';
import {LayoutModule} from '../layout/layout.module';


@NgModule({
  declarations: [
    CommunityComponent,
    GroupsComponent,
    GroupComponent
  ],
  imports: [
      CommonModule,
      CommunityRoutingModule,
      LayoutModule,
  ]
})
export class CommunityModule { }
