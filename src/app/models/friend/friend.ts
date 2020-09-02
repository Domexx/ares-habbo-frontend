import {User} from '../user/user';
import {Pagination} from '../pagination';

export class FriendPagination {
  pagination: Pagination;
  friends: Friend[];
}

export class Friend {
  id: number;
  friend: User;
  // tslint:disable-next-line:variable-name
  friends_since: number;
  relation: number;
  user: User;
}
