import {User} from '../user/user';
import {Comment} from './comment';

export class Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: User;
  comments: Comment[];
  created_at: {
    date: string,
    timezone_type: number;
    timezone: string;
  }
  updated_at: {
    data: string,
    timezone_type: number;
    timezone: string;
  }
}
