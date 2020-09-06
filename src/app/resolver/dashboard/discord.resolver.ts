import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Setting} from '../../models/setting';
import {SettingService} from '../../services/setting.service';

@Injectable({ providedIn: 'root' })
export class DashboardDiscordResolver implements Resolve<Setting> {
  constructor(private settingService: SettingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Setting> {
    return this.settingService.get('discord_invite');
  }
}
