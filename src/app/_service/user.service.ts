import { TranslateService } from '@ngx-translate/core';
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
    private voteService: VoteService,
    private translateService: TranslateService
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('ares-user'))
    );
    this.user$ = this.userSubject.asObservable();
  }

  /**
   * Gets a user by the provided token
   *
   * @param token
   * @return Observable<User>
   */
  get(token: string = null): Observable<User> {
    return this.apiService
      .get('user', { headers: { Authorization: `Bearer ${token}` } })
      .pipe(
        map((response) => {
          if (token && !this.token) {
            this.token = token;
          }

          localStorage.setItem('ares-user', JSON.stringify(response.data));
          this.change(response.data);

          return response.data;
        })
      );
  }

  /**
   * Creates a "fake" user to provide any data
   *
   * @return User
   */
  mannequin(): User {
    const mannequin = new User();

    mannequin.id = 0;
    mannequin.username = this.translateService.instant('MANNEQUIN.NAME');
    mannequin.motto = this.translateService.instant('MANNEQUIN.MOTTO');
    mannequin.look = null;
    mannequin.online = -1;

    return mannequin;
  }

  /**
   * Updates the value in the BehaviorSubject
   *
   * @param user
   */
  change(user: User): void {
    this.userSubject.next(user);
  }

  /**
   * Returns token from local storage
   *
   * @return string
   */
  get token(): string {
    return localStorage.getItem('ares-token');
  }

  /**
   * Set local storage token
   *
   * @param value
   */
  set token(value: string) {
    localStorage.setItem('ares-token', value);
  }

  /**
   * Returns the current user
   *
   * @return User
   */
  get user(): User {
    return this.userSubject.value;
  }
}
