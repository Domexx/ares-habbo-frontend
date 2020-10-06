import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {TitleService} from 'src/app/_shared/service/title.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from 'src/app/_shared/service/user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../../_shared/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {VoteService} from '../../_shared/service/vote.service';

@Component({
  selector: 'ares-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  hotelName = environment.app.hotelName || 'Ares';

  authForm: FormGroup;
  submitted = false;

  authSubscription: Subscription;
  userSubscription: Subscription;
  translateSubscription: Subscription;

  loaded = false;

  constructor(
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService,
    private voteService: VoteService
  ) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    setTimeout(() => this.loaded = true, 250);
    this.titleService.setTitle(this.translateService.instant('HOME.TITLE'));
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
          .then(() => {
            const voteSubscription: Subscription = this.voteService.total().subscribe({
              complete: () => voteSubscription.unsubscribe()
            });

            this.alertService.success(this.translateService.instant('LOGIN.SUCCESS'));
          }),
        complete: () => this.userSubscription.unsubscribe()
      }),
      complete: () => this.authSubscription.unsubscribe()
    });
  }

  ngOnDestroy(): void {
    if (this.translateSubscription && !this.translateSubscription.closed) {
      this.translateSubscription.unsubscribe();
    }
  }

  get f() {
    return this.authForm.controls;
  }
}
