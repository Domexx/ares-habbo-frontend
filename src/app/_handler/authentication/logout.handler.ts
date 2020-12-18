import { Injectable, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/home/service/auth.service';
import { UserService } from 'src/app/_service/user.service';
import { ErrorHandler } from '../../_model/error/error-handler.interface';
import { AlertService } from '../../_shared/service/alert.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutHandler implements ErrorHandler {
    isLoggingOut = false;

    /**
     * LogoutHandler constructor
     *
     * @param alertService
     * @param userService
     * @param authService
     * @param translateService
     * @param router
     */
    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private authService: AuthService,
        private translateService: TranslateService,
        private router: Router
    ) { }

    /**
     * Handle authentication error
     * 
     * @TODO remove old logout handler
     */
    handle(): void {
        if (
            !this.isLoggingOut &&
            this.userService.user
        ) {
            this.isLoggingOut = true;

            this.authService.logout().finally(() =>
                this.router.navigateByUrl('/').then(() => {
                    this.alertService.error(
                        this.translateService.instant('LOGOUT.ERROR')
                    );
                    this.isLoggingOut = false;
                })
            );
        }
    }
}