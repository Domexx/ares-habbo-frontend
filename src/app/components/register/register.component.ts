import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../../services/title.service';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {RegisterService} from '../../services/register.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ares-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  registerSubscription: Subscription;

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.males = this.route.snapshot.data.looks.boys;
    this.females = this.route.snapshot.data.looks.girls;

    if (this.males) {
      this.selectedLook = this.males.find(value => true);
    }

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mail: ['', Validators.required]
    });

    this.titleService.setTitle(this.translateService.instant('REGISTER.TITLE'));
  }

  get f() {
    return this.registerForm.controls;
  }

  validateUsername(): boolean {
    const username = this.f.username;

    if (!username.value) {
      username.markAsTouched();

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.USERNAME.ERRORS.EMPTY'));

      return false;
    }

    return true;
  }

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

  selectLook(look: string, male: boolean = false): void {
    console.log(this.males);
    if (male) {
      const maleLookExists = this.males.findIndex(value => value === look);

      if (maleLookExists === -1) {
        this.selectLook(this.males.find(value => true), true);
      }

      this.selectedLook = look;
      this.selectedLookGender = 'M';

      return;
    }

    const femaleLookExists = this.females.findIndex(value => value === look);

    if (femaleLookExists === -1) {
      this.selectLook(this.females.find(value => true));
    }

    this.selectedLook = look;
    this.selectedLookGender = 'F';
  }

  figure(look: string, head: boolean = false, large: boolean = false): string {
    return `${environment.app.imager}${look}${(head) ? '&headonly=1' : ''}${(large) ? '&size=l' : ''}`;
  }

  onSubmit() {
    if (!this.validateUsername() || !this.validatePassword() || !this.validateMail()) {
      return;
    }

    if (this.registerForm.invalid) {
      this.elRef.nativeElement.scrollTop = 0;
      return;
    }

    this.registerSubscription = this.registerService.register({
      username: this.f.username.value,
      mail: this.f.mail.value,
      password: this.f.password.value,
      password_confirmation: this.f.confirmPassword.value,
      gender: this.selectedLookGender
    }).subscribe({
      next: (e) => this.userSubscription = this.userService.getUser(e.data.token)
        .subscribe({
          next: () => this.router.navigateByUrl('/dashboard')
            .then(() => this.alertService.success(this.translateService.instant('REGISTER.SUCCESS'))),
          error: () => this.alertService.error(this.translateService.instant('REGISTER.ERROR'))
        })
    });
  }

  ngOnDestroy() {
    if (this.userSubscription && !this.userSubscription.unsubscribe) {
      this.userSubscription.unsubscribe();
    }

    if (this.registerSubscription && !this.registerSubscription.unsubscribe) {
      this.registerSubscription.unsubscribe();
    }
  }

}
