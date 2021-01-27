import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user.service';
import { API } from '../../_shared/model/api';
import { LookDirection } from '../../_shared/model/user/look';
import { VoteService } from '../../_shared/service/vote.service';
import { ApiService } from '../../_service/api.service';
import { LookService } from '../../_service/look.service';
import { PermissionService } from '../../_service/permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * AuthService constructor
   *
   * @param apiService
   * @param userService
   * @param voteService
   * @param permissionService
   * @param lookService
   */
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private voteService: VoteService,
    private permissionService: PermissionService,
    private lookService: LookService
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
   * Get look
   *
   * @param username
   * @return Observable<string>
   */
  look(username: string): Observable<string> {
    return this.apiService.post(
      'login/look',
      {
        username
      }
    ).pipe(
      map((value: API) => value.data)
    );
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
