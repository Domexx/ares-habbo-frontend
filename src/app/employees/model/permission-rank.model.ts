/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import {User} from '../../_shared/model/user/user';

export class PermissionRank {
  id: number;
  // tslint:disable-next-line:variable-name
  rank_name: string;
  badge: string;
  prefix: string;
  // tslint:disable-next-line:variable-name
  prefix_color: string;
  users: User[];
}
