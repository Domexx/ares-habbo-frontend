import {Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../../services/title.service';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {AlertService} from '../../services/alert.service';
import {RegisterService} from '../../services/register.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ares-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({opacity: 0}),
        animate(500, style({opacity: 1, display: 'block'}))
      ]),
    ]),
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  usernameSubscription: Subscription;
  mailSubscription: Subscription;
  registerSubscription: Subscription;

  registerForm: FormGroup;

  usernameStep = false;
  passwordStep = false;
  mailStep = false;
  lookStep = false;

  constructor(
    private titleService: TitleService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private registerService: RegisterService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    document.body.classList.add('register--component');

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

  switch(key: string) {
    switch (key) {
      case 'username': {
        this.usernameStep = false;
        this.passwordStep = false;
        this.mailStep = false;
        this.lookStep = false;
        break;
      }

      case 'password': {
        this.usernameStep = true;
        this.passwordStep = false;
        this.mailStep = false;
        this.lookStep = false;
        break;
      }

      case 'mail': {
        this.usernameStep = true;
        this.passwordStep = true;
        this.mailStep = false;
        this.lookStep = false;
        break;
      }

      case 'look': {
        this.usernameStep = true;
        this.passwordStep = true;
        this.mailStep = true;
        this.lookStep = false;
      }
    }
  }

  onUsernameSubmit() {
    const username = this.f.username;

    if (!username.value) {
      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.USERNAME.ERRORS.EMPTY'));
      return;
    }

    this.usernameSubscription = this.registerService.register('username', username.value).subscribe({
      next: () => this.switch('password'),
      error: () => username.setErrors({
        incorrect: true
      })
    });
  }

  onPasswordSubmit() {
    if (!this.usernameStep) {
      this.switch('username');
      return;
    }

    const password = this.f.password;
    const confirmPassword = this.f.confirmPassword;

    if (!password.value || !confirmPassword.value) {
      password.setErrors({
        incorrect: true
      });

      confirmPassword.setErrors({
        incorrect: true
      });

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.PASSWORD.ERRORS.EMPTY'));
      return;
    }

    if (confirmPassword.value !== password.value) {
      password.setErrors({
        incorrect: true
      });

      confirmPassword.setErrors({
        incorrect: true
      });

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.PASSWORD.ERRORS.NOT_SAME'));
      return;
    }

    this.switch('mail');
  }

  onMailSubmit() {
    const mail = this.f.mail;

    if (!mail.value) {
      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.MAIL.ERRORS.EMPTY'));
      return;
    }

    if (mail.errors?.pattern) {
      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.MAIL.ERRORS.PATTERN'));
      return;
    }

    if (mail.invalid) {
      mail.setErrors({
        incorrect: true
      });
      return;
    }

    this.mailSubscription = this.registerService.register('mail', mail.value).subscribe({
      next: () => this.switch('look'),
      error: () => mail.setErrors({
        incorrect: true
      })
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.registerSubscription = this.registerService.register('', {
      username: this.f.username.value,
      mail: this.f.mail.value,
      password: this.f.password.value,
      password_confirmation: this.f.confirmPassword.value
    }, true).subscribe({
      next: (e) => {
        console.log(e);
        this.userSubscription = this.userService.getUser(e.data.token).subscribe({next: () => this.router.navigateByUrl('/dashboard')});
      }
    });
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('register--component');

    if (this.userSubscription && !this.userSubscription.unsubscribe) {
      this.userSubscription.unsubscribe();
    }

    if (this.registerSubscription && !this.registerSubscription.unsubscribe) {
      this.registerSubscription.unsubscribe();
    }

    if (this.usernameSubscription && !this.usernameSubscription.unsubscribe) {
      this.usernameSubscription.unsubscribe();
    }

    if (this.mailSubscription && !this.mailSubscription.unsubscribe) {
      this.mailSubscription.unsubscribe();
    }
  }

}
