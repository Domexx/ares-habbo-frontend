import { Injectable, Input } from '@angular/core';
import { ErrorHandler } from '../../_model/error/error-handler.interface';
import { AlertService } from '../../_shared/service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CheckInputHandler implements ErrorHandler {
  /**
   * CheckInputHandler constructor
   *
   * @param alertService
   */
  constructor(private alertService: AlertService) {
  }

  /**
   * Handle authentication error
   */
  handle(): void {
    this.alertService.error('Bitte überprüfe deine eingegebenen Daten!');
  }

}
