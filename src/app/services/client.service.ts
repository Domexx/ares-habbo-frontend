import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private apiService: ApiService) { }

  ticket(): Observable<string> {
    return this.apiService.post('user/ticket', {}, {}, false).pipe(
      map(response => {
        return response.data.ticket;
      })
    );
  }

  set active(value: boolean) {
    localStorage.setItem('ares-client', `${value}`);
  }

  get active(): boolean {
    return localStorage.getItem('ares-client') === 'true';
  }
}
