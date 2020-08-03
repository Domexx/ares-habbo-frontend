import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ares-layout-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger('fade', [
      state('0', style({opacity: 1, display: 'block'})),
      state('1', style({opacity: 0, display: 'none'})),

      transition('1 => 0', animate('450ms')),
      transition('0 => 1', animate('450ms'))
    ])
  ]
})
export class PreloaderComponent {
  state$ = false;

  @Input('state')
  set state(value: boolean) {
    this.state$ = value;
  }
}
