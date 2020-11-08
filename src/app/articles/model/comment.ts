import { User } from '../../_shared/model/user/user';
import { Timestamp } from '../../_shared/model/timestamp';
import { Pagination } from '../../_shared/model/pagination';
import { APIPagination } from 'src/app/_shared/model/api';

export class Comment {
  id: number;
  user: User;
  content: string;
  likes: number;
  dislikes: number;
  // tslint:disable-next-line:variable-name
  is_edited: number;
  // tslint:disable-next-line:variable-name
  created_at: string;
  // tslint:disable-next-line:variable-name
  updated_at: number;
}

export class CommentPagination extends APIPagination {
  data: Comment[];
}
