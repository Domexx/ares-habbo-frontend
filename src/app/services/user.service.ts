import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user/User';
import {LanguageService} from './language.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('ares-user')));
    this.user$ = this.userSubject.asObservable();
  }

  auth(username: string, password: string) {
    return this.http.post<any>(`${environment.app.endpoint}/${this.languageService.language}/login`, {username, password})
      .pipe(
        map(e => this.token = e.data.token)
      );
  }

  getUser(token: string = null) {
    return this.http.get<any>(`${environment.app.endpoint}/${this.languageService.language}/user`, {headers: {Authorization: `Bearer ${token}`}})
      .pipe(
        map(response => {
          localStorage.setItem('ares-user', JSON.stringify(response.data));
          this.userSubject.next(response.data);
        })
      );
  }

  logout() {
    if (!this.isAuthenticated) {
      return;
    }

    const token = localStorage.getItem('ares-token');

    localStorage.removeItem('ares-token');
    localStorage.removeItem('ares-user');

    this.userSubject.next(null);

    return this.http.post<{}>(`${environment.app.endpoint}/${this.languageService.language}/logout`, { }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
