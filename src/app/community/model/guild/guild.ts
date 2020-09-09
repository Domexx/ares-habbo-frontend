import {User} from "../../../_shared/model/user/user";
import {Room} from '../room';

export class Guild {
  id: number;
  creator: User;
  name: string;
  description: string;
  badge: string;
  // tslint:disable-next-line:variable-name
  date_created: number;
  room: Room;
}
