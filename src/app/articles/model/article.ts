import { APIPagination } from './../../_shared/model/api';
import { User } from '../../_shared/model/user/user';

export class Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  comments: number;
  user: User;
  likes: number;
  dislikes: number;
  // tslint:disable-next-line:variable-name
  created_at: string;
  // tslint:disable-next-line:variable-name
  updated_at: string;
}

export class ArticlePagination extends APIPagination {
  data: Article[];
}
