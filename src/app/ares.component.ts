import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { UserService } from './services/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpLoaderService} from './services/http-loader.service';
import {Router} from '@angular/router';

declare var $;

@Component({
  selector: 'ares-root',
  templateUrl: './ares.component.html',
  styleUrls: ['./ares.component.scss'],
  animations: [
    trigger('fade', [
      state('1', style({opacity: 0, 'z-index': '-9999'})),
      state('0', style({opacity: 1})),

      transition('0 => 1', animate('50ms')),
      transition('1 => 0', animate('0ms'))
    ]),
    trigger('loader', [
      state('1', style({opacity: 0, 'z-index': '-1'})),
      state('0', style({opacity: 1})),

      transition('0 => 1', animate('250ms')),
      transition('1 => 0', animate('0ms'))
    ])
  ]
})
export class AresComponent implements OnInit, AfterViewChecked {
  isAuthenticated = false;
  state = true;

  constructor(
    private userService: UserService,
    private cdRef: ChangeDetectorRef,
    private httpLoaderService: HttpLoaderService,
    public router: Router
  ) { }

  ngOnInit() {
    this.httpLoaderService.asObservable().subscribe((e) => this.state = e);
    $('[data-toggle="popover"]').popover();
  }

  ngAfterViewChecked(): void {
    $('[data-toggle="tooltip"]').tooltip();
    this.isAuthenticated = this.userService.isAuthenticated;
    this.cdRef.detectChanges();
  }

}
