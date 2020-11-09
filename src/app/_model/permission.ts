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
