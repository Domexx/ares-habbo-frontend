import { Component, OnInit } from '@angular/core';
import { User } from '../../../../_shared/model/user/user';
import { UserService } from '../../../../_service/user.service';
import { environment } from '../../../../../environments/environment';
import { ClientService } from '../../../../client/service/client.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../../_shared/service/language.service';
import { LookService } from '../../../../_service/look.service';
import { LookAction, LookSize } from '../../../../_shared/model/user/look';

@Component({
  selector: 'ares-layout-dashboard-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
/**
 * @class DashboardHeroComponent
 */
export class DashboardHeroComponent implements OnInit {
  user: User;

  date = environment.app.components.dashboard.hero.date;
  time = environment.app.components.dashboard.hero.time;

  lastLogin: number;

  figure$: string;

  /**
   * HeroComponent constructor
   *
   * @param userService
   * @param clientService
   * @param languageService
   * @param lookService
   */
  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private languageService: LanguageService,
    private lookService: LookService
  ) {}

  /**
   * Init hero component
   */
  ngOnInit(): void {
    this.user = this.userService.user;
    this.lastLogin = this.user.last_login * 1000;
    this.figure$ = this.lookService.get({
      look: this.user.look,
      size: LookSize.LARGE
    });
  }

  /**
   * Handle figure hover
   */
  onFigureHover(): void {
    this.figure$ = this.lookService.get({
      look: this.user.look,
      size: LookSize.LARGE,
      action: LookAction.WAVE
    });
  }

  /**
   * Handle figure leave
   */
  onFigureLeave(): void {
    this.figure$ = this.lookService.get({
      look: this.user.look,
      size: LookSize.LARGE
    });
  }

  /**
   * Get figure string
   *
   * @returns string
   */
  get figure(): string {
    return this.figure$;
  }

  /**
   * Get locale
   *
   * @returns string
   */
  get locale(): string {
    return this.languageService.getCurrentCulture();
  }
}
