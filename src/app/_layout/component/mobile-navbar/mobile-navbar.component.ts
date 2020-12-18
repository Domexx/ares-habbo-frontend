import { Component } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'ares-layout-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent {

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    keyboard: false,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false,
    allowTouchMove: true,
    loop: false,
    autoplay: false
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

}
