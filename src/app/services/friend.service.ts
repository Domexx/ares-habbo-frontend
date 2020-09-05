import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {FriendPagination} from '../models/friend/friend';
import {User} from '../models/user/user';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private translateService: TranslateService,
  ) { }

  friends(page: number = 1, results: number = 9): Observable<FriendPagination> {
    return this.apiService.get(`friends/list/${page}/${results}`, {}, false).pipe(
      map(resp => {
        if (resp.data.friends.length < 9) {
          for (let i = resp.data.friends.length; i < 9; i++) {
            resp.data.friends.push({
              friend: this.mannequin()
            });
          }

          console.log(resp.data.friends);
        }

        return resp.data;
      })
    );
  }

  mannequin(): User {
    const mannequin = new User();

    mannequin.id = 0;
    mannequin.username = this.translateService.instant('DASHBOARD.FRIENDS.MANNEQUIN.NAME');
    mannequin.motto = this.translateService.instant('DASHBOARD.FRIENDS.MANNEQUIN.MOTTO');
    mannequin.look = null;
    mannequin.online = -1;

    return mannequin;
  }
}
