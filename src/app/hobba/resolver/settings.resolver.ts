import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsPagination } from '../../_shared/model/setting';
import { SettingService } from '../../_shared/service/setting.service';

@Injectable({ providedIn: 'root' })
export class HobbaSettingsResolver implements Resolve<SettingsPagination> {
  constructor(private settingService: SettingService) {}

  /**
   * @param route
   * @param state
   * @return Observable<Setting>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SettingsPagination> {
    return this.settingService.list();
  }
}
