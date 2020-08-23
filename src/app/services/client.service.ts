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
      map(response => response.data.ticket)
    );
  }

  counter(): Observable<number> {
    return this.apiService.get('user/online').pipe(
      map(response => response.data.count)
    );
  }
}
