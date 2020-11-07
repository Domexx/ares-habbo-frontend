import {User} from '../../_shared/model/user/user';
import {APIPagination} from '../../_shared/model/api';

export class Friend {
  id: number;
  friend: User;
  relation: number;
  user: User;
  // tslint:disable-next-line:variable-name
  friends_since: number;
}

export class FriendPagination extends APIPagination {
  data: Friend[];
}
