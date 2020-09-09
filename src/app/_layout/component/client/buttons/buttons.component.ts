import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'ares-layout-client-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  hotelName: string = environment.app.hotelName || 'Ares';
  url$: string;

  @Input('url')
  set url(url: string) {
    this.url$ = url;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigateByUrl(this.url$ ?? '/dashboard');
  }

}
