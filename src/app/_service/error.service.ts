import { Injectable } from '@angular/core';
import { CheckInputHandler } from '../_handler/authentication/check-input.handler';
import { LogoutHandler } from '../_handler/authentication/logout.handler';
import { VoteHandler } from '../_handler/vote/vote.handler';
import { ErrorHandler } from '../_model/error/error-handler.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorHandlers: [{ code: number, class: ErrorHandler }, { code: number, class: ErrorHandler }, { code: number, class: ErrorHandler }] = [
    {
      code: 10020,
      class: this.checkInputHandler
    },
    {
      code: 401,
      class: this.logoutHandler
    },
    {
      code: 11282,
      class: this.voteHandler
    }
  ];

  /**
   * ErrorService constructor
   *
   * @param checkInputHandler
   */
  constructor(
    private checkInputHandler: CheckInputHandler,
    private logoutHandler: LogoutHandler,
    private voteHandler: VoteHandler
  ) {
  }

  /**
   * Handle error based on the code
   *
   * @param code
   * @returns boolean
   */
  handleCode(code: number): void {
    const handler: ErrorHandler = this.errorHandlers.filter(value => value.code === code)[0]?.class;

    if (!handler) {
      // TODO show unkown error
      return;
    }

    handler.handle();
  }

}
