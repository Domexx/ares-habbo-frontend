import { APIPagination } from '../_shared/model/api';

export class Permission {
  id: number;
  name: string;
  description: string;
  status: number;
  // tslint:disable-next-line: variable-name
  created_at: string;
  // tslint:disable-next-line: variable-name
  updated_at: string;
}

export class PermissionPagination extends APIPagination {
  data: Permission[];
}

export enum PermissionType {
  'RCON_DISCONNECT_USER' = 'rcon-disconnect-user',
  'DELETE_ROLE_PERMISSION' = 'delete-role-permission',
  'CREATE_ROLE_PERMISSION' = 'create-role-permission',
  'CREATE_PERMISSION' = 'create-permission',
  'LIST_ALL_PERMISSIONS' = 'list-all-permissions',
  'DELETE_ROLE' = 'delete-role',
  'ASSIGN_ROLE' = 'assign-role',
  'CREATE_CHILD_ROLE' = 'create-child-role',
  'CREATE_ROLE' = 'create-role',
  'LIST_ALL_ROLES' = 'list-all-roles',
  'DELETE_FORUM_THREAD' = 'delete-forum-thread',
  'DELETE_FORUM_TOPIC' = 'delete-forum-topic',
  'EDIT_FORUM_TOPIC' = 'edit-forum-topic',
  'CREATE_FORUM_TOPIC' = 'create-forum-topic',
  'DELETE_FORUM_COMMENT' = 'delete-forum-comment',
  'DELETE_PHOTO' = 'delete-photo',
  'SET_GLOBAL_SETTING' = 'set-global-setting',
  'DELETE_PAYMENT' = 'delete-payment',
  'DELETE_GUESTBOOK_ENTRY' = 'delete-guestbook-entry',
  'DELETE_ARTICLE_COMMENT' = 'delete-article-comment',
  'EDIT_ARTICLE_COMMENT' = 'edit-article-comment',
  'CREATE_ARTICLE' = 'create-article',
  'DELETE_ARTICLE' = 'delete-article',
}
