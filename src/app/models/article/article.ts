import {User} from '../user/user';

export class Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: User;
  // tslint:disable-next-line:variable-name
  created_at: {
    date: string,
    timezone_type: number;
    timezone: string;
  };
  // tslint:disable-next-line:variable-name
  updated_at: {
    data: string,
    timezone_type: number;
    timezone: string;
  };
}
