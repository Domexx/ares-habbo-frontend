import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PermissionService } from 'src/app/_service/permission.service';
import { TitleService } from 'src/app/_service/title.service';
import { UserService } from 'src/app/_service/user.service';
import { environment } from '../../environments/environment';
import { LookService } from '../_service/look.service';
import { LookDirection, LookSize } from '../_shared/model/user/look';
import { AlertService } from '../_shared/service/alert.service';
import { VoteService } from '../_shared/service/vote.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'ares-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotelName = environment.app.hotelName || 'Ares';

  authForm: FormGroup;
  submitted = false;

  look = null;
  lookMannequin = true;

  /**
   * HomeComponent constructor
   *
   * @param titleService
   * @param formBuilder
   * @param userService
   * @param router
   * @param alertService
   * @param translateService
   * @param voteService
   * @param authService
   * @param permissionService
   * @param lookService
   */
  constructor(
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService,
    private voteService: VoteService,
    private authService: AuthService,
    private permissionService: PermissionService,
    private lookService: LookService
  ) {
  }

  /**
   * Initialize the home component
   */
  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.look = this.lookService.get(null);

    this.f.username.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((username) => this.onUsernameChange(username));

    this.titleService.setTitle(this.translateService.instant('HOME.TITLE'));
  }

  /**
   * Value change
   *
   * @param username
   */
  onUsernameChange(username: string): void {
    if (!username) {
      this.look = this.lookService.get(null);
      this.lookMannequin = true;
      return;
    }

    const subscription: Subscription = this.authService.look(username).subscribe({
      next: (look: string) => {
        this.look = this.lookService.get({
          look,
          direction: LookDirection.SOUTH_WEST,
          headDirection: LookDirection.SOUTH_WEST
        });

        this.lookMannequin = false;
      },
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Handles the login button click event
   */
  onSubmit(): void {
    this.submitted = true;

    if (!this.f.username.value || !this.f.password.value) {
      this.alertService.error(
        this.translateService.instant('HOME.FORM.INPUT.EMPTY')
      );
      return;
    }

    const subscription = this.authService
      .auth(this.f.username.value, this.f.password.value)
      .subscribe({
        next: (e: string) => {
          const userSubscription = this.userService.get(e).subscribe({
            next: () =>
              this.router.navigateByUrl('/dashboard').then(() => {
                const voteSubscription: Subscription = this.voteService
                  .list()
                  .subscribe({
                    complete: () => voteSubscription.unsubscribe()
                  });

                const permissionSubscription: Subscription = this.permissionService
                  .get()
                  .subscribe({
                    complete: () => permissionSubscription.unsubscribe()
                  });

                this.alertService.success(
                  this.translateService.instant('LOGIN.SUCCESS')
                );
              }),
            complete: () => userSubscription.unsubscribe()
          });
        },
        complete: () => subscription.unsubscribe()
      });
  }

  /**
   * Returns the auth form controls
   * @return {[p: string]: AbstractControl}
   */
  get f() {
    return this.authForm.controls;
  }
}
