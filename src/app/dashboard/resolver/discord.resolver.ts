import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Setting} from '../../_shared/model/setting';
import {SettingService} from '../../_shared/service/setting.service';

@Injectable({ providedIn: 'root' })
/**
 * @class DashboardDiscordResolver
 */
export class DashboardDiscordResolver implements Resolve<Setting> {
  /**
   * DashboardDiscordResolver constructor
   *
   * @param settingService
   */
  constructor(private settingService: SettingService) {}

  /**
   * @param route
   * @param state
   * @returns Observable<Setting>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Setting> {
    return this.settingService.get('discord_invite');
  }
}
