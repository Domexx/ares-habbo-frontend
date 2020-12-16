import { Injectable } from '@angular/core';
import { CheckInputHandler } from '../_handler/authentication/check-input.handler';
import { ErrorHandler } from '../_model/error/error-handler.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorHandlers: [{ code: number, class: ErrorHandler }] = [
    {
      code: 10020,
      class: this.checkInputHandler
    }
  ];

  /**
   * ErrorService constructor
   *
   * @param checkInputHandler
   */
  constructor(
    private checkInputHandler: CheckInputHandler
  ) {
  }

  /**
   * Handle error based on the code
   *
   * @param code
   * @returns boolean
   */
  handleCode(code: number): void {
    const handler: ErrorHandler = this.errorHandlers.filter(value => value.code === code)[0].class;

    if (!handler) {
      // TODO show unkown error
      return;
    }

    handler.handle();
  }

}
