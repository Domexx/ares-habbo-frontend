import { ErrorHandler } from './error-handler.interface';

/**
 * @interface ErrorEntry
 */
export interface ErrorEntry {
  code: number;
  class: ErrorHandler;
}
