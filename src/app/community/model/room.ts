import {User} from '../../_shared/model/user/user';
import {Guild} from './guild/guild';

export class Room {
  id: number;
  name: string;
  description: string;
  state: string;
  users: number;
  score: number;
  user: User;
  guild?: Guild;
  // tslint:disable-next-line:variable-name
  users_max: number;
}
