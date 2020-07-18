import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isSubmited = false;

  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private titleService: TitleService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.alertService.error("test");

    this.titleService.setTitle('Home');
  }

  onSubmit(): void {
    this.isSubmited = true;

    this.authSubscription = this.userService.auth(this.f.username.value, this.f.password.value).subscribe({
      next: (e) => {
        this.userSubscription = this.userService.getUser().subscribe({
          next: () => this.router.navigateByUrl('/dashboard'),
          error: e => console.log(e)
        });
      },
      error: (e) => console.log(e)
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
