import {User} from '../user/user';

export class FriendPagination {
  pagination: {
    totalPages: number;
    nextPage: number;
    prevPage: number;
  };

  friends: User[];
}
