import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from '../../layout/footer/footer.component';
import {HeaderComponent} from '../../layout/header/header.component';
import {NavigationComponent} from '../../layout/header/navigation/navigation.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FriendsComponent} from '../../layout/dashboard/friends/friends.component';
import {LanguageSelectorComponent} from '../../layout/language-selector/language-selector.component';
import {FormsModule} from '@angular/forms';
import {ArticleSliderComponent} from '../../layout/dashboard/article-slider/article-slider.component';
import {ArticlesComponent} from '../../layout/dashboard/articles/articles.component';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from "ngx-swiper-wrapper";
import {RoomsComponent} from '../../layout/dashboard/rooms/rooms.component';
import {PreloaderComponent} from '../../layout/preloader/preloader.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavigationComponent, FriendsComponent, LanguageSelectorComponent, ArticleSliderComponent, ArticlesComponent, RoomsComponent, PreloaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  exports: [FooterComponent, HeaderComponent, LanguageSelectorComponent, ArticlesComponent, FriendsComponent, RoomsComponent, PreloaderComponent]
})
export class LayoutModule {
}
