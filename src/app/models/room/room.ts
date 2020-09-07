import {User} from '../user/user';

export class Room {
  id: number;
  name: string;
  description: string;
  state: string;
  users: number;
  // tslint:disable-next-line:variable-name
  users_max: number;
  score: number;
  creator: User;
}
