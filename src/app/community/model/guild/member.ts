import {Pagination} from '../../../_shared/model/pagination';
import {User} from '../../../_shared/model/user/user';

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
