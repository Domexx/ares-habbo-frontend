import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user/user';
import {ApiService} from './api.service';
import {API} from '../model/api';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private apiService: ApiService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('ares-user')));
    this.user$ = this.userSubject.asObservable();
  }

  auth(username: string, password: string): Observable<string> {
    return this.apiService.post('login', {username, password})
      .pipe(
        map(e => this.token = e.data.token)
      );
  }

  getUser(token: string = null): Observable<any> {
    return this.apiService.get('user', {headers: {Authorization: `Bearer ${token}`}})
      .pipe(
        map(response => {
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

    return this.apiService.post('logout', {}, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).toPromise().finally(() => localStorage.removeItem('ares-token'));
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
