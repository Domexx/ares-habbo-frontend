import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {
  loadingSubject: BehaviorSubject<boolean>;
  blockedRequests: string[];

  constructor() {
    this.blockedRequests = [];
    this.loadingSubject = new BehaviorSubject<boolean>(false);
  }

  push(url: string): void {
    this.blockedRequests.push(url);
  }

  remove(url: string): void {
    const i = this.blockedRequests.indexOf(url);

    if (i >= 0) {
      this.blockedRequests.splice(i, 1);
    }
  }

  containsUrl(url: string): boolean {
    return this.blockedRequests.filter(entry => url.includes(entry)).length > 0;
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
