import { Injectable } from '@angular/core';
import {Notyf, NotyfNotification} from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 2500,
      ripple: true,
      dismissible: true,
      types: [
        {
          type: 'warning',
          background: 'orange'
        },
      ]
    });
  }

  error(msg: string): NotyfNotification {
    return this.notyf.error(msg);
  }

  success(msg: string): NotyfNotification {
    return this.notyf.success(msg);
  }

  dismissAll(): void {
    this.notyf.dismissAll();
  }
}
