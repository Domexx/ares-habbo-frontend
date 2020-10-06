import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Setting} from '../../_shared/model/setting';
import {SettingService} from '../../_shared/service/setting.service';

@Injectable({ providedIn: 'root' })
export class DashboardDiscordResolver implements Resolve<Setting> {
  constructor(private settingService: SettingService) {}

  /**
   * Gets the configured Discord URL and passes the URL to the component
   * @param route
   * @param state
   * @return Observable<Setting>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Setting> {
    return this.settingService.get('discord_invite');
  }
}
