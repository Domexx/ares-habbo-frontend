import {User} from '../../_shared/model/user/user';
import {Timestamp} from '../../_shared/model/timestamp';
import {Pagination} from '../../_shared/model/pagination';

export class Comment {
  id: number;
  author: User;
  content: string;
  likes: number;
  dislikes: number;
  // tslint:disable-next-line:variable-name
  is_edited: number;
  // tslint:disable-next-line:variable-name
  created_at: Timestamp;
  // tslint:disable-next-line:variable-name
  updated_at: Timestamp;
}

export class CommentPagination {
  pagination: Pagination;
  comments: Comment[];
  totalComments: number;
}
