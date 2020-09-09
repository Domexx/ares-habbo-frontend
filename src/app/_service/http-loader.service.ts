import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../_shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {
  private loadingSubject: BehaviorSubject<boolean>;
  private blockedRequests: string[];

  constructor() {
    this.blockedRequests = [];
    this.loadingSubject  = new BehaviorSubject<boolean>(true);
  }

  push(url: string): void {
    this.blockedRequests.push(url);
  }

  remove(url: string): void {
    this.blockedRequests = this.blockedRequests.filter(value => value !== url);
  }

  containsUrl(url: string): boolean {
    return this.blockedRequests.filter(entry => entry === url).length > 0;
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
