import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user/user";
import {ApiService} from "./api.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  friends(): Observable<User[]> {
    return this.apiService.get('friends').pipe(
      map(resp => resp.data)
    );
  }
}
