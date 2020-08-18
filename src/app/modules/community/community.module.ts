import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CommunityComponent} from '../../components/community/community.component';
import { GroupsComponent } from '../../components/community/groups/groups.component';
import { GroupComponent } from '../../components/community/group/group.component';


@NgModule({
  declarations: [CommunityComponent, GroupsComponent, GroupComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule
  ]
})
export class CommunityModule { }
