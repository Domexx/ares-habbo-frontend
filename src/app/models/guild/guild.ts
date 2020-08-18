import {User} from "../user/user";
import {Room} from "../room/room";

export class Guild {
  id: number;
  creator: User;
  name: string;
  description: string;
  badge: string;
  date_created: number;
  room: Room;
}
