import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LookService } from '../_service/look.service';
import { TitleService } from '../_service/title.service';
import { UserService } from '../_service/user.service';
import { LookDirection, LookSize } from '../_shared/model/user/look';
import { AlertService } from '../_shared/service/alert.service';
import { VoteService } from '../_shared/service/vote.service';
import { AuthService } from '../home/service/auth.service';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'ares-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  look$: string;
  lookMannequin = true;

  males: [];
  females: [];

  selectedLook: string;
  selectedLookGender: string;

  constructor(
    private titleService: TitleService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private registerService: RegisterService,
    private userService: UserService,
    private router: Router,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private voteService: VoteService,
    private lookService: LookService,
    private authService: AuthService
  ) {}

  /**
   * Initialize the Register Component
   */
  ngOnInit(): void {
    this.males = this.route.snapshot.data.looks.boys;
    this.females = this.route.snapshot.data.looks.girls;

    if (this.males || this.females) {
      this.selectLook('', true ?? false);
    }

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mail: ['', Validators.required],
    });

    this.look$ = this.lookService.get(null);

    this.f.username.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((username) => this.onUsernameChange(username));

    const main = document.getElementById('main');

    if (main) {
      main.classList.add('register');
    }

    this.titleService.setTitle(this.translateService.instant('REGISTER.TITLE'));
  }

  /**
   * Returns the register form controls
   * @return {[p: string]: AbstractControl}
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Validates the username input
   * @return boolean
   */
  validateUsername(): boolean {
    const username = this.f.username;

    if (!username.value) {
      username.markAsTouched();

      this.alertService.error(
        this.translateService.instant(
          'REGISTER.FORM.INPUT.USERNAME.ERRORS.EMPTY'
        )
      );

      return false;
    }

    return true;
  }

  /**
   * Validates password inputs
   * @return boolean
   */
  validatePassword(): boolean {
    const password = this.f.password;
    const passwordConfirmation = this.f.confirmPassword;

    if (!password.value || !passwordConfirmation.value) {
      password.markAsTouched();
      passwordConfirmation.markAsTouched();

      this.alertService.error(
        this.translateService.instant(
          'REGISTER.FORM.INPUT.PASSWORD.ERRORS.EMPTY'
        )
      );

      return false;
    }

    if (passwordConfirmation.value !== password.value) {
      password.markAsTouched();
      passwordConfirmation.markAsTouched();

      this.alertService.error(
        this.translateService.instant(
          'REGISTER.FORM.INPUT.PASSWORD.ERRORS.NOT_SAME'
        )
      );

      return false;
    }

    return true;
  }

  /**
   * Validates the mail input
   * @return boolean
   */
  validateMail(): boolean {
    const mail = this.f.mail;

    if (!mail.value) {
      mail.markAsTouched();

      this.alertService.error(
        this.translateService.instant('REGISTER.FORM.INPUT.MAIL.ERRORS.EMPTY')
      );
      return false;
    }

    if (mail.errors?.pattern) {
      mail.markAsTouched();

      this.alertService.error(
        this.translateService.instant('REGISTER.FORM.INPUT.MAIL.ERRORS.PATTERN')
      );
      return false;
    }

    if (mail.invalid) {
      mail.markAsTouched();
      return false;
    }

    return true;
  }

  /**
   * Selects and validate the look by the given parameter
   * @param look
   * @param male
   */
  selectLook(look: string, male: boolean = false): void {
    if (male) {
      const maleLookExists = this.males.findIndex((value) => value === look);

      if (maleLookExists === -1) {
        this.selectLook(
          this.males.find((value) => true),
          true
        );
        return;
      }

      this.selectedLook = look;
      this.selectedLookGender = 'M';

      return;
    }

    const femaleLookExists = this.females.findIndex((value) => value === look);

    if (femaleLookExists === -1) {
      this.selectLook(this.females.find((value) => true));
      return;
    }

    this.selectedLook = look;
    this.selectedLookGender = 'F';
  }

  /**
   * Returns the URL to the configured imager with provided data
   * @param look
   * @param head
   * @param large
   * @return string
   */
  figure(look: string, head: boolean = false, large: boolean = false): string {
    return this.lookService.get({
      look,
      headOnly: head,
      size: large ? LookSize.LARGE : LookSize.DEFAULT
    });
  }

  /**
   * Value change
   *
   * @param username
   */
  onUsernameChange(username: string): void {
    if (!username) {
      this.resetLook();
      return;
    }

    const subscription: Subscription = this.authService.look(username).subscribe({
      next: (look: string) => {
        this.look$ = this.lookService.get({
          look,
          direction: LookDirection.SOUTH_WEST,
          headDirection: LookDirection.SOUTH_WEST
        });

        this.lookMannequin = false;
        this.f.username.setErrors({
          invalid: true
        });
      },
      error: () => {
        this.resetLook();
        this.f.username.setErrors(null);
      },
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Submits the input data
   */
  onSubmit(): void {
    if (
      !this.validateUsername() ||
      !this.validatePassword() ||
      !this.validateMail()
    ) {
      return;
    }

    if (this.registerForm.invalid) {
      this.elRef.nativeElement.scrollTop = 0;
      return;
    }

    const registerSubscription: Subscription = this.registerService
      .register({
        username: this.f.username.value,
        mail: this.f.mail.value,
        password: this.f.password.value,
        password_confirmation: this.f.confirmPassword.value,
        gender: this.selectedLookGender,
        look: this.selectedLook,
      })
      .subscribe({
        next: (e) => {
          const userSubscription: Subscription = this.userService
            .get(e.data.token)
            .subscribe({
              next: () =>
                this.router.navigateByUrl('/dashboard').then(() => {
                  this.alertService.success(
                    this.translateService.instant('REGISTER.SUCCESS')
                  );
                  const voteSubscription: Subscription = this.voteService
                    .list()
                    .subscribe({
                      complete: () => voteSubscription.unsubscribe(),
                    });
                }),
              error: () =>
                this.alertService.error(
                  this.translateService.instant('REGISTER.ERROR')
                ),
              complete: () => userSubscription.unsubscribe(),
            });
        },
        complete: () => registerSubscription.unsubscribe(),
      });
  }

  /**
   * Reset all properties
   */
  resetLook(): void {
    this.look$ = this.lookService.get(null);
    this.lookMannequin = true;
  }

  ngOnDestroy(): void {
    const main = document.getElementById('main');

    if (main) {
     main.classList.remove('register');
    }
  }
}
