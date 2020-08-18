import {User} from "../user/user";

export class Room {
  name: string;
  description: string;
  state: string;
  users: number;
  users_max: number;
  score: number;
  creator: User;
}
