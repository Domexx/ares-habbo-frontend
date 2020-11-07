/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_shared/model/user/user';
import { ApiService } from './api.service';
import { API } from '../_shared/model/api';
import { VoteService } from '../_shared/service/vote.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(
    private apiService: ApiService,
    private voteService: VoteService
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('ares-user'))
    );
    this.user$ = this.userSubject.asObservable();
  }

  auth(username: string, password: string): Observable<string> {
    return this.apiService
      .post('login', { username, password })
      .pipe(map((e) => (this.token = e.data.token)));
  }

  // @TODO: change any return type to ????
  getUser(token: string = null): Observable<any> {
    return this.apiService
      .get('user', { headers: { Authorization: `Bearer ${token}` } })
      .pipe(
        map((response) => {
          if (token && !this.token) {
            this.token = token;
          }

          localStorage.setItem('ares-user', JSON.stringify(response.data));
          this.change(response.data);
        })
      );
  }

  change(user: User): void {
    this.userSubject.next(user);
  }

  logout(): Promise<void | API> {
    localStorage.removeItem('ares-user');
    this.change(null);

    this.voteService.votes = [];

    return this.apiService
      .post(
        'logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .toPromise()
      .finally(() => localStorage.removeItem('ares-token'));
  }

  get isAuthenticated(): boolean {
    return !!(this.user && this.token);
  }

  get user(): User {
    return this.userSubject.value;
  }

  get token(): string {
    return localStorage.getItem('ares-token');
  }

  set token(value: string) {
    localStorage.setItem('ares-token', value);
  }
}
