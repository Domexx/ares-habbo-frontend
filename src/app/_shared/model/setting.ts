import { APIPagination } from './api';

export class Setting {
  id: number;
  key: string;
  value: string;
}

export class SettingsPagination extends APIPagination {
  data: Setting[];
}
