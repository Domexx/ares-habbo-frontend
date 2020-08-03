import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {TitleService} from 'src/app/services/title.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ares-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  hotelName = environment.app.hotelName || 'Ares';

  authForm: FormGroup;
  submitted = false;

  authSubscription: Subscription;
  userSubscription: Subscription;
  translateSubscription: Subscription;

  loaded = false;

  constructor(private titleService: TitleService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    setTimeout(() => this.loaded = true, 250);
  }

  ngAfterViewInit() {
    console.log(this.translateService.instant('HOME.TITLE'));
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.f.username.value || !this.f.password.value) {
      this.alertService.error(this.translateService.instant('HOME.FORM.INPUT.EMPTY'));
      return;
    }

    this.authSubscription = this.userService.auth(this.f.username.value, this.f.password.value).subscribe({
      next: (e) => this.userSubscription = this.userService.getUser(e).subscribe({
        next: () => this.router.navigateByUrl('/dashboard')
      })
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription && !this.authSubscription.closed) {
      this.authSubscription.unsubscribe();
    }

    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }

    if (this.translateSubscription && !this.translateSubscription.closed) {
      this.translateSubscription.unsubscribe();
    }
  }


  get f() {
    return this.authForm.controls;
  }
}
