import {User} from "../user/user";

export class Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: User;
  created_at: {
    data: string,
    timezone_type: number;
    timezone: string;
  }
  updated_at: {
    data: string,
    timezone_type: number;
    timezone: string;
  }
}
