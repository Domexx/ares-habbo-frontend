import {Component, OnInit, OnDestroy} from '@angular/core';
import {TitleService} from 'src/app/services/title.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  hotelName = environment.app.hotelName || 'Ares';
  registerAnchor = `<a routerLink="/register">${this.translateService.instant('HOME.NO_ACCOUNT.ANCHOR')}</a>`;

  authForm: FormGroup;
  submitted = false;

  authSubscription: Subscription;
  userSubscription: Subscription;

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

    this.titleService.setTitle('Home');
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.f.username.value || !this.f.password.value) {
      this.alertService.error(this.translateService.instant('HOME.FORM.INPUT.EMPTY'));
      return;
    }

    this.authSubscription = this.userService.auth(this.f.username.value, this.f.password.value).subscribe({
      next: (e) => {
        this.userSubscription = this.userService.getUser(e.token).subscribe({
          next: () => this.router.navigateByUrl('/dashboard'),
          error: (e: HttpErrorResponse) => this.alertService.error(e.error.message)
        });
      },
      error: (e: HttpErrorResponse) => this.alertService.error(e.error.message)
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription && !this.authSubscription.closed) {
      this.authSubscription.unsubscribe();
    }

    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
  }


  get f() {
    return this.authForm.controls;
  }
}
