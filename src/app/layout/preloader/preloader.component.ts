import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Subscription} from "rxjs";
import {PreloaderService} from "../../services/preloader.service";

@Component({
  selector: 'ares-layout-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger('fade', [
      state('0' , style({ opacity: 1 })),
      state('1', style({ opacity: 0, display: 'none' })),

      transition('1 => 0', animate('350ms')),
      transition('0 => 1', animate('350ms'))
    ])
  ]
})
export class PreloaderComponent implements OnInit, OnDestroy {
  state$ = false;

  @Input('state')
  set state(value: boolean) {
    this.state$ = value;
  }

  loaderSubscription: Subscription;
  loaderState = false;

  constructor(private preloaderService: PreloaderService) { }

  ngOnInit(): void {
    this.loaderSubscription = this.preloaderService.listen().subscribe({
      next: (e) => this.loaderState = e
    });
  }

  ngOnDestroy() {
    if (this.loaderSubscription && !this.loaderSubscription.unsubscribe) {
      this.loaderSubscription.unsubscribe();
    }
  }

}
