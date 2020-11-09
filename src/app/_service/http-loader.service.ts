import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class HttpLoaderService {
  private loadingSubject: BehaviorSubject<boolean>;
  private blockedRequests: string[];
  private blockedErrors: string[];

  constructor() {
    this.blockedRequests = [];
    this.loadingSubject = new BehaviorSubject<boolean>(true);
  }

  pushBlocked(url: string): void {
    this.blockedRequests.push(url);
  }

  removeBlocked(url: string): void {
    this.blockedRequests = this.blockedRequests.filter(
      (value) => value !== url
    );
  }

  containsBlockedUrl(url: string): boolean {
    return this.blockedRequests.filter((entry) => entry === url).length > 0;
  }

  pushError(url: string): void {
    this.blockedErrors.push(url);
  }

  removeError(url: string): void {
    this.blockedErrors = this.blockedErrors.filter((value) => value !== url);
  }

  containsErrorUrl(url: string): boolean {
    return this.blockedErrors.filter((entry) => entry === url).length > 0;
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
