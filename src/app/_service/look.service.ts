import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {LookConfig} from '../_shared/model/user/look';

@Injectable({
  providedIn: 'root'
})
export class LookService {

  constructor() { }

  /**
   * Appends the look to the pre-configured Habbo imager URL
   *
   * @param look
   * @return string
   */
  get(look: LookConfig): string {
    return `${environment.app.imager}${look.url}&action=${look.action}&gesture=${look.gesture}&direction=${look.direction}&head_direction=${look.headDirection}&size=${look.size}&headonly=${look.headOnly ? 1 : 0}`;
  }
}
