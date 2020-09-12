import {User} from './user/user';
import {Timestamp} from './timestamp';
import {Pagination} from './pagination';

export class Guestbook {
  id: number;
  user: User;
  content: string;
  likes: number;
  dislikes: number;
  // tslint:disable-next-line:variable-name
  created_at: Timestamp;
}

export class GuestbookPagination {
  pagination: Pagination;
  entries: Guestbook[];
}

export enum GuestbookEntity {
  PROFILE,
  GUILD
}
