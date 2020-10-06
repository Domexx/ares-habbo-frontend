import {Component, ElementRef, OnInit} from '@angular/core';
import {TitleService} from '../../_shared/service/title.service';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../_shared/service/alert.service';
import {RegisterService} from '../service/register.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../_shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {VoteService} from '../../_shared/service/vote.service';

@Component({
  selector: 'ares-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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
    private voteService: VoteService
  ) {
  }

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
      mail: ['', Validators.required]
    });

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

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.USERNAME.ERRORS.EMPTY'));

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

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.PASSWORD.ERRORS.EMPTY'));

      return false;
    }

    if (passwordConfirmation.value !== password.value) {
      password.markAsTouched();
      passwordConfirmation.markAsTouched();

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.PASSWORD.ERRORS.NOT_SAME'));

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

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.MAIL.ERRORS.EMPTY'));
      return false;
    }

    if (mail.errors?.pattern) {
      mail.markAsTouched();

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.MAIL.ERRORS.PATTERN'));
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
      const maleLookExists = this.males.findIndex(value => value === look);

      if (maleLookExists === -1) {
        this.selectLook(this.males.find(value => true), true);
        return;
      }

      this.selectedLook = look;
      this.selectedLookGender = 'M';

      return;
    }

    const femaleLookExists = this.females.findIndex(value => value === look);

    if (femaleLookExists === -1) {
      this.selectLook(this.females.find(value => true));
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
    return `${environment.app.imager}${look}${(head) ? '&headonly=1' : ''}${(large) ? '&size=l' : ''}`;
  }

  /**
   * Submits the input data
   */
  onSubmit(): void {
    if (!this.validateUsername() || !this.validatePassword() || !this.validateMail()) {
      return;
    }

    if (this.registerForm.invalid) {
      this.elRef.nativeElement.scrollTop = 0;
      return;
    }

    const registerSubscription: Subscription = this.registerService.register({
      username: this.f.username.value,
      mail: this.f.mail.value,
      password: this.f.password.value,
      password_confirmation: this.f.confirmPassword.value,
      gender: this.selectedLookGender,
      look: this.selectedLook
    }).subscribe({
      next: (e) => {
        const userSubscription: Subscription = this.userService.getUser(e.data.token)
          .subscribe({
            next: () => this.router.navigateByUrl('/dashboard')
              .then(() => {
                this.alertService.success(this.translateService.instant('REGISTER.SUCCESS'));
                const voteSubscription: Subscription = this.voteService.total().subscribe({
                  complete: () => voteSubscription.unsubscribe()
                });
              }),
            error: () => this.alertService.error(this.translateService.instant('REGISTER.ERROR')),
            complete: () => userSubscription.unsubscribe()
          });
      },
      complete: () => registerSubscription.unsubscribe()
    });
  }

}
