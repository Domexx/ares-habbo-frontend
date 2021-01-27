import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  LookAction,
  LookConfig,
  LookDirection,
  LookGestures,
  LookSize,
} from '../_shared/model/user/look';

@Injectable({
  providedIn: 'root',
})
/**
 * @class LookService
 */
export class LookService {
  /**
   * Generate look URI
   *
   * @param look
   * @returns string
   */
  get(look: string | LookConfig = null): string {
    if (!look || !(look as LookConfig).look) {
      return 'assets/images/habbo.gif';
    }

    if ((look as LookConfig).look) {
      look = look as LookConfig;
      return `${environment.app.imager}${look.look}&action=${
        look.action ?? LookAction.DEFAULT
      }&gesture=${look.gesture ?? LookGestures.STANDARD}&direction=${
        look.direction ?? LookDirection.SOUTH_EAST
      }&head_direction=${look.headDirection ?? LookDirection.SOUTH_EAST}&size=${
        look.size ?? LookSize.DEFAULT
      }&headonly=${look.headOnly ? 1 : 0}`;
    }

    return `${environment.app.imager}${look}&action=${LookAction.DEFAULT}&gesture=${LookGestures.STANDARD}&direction=${LookDirection.SOUTH_EAST}&head_direction=${LookDirection.SOUTH_EAST}&size=${LookSize.DEFAULT}`;
  }
}
