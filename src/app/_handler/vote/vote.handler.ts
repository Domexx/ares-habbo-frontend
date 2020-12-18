import { Injectable } from '@angular/core';
import { ErrorHandler } from '../../_model/error/error-handler.interface';
import { AlertService } from '../../_shared/service/alert.service';

@Injectable({
    providedIn: 'root'
})
export class VoteHandler implements ErrorHandler {
    /**
     * VoteHandler constructor
     *
     * @param alertService
     */
    constructor(
        private alertService: AlertService
    ) { }

    /**
     * Handle authentication error
     *
     * @TODO translate
     */
    handle(): void {
        this.alertService.error('Du hast schon dafür gevoted!');
    }
}
