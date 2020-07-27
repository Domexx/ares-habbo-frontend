import {Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'ares-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  isAuthenticated = false;

  constructor(
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked(): void {
    this.isAuthenticated = this.userService.isAuthenticated;
    this.cdRef.detectChanges();
  }
}
