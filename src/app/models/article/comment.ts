import {User} from '../user/user';

export class Comment {
  id: number;
  author: User;
  content: string;
  is_edited: number;
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
