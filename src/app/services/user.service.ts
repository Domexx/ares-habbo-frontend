import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('ares-user')));
    this.user$ = this.userSubject.asObservable();
  }

  auth(username: string, password: string) {
    return this.http.post<any>(`${environment.app.endpoint}/login`, { username, password })
                    .pipe(
                      map(e => this.token = e.token)
                    );
  }

  getUser(token: string = null) {
    // TODO: add token to request header if token isn't null
    return this.http.get<any>(`${environment.app.endpoint}/user`)
                    .pipe(
                      map(user => {
                        localStorage.setItem('ares-user', JSON.stringify(user));
                        this.userSubject.next(user);
                      })
                    );
  }

  logout(): void {
    if (this.isAuthenthicated) {
      localStorage.removeItem('ares-token');
      localStorage.removeItem('ares-user');

      this.userSubject.next(null);
    }

    this.router.navigateByUrl('/');
  }

  get isAuthenthicated(): boolean {
    return this.user && this.token ? true : false;
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
