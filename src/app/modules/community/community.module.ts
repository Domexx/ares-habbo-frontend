import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CommunityComponent} from '../../components/community/community.component';
import { GroupsComponent } from '../../components/community/groups/groups.component';
import { GroupComponent } from '../../components/community/group/group.component';
import { ArticleComponent } from '../../components/community/article/article.component';
import {LayoutModule} from '../layout/layout.module';
import {SanitizerPipe} from '../../pipes/sanitizer.pipe';


@NgModule({
  declarations: [CommunityComponent, GroupsComponent, GroupComponent, ArticleComponent, SanitizerPipe],
    imports: [
        CommonModule,
        CommunityRoutingModule,
        LayoutModule,
    ]
})
export class CommunityModule { }
