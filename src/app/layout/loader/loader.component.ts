import {Component, Input, OnInit} from '@angular/core';
import {HttpLoaderService} from '../../services/http-loader.service';
import {animate, style, transition, trigger, state} from '@angular/animations';

@Component({
  selector: 'ares-layout-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('fade', [
      state('0', style({opacity: 0, 'z-index': '-9999'})),
      state('1', style({opacity: 1, 'z-index': '9999'})),

      transition('1 => 0', animate('450ms')),
      transition('0 => 1', animate('0ms'))
    ])
  ]
})
export class LoaderComponent {
  state$ = false;

  @Input('state')
  set state(value: boolean) {
    this.state$ = value;
  }

  constructor(private httpLoaderService: HttpLoaderService) { }

}
