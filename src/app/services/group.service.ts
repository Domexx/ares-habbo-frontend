import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Guild} from '../models/guild/guild';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  group(id: number): Observable<Guild> {
    return this.apiService.get(`guilds/${id}`).pipe(
      map(resp => resp.data)
    );
  }

  mostMembers(): Observable<Guild> {
    return this.apiService.get('guilds/most/members').pipe(
      map(resp => resp.data)
    );
  }
}
