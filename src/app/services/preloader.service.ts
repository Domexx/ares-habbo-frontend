import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private loaderSubject: BehaviorSubject<boolean>;

  constructor() {
    this.loaderSubject = new BehaviorSubject<boolean>(false);
  }

  listen(): Observable<boolean> {
    return this.loaderSubject.asObservable();
  }

  set state(value: boolean) {
    this.loaderSubject.next(value);
  }

  get state(): boolean {
    return this.loaderSubject.value;
  }
}
