import {User} from '../../_shared/model/user/user';
import {Pagination} from '../../_shared/model/pagination';

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
