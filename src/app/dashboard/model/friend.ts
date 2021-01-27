import {User} from '../../_shared/model/user/user';
import {APIPagination} from '../../_shared/model/api';

export class Friend extends User {
  id: number;
  friend: User;
  relation: number;
  // tslint:disable-next-line:variable-name
  friends_since: number;
}

export class FriendPagination extends APIPagination {
  data: Friend[];
}
