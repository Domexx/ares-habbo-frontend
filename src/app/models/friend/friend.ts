import {User} from '../user/user';

export class FriendPagination {
  pagination: {
    totalPages: number;
    nextPage: number;
    prevPage: number;
  };

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
