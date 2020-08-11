import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpLoaderService} from "../../services/http-loader.service";

@Component({
  selector: 'ares-layout-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger('fade', [
      state('0', style({opacity: 1, display: 'block'})),
      state('1', style({opacity: 0, display: 'none'})),

      transition('1 => 0', animate('0s')),
      transition('0 => 1', animate('550ms'))
    ])
  ]
})
export class PreloaderComponent implements OnInit {
  state$ = false;

  constructor(private httpLoaderService: HttpLoaderService) { }

  ngOnInit() {
    this.httpLoaderService.asObservable().subscribe(v => this.state$ = !v);
  }
}
