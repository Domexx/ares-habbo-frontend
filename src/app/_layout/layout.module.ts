import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperModule,
} from 'ngx-swiper-wrapper';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { SearchPipe } from './pipe/friends/search.pipe';

import { HeaderComponent } from './component/header/header.component';
import { NavigationComponent } from './component/header/navigation/navigation.component';
import { FooterComponent } from './component/footer/footer.component';

import { LanguageSelectorComponent } from './component/language-selector/language-selector.component';

import { FriendsComponent } from './component/dashboard/friends/friends.component';
import { ArticleSliderComponent } from './component/dashboard/article-slider/article-slider.component';
import { DashboardPinnedArticlesComponent } from './component/dashboard/pinned-articles/pinned-articles.component';
import { DashboardHeroComponent } from './component/dashboard/hero/hero.component';
import { GuildComponent } from './component/dashboard/guild/guild.component';
import { RoomComponent } from './component/dashboard/room/room.component';
import { DiscordComponent } from './component/dashboard/discord/discord.component';

import { LoaderComponent } from './component/loader/loader.component';

import { DisconnectedComponent } from './component/client/disconnected/disconnected.component';
import { ButtonsComponent } from './component/client/buttons/buttons.component';
import { FlashDetectComponent } from './component/client/flash-detect/flash-detect.component';
import { ActiveSessionComponent } from './component/client/active-session/active-session.component';

import { ArticlesComponent } from './component/article/articles/articles.component';
import { CommentsComponent } from './component/article/comments/comments.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faUnlink } from '@fortawesome/free-solid-svg-icons/faUnlink';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

import { GuildMembersComponent } from './component/community/guild/guild-members/guild-members.component';
import { FriendService } from './service/friend.service';
import { SharedModule } from '../_shared/shared.module';
import { GuestbookComponent } from './component/community/guild/guestbook/guestbook.component';
import { ItemComponent } from './component/employees/item/item.component';
import { MomentModule } from 'ngx-moment';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserOfHotelComponent } from './component/dashboard/user-of-hotel/user-of-hotel.component';
import { ListDeleteComponent } from './component/hobba/articles/list-delete/list-delete.component';
import { MobileNavbarComponent } from './component/mobile-navbar/mobile-navbar.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    LanguageSelectorComponent,
    FriendsComponent,
    DashboardHeroComponent,
    ArticleSliderComponent,
    DashboardPinnedArticlesComponent,
    LoaderComponent,
    DisconnectedComponent,
    ButtonsComponent,
    FlashDetectComponent,
    ActiveSessionComponent,
    ArticlesComponent,
    CommentsComponent,
    GuildComponent,
    RoomComponent,
    DiscordComponent,
    GuildMembersComponent,
    SearchPipe,
    GuestbookComponent,
    ItemComponent,
    SidebarComponent,
    NavbarComponent,
    UserOfHotelComponent,
    ListDeleteComponent,
    MobileNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule,
    SwiperModule,
    InfiniteScrollModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
    SharedModule,
    MomentModule,
    CarouselModule.forRoot()
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
    FriendService,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LanguageSelectorComponent,
    FriendsComponent,
    ArticleSliderComponent,
    DashboardPinnedArticlesComponent,
    LoaderComponent,
    DashboardHeroComponent,
    DisconnectedComponent,
    ButtonsComponent,
    FlashDetectComponent,
    ActiveSessionComponent,
    ArticlesComponent,
    CommentsComponent,
    GuildComponent,
    RoomComponent,
    DiscordComponent,
    GuildMembersComponent,
    SearchPipe,
    GuestbookComponent,
    ItemComponent,
    SidebarComponent,
    NavbarComponent,
    UserOfHotelComponent,
    MobileNavbarComponent
  ]
})
export class LayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch, faUnlink, faBars);
  }
}
