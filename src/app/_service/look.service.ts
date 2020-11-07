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
export class LookService {
  constructor() {}

  /**
   * Appends the look to the pre-configured Habbo imager URL
   *
   * @param look
   * @return string
   */
  get(look: string | LookConfig): string {
    if ((look as LookConfig).look) {
      look = look as LookConfig;
      return `${environment.app.imager}${look.look}&action=${
        look.action
      }&gesture=${look.gesture}&direction=${look.direction}&head_direction=${
        look.headDirection
      }&size=${look.size}&headonly=${look.headOnly ? 1 : 0}`;
    }

    return `${environment.app.imager}${look}&action=${LookAction.DEFAULT}&gesture=${LookGestures.STANDARD}&direction=${LookDirection.SOUTH_EAST}&head_direction=${LookDirection.SOUTH_EAST}&size=${LookSize.DEFAULT}`;
  }
}
