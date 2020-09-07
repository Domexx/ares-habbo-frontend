import {Pagination} from '../pagination';
import {User} from '../user/user';

export class Member {
  id: number;
  member: User;
  // tslint:disable-next-line:variable-name
  level_id: number;
  // tslint:disable-next-line:variable-name
  member_since: number;
}

export class MemberPagination {
  pagination: Pagination;
  members: Member[];
}
