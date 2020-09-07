import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityComponent} from '../../components/community/community.component';
import {GuildComponent} from '../../components/community/guild/guild.component';
import {CommunityGuildResolver} from '../../resolver/community/guild/guild.resolver';
import {CommunityGuildMembersResolver} from '../../resolver/community/guild/members.resolver';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
  },
  {
    path: 'guild/:id',
    component: GuildComponent,
    resolve: {
      guild: CommunityGuildResolver,
      members: CommunityGuildMembersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
