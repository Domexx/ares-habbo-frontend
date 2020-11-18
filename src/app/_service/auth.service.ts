import { VoteService } from './../_shared/service/vote.service';
import { UserService } from 'src/app/_service/user.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../_shared/model/api';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private voteService: VoteService,
    private permissionService: PermissionService
  ) {}

  /**
   * Authenticates a user provided by his
   * username and password
   *
   * @param username
   * @param password
   * @return Observable<string>
   */
  auth(username: string, password: string): Observable<string> {
    return this.apiService
      .post('login', { username, password })
      .pipe(map((e) => (this.token = e.data.token)));
  }

  /**
   * Terminates the current session
   *
   * @return Promise<void | API>
   */
  logout(): Promise<void | API> {
    localStorage.removeItem('ares-user');
    this.userService.change(null);

    this.voteService.votes = [];
    this.permissionService.permissions = [];

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
   * Determinate if user is authenticated
   */
  get isAuthenticated(): boolean {
    return !!(this.userService.user && this.token);
  }
}
