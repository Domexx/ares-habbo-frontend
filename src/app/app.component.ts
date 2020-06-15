import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { LanguageService } from './services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userStream: Subscription;

  constructor(public userService: UserService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    if (this.userService.isAuthenthicated) {
      // prevend invalid tokens
      this.userStream = this.userService.getUser().subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.userStream && !this.userStream.closed) {
      this.userStream.unsubscribe();
    }
  }
}
