import {Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { UserService } from './services/user.service';

declare var $;

@Component({
  selector: 'ares-root',
  templateUrl: './ares.component.html',
  styleUrls: ['./ares.component.scss']
})
export class AresComponent implements OnInit, AfterViewChecked {
  isAuthenticated = false;

  constructor(
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    $('[data-toggle="popover"]').popover();
  }

  ngAfterViewChecked(): void {
    this.isAuthenticated = this.userService.isAuthenticated;
    this.cdRef.detectChanges();
  }
}
