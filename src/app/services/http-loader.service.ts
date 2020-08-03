import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {
  loadingSubject: BehaviorSubject<boolean>;

  constructor() {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
  }

  asObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  set loading(value: boolean) {
    this.loadingSubject.next(value);
  }

  get loading(): boolean {
    return this.loadingSubject.value;
  }
}
