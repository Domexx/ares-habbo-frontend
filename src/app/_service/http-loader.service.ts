import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpLoaderService {
  private loadingSubject: BehaviorSubject<boolean>;
  private blockedRequests: string[];

  constructor() {
    this.blockedRequests = [];
    this.loadingSubject = new BehaviorSubject<boolean>(true);
  }

  /**
   * Add a new item
   *
   * @param url
   */
  push(url: string): void {
    this.blockedRequests.push(url);
  }

  /**
   * Remove a existing url
   *
   * @param url
   */
  remove(url: string): void {
    this.blockedRequests = this.blockedRequests.filter(
      (value) => value !== url
    );
  }

  /**
   * Checks if the array contains the url
   *
   * @param url
   * @return boolean
   */
  has(url: string): boolean {
    return this.blockedRequests.filter((entry) => entry === url).length > 0;
  }

  /**
   * Returns Loading-Subject as Observable
   *
   * @return Observable<boolean>
   */
  asObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  /**
   * Set a new value
   */
  set loading(value: boolean) {
    this.loadingSubject.next(value);
  }

  /**
   * Get the current loading state
   */
  get loading(): boolean {
    return this.loadingSubject.value;
  }
}
