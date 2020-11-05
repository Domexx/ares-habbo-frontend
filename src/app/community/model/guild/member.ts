import {User} from '../../../_shared/model/user/user';
import {APIPagination} from '../../../_shared/model/api';

export class Member {
  id: number;
  member: User;
  // tslint:disable-next-line:variable-name
  level_id: number;
  // tslint:disable-next-line:variable-name
  member_since: number;
}

export class MemberPagination extends APIPagination {
  data: Member[];
}
