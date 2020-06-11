import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private http: HttpClient) {
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
    if (token) {

    }

    return this.http.get<any>(`${environment.app.endpoint}/user`)
                    .pipe(
                      map(user => {
                        localStorage.setItem('ares-user', JSON.stringify(user));
                        this.userSubject.next(user);
                      })
                    );
  }

  isAuthenthicated(): boolean {
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
