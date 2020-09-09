import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { UserService } from './_shared/service/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpLoaderService} from './_service/http-loader.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ares-root',
  templateUrl: './ares.component.html',
  styleUrls: ['./ares.component.scss'],
  animations: [
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
  }

  ngAfterViewChecked(): void {
    this.isAuthenticated = this.userService.isAuthenticated;
    this.cdRef.detectChanges();
  }

}
