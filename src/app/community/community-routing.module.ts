import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityComponent} from './component/community.component';
import {GuildComponent} from './component/guild/guild.component';
import {CommunityGuildResolver} from './resolver/guild/guild.resolver';
import {CommunityGuildMembersResolver} from './resolver/guild/members.resolver';
import {CommunityGuildGuestbookResolver} from './resolver/guild/guestbook.resolver';
import {RoomComponent} from './component/room/room.component';
import {CommunityRoomResolver} from './resolver/room/room.resolver';

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
      members: CommunityGuildMembersResolver,
      guestbook: CommunityGuildGuestbookResolver
    }
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    resolve: {
      room: CommunityRoomResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
