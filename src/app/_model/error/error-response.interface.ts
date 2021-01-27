import {Error} from './error.interface';

/**
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  code: number;
  errors: Error[];
  exception: string;
  status: string;
}
