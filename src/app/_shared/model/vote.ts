export class Vote {
  id: number;
  // tslint:disable-next-line:variable-name
  entity_id: number;
  // tslint:disable-next-line:variable-name
  vote_entity: number;
  // tslint:disable-next-line:variable-name
  vote_type: number;
}

export enum EntityType {
  ARTICLE_VOTE_ENTITY = 1,
  ARTICLE_COMMENT_VOTE_ENTITY = 2,
  FORUM_VOTE_ENTITY = 3,
  FORUM_COMMENT_VOTE_ENTITY = 4,
  GUESTBOOK_VOTE_ENTITY = 5,
  PHOTO_VOTE_ENTITY = 6
}

export enum VoteType {
  LIKE = 1,
  DISLIKE = 0
}
