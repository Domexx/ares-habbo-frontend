import { APIPagination } from './api';
import { User } from './user/user';
import { Timestamp } from './timestamp';

export class Guestbook {
  id: number;
  user: User;
  content: string;
  likes: number;
  dislikes: number;
  // tslint:disable-next-line:variable-name
  created_at: Timestamp;
}

export class GuestbookPagination extends APIPagination {
  data: Guestbook[];
}

export enum GuestbookEntity {
  PROFILE,
  GUILD,
}
