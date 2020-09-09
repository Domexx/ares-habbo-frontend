export class API {
  status: string;
  code: number;
  exception: string;
  errors: [{ message: string; trace: string }]
  data: any
}
