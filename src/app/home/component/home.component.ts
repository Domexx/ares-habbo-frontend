import { AuthService } from './../../_service/auth.service';
import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_service/title.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_service/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../../_shared/service/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { VoteService } from '../../_shared/service/vote.service';

@Component({
  selector: 'ares-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  hotelName = environment.app.hotelName || 'Ares';

  authForm: FormGroup;
  submitted = false;

  userSubscription: Subscription;

  constructor(
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService,
    private voteService: VoteService,
    private authService: AuthService
  ) {}

  /**
   * Initialize the home component
   */
  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.titleService.setTitle(this.translateService.instant('HOME.TITLE'));
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

    let userSubscription: Subscription = null;

    const subscription = this.authService
      .auth(this.f.username.value, this.f.password.value)
      .subscribe({
        next: (e: string) =>
          (userSubscription = this.userService.get(e).subscribe({
            next: () =>
              this.router.navigateByUrl('/dashboard').then(() => {
                const voteSubscription: Subscription = this.voteService
                  .total()
                  .subscribe({
                    complete: () => voteSubscription.unsubscribe(),
                  });

                this.alertService.success(
                  this.translateService.instant('LOGIN.SUCCESS')
                );
              }),
            complete: () => userSubscription.unsubscribe(),
          })),
        complete: () => subscription.unsubscribe(),
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
