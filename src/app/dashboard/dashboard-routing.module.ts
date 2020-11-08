import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/component/dashboard.component';
import { ArticleSliderResolver } from './resolver/articles/article-slider.resolver';
import { PinnedArticlesResolver } from './resolver/articles/pinned.resolver';
import { DashboardFriendResolver } from './resolver/friends.resolver';
import { DashboardGuildResolver } from './resolver/guild.resolver';
import { DashboardRoomResolver } from './resolver/room.resolver';
import { DashboardDiscordResolver } from './resolver/discord.resolver';
import { DashboardUserOfHotelResolver } from './resolver/user-of-hotel.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      slider: ArticleSliderResolver,
      pinned: PinnedArticlesResolver,
      friends: DashboardFriendResolver,
      guild: DashboardGuildResolver,
      room: DashboardRoomResolver,
      discord: DashboardDiscordResolver,
      userOfHotel: DashboardUserOfHotelResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
