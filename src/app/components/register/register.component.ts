import { Component, OnInit } from '@angular/core';
import {TitleService} from '../../services/title.service';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {AlertService} from '../../services/alert.service';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({opacity: 1, display: 'block'}))
      ]),
    ]),
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  usernameStep = false;
  passwordStep = false;
  mailStep = false;
  lookStep = false;

  constructor(
    private titleService: TitleService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mail: ['', Validators.required]
    });

    $('[data-toggle="popover"]').popover();

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
    if (!this.f.username.value) {
      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.USERNAME.ERRORS.EMPTY'));
      return;
    }

    // Make call to API and check username is free
    // if username is then switch to password and set username to true
    this.switch('password');
  }

  onPasswordSubmit() {
    if (!this.usernameStep) {
      this.switch('username');
      return;
    }

    const password = this.f.password.value;
    const confirmPassword = this.f.confirmPassword.value;

    if (!password || !confirmPassword) {
      this.f.password.setErrors({
        incorrect: true
      });

      this.f.confirmPassword.setErrors({
        incorrect: true
      });

      this.alertService.error(this.translateService.instant('REGISTER.FORM.INPUT.PASSWORD.ERRORS.EMPTY'));
      return;
    }

    if (confirmPassword !== password) {
      this.f.password.setErrors({
        incorrect: true
      });

      this.f.confirmPassword.setErrors({
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

    this.switch('look');
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  }

}
